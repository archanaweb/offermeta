import React, { useState, useEffect } from "react";
import './publishercc.css';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../Sidebar';
import Navbar from '../../navbar';
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPostback } from "../../../Redux/PostBackSlice";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import { fetchEventValue, fetchOfferList } from "../../../Redux/OffersSlice";
import { fetchEventList } from "../../../Redux/EventValueSlice";

const Addpostback = () => {
  const dispatch = useDispatch()
  const postback = useSelector((state)=> state.postback);
  const publisherList = useSelector((state)=> state.publisher.list)
  const offerList = useSelector((state)=> state.offers?.list)
  const eventList = useSelector((state)=> state.eventvalue?.list)

  const loggedIn = JSON.parse(localStorage.getItem('userData'))
  const subAdminId = loggedIn._id
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postbackResponse = await dispatch(addPostback({...formData,userType: loggedIn.userType}));
    console.log(postbackResponse)
    const res = postbackResponse.payload;
    if(res.responseCode === 200){
      toast.success(res.resposneMessage)
      navigate('/postback')
    }else{
      toast.error(res.resposneMessage);
    }
    console.log(postbackResponse)
  };

  useEffect(()=>{
    dispatch(fetchPublisherList(subAdminId))
    dispatch(fetchOfferList(subAdminId))
    
  },[])
  useEffect(()=> {
    dispatch(fetchEventValue(formData.offerId))
    dispatch(fetchEventList({partners_Id:subAdminId, offerId:formData.offerId}))
},[formData.offerId])

  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
        <div className="signup-container">
          <h2 className="mb-4">Postback Create</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
              <label htmlFor="publisherId">Publisher Id</label>
              <select className="form-control" 
              name="publisherId"
              value={formData.publisherId}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                {publisherList?.map((item)=> <option value={item._id}>(ID: {item._id}) {item.firstName} {item.lastName}</option>)}
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="level">Level</label>
              <select className="form-control" 
              name="level"
              value={formData.level}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                <option>Global</option>
                <option>Offer</option>
              </select>
            </div>
            {formData.level === 'Offer' && <div className="form-group col-lg-6">
              <label htmlFor="offerId">Offer Id</label>
              <select className="form-control" 
              name="offerId"
              value={formData.offerId}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                {eventList?.map((item)=> <option value={item._id}>(ID: {item._id}) {item.title}</option>)}
              </select>
            </div>}   
            
            <div className="form-group col-lg-6">
              <label htmlFor="type">Type</label>
              <select className="form-control" 
              name="type"
              value={formData.type}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                <option>Postback Url</option>
                <option>HTML Pixel</option>
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="status">Status</label>
              <select className="form-control" 
              name="status"
              value={formData.status}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="form-group col-lg-12">
              <label htmlFor="postback">Postback</label>
              <textarea className="form-control"
                id="postback"
                name="postback"
                value={formData.postback}
                onChange={handleChange}
                required
              />
            </div>
  
           {formData.level === 'Offer' &&  <div className="form-group col-lg-6">
              <label htmlFor="event_value">Event Value</label>
               <select className="form-control" 
              name="event_value"
              value={formData.event_value}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                {offerEvent?.map((item,i)=> <option key={i}>{item}</option>)}
              </select>
            </div>}
            <div className="form-group col-lg-6">
              <label htmlFor="conversionStatus">Conversion Status</label>
              <select className="form-control" 
               name="conversionStatus"
               value={formData.conversionStatus}
               onChange={handleChange}>
                <option value='' hidden>Select</option>
                <option>ACTIVE</option>
                <option>INACTIVE</option>
              </select>
          </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Addpostback;












