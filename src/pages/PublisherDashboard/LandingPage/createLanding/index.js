import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { addLandingPage } from "../../../../Redux/LangingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import PublisherSidebar from "../../Dashboard/Sidebar";
import PublisherNavbar from "../../Dashboard/Navbar";

const CreatePublisherLandingPage = () => {
    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");

    const navigate = useNavigate();
    const landing = useSelector((state)=> state.landing)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const subAdminId = LoggedInUser.subAdminId


    const dispatch = useDispatch()

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("subAdminId",subAdminId)
        const landingResponse = await dispatch(addLandingPage({
          subadminId :subAdminId,
          offerId :offerId,
            formData}));
        const res = landingResponse.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          navigate(`../landingPages?offerid=${offerId}`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(landingResponse)
      };

      useEffect(()=> {
        console.log("landing detail", landing)
    },[landing])

    return (
        <div className='Container_card'>
              <PublisherSidebar>
      <PublisherNavbar />
                <div className='page_sec'>
                    <div className="signup-container">
          <h2 className="mb-4">Postback Create</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
              <label htmlFor="offerId">Offer Id</label>
             <p>{offerId}</p>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="title">Title</label>
              <input className="form-control"
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="eventValue ">Event Value </label>
              <input className="form-control"
                type="text"
                id="eventValue"
                name="eventValue"
                value={formData.eventValue}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="revenue">Revenue </label>
              <input className="form-control"
                type="text"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="payout">Payout</label>
              <input className="form-control"
                type="text"
                id="payout"
                name="payout"
                value={formData.payout}
                onChange={handleChange}
                required
              />
         
            <div className="form-group col-lg-6">
              <label htmlFor="status">Status</label>
              <input className="form-control"
                type="text"
                id="status"   
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              />
            </div>
            </div>
            <div className="form-group col-lg-6">
            <label htmlFor="trackingUrl">Tracking Url </label>
            <input className="form-control"
              type="text"
              id="trackingUrl"
              name="trackingUrl"
              value={formData.trackingUrl}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group col-lg-6">
            <label htmlFor="geoAllowed"> GeoAllowed  </label>
            <input className="form-control"
              type="text"
              id="geoAllowed"
              name="geoAllowed"
              value={formData.geoAllowed}
              onChange={handleChange}
              required
            />
          </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
                </div>
            </PublisherSidebar>
        </div>
    );
};

export default CreatePublisherLandingPage;