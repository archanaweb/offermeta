import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import "./table.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import BASE_URL from "../../../Api/base";
import Ctabs from "../../Ctabs";
import PageTitle from "../../PageTitle";
import TablePagination from "../../Pagination";
import { click } from "@testing-library/user-event/dist/click";
import { toast } from "react-toastify";
import { fetchOfferList } from "../../../Redux/OffersSlice";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import { fetchSentlogSearchList, sentLogsFilterByAdvertiser, sentLogsFilterByManager, sentLogsFilterByOffer, sentLogsFilterByPublisher } from "../../../Redux/SentlogFilterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const StaticTable = () => {
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
  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  }
  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `sentLogs/sentLogList?partners_Id=${loggedIn._id}&page=${getCurrentPage}`);
      const data = response.data.responseResult;
      setClickData(data);
      setTotalPage(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching click data:', error);
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
  
  const handleReset = ()=> {
    fetchData();
    toast.success('Data has been reset')
  }
  useEffect(() => {
    if(searchInput.length > 0){
      dispatch(fetchSentlogSearchList({partners_Id: loggedIn._id, searchInputValue : searchInput}))
    }else{
      fetchData()
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
    fetchData()
  },[getCurrentPage])


  useEffect(() => {
    fetchData()
    dispatch(fetchOfferList(loggedIn._id))
    dispatch(fetchPublisherList(loggedIn._id))
    dispatch(fetchAdvertiserList(loggedIn._id))
    dispatch(fetchManagerList(loggedIn._id))
  }, []);


  // Calculate the indexes of the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clickData?.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
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
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <input className="form-control"
                    type="text"
                    placeholder="Search..."
                    value={searchInput}
                    onChange={handleSearchInputChange}
                  />
                  <a href="add_offers" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create Offers</a>
                </div>
              
              </div>
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
            <tbody>
              {clickData ? clickData
              .map((click, index) => (
                <tr key={click._id}>
                  <td>{click._id}</td>
                  {/* <td>{click._id}</td> */}
                  <td>{click.sentLogTime}</td>
                  <td>(ID: {click.publisherId}) {click.publisherFirstName} {click.publisherLastName}</td>
                  <td>(ID: {click.offer}) {click.offerName}</td>
                  <td>{click.event_value}</td>
                  <td>{click.result}</td>
                  <td>{click.responseMessage}</td>
                  <td>{click.postbackUrl}</td>
                </tr>
              )) : <tr>
              <td colSpan={4}>Data not found</td></tr>}
            </tbody>
          </table>
          </div>
            <TablePagination totalPage={totalPage} path={`/conversion/sentlogs`}/>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};
export default StaticTable;
