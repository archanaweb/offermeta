import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { Dropdown, DropdownButton, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../Api/base";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import { UpdateAllStatusApproved, UpdateAllStatusCancel, UpdateAllStatusDeclined, UpdateAllStatusPending } from "../../Redux/ConversionStatusSlice";
import TablePagination from "../../components/Pagination";
import ConversionFilter from "./ConversionFilter";
import { conversionFilterByAdvertiser, conversionFilterByManager, conversionFilterByOffer, conversionFilterByPublisher } from "../../Redux/ConversionFilterSlice";
import Ctabs from "../../components/Ctabs";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";

const Conversion = () => {
  const datePickerRef = useRef(null)
  const [open, setOpen] = useState(false)
  const mountedRef = useRef()
  const [param, setParam] = useState()
  const [selectValue, setSelectValue] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [postbackPublisherId, setPostbackPublisherId] = useState()
  const [totalPage, setTotalPage] = useState(1);
  const [convLoading, setConvLoading] = useState(true);
  const [filterOfferId, setFilterOfferId] = useState()
  const [filterPubId, setFilterPubId] = useState()
  const [filterAdvId, setFilterAdvId] = useState()
  const [filterManagerId, setFilterManagerId] = useState()
  const offerList =  useSelector((state)=> state.offers.list)
  const pubList =  useSelector((state)=> state.publisher.list)
  const advList =  useSelector((state)=> state.advertiser.list)
  const managerList =  useSelector((state)=> state.manager.list)
  const filterByOfferList =  useSelector((state)=> state.conversionFilter.list)
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getCurrentPage = params.get('page')
  const [clickData, setClickData] = useState([]); 
  const [isFilter , setIsFilter] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ]);
  // const [convListUrl, setConvListUrl] = useState(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)

  const dispatch = useDispatch()
  const fetchData = async (apiEndpoint) => {
    setConvLoading(true)
    try {
      const response = await axios.get(BASE_URL + apiEndpoint);
      const data = response.data.responseResult;
      setClickData(data);
      setPostbackPublisherId(data[0].publisherId);
      const pages = response.data.totalPages
      setTotalPage(pages ? pages : '0')
      setConvLoading(false)
      // toast.success(response.data.responseMessage)
    } catch (error) {
      console.error('Error fetching click data:', error);
      setConvLoading(false)
      // toast.error('Something went wrong')
    }
  };

  const handleReceiveData = (dataFromChild) => {
    console.log('Data received from child:', dataFromChild);
    setParam(dataFromChild)
  };

  const handleExportData = async () => {
    let apiUrl = `conversion/downloadDataInExcelSheetByPartners?partners_Id=${loggedIn._id}&selectedParams=${param}&startDate=${startDate}&endDate=${endDate}`;
    if(filterOfferId){
      apiUrl = `conversion/downloadDataInExcelSheetByOfferId?partners_Id=${loggedIn._id}&offerId=${filterOfferId}&selectedParams=offerId&startDate=${startDate}&endDate=${endDate}`
    }
    if(filterPubId){
      apiUrl = `conversion/downloadDataInExcelSheetByPublisherId?partners_Id=${loggedIn._id}&publisherId=${filterPubId}&selectedParams=publisherId&startDate=${startDate}&endDate=${endDate}`
    }
    try {
      const response = await axios.get(`${BASE_URL}${apiUrl}`, {
        responseType: 'blob', // Set the response type to blob
      });

      const blob = new Blob([response.data], { type: 'text/csv' });

      // Create a download link and trigger a click event
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = 'data.csv';
      downloadLink.click();
    } catch (error) {
      toast.error('Something went wrong')
      console.error('Error downloading file:', error);
    }
  };

  const handleChangeOffer = async (e)=> {
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
  useEffect(()=> {
    if(mountedRef.current){
      dispatch(conversionFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
    }
  },[filterOfferId])
  useEffect(()=> {
    if(mountedRef.current){
    dispatch(conversionFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
    }
  },[filterPubId])
  useEffect(()=> {
    if(mountedRef.current){
    dispatch(conversionFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
    }
  },[filterAdvId])
  useEffect(()=> {
    if(mountedRef.current){
    dispatch(conversionFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
    }
  },[filterManagerId])
  useEffect(()=> {
    setClickData(filterByOfferList)
  },[filterByOfferList])

  async function fetchConversionApis() {
    await fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`);
    await dispatch(fetchOfferList({partners_Id: loggedIn._id,currentPage: 1}))
    await dispatch(fetchPublisherList(loggedIn._id))
    await dispatch(fetchAdvertiserList(loggedIn._id))
    await dispatch(fetchManagerList(loggedIn._id))
  }

  useEffect(()=> {
    {startDate ? fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`) : fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)}
  },[getCurrentPage])
  const handleClickOutside = (e)=> {
    if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  const handleDateChange = (item)=> {
    setState([item.selection])
  }
  
  useEffect(() => {
    fetchConversionApis()
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);
  const pendingItem = async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/pendingConversion?partners_Id=${loggedIn?._id}&conversionId=${conv.conversionId}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  console.log('conv pending res',resData)
    if(resData.responseCode === 200){
      fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`);
      toast.success(resData.responseMessage)
    }else{
      toast.error(resData.resposneMessage);
    }
  }
  const approvedItem = async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/approvedConversion?partners_Id=${loggedIn?._id}&conversionId=${conv.conversionId}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
  if(resData.responseCode === 200){
    toast.success(resData.responseMessage)
  }else{
    toast.error(resData.responseMessage);
  }  
}

  const declineItem = async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/DeclinedConversion?partners_Id=${loggedIn?._id}&conversionId=${conv.conversionId}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`);
  if(resData.responseCode === 200){
    toast.success(resData.responseMessage)
  }else{
    toast.error(resData.resposneMessage);
  }
  }

  const cancelItem =async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/cancelConversion?partners_Id=${loggedIn?._id}&conversionId=${conv.conversionId}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`);
  if(resData.responseCode === 200){
    toast.success(resData.responseMessage)
  }else{
    toast.error(resData.resposneMessage);
  }
  }

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const updateAllStatus = async()=> {
    if (selectValue === 'Pending'){
      const statusResPending = await dispatch(UpdateAllStatusPending(loggedIn._id))
      const res = statusResPending.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Approved'){
      const statusResApprov = await dispatch(UpdateAllStatusApproved(loggedIn._id))
      const res = statusResApprov.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Declined'){
     const statusResDecline = await dispatch(UpdateAllStatusDeclined(loggedIn._id))
      const res = statusResDecline.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Cancel'){
      const statusResCancel = await dispatch(UpdateAllStatusCancel(loggedIn._id))
      const res = statusResCancel.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)
      }else{
        toast.error(res?.responseMessage)
      }
    }

  }

  useEffect(()=> {
    updateAllStatus()
  },[selectValue])

  const handleClickDate = ()=> {
    fetchData(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}&startDate=${startDate}&endDate=${endDate}`)
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
},[state])
  
  return (
    <div className={isFilter ? 'sidebar-filter-opened' : ''} style={{position: 'relative',
      minHeight: '100%',
      top: '0PX'}}>
        <div className='page_sec pt-2'>
            <div className="container">
                <div className="table-container mt-2">
                <div className="filter-btn">
                    <Ctabs />
                    <div className="right-buttons">
                    {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
                    <button className='btn btn-outline-primary' onClick={()=> setIsFilter(true)}><i className="fa-solid fa-filter fa-lg"></i></button>
                    </div>
                </div>
                <div className="">
                    <div className="row">
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
                        <select className="form-control" onChange={handleChangeOffer} ref={mountedRef}>
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
                          <button className="btn btn-primary" onClick={handleExportData}>Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
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
                <div className="table-responsive">
                    <table className="table conversion-table">
                    <thead>
                        <tr>
                        {/* <th>ID</th> */}
                        <th>INSIGHT</th>
                        <th>Date</th>
                        <th>Click ID</th>
                        <th>Offer</th>
                        <th>Publisher</th>
                        <th>IP</th>
                        <th>Status</th>
                        <th>Revanue</th>
                        <th>Payout</th>
                        <th>Profit</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Event Value</th>
                        <th>Event Name</th>
                        <th>Event Token</th>
                        <th>Pub ID</th>
                        <th>Source</th>
                        <th>Aff Click ID</th>
                        <th>GAID</th>
                        <th>IDFA</th>
                        {/* <th>Compaign ID</th> */}
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
                        <th>App Version</th>
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
                        <th>Conversion ID</th>
                        <th>Advertiser</th>
                        <th>Account Manager</th>
                        <th>Landing Page</th>
                        <th>Android ID</th>
                        <th>Android Version</th>
                        <th>Advertiser ID</th>
                        <th>Advertiser Name</th>
                        <th>User Type</th>
                        <th>IP</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                
                        {convLoading ? <tbody>
                          <tr>
                            <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
                        </tbody>:
                        <tbody>
                        {clickData ? clickData
                            ?.map((click, index) => (
                            <tr key={click.conversionIdd}>
                                {/* <td>{click.conversionId}</td> */}
                                <td>{click.os}</td>
                                <td>{click.conversionTime}</td>
                                <td>{click.clickId}</td>
                                <td>{click.offerId && `(ID: ${click.offerId})`} {click.title}</td>
                                <td>{`(ID: ${click.publisherId}) ${click.publisher_First_name} ${click.publisher_Last_name}`}</td>
                                <td>{click.ipAddress}</td>
                                <td><span className={click?.status === "PENDING" ? 'statusPending' : click?.status === "APPROVED" ? 'statusApproved' : click?.status === "CANCEL" ? 'statusCancel' : 'statusDecline'}>{click?.status}</span></td>
                                <td>{click.revenue}</td>
                                <td>{click.Payout}</td>
                                <td>{click.profit}</td>
                                <td>{click.country}</td>
                                <td>{click.city}</td>
                                <td>{click.state}</td>
                                <td>{click.eventValue}</td>
                                <td>{click.eventName}</td>
                                <td>{click.event_token}</td>
                                <td>{click?.pub_id}</td>
                                <td>{click?.source}</td>
                                <td>{click?.aff_click_id}</td>
                                <td>{click?.gaid}</td>
                                <td>{click?.idfa}</td>
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
                                <td>{click?.app_version}</td>
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
                                <td>{click?.conversionIdd}</td>
                                <td>(ID: {click.advertiserId}) {click.advertiser_First_name} {click.advertiser_Last_name}</td>
                                <td>(ID: {click?.publisherManagerId}) {click?.publisherManager}</td>
                                <td>(ID: {click?.landingPageId}) {click?.landingPageName}</td>
                                <td>{click?.android_id}</td>
                                <td>{click?.android_version}</td>
                                <td>{click?.advertiser_id}</td>
                                <td>{click?.advertiser_name}</td>
                                <td>{click?.user_type}</td>
                                <td>{click?.ip}</td>
                                <td>
                                <DropdownButton className="noCarat"
                                    key="start"
                                    id={`dropdown-button-drop-start`}
                                    drop=""
                                    variant="secondary"
                                    title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                                >
                                <Dropdown.Item eventKey="1" onClick={()=> pendingItem(click)}> Pending</Dropdown.Item>
                                <Dropdown.Item eventKey="2" onClick={()=> approvedItem(click)}> Approved</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=> declineItem(click)}> Declined</Dropdown.Item>
                                <Dropdown.Item eventKey="3" onClick={()=> cancelItem(click)}> Cancel</Dropdown.Item>
                                </DropdownButton>
                                </td>
                            </tr>
                            )) : <tr>
                                    <td colSpan={4}>Data not found</td>
                                </tr>}
                        </tbody>}
                    
                    </table>
                </div>
                <ConversionFilter sFilter={isFilter} setIsFilter={setIsFilter} setClickData={setClickData} fetchData={fetchData} sendDataToParent={handleReceiveData}/> 
                <div class="sidebar-backdrop"></div>  
                <TablePagination totalPage={totalPage} path='/statistics/conversion' />
                </div>
            </div>
        </div>
    </div>
  );

};

export default Conversion;
