import React, {useEffect, useMemo, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateLanding } from "../../../Redux/LangingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../../../Redux/CountryListSlice";
import MacrosListModal from "../../MacrosListModal";
import OfferMacrosListModal from "../../OfferMacroList";
import countryList from "react-select-country-list";

const UpdateLanding = ()=>{
    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");
    const [modalShow, setModalShow] = useState(false)
    const {id} = useParams();
    const navigate = useNavigate()
    const options = useMemo(() => countryList().getValues(), [])

    const [formData, setFormData] = useState({});
    const landingList = useSelector((state)=> state.landing.list);
    const landingDetail = landingList.find((item)=> `${item.landingPageId}` === id)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const apiCountryList = useSelector((state)=> state.country.list)
    const dispatch = useDispatch();

    useEffect(()=>{
        setFormData({ ...formData, trackingUrl : landingDetail?.trackingUrl, titleName: landingDetail?.titleName, geoAllowed: landingDetail?.geoAllowed,partners_Id: LoggedInUser?._id, offerId});
    },[landingList])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('formdata',formData)
        const landingEditResponse = await dispatch(updateLanding({
            landingPageId: id,
            formData
        }));
        const res = landingEditResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                navigate(`/landingPages?offerid=${offerId}`)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
        useEffect(()=>{
          dispatch(fetchCountryList())
        },[])   
    return (
        <>
                <div className='page_sec pt-3'>
                    <div className="signup-container">
          <h2 className="mb-4">Edit Landing Page</h2>
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group col-lg-12">
              <label htmlFor="trackingUrl">Tracking Url </label>
              <textarea className="form-control w-100"
                type="text"
                id="trackingUrl"
                name="trackingUrl"
                value={formData.trackingUrl}
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
              <label htmlFor="titleName">Title </label>
              <input className="form-control w-100"
                type="text"
                id="titleName"
                name="titleName"
                value={formData.titleName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="geoAllowed">Geo Allowed </label>
              <select className="form-control"
              id="geoAllowed"
              name="geoAllowed"
              value={formData.geoAllowed}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                {apiCountryList.map((item)=> <option key={item.phonecod}>{item.name}</option>)}
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="country_code">Country code </label>
              <select className="form-control"
              id="country_code"
              name="country_code"
              value={formData?.country_code}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                {options.map((item)=> <option key={item}>{item}</option>)}
              </select>
            </div>
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
                </div>
        </>
    )
}

export default UpdateLanding