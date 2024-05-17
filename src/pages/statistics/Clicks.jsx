import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import Ctabs from "../../components/Ctabs";
import SpinnerLoading from "../../components/SpinnerLoading";
import TablePagination from "../../components/Pagination";
import BASE_URL from "../../Api/base";
import { clickFilterByAdvertiser, clickFilterByManager, clickFilterByOffer, clickFilterByPublisher } from "../../Redux/ClickFilterSlice";
import { Spinner } from "react-bootstrap";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";


const Clicks = () => {
  const mountedRef = useRef()
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [filterOfferId, setFilterOfferId] = useState()
  const [filterPubId, setFilterPubId] = useState()
  const [filterAdvId, setFilterAdvId] = useState()
  const [filterManagerId, setFilterManagerId] = useState()
  const [totalPage, setTotalPage] = useState(1);
  const offerList =  useSelector((state)=> state.offers.list)
  const pubList =  useSelector((state)=> state.publisher.list)
  const advList =  useSelector((state)=> state.advertiser.list)
  const managerList =  useSelector((state)=> state.manager.list)
  const clickFilterList =  useSelector((state)=> state.clickFilter.list)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  
  const dispatch = useDispatch()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentPageValue = params.get('page');
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);
  const [clickDataLoading, setClickDataLoading] = useState(true)

  const fetchData = async (apiEndpoint) => {
    setClickDataLoading(true)
    try {
      const response = await axios.get(BASE_URL+ apiEndpoint);
      const data = response.data.responseResult;
      setClickData(data);
      setTotalPage(response.data.totalPages)
      setClickDataLoading(false)
      // toast.success(response.data.responseMessage)
    } catch (error) {
      console.error('Error fetching click data:', error);
      // toast.error('Something went wrong')
      setClickDataLoading(false)
    }
  };
  async function fetchClicksApis() {
    await fetchData(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}`);
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
    fetchClicksApis()
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);


  useEffect(()=> {
    {startDate ? fetchData(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) : fetchData(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}`)}
  },[currentPageValue])

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

  useEffect(()=>{
    if(mountedRef.current){
    dispatch(clickFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
    }
  },[filterOfferId])
  useEffect(()=>{
    if(mountedRef.current){
    dispatch(clickFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
    }
  },[filterPubId])
  useEffect(()=>{
    if(mountedRef.current){
    dispatch(clickFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
    }
  },[filterAdvId])
  useEffect(()=>{
    if(mountedRef.current){
    dispatch(clickFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
    }
  },[filterManagerId])
  useEffect(()=> {
    setClickData(clickFilterList)
  },[clickFilterList])

  const handleClickDate = ()=> {
      fetchData(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`);
    }
    useEffect(()=> {
      setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
      setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
  },[state])

  return (
        <div className='page_sec pt-3'>
    <div className='container'>
      <div className="table-container">
        <div className="filter-btn">
            <Ctabs/>
            <div className="right-buttons">
              {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
              {/* <button className='btn btn-outline-secondary' onClick={()=> setIsFilter(true)}><i className="fa-solid fa-filter fa-lg"></i></button> */}
            </div>
          </div>
        <div className="filters">
          <div className="row">
            <div className="col-2">
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
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
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
          <div className="table-responsive mt-2">
        <table className="table conversion-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Click ID</th>
              <th>Offer</th>
              <th>Publisher</th>
              <th>IP</th>
              <th>Payout</th>
              <th>Revanue</th>
              <th>Country</th>
              <th>City</th>
              <th>State</th>
              <th>Pub ID</th>
              <th>Source</th>
              <th>Aff Click ID</th>
              <th>GAID</th>
              <th>IDFA</th>
              <th>Compaign ID</th>
              <th>P1</th>
              <th>P2</th>
              <th>P3</th>
              <th>P4</th>
              <th>P5</th>
              <th>P6</th>
              <th>P7</th>
              <th>P8</th>
              <th>P9</th>
              <th>P10</th>
              <th>Sub ID1</th>
              <th>Sub ID2</th>
              <th>Sub ID3</th>
              <th>Sub ID4</th>
              <th>Sub ID5</th>
              <th>Event Token</th>
              <th>Campaign ID</th>
              <th>Sub 1</th>
              <th>Sub 2</th>
              <th>Sub 3</th>
              <th>Sub 4</th>
              <th>Sub 5</th>
              <th>Sub 6</th>
              <th>Sub 7</th>
              <th>Sub 8</th>
              <th>Sub 9</th>
              <th>Sub 10</th>
              <th>Txn_ID1</th>
              <th>Txn_ID2</th>
              <th>Txn_ID3</th>
              <th>Txn_ID4</th>
              <th>Txn_ID5</th>
              <th>Txn_ID6</th>
              <th>Txn_ID7</th>
              <th>Txn_ID8</th>
              <th>Sale Amount</th>
              <th>Adv Revenue</th>
              <th>Impression ID</th>
              <th>Order ID</th>
              <th>Order Value</th>
              <th>App Name</th>
              <th>App ID</th>
              <th>Referer</th>
              <th>Event ID</th>
              <th>Conversion IP</th>
              <th>OS Version</th>
              <th>OS</th>
              <th>User Agent</th>
              <th>Device ID</th>
              <th>Device Version</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Android ID</th>
              <th>Android Version</th>
              <th>Advertiser ID</th>
              <th>Advertiser Name</th>
              <th>User Type</th>
              <th>IP</th>
              <th>Event Name</th>
              <th>Landing Page</th>
            </tr>
          </thead>
            {clickDataLoading ? 
         <tbody>
         <tr>
           <td colSpan={9}><div className='spinner'>
          </div></td>
         </tr>
       </tbody> : 
            <tbody>
              {clickData ? clickData?.map((click, index) => (
                <tr key={click.trackingId}>
                <td>{click.trackingId}</td>
                <td>{click.clickTime}</td>
                <td>{click.clickId}</td>
                <td>{`(ID: ${click.offerId}) ${click.title}`}</td>
                <td>(ID: {click.publisherId}) {click.publisher_First_name} {click.publisher_Last_name}</td>
                <td>{click.ipAddress}</td>
                <td>{click.Payout}</td>
                <td>{click.revenue}</td>
                <td>{click.country}</td>
                <td>{click.city}</td>
                <td>{click?.region}</td>
                <td>{click?.pub_id}</td>
                <td>{click?.source}</td>
                <td>{click?.aff_click_id}</td>
                <td>{click?.gaid}</td>
                <td>{click?.idfa}</td>
                <td>{click?.campaign_id}</td>
                <td>{click?.p1}</td>
                <td>{click?.p2}</td>
                <td>{click?.p3}</td>
                <td>{click?.p4}</td>
                <td>{click?.p5}</td>
                <td>{click?.p6}</td>
                <td>{click?.p7}</td>
                <td>{click?.p8}</td>
                <td>{click?.p9}</td>
                <td>{click?.p10}</td>
                <td>{click?.sub_id1}</td>
                <td>{click?.sub_id2}</td>
                <td>{click?.sub_id3}</td>
                <td>{click?.sub_id4}</td>
                <td>{click?.sub_id5}</td>
                <td>{click.eventToken}</td>
                <td>{click?.campaign_id}</td>
                <td>{click?.sub1}</td>
                <td>{click?.sub2}</td>
                <td>{click?.sub3}</td>
                <td>{click?.sub4}</td>
                <td>{click?.sub5}</td>
                <td>{click?.sub6}</td>
                <td>{click?.sub7}</td>
                <td>{click?.sub8}</td>
                <td>{click?.sub9}</td>
                <td>{click?.sub10}</td>
                <td>{click?.txn_id1}</td>
                <td>{click?.txn_id2}</td>
                <td>{click?.txn_id3}</td>
                <td>{click?.txn_id4}</td>
                <td>{click?.txn_id5}</td>
                <td>{click?.txn_id6}</td>
                <td>{click?.txn_id7}</td>
                <td>{click?.txn_id8}</td>
                <td>{click?.sale_amount}</td>
                <td>{click?.adv_revenue}</td>
                <td>{click?.impression_id}</td>
                <td>{click?.order_id}</td>
                <td>{click?.order_value}</td>
                <td>{click?.app_name}</td>
                <td>{click?.app_id}</td>
                <td>{click?.referer}</td>
                <td>{click?.event_id}</td>
                <td>{click?.conversion_ip}</td>
                <td>{click?.os_version}</td>
                <td>{click?.os}</td>
                <td>{click?.user_agent}</td>
                <td>{click?.device_id}</td>
                <td>{click?.device_version}</td>
                <td>{click?.user_id}</td>
                <td>{click?.user_name}</td>
                <td>{click?.latitude}</td>
                <td>{click?.longitude}</td>
                <td>{click?.android_id}</td>
                <td>{click?.android_version}</td>
                <td>{click?.advertiser_id}</td>
                <td>{click?.advertiser_name}</td>
                <td>{click?.user_type}</td>
                <td>{click?.ip}</td>
                <td>{click?.event_name}</td>
                <td>(ID: {click?.landingPageId}) {click?.landingPageName}</td>
                </tr>
              )) : 
              <tr><td colSpan={4}>Data not found</td></tr>}
            </tbody>}
        </table>
        </div>
        <TablePagination totalPage={totalPage} path='/statistics/click' />
      </div>
    </div>
    </div>
   );
};
export default Clicks;
