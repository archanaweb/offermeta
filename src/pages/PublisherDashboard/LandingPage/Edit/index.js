import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateLanding } from "../../../../Redux/LangingPageSlice";
import { useDispatch, useSelector } from "react-redux";
import PublisherSidebar from "../../Dashboard/Sidebar";
import PublisherNavbar from "../../Dashboard/Navbar";

const UpdatePublisherLanding = ()=>{

    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");
    const {id} = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});
    const landingList = useSelector((state)=> state.landing.list);
    const landingDetail = landingList.find((item)=> `${item.landingPageId}` === id)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const subAdminId = LoggedInUser.subAdminId
    const dispatch = useDispatch();

    useEffect(()=>{
        setFormData({ ...formData, trackingUrl : landingDetail.trackingUrl});
    },[landingList])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const landingEditResponse = await dispatch(updateLanding({
            subAdminId,
            offerId,
            landingPageId: id,
            formData
        }));
        const res = landingEditResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                navigate(`../landingPages?offerid=${offerId}`)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
    return (
        <>
        <div className='Container_card'>
         <PublisherSidebar>
         <PublisherNavbar />
                <div className='page_sec'>
                    <div className="signup-container">
          <h2 className="mb-4">Edit Landing Page</h2>
          <form onSubmit={handleSubmit} className="form row">
            
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

            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
                </div>
            </PublisherSidebar>
        </div>
        </>
    )
}

export default UpdatePublisherLanding