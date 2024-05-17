import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import 'daterangepicker/daterangepicker.css';
import 'daterangepicker/moment.min.js';
import 'daterangepicker/daterangepicker.js';
import { DateRangePicker } from 'react-date-range';
import { addDays, format } from 'date-fns';
import { fetchMangEventReport } from "../../../Redux/PerformanceSlice";
import SpinnerLoading from "../../../components/SpinnerLoading";
import TablePagination from "../../../components/Pagination";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

const EventReport = ()=> {
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const [totalPage, setTotalPage] = useState()
    const currentPageValue = params.get('page');
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    const eventReportList = useSelector((state)=> state.performance.mangEventReport)
    const eventReportListRes = useSelector((state)=> state.performance.loading)
    const dispatch = useDispatch()

    const [inputDateValue, setInputDateValue] = useState()
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [formDate, setFormDate] = useState({})
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

      const handleEventReportList = async(apiEndpoint)=> {
        const eventReportRes = await dispatch(fetchMangEventReport(apiEndpoint));
        const res = eventReportRes.payload;
        setTotalPage(res?.totalPages)
      }
      const handleClickOutside = (e)=> {
        if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
          setOpen(false)
        }
      }
    useEffect(()=> {
      handleEventReportList(`eventReport/managerEventReport?partners_Id=${loggedUser.partners_Id}&publisherManagerId=${loggedUser.managerId}&page=${currentPageValue}`)
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    },[])
    useEffect(()=> {
      if(startDate){
        handleEventReportList(`eventReport/managerEventReport?partners_Id=${loggedUser.partners_Id}&publisherManagerId=${loggedUser.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`)
      }else {
        handleEventReportList(`eventReport/managerEventReport?partners_Id=${loggedUser.partners_Id}&publisherManagerId=${loggedUser.managerId}&page=${currentPageValue}`)
      }
    },[currentPageValue])
    const handleDateChange = (item)=> {
      setState([item.selection])
    }
  
    const handleClickDate = async()=> {
      const eventReportRes = await dispatch(fetchMangEventReport(`eventReport/managerEventReport?partners_Id=${loggedUser.partners_Id}&publisherManagerId=${loggedUser.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`));
      const resResult = eventReportRes.payload;
      console.log('clickREs', resResult)
      setTotalPage(resResult?.totalPages)
    }
    useEffect(()=> {
      setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
      setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
},[state])
    return (
        <>
       <div className="table-container">
       <div className="row justify-content-between">
          <div className="col-lg-9">
            <div className="row">
            <div className="col-lg-4">
              <div className="calenderWrap" ref={datePickerRef}>
                <div className="calenderInput">
                  <i className="fa-regular fa-calendar"></i>
                  <input value={`${format(state[0].startDate, 'yyyy-MM-dd')} to ${format(state[0].endDate, 'yyyy-MM-dd')}`} 
                  readOnly 
                  className="inputBox"
                  onClick={()=> setOpen(!open)} />
                </div>
              {open &&  <DateRangePicker className="calenderElement"
                  onChange={item => handleDateChange(item)}
                  showSelectionPreview={true}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />}
              </div>
            </div>
            <div className="col-lg-2">
              <button type="button" className="btn btn-primary" onClick={handleClickDate}>Apply</button>
            </div>
            </div>
          </div>
              <div className="col-lg-3 col-md-3 col-sm-3 col-6 mb-2">
              <div className="d-flex justify-content-end  gap-2">
                  <button className="btn btn-outline-secondary">Filter <i class="fa-solid fa-filter"></i></button>
                  <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
              </div>
              <hr />
            </div>
            <div className="table-responsive mt-4">
        <table className="table performance-table">
          <thead>
            <tr>
            <th>S.No.</th>
              <th>Offer ID</th>
              <th>Offer Name</th>
              <th>Event ID</th>
              <th>Publisher ID</th>
              <th>Event Value</th>
              <th>Impression</th>
              <th>Conversions</th>
              <th>Payout</th>
            </tr>
          </thead>
          {eventReportListRes ? <tbody>
                          <tr>
                            <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
                        </tbody> : 
                        <tbody>
           {eventReportList && eventReportList.length > 0 ? eventReportList?.map((item, index)=> <tr key={item.event_id}>
                <td>{index + 1}</td>
                <td>{item.offerId}</td>
                <td>{item.title}</td>
                <td>{item.event_id}</td>
                <td>{item.publisherId}</td>
                <td>{item.eventValues}</td>
                <td>{item.totalImpressions}</td>
                {/* <td>{item.totalClick}</td> */}
                <td>{item.totalConversions}</td>
                {/* <td>{item.totalCr}</td> */}
                <td>{item.totalPayout}</td>
           </tr>) :
            <tr>
            <td colSpan={2}>Data not found</td>
          </tr>}
         </tbody>}
         <tfoot>
          <tr>
            <td>Total</td>
            <td>NA</td>
            <td>NA</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
      </tr>
         </tfoot>
         </table>
         </div>
         <TablePagination totalPage={totalPage} path='/affiliates/manager/performance' />
          </div>
        </>
    )
}
export default EventReport