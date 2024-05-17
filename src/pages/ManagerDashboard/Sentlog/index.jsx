import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerSentlogsList } from "../../../Redux/ManagerSlice";
import { Link, useLocation } from "react-router-dom";
import TablePagination from "../../../components/Pagination";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import PublManagerReportTab from "../../../components/PubManagerReportTab";

const ManagerSentlogsList = ()=> {
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const managerSentlogList = useSelector((state)=> state.manager.sentlogList)
    const loading = useSelector((state)=> state.manager.loading)
    const [selectValue, setSelectValue] = useState("");
    const dispatch = useDispatch() 
    const [totalPage, setTotalPage] = useState(1);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const currentPageValue = params.get('page');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

    const handleSelectChange = (e) => {
      setSelectValue(e.target.value);
    };
    const fetchManagerConversion = async(apiEndPoint)=> {
      const managerClickRes = await dispatch(fetchManagerSentlogsList(apiEndPoint))
      const res = await managerClickRes.payload;
      setTotalPage(res.totalPages)
    }

    const handleClickOutside = (e)=> {
      if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    const handleDateChange = (item)=> {
      setState([item.selection])
    }
    useEffect(()=>{
      fetchManagerConversion(`sentLogs/PublisherManagerSentLogList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}`)
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    },[])
    useEffect(()=>{
      {startDate ? fetchManagerConversion(`sentLogs/PublisherManagerSentLogList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) :
      fetchManagerConversion(`sentLogs/PublisherManagerSentLogList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}`)}
  },[currentPageValue])

  const handleClickDate = ()=> {
      fetchManagerConversion(`sentLogs/PublisherManagerSentLogList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) 
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
  },[state])
    return (
        <>
          <div className='page_sec'>
            <div className="container">
          <div className='container_table mt-3' >
            <div className="table-container">
            <PublManagerReportTab />
            <div className="row mb-3">
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
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Publisher</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Advertiser</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Manager</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
              </div>
            </div>
            <div className="row">
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
            <div className="col-lg-3">
              <button type="button" className="btn btn-primary" onClick={handleClickDate}>Apply</button>
            </div>
            </div>
            </div>
      <div className="col-lg-3">
        <input className="form-control w-100"
          type="text"
          placeholder="Search..."
        />
    </div>
  </div>
            <div className="table-responsive mt-3">
              <table className="table conversion-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Publisher</th>
                    <th>Offer</th>
                    <th>Date</th>
                    <th>Click Id</th>
                    <th>Postback Url</th>
                    <th>Event Value</th>
                  </tr>
                </thead>
               {loading ? <tbody>
                <tr>
                <td colSpan={5}>
                  <div className="spinner"></div>
                  </td>
                  </tr>
                  </tbody> :
                <tbody>
                  {managerSentlogList
                    ?.map((click) => (
                    <tr key={click._id}>
                      <td>{click?.sentLogId}</td>
                      <td>(ID: {click?.publisherId}) {click?.publisherFirstName} {click?.publisherLastName}</td>
                      <td>(ID: {click?.offerId}) {click?.offerName}</td>
                      <td>{click?.sentLogTime}</td>
                      <td>{click?.clickId}</td>
                      <td>{click?.postbackUrl}</td>
                      <td>{click?.event_value}</td>
                    </tr>
                    ))}
                </tbody>}
              </table>
              </div>
            </div>
            <TablePagination totalPage={totalPage} path='/affiliates/manager/postbacklogs' />
          </div>
          </div>
          </div>
        </>
    )
}

export default ManagerSentlogsList;