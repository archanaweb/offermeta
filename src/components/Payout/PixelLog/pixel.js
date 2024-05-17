import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./pixel.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import BASE_URL from "../../../Api/base";
import Ctabs from "../../Ctabs";
import PageTitle from "../../PageTitle";
import { Pagination } from "react-bootstrap";
import TablePagination from "../../Pagination";
import { fetchOfferList } from "../../../Redux/OffersSlice";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { useDispatch, useSelector } from "react-redux";
import { conversionFilterByAdvertiser, conversionFilterByManager, conversionFilterByOffer, conversionFilterByPublisher } from "../../../Redux/ConversionFilterSlice";
import { toast } from "react-toastify";
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
  const filterByOfferList =  useSelector((state)=> state.conversionFilter.list)
  const loggedUser = JSON.parse(localStorage.getItem('userData'))
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formDate, setFormDate] = useState({})
  const dispatch = useDispatch()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getCurrentPage = params.get('page')
  const [convListUrl, setConvListUrl] = useState(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}`)
  // const convDateListUrl = `conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}`

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);

  useEffect(() => {
    fetchData();
    dispatch(fetchOfferList(loggedIn._id))
    dispatch(fetchPublisherList(loggedIn._id))
    dispatch(fetchAdvertiserList(loggedIn._id))
    dispatch(fetchManagerList(loggedIn._id))
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + convListUrl);
      console.log(response)
      const data = response.data.responseResult; // Access the responseResult property
      setClickData(data);
      setTotalPage(response.data.totalPages)
      toast.success(response.data.responseMessage)
      console.log("pixel data",data);
    } catch (error) {
      console.error('Error fetching click data:', error);
      // toast.error(response.data.responseMessage)
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
  useEffect(()=>{
    dispatch(conversionFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
  },[filterOfferId])
  useEffect(()=>{
    dispatch(conversionFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
  },[filterPubId])
  useEffect(()=>{
    dispatch(conversionFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
  },[filterAdvId])
  useEffect(()=>{
    dispatch(conversionFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
  },[filterManagerId])
  useEffect(()=> {
    setClickData(filterByOfferList)
  },[filterByOfferList])

  useEffect(()=> {
    fetchData()
  },[getCurrentPage])

  // Calculate the indexes of the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clickData?.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
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
    setConvListUrl(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`)
  }
  useEffect(()=> {
    fetchData();
  },[convListUrl])
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
          <div className="container">
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
              <th>ID</th>
              <th>Date</th>
              <th>Advertiser</th>
              <th>offer</th>
              <th>Event Value</th>
              <th>Result</th>
              <th>Postback Url</th>
            </tr>
          </thead>
          {Array.isArray(clickData) ? (
            <tbody>
                 {clickData
                .map((click, index) => (
                  <tr key={click._id}>
                    <td>{click._id}</td>
                    <td>{click.conversionTime}</td>
                    <td>(ID: {click.advertiserId}) {click?.advertiser_First_name} {click?.advertiser_Last_name}</td>
                    <td>(ID: {click.offerId}) {click.title}</td>
                    <td>{click.eventValue}</td>
                    <td>{click.result}</td>
                    <td>{click.postbackUrl}</td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div>No click data available.</div>
            )}
          </table>
          </div>
          <TablePagination totalPage={totalPage} path='/conversion/pixel_logs' />        
          </div>
        </div>
      </Sidebar>
    </div>
  );

};
export default StaticTable;
