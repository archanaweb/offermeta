import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../../Redux/OffersSlice";
import { updateOffer } from "../../../../Redux/OffersSlice";
import { toast } from "react-toastify";
import TrackingUrl from "./TrackingUrl";
import ImpressionUrl from "./ImpressionUrl";
import { fetchAdvertiserList } from "../../../../Redux/AdvertiserSlice";

const PublisherApprovedOfferDetails = ()=> {

    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData]  = useState({})
    const dispatch =  useDispatch()

    const offerDetail = useSelector((state)=> state.offers.detail);
    const advertiser = useSelector((state)=> state.advertiser.list);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const [isPopupOpen, setPopupOpen] = useState(false);

    useEffect(()=> {
        setFormData({vertical:offerDetail?.vertical,traffic: offerDetail?.traffic,operatingSystem: offerDetail?.operatingSystem, incentive: offerDetail?.incentive,...formData})
    },[offerDetail])

    useEffect(()=> {
        dispatch(fetchOfferDetail(id))
    },[])
    useEffect(()=>{
        dispatch(fetchAdvertiserList(loggedInUser._id))
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
        console.log("update formData",formData)
        const updateOfferResponse = await dispatch(updateOffer({
            offerId: id,
            formData
        }));;
        const res = updateOfferResponse.payload;
        console.log("hello offer",res)
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
    }
    return (
        <>
            <div className='page_sec pt-3'>
                    <div className="container-fluid">
                        <div className="row mt-4">
                            <div className="col-lg-6">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                            <h4>{offerDetail?.title}</h4>
                                            <button className="btn btn-success btn-sm" type="button">Approved</button>
                                        </div>
                            
                                    </div>
                                    <div className="offersDataItem">
                                        <p>ID:</p>
                                        {!isEditable ?
                                            <span>{offerDetail?._id}</span>
                                            :
                                            <input className="form-control" type="text" name="title" value={formData?.title} onChange={(e)=>handleInput(e)} />
                                        }
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
                                        <p>Description:</p>
                                        {!isEditable ?
                                            <span>{offerDetail?.Description}</span>
                                            :
                                            <input className="form-control" type="text" name="Description" value={formData?.Description} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    
                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                        <div>
                                        {!isEditable ?
                                        <span className={offerDetail?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{offerDetail?.status}</span>
                                            :
                                            <select className="form-control" name="status" onChange={(e)=>handleInput(e)}>
                                            <option value="none" hidden>Select</option>
                                            <option>Active</option>
                                            <option>Inactive</option>
                                        </select>  
                                        }
                                        </div>
                                    </div>
                                </div>
                                </form>
                                <div className="offersData mt-4">
                                <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                            <h3>Event Value</h3>
                                </div>

                                <div className="table-responsive">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Event Value</th>
                                                <th>Type</th>
                                                <th>Payout</th>
                                                <th>Id</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {offerDetail?.event.map((item)=>  <tr>
                                                <td>{item?.eventValue}</td>
                                                <td>{item?.eventType}</td>
                                                <td>{item?.payout}</td>
                                                <td>{item?._id}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </div>
                            <div className="col-lg-6">
                                <TrackingUrl offerId={id} offerDetail={offerDetail} />
                                <ImpressionUrl offerId={id} offerDetail={offerDetail} />
                                <div className="mt-4"></div>
                            </div>
                        </div>
                    </div>
            </div>
        </>
    )
}
export default PublisherApprovedOfferDetails