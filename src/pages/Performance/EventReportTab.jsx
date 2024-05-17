import React, { useEffect, useRef, useState } from "react";
import TablePagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangEventReport, fetchPEventReport, fetchPubEventReport } from "../../Redux/PerformanceSlice";
import { Spinner } from "react-bootstrap";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { useLocation } from "react-router-dom";
import EventReportFilter from "./EventReportFilter";

const EventReport = ()=>{
    const datePickerRef = useRef(null)
    const [filter, setFilter] = useState(false)
    const [currentDate, setCurrentDate] = useState(null);
    const [open, setOpen] = useState(false)
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    const [eventReport, setEventReport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);
    const [totalPage, setTotalPage] = useState(1);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const currentPageValue = params.get('page');
    const dispatch = useDispatch()

    const handleClickOutside = (e)=> {
      if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    const handleDateChange = (item)=> {
      setState([item.selection])
    }
   
    const fetchReportApi =async(apiEndPoint)=> {
      setLoading(true)
      try {
        const eventReportRes = await dispatch(fetchPEventReport(apiEndPoint))
        const res = eventReportRes.payload;
        setEventReport(res?.responseResult)
        setTotalPage(res.totalPages)
        setLoading(false)
      } catch (error) {
        console.log('something went wrong', error)
        setLoading(false)
      }
    }
    // async function fetchApis() {
    //   await fetchReportApi(`eventReport/partnerEventValueReport?partners_Id=${loggedUser._id}&startDate=${currentDate}&endDate=${currentDate}`);
    // }

    useEffect(()=> {
      console.log('first load')
      const currDate = new Date()
      const currYear = currDate.getFullYear()
      const currMonth = (currDate.getMonth() + 1).toString().padStart(2, '0');
      const currDay = currDate.getDate().toString().padStart(2, '0');
      const formattedDate = `${currYear}-${currMonth}-${currDay}`;
      setCurrentDate(formattedDate)
      // fetchApis()
        document.addEventListener('click', handleClickOutside)
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
      },[])
      useEffect(()=>{
        console.log('currentDate', currentDate)
        if(currentDate){
          fetchReportApi(`eventReport/partnerEventValueReport?partners_Id=${loggedUser._id}&startDate=${currentDate}&endDate=${currentDate}`)
        }
      },[currentDate])
      useEffect(()=>{
        console.log('currentpage', currentPageValue)
        if(currentPageValue && startDate){
          fetchReportApi(`eventReport/partnerEventValueReport?partners_Id=${loggedUser._id}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`);
        }
      },[currentPageValue, startDate])
     
    
      const handleClickDate = ()=> {
        fetchReportApi(`eventReport/partnerEventValueReport?partners_Id=${loggedUser._id}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`)
      }
      useEffect(()=> {
        setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
        setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
    },[state])
    return (
        <>
        <div className="table-container">
        <div className="row justify-content-end">
              <div className="col-lg-3 col-md-3 col-sm-3 col-6 mb-2">
              <div className="d-flex justify-content-end  gap-2">
                  <button className="btn btn-outline-secondary" onClick={()=> setFilter(!filter)}>Filter <i class="fa-solid fa-filter"></i></button>
                  {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
                </div>
              </div>
              <hr />
            </div>
            {filter && <EventReportFilter setEventReport={setEventReport} setTotalPage={setTotalPage} currentPageValue={currentPageValue} startDate={startDate} endDate={endDate}/>}
            <form>
            <div className="row mb-4 mt-3">
            <div className="col-lg-3">
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
          </form>
          {/* {eventValueStatus ? 'loading' : 'hello'} */}
            <div className="table-responsive mt-4">
        <table className="table performance-table">
          <thead>
            <tr>
              <th>S.No..</th>
              <th>Offer</th>
              <th>Event Name</th>
              <th>Publisher ID</th>
              <th>Impression</th>
              {/* <th>Clicks</th> */}
              <th>Conversions</th>
              {/* <th>CR</th> */}
              <th>Payout</th>
              <th>Event ID</th>
            </tr>
          </thead>
        {loading ? <tbody>
          <tr>
            <td colSpan={9}><div className='spinner'>
                </div></td>
          </tr>
        </tbody> : 
        <tbody>
           {eventReport.length !== 0 ? eventReport.map((item, index)=> (<tr key={index}>
                <td>{index + 1}</td>
                <td>(ID: {item.offerId}) {item.title}</td>
                <td>{item.eventValues}</td>
                <td>{item.publisherId}</td>
                <td>{item.totalImpressions ? item.totalImpressions : '0'}</td>
                <td>{item.totalConversions}</td>
                <td>{item.totalPayout}</td>
                <td>{item.event_id}</td>
           </tr>) ) :
            <tr>
              <td colSpan={2}>Data not found</td>
            </tr>}
         </tbody>}
         <tfoot>
          <tr>
            <td>Total</td>
            <td>NA</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            {/* <td>0</td> */}
            {/* <td>0</td> */}
      </tr>
         </tfoot>
         </table>
         </div>
         <TablePagination totalPage={totalPage} path='/performance' />
          </div>
        </>
    )
}

export default EventReport;