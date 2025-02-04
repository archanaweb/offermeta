import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./table.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import BASE_URL from "../../../Api/base";
import Ctabs from "../../Ctabs";
import PageTitle from "../../PageTitle";
import Pagination from 'react-bootstrap/Pagination';
import TablePagination from "../../Pagination";
import { clickFilterByAdvertiser, clickFilterByManager, clickFilterByOffer, clickFilterByPublisher } from "../../../Redux/ClickFilterSlice";
import { fetchOfferList } from "../../../Redux/OffersSlice";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useLocation } from 'react-router-dom';
import { Spinner } from "react-bootstrap";
import SpinerLoading from "../../Loading";


const StaticTable = () => {
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
  const [formDate, setFormDate] = useState({})
  
  const dispatch = useDispatch()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentPageValue = params.get('page');
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };
  const [convListUrl, setConvListUrl] = useState(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}`)

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);
  const [clickDataLoading, setClickDataLoading] = useState(true)

  const fetchData = async () => {
    try {
      console.log('get', currentPageValue)
      const response = await axios.get(BASE_URL+ convListUrl);
      const data = response.data.responseResult; // Access the responseResult property
      console.log("click data",data);
      setClickData(data);
      setTotalPage(response.data.totalPages)
      toast.success(response.data.responseMessage)
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
    setClickDataLoading(false)
  };

  useEffect(() => {
    fetchData();
    console.log('call 3');
    dispatch(fetchOfferList(loggedIn._id))
    dispatch(fetchPublisherList(loggedIn._id))
    dispatch(fetchAdvertiserList(loggedIn._id))
    dispatch(fetchManagerList(loggedIn._id))
  }, []);


  useEffect(()=> {
    fetchData();
    console.log('call 2')
    console.log('test',currentPageValue)
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
    dispatch(clickFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
  },[filterOfferId])
  useEffect(()=>{
    dispatch(clickFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
  },[filterPubId])
  useEffect(()=>{
    dispatch(clickFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
  },[filterAdvId])
  useEffect(()=>{
    dispatch(clickFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
  },[filterManagerId])
  useEffect(()=> {
    setClickData(clickFilterList)
  },[clickFilterList])

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
    setConvListUrl(`tracking/trackingList?partners_Id=${loggedIn._id}&page=${currentPageValue}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`)
  }
  useEffect(()=> {
    fetchData();
    console.log('call 1')
  },[convListUrl])

  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
    <div className='container_table'>
      <div className="table-container">
        <div className="mb-2 d-flex justify-content-between align-item-center">
          <input className="form-control"
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          <input type="date" className="form-control"/>
        </div>
        <div className="filter-btn">
            <Ctabs />
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
          {/* <div className="serch-btn my-2">
          <input className="form-control"
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
          </div> */}
        </div>
        {/* <div className="mt-2 d-flex justify-content-between align-items-center">
          <div className="date-field"></div>
          <div className="button-container">
            <button className="btn btn-outline-primary btn-sm">Button 1</button>
            <button className="btn btn-secondary btn-sm">Button 2</button>
          </div>
        </div> */}
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
          <div className="table-responsive mt-2">
        <table className="table conversion-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Click ID</th>
              <th>Offer</th>
              <th>Affiliate</th>
              <th>IP</th>
              <th>Payout</th>
              <th>Revanue</th>
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
            </tr>
          </thead>
            {clickDataLoading ? 
           <SpinerLoading /> : 
            <tbody>
              {clickData ? clickData?.map((click, index) => (
                <tr key={click.id}>
                  <td>{click._id}</td>
                  <td>{click.clickTime}</td>
                  <td>{click.clickId}</td>
                  <td>{`(ID: ${click.offerId}) ${click.title}`}</td>
                  <td>(ID: {click.affiliateId}) {click.publisher_First_name} {click.publisher_Last_name}</td>
                  <td>{click.ipAddress}</td>
                  <td>{click.Payout}</td>
                  <td>{click.revenue}</td>
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
    </Sidebar>
    </div>
  );
};
export default StaticTable;
