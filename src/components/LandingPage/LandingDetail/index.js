import React, { useEffect, useState } from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../Redux/OffersSlice";
import { updateOffer } from "../../../Redux/OffersSlice";
import { toast } from "react-toastify";
import LandingPage from "./LandingPage";

const OfferDetails = ()=> {

    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData]  = useState({})
    const dispatch =  useDispatch()

    const offerDetail = useSelector((state)=> state.offers.detail);

    useEffect(()=> {
        setFormData({...formData, ...offerDetail})
    },[offerDetail])

    useEffect(()=> {
        dispatch(fetchOfferDetail(id))
    },[])

    const handleInput= (e)=> {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});    
    }
    const handleSubmit = async (e)=> {
        e.preventDefault()
        const updateOfferResponse = await dispatch(updateOffer({
            offerId: id,
            formData
        }));;
        const res = updateOfferResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
    }
    return (
        <>
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div className='page_sec'>
                        <PageTitle/>
                        <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h3>offerDetail</h3>
                                        {isEditable ? 
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                        </div> : 
                                            <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Name:</p>
                                        {!isEditable ?
                                            <span>{offerDetail?.title}</span>
                                            :
                                            <input className="form-control" type="text" name="title" value={formData?.title} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Category:</p>
                                        {!isEditable ?
                                           <span>{offerDetail?.category}</span>
                                            :
                                            <input className="form-control" type="text" name="category" value={formData?.category} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>First Name:</p>
                                         {!isEditable ?
                                           <span>{offerDetail?.advertiserFirstName}</span>
                                            :
                                            <input className="form-control" type="text" name="advertiserFirstName" value={formData?.advertiserFirstName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Last Name:</p>
                                         {!isEditable ?
                                           <span>{offerDetail?.advertiserLastName}</span>
                                            :
                                            <input className="form-control" type="text" name="advertiserLastName" value={formData?.advertiserLastName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                        {!isEditable ?
                                            <span>{offerDetail?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="title" value={formData?.title} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    {/* <div className="offersDataItem">
                                        <p>Contact No:</p>
                                         {!isEditable ?
                                           <span>{offerDetail?.mobileNumber}</span>
                                            :
                                            <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Country:</p>
                                         {!isEditable ?
                                           <span>{offerDetail?.country}</span>
                                            :
                                            <input className="form-control" type="text" name="country" value={formData?.country} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div> */}
                                   
                                </div>
                            </div>
                            <LandingPage />
                        </div>
                    </form>

                    <div className="container mt-4 ">
                        <div className="row">
                            <div className="col-lg-6">
                            <div className="offersData">
                                <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                            <h3>Revenue & Event</h3>
                                                <button className="btn btn-outline-secondary btn-sm" >Manage</button> 
                                </div>

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Id</th>
                                                <th>Value</th>
                                                <th>Type</th>
                                                <th>Revenue</th>
                                                <th>Payout</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{offerDetail?.event[0].eventId}</td>
                                                <td>{offerDetail?.eventValue}</td>
                                                <td>{offerDetail?.event[0].eventType}</td>
                                                <td>{offerDetail?.event[0].revenue}</td>
                                                <td>{offerDetail?.event[0].payout}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
        </>
    )
}
export default OfferDetails