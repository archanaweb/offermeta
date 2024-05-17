import React, { useState, useEffect, useRef } from "react";
import Ctabs from "../../components/Ctabs";
import TablePagination from "../../components/Pagination";
import BASE_URL from "../../Api/base";
import { Spinner } from "react-bootstrap";
import { DateRangePicker } from "react-date-range";
import { format } from "date-fns";
import { addDays } from "date-fns";
import { useLocation } from "react-router-dom";

const EventLogs = () => {
  const loggedIn = JSON.parse(localStorage.getItem('userData'))
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [invalidEventClick, setInvalidEventClick] = useState();
  const [loading, setLoding] = useState(true)
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getCurrentPage = params.get('page')
  const [totalPage, setTotalPage] = useState(1);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);

  const fetchData = async(apiEndpoint)=> {
    setLoding(true)
    try{
      const invalidResponse = await fetch(`${BASE_URL}${apiEndpoint}`);
      const res = await invalidResponse.json()
      setInvalidEventClick(res?.responseResult)
      setLoding(false)
      setTotalPage(res?.totalPages)
    }catch (error){
      console.log('Something went wrong', error)
      setLoding(false)
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
    fetchData(`conversion/invalidEventClick?partners_Id=${loggedIn?._id}&page=${getCurrentPage}`)
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  },[])
  useEffect(()=> {
    {startDate ? fetchData(`conversion/invalidEventClick?partners_Id=${loggedIn?._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`) : fetchData(`conversion/invalidEventClick?partners_Id=${loggedIn?._id}&page=${getCurrentPage}`)}
  },[getCurrentPage])
  
  const handleClickDate = ()=> {
    fetchData(`conversion/invalidEventClick?partners_Id=${loggedIn?._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`)
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
},[state])

  return (
        <div className='page_sec pt-3'>
            <div className="container">
                <div className="table-container">
            <div className="filter-btn">
                <Ctabs />
                <div className="right-buttons">
                {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
                {/* <button className='btn btn-outline-secondary' onClick={()=> setIsFilter(true)}><i className="fa-solid fa-filter fa-lg"></i></button> */}
                </div>
            </div>
            <div className="">
                <div className="row">
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
                <div className="col-lg-2">
                    <select className="form-control">
                    <option value="">Action</option>
                    <option value="option2">Select Option 2</option>
                    <option value="option3">Select Option 3</option>
                    <option value="option4">Select Option 4</option>
                    <option value="option5">Select Option 5</option>
                    </select>
                </div>
                <div className="col-lg-2">
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                    </div>
                </div>
                </div>
            </div>
            <hr />
            <div className="table-responsive">
            <table className="table conversion-table">
            <thead>
                <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Result</th>
                <th>Status</th>
                <th>Postback Url</th>
                </tr>
            </thead>
               {loading ? <tbody>
                <tr>
                    <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
               </tbody>  : 
               <tbody>
                    {invalidEventClick ? invalidEventClick
                    .map((click) => (
                    <tr key={click.conversionId}>
                        <td>{click.conversionId}</td>
                        <td>{click.conversionTime}</td>
                        <td>{click?.result}</td>
                        <td>{click.status}</td>
                        <td>{click.postbackUrl}</td>
                    </tr>
                    )) : <tr>
                    <td colSpan={4}>Data not found</td>
                </tr>}
                </tbody>}
            </table>
            </div>
            <TablePagination totalPage={totalPage} path='/conversion/eventlogs' />        
            </div>
          </div>
        </div>
    );

};
export default EventLogs;
