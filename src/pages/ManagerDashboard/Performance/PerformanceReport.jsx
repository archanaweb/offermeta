import React, { useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import BASE_URL from "../../../Api/base";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";

const PerformanceReport =()=> {
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [pubReport, setPubReport] = useState()
  const [eventLoading, setEventLoading] = useState(true);
  const loggedUser = JSON.parse(localStorage.getItem('userData'));
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  const fetchPublisherReport = async (apiEndPoint)=> {
    try {
        const res = await fetch(`${BASE_URL}${apiEndPoint}`)
        const resData = await res.json()
        setPubReport(resData.responseResult);
        setEventLoading(false)
    }catch (error) {
        console.error('Error fetching click data:', error);
        toast.error('Something went wrong')
        setEventLoading(false)
      }
  }
  const handleClickOutside = (e)=> {
    if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  const handleDateChange = (item)=> {
    setState([item.selection])
  }
  useEffect(()=> {
    fetchPublisherReport(`report/publisherManagerReport?partners_Id=${loggedUser?.partners_Id}&publisherManagerId=${loggedUser?.managerId}`)
    document.addEventListener('click', handleClickOutside)
        return () => {
          document.removeEventListener('click', handleClickOutside)
        }
  },[])
  const handleClickDate = ()=> {
    fetchPublisherReport(`report/publisherManagerReport?partners_Id=${loggedUser?.partners_Id}&publisherManagerId=${loggedUser?.managerId}&startDate=${startDate}&endDate=${endDate}`)
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
        <div className="table-responsive">
        <table className="table performance-table">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th colspan="2">TRAFFIC</th>
              <th></th>
              <th colspan="2">Conversions</th>
              <th></th>
              <th></th>
              <th colspan="4">Finances</th>
            </tr>
            <tr>
                <th>Offer ID</th>
                <th>Offer Title</th>
                <th>Hosts</th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>All</th>
                <th>Approved</th>
                <th>CR</th>
                <th>EPC</th>
                <th>Approved</th>
                <th>Clicks</th>
                <th>Impressions</th>
                <th>Total</th>
            </tr>
          </thead>
          {eventLoading ? <tbody>
            <tr>
                <td colSpan={10}><div className='spinner'>
                </div></td>
              </tr>
        </tbody> :
         <tbody>
           {pubReport && pubReport.length > 0 ? pubReport?.map((item)=> <tr key={item.publisherManagerId}>
                <td>{item?.offerId}</td>
                <td>{item?.offerName}</td>
                <td>{item?.uniqueClicks}</td>
                <td>{item?.clicks}</td>
                <td>{item?.impressions}</td>
                <td>{item?.conversions}</td>
                <td>{item?.conversions}</td>
                <td>{item?.totalCR}</td>
                <td>0</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$0.00</td>
           </tr>):
             <tr>
             <td colSpan={2}>Data not found</td>
         </tr>}
         </tbody>}
         <tfoot>
         <tr>
                <td>Total</td>
                <td></td>
                <td>413</td>
                <td>622</td>
                <td>0</td>
                <td>26</td>
                <td>26</td>
                <td></td>
                <td></td>
                <td>$7.735</td>
                <td>$0.00</td>
                <td>$0.00</td>
                <td>$7.735</td>
            </tr>
            </tfoot>
        </table>
        </div>
        </div>
        </>
    )
}

export default PerformanceReport