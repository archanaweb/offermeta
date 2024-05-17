import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPostback } from "../../../../Redux/PostBackSlice";
import { fetchEventValue, fetchOfferList } from "../../../../Redux/OffersSlice";

const PublisherPostbackAdd = ()=>{

const dispatch = useDispatch()
const adminUser = JSON.parse(localStorage.getItem('userData'));
const adminPartner = adminUser.partners_Id
const offers = useSelector((state)=> state.offers.list)
const postback = useSelector((state)=> state.postback);
const offerEvent = useSelector((state)=> state.offers?.eventValueList)
const publisherUser =  JSON.parse(localStorage.getItem('userData'))
console.log("offerList",offers)

  useEffect(()=>{
    dispatch(fetchOfferList({partners_Id:publisherUser.partners_Id,currentPage: 1}))
},[])

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, publisherId: adminUser.publisherId, userType: adminUser.userType});
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const postbackResponse = await dispatch(addPostback({ partners_Id:adminPartner, formData} ));
        console.log(postbackResponse)
        const res = postbackResponse.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
        //   navigate('/postback')
        }else{
          toast.error(res.responseMessage);
        }
        console.log(postbackResponse)
      };

      useEffect(()=> {
        dispatch(fetchEventValue(formData.offerId))
    },[formData.offerId])
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="signup-container mt-4">
                <h2 className="mb-4">Postback Createe</h2>
                <form onSubmit={handleSubmit} className="form row">
    {/* <div className="form-group col-lg-6">
      <label htmlFor="publisherId">Publisher Id</label>
      <p>{publisherUser._id}</p>
    </div> */}
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
        {offers?.map((item)=> <option value={item.offerId}>(ID: {item.offerId}) {item.title}</option>)}
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
    {/* <div className="form-group col-lg-6">
      <label htmlFor="status">Status</label>
      <select className="form-control" 
      name="status"
      value={formData.status}
      onChange={handleChange}>
        <option value='' hidden>Select</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div> */}
    <div className="form-group col-lg-12">
      <label htmlFor="postback">Postback</label>
      <textarea className="form-control"
        type="text"
        id="postback"
        name="postback"
        value={formData.postback}
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group col-lg-12">
      <p>Available Token:</p>
      <div className="postback-macros">
        <span>{`{aff_click_id}`}</span> <span>{`{source}`}</span> 
        <span>{`{gaid}`}</span> <span>{`{idfa}`}</span><span>{`{offer_id}`}</span>
        <span>{`{p1}`}</span><span>{`{p2}`}</span><span>{`{p3}`}</span><span>{`{p4}`}</span>
        <span>{`{p5}`}</span><span>{`{sub_id1}`}</span><span>{`{sub_id2}`}</span><span>{`{sub_id3}`}</span>
        <span>{`{sub_id4}`}</span><span>{`{sub_id5}`}</span> <span>{`{event_name}`}</span>
      </div>
      <button className="button">More</button>
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
    {/* <div className="form-group col-lg-6">
      <label htmlFor="conversionStatus">Conversion Status</label>
      <select className="form-control" 
        name="conversionStatus"
        value={formData.conversionStatus}
        onChange={handleChange}>
        <option value='' hidden>Select</option>
        <option>ACTIVE</option>
        <option>INACTIVE</option>
      </select>
  </div> */}
    <button type="submit" className="btn btn-primary">Create</button>
  </form>
                </div>
            </div>
        </>
    )
}

export default PublisherPostbackAdd;