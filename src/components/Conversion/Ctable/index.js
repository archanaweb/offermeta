import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./ctable1.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import BASE_URL from "../../../Api/base";
import Ctabs from "../../Ctabs";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import TablePagination from "../../Pagination";
import { toast } from "react-toastify";
import { Link, json, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAllStatusApproved, UpdateAllStatusCancel, UpdateAllStatusDeclined, UpdateAllStatusPending } from "../../../Redux/ConversionStatusSlice";
import ConversionFilter from "./ConversionFilter";
import { fetchOfferList } from "../../../Redux/OffersSlice";
import { conversionFilterByAdvertiser, conversionFilterByManager, conversionFilterByOffer, conversionFilterByPublisher } from "../../../Redux/ConversionFilterSlice"; 
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";


const StaticTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [subadminId, setSubAdminId] = useState('');
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [postbackPublisherId, setPostbackPublisherId] = useState()
  const [totalPage, setTotalPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filterOfferId, setFilterOfferId] = useState()
  const [filterPubId, setFilterPubId] = useState()
  const [filterAdvId, setFilterAdvId] = useState()
  const [filterManagerId, setFilterManagerId] = useState()
  const allConvStatus =  useSelector((state)=> state.conversionStatus.data)
  const offerList =  useSelector((state)=> state.offers.list)
  const pubList =  useSelector((state)=> state.publisher.list)
  const advList =  useSelector((state)=> state.advertiser.list)
  const managerList =  useSelector((state)=> state.manager.list)
  const filterByOfferList =  useSelector((state)=> state.conversionFilter.list)
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const getCurrentPage = params.get('page')
  const [clickData, setClickData] = useState([]); 
  const [isFilter , setIsFilter] = useState(false)
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formDate, setFormDate] = useState({})
  const [convListUrl, setConvListUrl] = useState(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`)

  const dispatch = useDispatch()

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async () => {
    document.querySelector('body').classList.add('loading')
    try {
      const response = await axios.get(BASE_URL + convListUrl);
      const data = response.data.responseResult;
      setClickData(data);
      setPostbackPublisherId(data[0].publisherId);
      setTotalPage(response.data.totalPages)
      // toast.success(response.data.responseMessage)
      console.log('getCurrentPage<><><>',getCurrentPage)
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
    document.querySelector('body').classList.remove('loading')
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
    dispatch(conversionFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
  },[filterOfferId])
  useEffect(()=> {
    dispatch(conversionFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
  },[filterPubId])
  useEffect(()=> {
    dispatch(conversionFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
  },[filterAdvId])
  useEffect(()=> {
    dispatch(conversionFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
  },[filterManagerId])
  useEffect(()=> {
    setClickData(filterByOfferList)
  },[filterByOfferList])

  // const handleReset = ()=> {
  //   fetchData();
  //   toast.success('Data has been reset')
  // }

  useEffect(() => {
    const storedSubAdminId = localStorage.getItem('subadminId');
    setSubAdminId(storedSubAdminId);
    console.log('partnerId', loggedIn._id);
  }, []);

  useEffect(() => {
    fetchData();
    dispatch(fetchOfferList(loggedIn._id))
    dispatch(fetchPublisherList(loggedIn._id))
    dispatch(fetchAdvertiserList(loggedIn._id))
    dispatch(fetchManagerList(loggedIn._id))
  }, []);
  useEffect(()=> {
    fetchData()
  },[getCurrentPage])

  const pendingItem = async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/pendingConversion?conversionId=${conv._id}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  console.log('conv pending res',resData)
    if(resData.resposneCode === 200){
      fetchData();
      toast.success(resData.resposneMessage)
    }else{
      toast.error(resData.resposneMessage);
    }
  }
  const approvedItem =async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/approvedConversion?conversionId=${conv._id}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData()
  if(resData.resposneCode === 200){
    toast.success(resData.resposneMessage)
  }else{
    toast.error(resData.responseMessage);
  }  
}

  const declineItem = async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/DeclinedConversion?conversionId=${conv._id}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData();
  if(resData.resposneCode === 200){
    toast.success(resData.resposneMessage)
  }else{
    toast.error(resData.resposneMessage);
  }
  }

  const cancelItem =async (conv)=> {
    const response = await fetch(`${BASE_URL}conversion/cancelConversion?conversionId=${conv._id}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
  const resData = await response.json()
  fetchData();
  if(resData.resposneCode === 200){
    toast.success(resData.resposneMessage)
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
        fetchData()
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Approved'){
      const statusResApprov = await dispatch(UpdateAllStatusApproved(loggedIn._id))
      const res = statusResApprov.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData()
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Declined'){
     const statusResDecline = await dispatch(UpdateAllStatusDeclined(loggedIn._id))
      const res = statusResDecline.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData()
      }else{
        toast.error(res?.responseMessage)
      }
    }else if (selectValue === 'Cancel'){
      const statusResCancel = await dispatch(UpdateAllStatusCancel(loggedIn._id))
      const res = statusResCancel.payload
      if(res?.responseCode === 200){
        toast.success(res?.responseMessage)
        fetchData()
      }else{
        toast.error(res?.responseMessage)
      }
    }

  }

  useEffect(()=> {
    updateAllStatus()
  },[selectValue])

  const handleDateChange = (date, e) => {
    const year = date?.getFullYear();
    const month = (date?.getMonth() + 1).toString().padStart(2, '0');
    const day = date?.getDate().toString().padStart(2, '0');

    // Create the formatted date string
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate({...formDate, [e.target.name] : e.target.value})
    console.log('formDate',formDate)
    console.log('date', formattedDate)

    if (!startDate || (startDate && date >= startDate)) {
      setEndDate(formattedDate);
      console.log('startdate', formattedDate)
    } else {
      setStartDate(formattedDate);
      setEndDate(null);
      console.log('endtdate', formattedDate)
    }
  };

  const handleClickDate = ()=> {
    setConvListUrl(`conversion/ConversionList?partners_Id=${loggedIn._id}&page=${getCurrentPage}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`)
  }
  // const dateRes = ()=>{
  //   fetchData().then((res)=> {
  //     console.log('dateResList', res)
  //   });
  //   console.log('dateResLi?st', da?teResList)
    
  // }
  useEffect(()=> {
    fetchData()
  },[convListUrl])
  
  return (
    <div className={isFilter ? 'Container_card sidebar-filter-opened' : 'Container_card'} style={{position: 'relative',
      minHeight: '100%',
      top: '0PX'}}>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
        {/* <h3 className='page_title px-4 pt-3 pb-2'>Conversion Table</h3> */}
        <div className="table-container mt-2">
          <div className="filter-btn">
            <Ctabs />
            <div className="right-buttons">
              {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
              <button className='btn btn-outline-secondary' onClick={()=> setIsFilter(true)}><i className="fa-solid fa-filter fa-lg"></i></button>
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
                <select className="form-control" onChange={handleChangeOffer}>
                  <option value="">Select OfferId</option>
                  {offerList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.title}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangePub}>
                  <option value="">Select PublisherId</option>
                  {pubList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeAdv}>
                  <option value="">Select AdvertiserId</option>
                  {advList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeManager}>
                  <option value="">Select ManagerId</option>
                  {managerList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.name}</option>)}
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
          <hr />
          <div className="table-responsive">
            <table className="table conversion-table">
              <thead>
                <tr>
                  <th>IDaa</th>
                  <th>INSIGHT</th>
                  <th>Date</th>
                  <th>Click ID</th>
                  <th>Conversion ID</th>
                  <th>Offer</th>
                  <th>Publisher</th>
                  <th>IP</th>
                  <th>Status</th>
                  <th>Payout</th>
                  <th>Revanue</th>
                  <th>Profit</th>
                  <th>Advertiser</th>
                  <th>Account Manager</th>
                  <th>Event Value</th>
                  <th>Country</th>
                  <th>State</th>
                  <th>City</th>
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
                  <th>Action</th>
                </tr>
              </thead>
          
                <tbody>
                  {clickData ? clickData
                    ?.map((click, index) => (
                      <tr key={click.id}>
                        <td>{click._id}</td>
                        <td>{click.os}</td>
                        <td>{click.conversionTime}</td>
                        <td>{click.clickId}</td>
                        <td>{click.conversionId}</td>
                        <td>{click.offerId && `(ID: ${click.offerId})`} {click.title}</td>
                        <td>{`(ID: ${click.publisherId}) ${click.publisher_First_name} ${click.publisher_Last_name}`}</td>
                        <td>{click.ipAddress}</td>
                        <td><span className={click?.status === "PENDING" ? 'statusPending' : click?.status === "APPROVED" ? 'statusApproved' : click?.status === "CANCEL" ? 'statusCancel' : 'statusDecline'}>{click?.status}</span></td>
                        <td>{click.Payout}</td>
                        <td>{click.revenue}</td>
                        <td>{click.profit}</td>
                        <td>(ID: {click.advertiserId}) {click.advertiser_First_name} {click.advertiser_Last_name}</td>
                        <td>(ID: {click?.publisherManagerId}) {click?.publisherManager}</td>
                        <td>{click.eventValue}</td>
                        <td>{click.country}</td>
                        <td>{click.State}</td>
                        <td>{click.city}</td>
                        <td>{click?.pub_id}</td>
                        <td>{click?.source}</td>
                        <td>{click?.aff_click_id}</td>
                        <td>{click?.gaid}</td>
                        <td>{click?.idfa}</td>
                        {/* <td>{click?.campaign_id}</td> */}
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
                </tbody>
             
            </table>
          </div>
        <ConversionFilter isFilter={isFilter} setIsFilter={setIsFilter} setClickData={setClickData} fetchData={fetchData} /> 
          <div class="sidebar-backdrop"></div>  
          <TablePagination totalPage={totalPage} path='/statistics/conversion' />
        </div>
        </div>
      </Sidebar>
    </div>
  );

};

export default StaticTable;
