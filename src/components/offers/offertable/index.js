import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./offertable.css";
import "../../../index.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useAsyncError, useLocation } from "react-router-dom";
import OfferDetails from "./offerDetails";
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from "../../../Api/base";
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { toast } from "react-toastify";
import { deleteOffer, fetchOfferList, fetchOfferSearchList, offerActive, offerInactive } from "../../../Redux/OffersSlice";
import { fetchPostBackList } from "../../../Redux/PostBackSlice";
import { Pagination } from "react-bootstrap";

const StaticTable = () => {
  const { state } = useLocation(); // state.id should have your id
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOfferId, setSelectedOfferId] = useState(null);
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

  const offers = useSelector((state)=> state.offers.list);
  const [offerList, setOfferList] =  useState(offers)
  const offerListBySearch = useSelector((state)=> state.offers.updatedList)  // const offerData = offers
  const dispatch = useDispatch()
  const navigate = useNavigate();
  useEffect(()=> {
    dispatch(fetchOfferList(LoggedInUser._id));
  },[])

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);

  const handleSelectOffer = (editedOfferData) => {
    const editedOfferIndex = clickData.findIndex((offer) => offer._id === editedOfferData._id);
    if (editedOfferIndex !== -1) {
      const updatedClickData = [...clickData];
      updatedClickData[editedOfferIndex] = editedOfferData;
      setClickData(updatedClickData);
      // setTableData(updatedTableData);
      setSelectedOfferId(null);
    }
  };

  const deleteItem = async (offer)=>{
    if(!window.confirm("Are you want to delete?")){
      return;
    }
    const deleteResponse = await dispatch(deleteOffer({
      subAdminId: LoggedInUser._id,
      id: offer._id
    }));
      const res = deleteResponse.payload;
      if(res?.responseCode === 200){
        dispatch(fetchOfferList(LoggedInUser._id));
        toast.success(res?.responseMessage)
      }else{
        toast.error(res?.responseMessage);
      }
  }

  const handleStatus = async(offer)=>{
    console.log("oferId",offer._id)
    const offerStatus = offer?.status
    if(offerStatus === "INACTIVE"){
      const offerActiveResponse = await dispatch(offerActive({
        partners_Id: LoggedInUser._id,
        offerId: offer._id
      }));
      const res = offerActiveResponse.payload;
      if(res?.responseMessage === "offer ACTIVE successfully"){
        dispatch(fetchOfferList(LoggedInUser._id));
        toast.success(res?.responseMessage)
      }else{
        toast.error(res?.responseMessage);
      }
    }
    if(offerStatus === "ACTIVE"){
    const offerInactiveResponse = await dispatch(offerInactive({
      partners_Id: LoggedInUser._id,
      offerId: offer._id
    }));
    const res = offerInactiveResponse.payload;
    console.log("status res",res)
    if(res?.responseMessage === "offer INACTIVE successfully"){
      dispatch(fetchOfferList(LoggedInUser._id));
      toast.success(res?.responseMessage)
    }else{
      toast.error(res?.responseMessage);
    }
  }
  }

  const handleOfferClick = (offerId) => {
    navigate(`/viewdata2/${offerId}`);
  };
  useEffect(() => {
    dispatch(fetchOfferSearchList({partners_Id: LoggedInUser._id, searchInputValue : searchInput}))
  }, [searchInput]); 
  useEffect(() => {
    console.log('offerListBySearch',offerListBySearch)
    setOfferList(offerListBySearch)
  }, [offerListBySearch]); 

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle/>
          <div className='container_table'>
            <div className="table-container">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
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
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="">Status</option>
                      <option value="option2">Select Option 2</option>
                      <option value="option3">Select Option 3</option>
                      <option value="option4">Select Option 4</option>
                      <option value="option5">Select Option 5</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="">Advertiser</option>
                      <option value="option2">Select Option 2</option>
                      <option value="option3">Select Option 3</option>
                      <option value="option4">Select Option 4</option>
                      <option value="option5">Select Option 5</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="">Availability</option>
                      <option value="option2">Select Option 2</option>
                      <option value="option3">Select Option 3</option>
                      <option value="option4">Select Option 4</option>
                      <option value="option5">Select Option 5</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="">Country</option>
                      <option value="option2">Select Option 2</option>
                      <option value="option3">Select Option 3</option>
                      <option value="option4">Select Option 4</option>
                      <option value="option5">Select Option 5</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="">Event Type</option>
                      <option value="option2">Select Option 2</option>
                      <option value="option3">Select Option 3</option>
                      <option value="option4">Select Option 4</option>
                      <option value="option5">Select Option 5</option>
                    </select>
                  </div>
                  <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                   <button className="btn btn-primary"><Link to='/request_offerList'>Request Offer</Link></button>
                  </div>
                </div>
                <div className="row mt-4">
                  <div className="col-12">
                    <div className="search-bar1"></div>
                  </div>
                  <div className="col-12">
                    <div className="search-bar1"></div>
                  </div>
                </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>THUMBNAIL</th>
                    <th>NAME</th>
                    <th>STATUS</th>
                    <th>OBJECTIVE</th>
                    <th>CATEGORY</th>
                    <th>package Name</th>
                    <th>PAYOUT</th>
                    <th>REVENUE</th>
                    <th>VISIBILITY</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {offerList ? offerList.map((click) => (
                      <tr key={click.id}>
                        <td>{click._id}</td>
                        <td>
                          {click.image && <img src={click.image} alt={click.title} style={{ width: "50px"}} />}
                        </td>
                        <td>
                          <Link to={`/offer/${click._id}`}>{click.title}</Link>
                        </td>
                        <td onClick={()=> handleStatus(click)}><span className={click?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{click?.status}</span></td>
                        <td>{click.event[0]?.eventType}</td>
                        <td>{click.category}</td>
                        <td>{click.packageName}</td>
                        <td>{click.event[0]?.payout}</td>
                        <td>{click.event[0].revenue}</td>
                        <td><button className={click?.privacyLavel === "Required Aprooval" ? 'btn btn-danger btn-sm' : 'btn btn-success btn-sm'}>{click?.privacyLavel}</button></td>
                        <td>
                          <DropdownButton className="noCarat"
                            key="start"
                            id={`dropdown-button-drop-start`}
                            drop=""
                            variant="secondary"
                            title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                          >
                          <Dropdown.Item eventKey="1"><i class="fa-regular fa-pen-to-square"></i> <Link to={`/offer/${click._id}?edit=1`}> Edit</Link></Dropdown.Item>
                          <Dropdown.Item eventKey="2" onClick={()=> deleteItem(click)}><i class="fa-solid fa-trash"></i> Delete</Dropdown.Item>
                          </DropdownButton>
                          </td>
                      </tr>
                    )) : <tr><td colSpan={4}>No data found</td></tr>}
                </tbody>
              </table>
              </div>
              {/* Pagination */}
              <Pagination className="pagination">
                {offers?.list?.length > itemsPerPage && (
                  <>
                    <Pagination.Prev
                      onClick={() => paginate(currentPage - 1)}
                      disabled={currentPage === 1}
                    />
                  </>
                )}

                {/* Display page numbers */}
                {offers?.list?.length > itemsPerPage &&
                  Array.from({ length: Math.ceil(offers?.list?.length / itemsPerPage) }).map((_, index) => (
                    <Pagination.Item
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={currentPage === index + 1 ? "active" : ""}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}

                {offers?.list?.length > itemsPerPage && (
                  <>
                    <Pagination.Next
                      onClick={() => paginate(currentPage + 1)}
                      disabled={currentPage === Math.ceil(offers?.list.length / itemsPerPage)}
                    />
                  </>
                )}
              </Pagination>
              {/* <OfferDetails offerId={selectedOfferId} onSelectOffer={handleSelectOffer} /> */}
            </div>
            {selectedOfferId && (
              <OfferDetails
                offerId={selectedOfferId}
                onSelectOffer={handleSelectOffer} // Pass the callback function to the show and edit page
              />
            )}
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default StaticTable;
