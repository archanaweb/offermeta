import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import BASE_URL from "../../Api/base";
import { fetchSentlogSearchList, sentLogsFilterByAdvertiser, sentLogsFilterByManager, sentLogsFilterByOffer, sentLogsFilterByPublisher } from "../../Redux/SentlogFilterSlice";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import Ctabs from "../../components/Ctabs";
import TablePagination from "../../components/Pagination";
import { toast } from "react-toastify";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { Spinner } from "react-bootstrap";

const SentLog = () => {
  const [loading, setLoading] = useState(true)
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [filterOfferId, setFilterOfferId] = useState()
  const [filterPubId, setFilterPubId] = useState()
  const [filterAdvId, setFilterAdvId] = useState()
  const [filterManagerId, setFilterManagerId] = useState()
  const offerList =  useSelector((state)=> state.offers.list)
  const pubList =  useSelector((state)=> state.publisher.list)
  const advList =  useSelector((state)=> state.advertiser.list)
  const managerList =  useSelector((state)=> state.manager.list)
  const filterByOfferList =  useSelector((state)=> state.sentLogsFilter.list)
  const sentLogListBySearch =  useSelector((state)=> state.sentLogsFilter.list)
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [clickData, setClickData] = useState([]);
  const dispatch = useDispatch()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getCurrentPage = params.get('page')
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
  }
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async (apiEndpoint) => {
    setLoading(true)
    try {
      const response = await axios.get(BASE_URL + apiEndpoint);
      const data = response.data.responseResult;
      setClickData(data);
      setTotalPage(response.data.totalPages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching click data:', error);
      toast.error('Something went wrong');
      setLoading(false)
    }
  };
  const handleChangeOffer = (e)=> {
    setFilterOfferId(e.target.value)
  }
  const handleChangePub = (e)=> {
    setFilterPubId(e.target.value)
  }
  const handleChangeAdv = (e)=> {
    setFilterAdvId(e.target.value)
  }
  const handleChangeManager = (e)=> {
    setFilterManagerId(e.target.value)
  }

  useEffect(() => {
    if(searchInput.length > 0){
      dispatch(fetchSentlogSearchList({partners_Id: loggedIn._id, searchInputValue : searchInput}))
    }else{
      fetchData(`sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
    }
  }, [searchInput]);

  useEffect(()=>{
    dispatch(sentLogsFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
  },[filterOfferId])
  useEffect(()=>{
    dispatch(sentLogsFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
  },[filterPubId])
  useEffect(()=>{
    dispatch(sentLogsFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
  },[filterAdvId])
  useEffect(()=>{
    dispatch(sentLogsFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
  },[filterManagerId])
  useEffect(()=> {
    setClickData(filterByOfferList)
  },[filterByOfferList])
  useEffect(()=> {
    {startDate ? fetchData(`sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`) :  fetchData(`sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)}
  },[getCurrentPage])

  async function fetchSentLogApis() {
    await fetchData(`sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
    await dispatch(fetchOfferList(loggedIn._id))
    await dispatch(fetchPublisherList(loggedIn._id))
    await dispatch(fetchAdvertiserList(loggedIn._id))
    await dispatch(fetchManagerList(loggedIn._id))
  }

  const handleClickOutside = (e)=> {
    if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  const handleDateChange = (item)=> {
    setState([item.selection])
  }

  useEffect(() => {
    fetchSentLogApis()
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);

  const handleClickDate = ()=> {
    fetchData(`sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`)
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
              <div className="col-lg-2">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Action</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeOffer}>
                  <option value="">Select OfferId</option>
                  {offerList?.map((item)=> <option value={item.offerId} key={item.offerId}>(ID: {item.offerId}) {item.title}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangePub}>
                  <option value="">Select PublisherId</option>
                  {pubList?.map((item)=> <option value={item.publisherId} key={item.publisherId}>(ID: {item.publisherId}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeAdv}>
                  <option value="">Select AdvertiserId</option>
                  {advList?.map((item)=> <option value={item.advertiserId} key={item.advertiserId}>(ID: {item.advertiserId}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeManager}>
                  <option value="">Select ManagerId</option>
                  {managerList?.map((item)=> <option value={item.managerId} key={item.managerId}>(ID: {item.managerId}) {item.name}</option>)}
                </select>
              </div>
              <div className="col-lg-2">
                <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="search-bar1"></div>
              </div>
              <div className="col-12">
                <div className="search-bar1"></div>
              </div>
            </div>
          </div>
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
                <hr />
          <div className="table-responsive">
          <table className="table conversion-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>publisherId</th>
              <th>Offer</th>
              <th>Event Value</th>
              <th>Result</th>
              <th>Response Message</th>
              <th>Postback Url</th>
            </tr>
          </thead>
          {loading ? <tbody>
                          <tr>
                            <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
                        </tbody>
                        : <tbody>
              {clickData ? clickData
              .map((click, index) => (
                <tr key={click.sentLogId}>
                  <td>{click.sentLogId}</td>
                  {/* <td>{click._id}</td> */}
                  <td>{click.sentLogTime}</td>
                  <td>(ID: {click.publisherId}) {click.publisherFirstName} {click.publisherLastName}</td>
                  <td>(ID: {click.offerId}) {click.offerName}</td>
                  <td>{click.event_value}</td>
                  <td>{click.result}</td>
                  <td>{click.responseMessage}</td>
                  <td>{click.postbackUrl}</td>
                </tr>
              )) : <tr>
              <td colSpan={4}>Data not found</td></tr>}
            </tbody>}
          </table>
          </div>
            <TablePagination totalPage={totalPage} path={`/conversion/sentlogs`}/>
        </div>
        </div>
        </div>
     );
};

export default SentLog;
