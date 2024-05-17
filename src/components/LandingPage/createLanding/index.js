import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { addLandingPage } from "../../../Redux/LangingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import MacrosListModal from "../../MacrosListModal";
import OfferMacrosListModal from "../../OfferMacroList";
import countryList from "react-select-country-list";

const CreateLandingPage = () => {
    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");
    const options = useMemo(() => countryList().getValues(), [])

    const navigate = useNavigate();
    const landing = useSelector((state)=> state.landing)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const [modalShow, setModalShow] = useState(false)
    const subAdminId = LoggedInUser._id


    const dispatch = useDispatch()

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, partners_Id: LoggedInUser._id });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("subAdminId",subAdminId)
        const landingResponse = await dispatch(addLandingPage({
          offerId :offerId,
            formData}));
        const res = landingResponse.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          navigate(`/landingPages?offerid=${offerId}`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(landingResponse)
      };

    return (
                <div className='page_sec pt-3'>
                    <div className="signup-container">
          <h2 className="mb-4"> Create Landing Page</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group col-lg-12">
              <label htmlFor="titleName">Title</label>
              <textarea className="form-control"
                type="text"
                id="titleName"
                name="titleName"
                value={formData.titleName}
                onChange={handleChange}
                required
              />
            </div>
            <button className='button btnModal' type='button' variant="primary" onClick={() => setModalShow(true)}>Advertiser Macros & Parameters</button>
                <OfferMacrosListModal
                  show={modalShow}
                  onHide={() => setModalShow(false)}
              />
              <div className="row">
                <div className="form-group col-lg-6">
                <label htmlFor="trackingUrl">Tracking Url </label>
                <input className="form-control w-100"
                  type="text"
                  id="trackingUrl"
                  name="trackingUrl"
                  value={formData.trackingUrl}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-lg-6">
                <label htmlFor="geoAllowed"> GeoAllowed </label>
                <input className="form-control w-100"
                  type="text"
                  id="geoAllowed"
                  name="geoAllowed"
                  value={formData.geoAllowed}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group col-lg-6">
                                <label htmlFor="geoAllowed">Country code</label>
                                <select 
                                    className="form-control" 
                                    name="country_code" 
                                    onChange={handleChange}>
                                    <option value='' hidden>Select</option>
                                    {options.map((item)=> <option>{item}</option>)}
                                    </select>
                            </div>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
                </div>
    );
};

export default CreateLandingPage;