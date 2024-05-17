import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import { useLocation } from "react-router-dom";
import Ctabs from "../../components/Ctabs";
import TablePagination from "../../components/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import { conversionFilterByAdvertiser, conversionFilterByManager, conversionFilterByOffer, conversionFilterByPublisher } from "../../Redux/ConversionFilterSlice";
import BASE_URL from "../../Api/base";
import { Spinner } from "react-bootstrap";

const PixelLog = () => {
  const mountedRef = useRef()
  const [selectValue, setSelectValue] = useState("");
  const [totalPage, setTotalPage] = useState(1);
  const [pixelLoading, setPixelLoading] = useState(true);
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
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formDate, setFormDate] = useState({})
  const dispatch = useDispatch()
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const getCurrentPage = params.get('page')

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const [clickData, setClickData] = useState([]);

  const fetchData = async (apiEndpoint) => {
    setPixelLoading(true)
    try {
      const response = await axios.get(BASE_URL + apiEndpoint);
      const data = response.data.responseResult; 
      setClickData(data);
      setTotalPage(response.data.totalPages)
      setPixelLoading(false)
      // toast.success(response.data.responseMessage)
    } catch (error) {
      console.error('Error fetching click data:', error);
      setPixelLoading(false)
      // toast.error('Something went wrong')
    }
  };

  async function fetchPixelApis() {
    await fetchData(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}`);
    await dispatch(fetchOfferList(loggedIn._id))
    await dispatch(fetchPublisherList(loggedIn._id))
    await dispatch(fetchAdvertiserList(loggedIn._id))
    await dispatch(fetchManagerList(loggedIn._id))
  }

  useEffect(() => {
    fetchPixelApis()
  }, []);

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
    dispatch(conversionFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
    }
  },[filterOfferId])
  useEffect(()=>{
     if(mountedRef.current){
    dispatch(conversionFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
     }
  },[filterPubId])
  useEffect(()=>{
     if(mountedRef.current){
    dispatch(conversionFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
     }
  },[filterAdvId])
  useEffect(()=>{
     if(mountedRef.current){
    dispatch(conversionFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
     }
  },[filterManagerId])
  useEffect(()=> {
    setClickData(filterByOfferList)
  },[filterByOfferList])

  useEffect(()=> {
    {formDate.startDate ? fetchData(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`): fetchData(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}`)}
  },[getCurrentPage])

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
    fetchData(`conversion/postbackLogs?partners_Id=${loggedUser._id}&page=${getCurrentPage}&startDate=${formDate?.startDate}&endDate=${formDate?.endDate}`);
  }
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
                <th>Offer</th>
                <th>Publisher</th>
                <th>Event Value</th>
                <th>Result</th>
                <th>Postback Url</th>
                </tr>
            </thead>
               {pixelLoading ? <tbody>
                <tr>
                    <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
               </tbody>  : 
               <tbody>
                    {clickData ? clickData
                    .map((click, index) => (
                    <tr key={click.conversionId}>
                        <td>{click.conversionId}</td>
                        <td>{click.conversionTime}</td>
                        <td>(ID: {click.advertiserId}) {click?.advertiser_First_name} {click?.advertiser_Last_name}</td>
                        <td>(ID: {click.offerId}) {click.title}</td>
                        <td>(ID: {click.publisherId}) {click.publisher_First_name} {click.publisher_Last_name}</td>
                        <td>{click.eventValue}</td>
                        <td>{click.result}</td>
                        <td>{click.postbackUrl}</td>
                    </tr>
                    )) : <tr>
                    <td colSpan={4}>Data not found</td>
                </tr>}
                </tbody>}
            </table>
            </div>
            <TablePagination totalPage={totalPage} path='/conversion/pixel_logs' />        
            </div>
          </div>
        </div>
    );

};
export default PixelLog;
