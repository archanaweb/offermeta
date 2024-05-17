import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPageList } from "../../../Redux/LangingPageSlice";
import { fetchOfferDetail } from "../../../Redux/OffersSlice";
import PublisherSidebar from "../Dashboard/Sidebar";
import PublisherNavbar from "../Dashboard/Navbar";

const PublisherLandingPageList = () => {
  let params = new URLSearchParams(document.location.search);
  let offerId = params.get("offerid");

  const landing = useSelector((state)=> state.landing.list);
  const offerDetail = useSelector((state)=> state.offers.detail);
  const dispatch =  useDispatch()
  const publisherUser = JSON.parse(localStorage.getItem('userData'));
  const subAdminId = publisherUser.subAdminId

  useEffect(() => {
    console.log("landingofferId>>>",offerId)
    console.log("userid>>>",subAdminId)
    dispatch(fetchOfferDetail(offerId))
    dispatch(fetchLandingPageList({subAdminId,offerId}))
  },[]);

  useEffect(() => {
    console.log("landing list",landing)
  },[landing]);
  useEffect(() => {
    console.log("offer details",offerDetail)
  },[offerDetail]);

  return (
    <div className='Container_card'>
     <PublisherSidebar>
      <PublisherNavbar />
        <div className='page_sec'>
        {  offerId ?
        <div className="table-container">
            <h3>{offerDetail?.title}archana</h3>

            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                <input className="form-control"
                  type="text"
                  placeholder="Search..."
                />
                <Link to={`../landingPages/add?offerid=${offerId}`} className="btn btn-secondary"><i className="fa-solid fa-plus me-2"></i>Add Landing Page</Link>
              </div>
          </div>
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {landing?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item?.title || offerDetail?.eventValue}</td>
                    <td>{item?.trackingUrl}</td>
                    <td>
                      <Link to={`../landingPages/edit/${item.landingPageId}?offerid=${offerId}`}>Edit</Link>
                      </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          </div> :
          <div>Offer Not Found.</div>
          }
        </div>
      </PublisherSidebar>
    </div>
  );
};
export default PublisherLandingPageList;