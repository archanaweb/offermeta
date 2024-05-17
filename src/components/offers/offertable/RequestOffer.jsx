import React, { useEffect, useState } from "react";
import "../../../index.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import PageTitle from "../../PageTitle";
import { fetchOfferList, requestOffer } from "../../../Redux/OffersSlice";
import { toast } from "react-toastify";

const RequestOffer = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const [offerId, setOfferId] = useState();
    const [publisherId, setPublisherId] = useState();
    const pubList = useSelector((state)=> state.publisher.list)
    const offerList = useSelector((state)=> state.offers.list)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const requestOfferRes = await dispatch(requestOffer({publisherId, offerId, formData, }))
        const res = requestOfferRes.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          navigate(`/offers`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(requestOfferRes)
    }
    useEffect(()=>{
        dispatch(fetchPublisherList(loggedInUser._id))
        dispatch(fetchOfferList(loggedInUser._id))
    },[])
    useEffect(()=>{
        setPublisherId(formData.publisherId)
        setOfferId(formData.offerId)
        console.log('formData?>',formData)
    },[formData])
    return (
        <>
         <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle/>
          <div className='container_table'>
          <h2 className="mb-4">Request Offer</h2>
                    <div className="container signup-container">
                        <form onSubmit={handleSubmit} className="form row">
                            <div className="form-group col-lg-6">
                                <label htmlFor="publisherId">Publisher</label>
                                <select className="form-control w-100"
                                name="publisherId"
                                value={formData.publisherId}
                                onChange={handleChange}>
                                    <option value='' hidden>Select</option>
                                    {pubList?.map((item)=> <option key={item._id} value={item._id}>(ID: {item._id})</option>)}
                                </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="offerId">Offer</label>
                                <select className="form-control w-100"
                                name="offerId"
                                value={formData.offerId}
                                onChange={handleChange}>
                                    <option value='' hidden>Select</option>
                                    {offerList?.map((item)=> <option key={item._id} value={item._id}>(ID: {item._id})</option>)}
                                </select>
                            </div>
                            <div className="form-group col-lg-12">
                                <label htmlFor="question">Question</label>
                                <textarea className="form-control w-100"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>                        </form>
                        </div>
          
          </div>
        </div>
      </Sidebar>
    </div>
        </>
    )
}
export default RequestOffer;