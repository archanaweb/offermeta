import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import PublisherReportTab from "../../../components/PublisherReportTab";
import TablePagination from "../../../components/Pagination";

const PublisherSentLog = ()=> {
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const [selectValue, setSelectValue] = useState("");
    const [sentlogList, setSentlogList] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formDate, setFormDate] = useState({})
    const {search} = useLocation()
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')

    const fetchSentlogList = async(apiEndpoint) => {
    document.querySelector('body').classList.add('loading')
      const response = await fetch(BASE_URL+ apiEndpoint)
      const resData = await response.json()
      setSentlogList(resData.responseResult)
      setTotalPage(resData.totalPages)
      document.querySelector('body').classList.remove('loading')
  };
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  useEffect(() => {
    fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}`);
  }, []);
  useEffect(() => {
    {formDate.startDate ? fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`) : fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}`)};
  }, [getCurrentPage]);
  const handleDateChange = (date, e) => {
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().padStart(2, '0');
    const day = date?.getDate().toString().padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate({...formDate, [e.target.name] : e.target.value})
    if (!startDate || (startDate && date >= startDate)) {
      setEndDate(formattedDate);
      console.log('startdate', formattedDate)
    } else {
      setStartDate(formattedDate);
      setEndDate(null);
    }
  };

  const handleClickDate = ()=> {
    fetchSentlogList(`sentLogs/PublisherSentLogList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`)
  }

    return (
        <>
            <div className='page_sec pt-3'>
            <div className="container">
            <div className="table-container">
            <PublisherReportTab />
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
              {/* <div className="col-lg-2 col-md-3 col-sm-4 col-6">
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
              </div> */}
            </div>
            <form>
                <div className="row mb-4 mt-3">
                <div className="col-lg-3">
                <label>Start Date:</label>
                <input className="form-control"
                    name='startDate'
                    type="date"
                    value={formDate.startDate ? formDate.startDate : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), e)}
                />
                </div>
                <div className="col-lg-3">
                <label>End Date:</label>
                <input className="form-control"
                    name='endDate'
                    type="date"
                    value={formDate.endDate ? formDate.endDate : ''}
                    onChange={(e) => handleDateChange(new Date(e.target.value), e)}
                />
        </div>
        <div className="col-lg-2 pt-1">
            <button type="button" className="btn btn-primary mt-4" onClick={handleClickDate}>Apply</button>
        </div>
                </div>
            </form>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Date</th>
                    {/* <th>Offer</th> */}
                    <th>Postback Url</th>
                    <th>Event Value</th>
                  </tr>
                </thead>
                <tbody>
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
                </tbody>
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