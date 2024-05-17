import React, { useState, useEffect } from "react";
import { Link, unstable_HistoryRouter, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchLandingPageList } from "../../Redux/LangingPageSlice";
import { fetchOfferDetail } from "../../Redux/OffersSlice";

const LandingPage = () => {
  let params = new URLSearchParams(document.location.search);
  let offerId = params.get("offerid");

  const landing = useSelector((state)=> state.landing.list);
  const offerDetail = useSelector((state)=> state.offers.detail);
  const dispatch =  useDispatch()
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
  const partnerId = LoggedInUser._id
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(fetchOfferDetail(offerId))
    dispatch(fetchLandingPageList({partnerId,offerId}))
  },[]);

  return (
        <div className='page_sec pt-3'>
          <div className="container">
        {  offerId ?
        <div className="table-container">
            <h3>{offerDetail?.title}</h3>

            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                <input className="form-control"
                  type="text"
                  placeholder="Search..."
                />
                <div className="">
                  <Link className="btn btn-secondary mx-2" onClick={goBack}><i className="fa-solid fa-arrow-left"></i> Go Back</Link>
                  <Link to={`/landingPages/add?offerid=${offerId}`} className="btn btn-primary"><i className="fa-solid fa-plus me-2"></i>Add Landing Page</Link>
                </div>
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
                    <td>{item?.titleName || 'default'}</td>
                    <td>{item?.trackingUrl}</td>
                    <td>
                      <Link to={`/landingPages/edit/${item.landingPageId}?offerid=${offerId}`}>Edit</Link>
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
        </div>
  );
};
export default LandingPage;