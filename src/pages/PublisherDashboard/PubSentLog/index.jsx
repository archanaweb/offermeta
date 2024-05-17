import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import PublisherReportTab from "../../../components/PublisherReportTab";
import TablePagination from "../../../components/Pagination";
import { DateRangePicker } from "react-date-range";
import { addDays, format } from "date-fns";
import { Spinner } from "react-bootstrap";

const PublisherSentLog = ()=> {
    const [loading, setLoading] = useState(true)
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const [selectValue, setSelectValue] = useState("");
    const [sentlogList, setSentlogList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const {search} = useLocation()
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

    const fetchSentlogList = async(apiEndpoint) => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL+ apiEndpoint)
        const resData = await response.json()
        setSentlogList(resData.responseResult)
        setTotalPage(resData.totalPages)
        setLoading(false)
      }catch(error) {
        console.log('Something went wrong', error)
        setLoading(false)
      }
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const handleClickOutside = (e)=> {
    if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  const handleDateChange = (item)=> {
    setState([item.selection])
  }

  useEffect(() => {
    fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}`);
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);
  useEffect(() => {
    {startDate ? fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&startDate=${startDate}&endDate=${endDate}`) : fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}`)};
  }, [getCurrentPage]);

  const handleClickDate = ()=> {
    fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&startDate=${startDate}&endDate=${endDate}`)
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
},[state])
    return (
        <>
            <div className='page_sec pt-2'>
            <div className="container">
            <div className="table-container">
            <PublisherReportTab />
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
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="" hidden>Action</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Declined">Declined</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Offer</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="table-responsive">
              <table className="table conversion-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    {/* <th>Offer</th> */}
                    <th>Postback Url</th>
                    <th>Event Value</th>
                  </tr>
                </thead>
                { loading ? <tbody>
                          <tr>
                            <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
                        </tbody> : <tbody>
                  {sentlogList ? sentlogList
                    ?.map((click) => (
                      <tr key={click._id}>
                        <td>{click._id}</td>
                        <td>{click.sentLogTime}</td>
                        {/* <td>{click.offer}</td> */}
                        <td>{click.postbackUrl}</td>
                        <td>{click.event_value}</td>
                        </tr>
                    )) :  <tr><td colSpan={4}>Data not found</td></tr>}
                </tbody>}
              </table>
              </div>
            </div>
            <TablePagination totalPage={totalPage} path='/publisher/sentlog' />
            </div>
            </div>
        </>
    )
}

export default PublisherSentLog