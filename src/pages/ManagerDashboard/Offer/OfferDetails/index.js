import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOfferDetail, updateOffer } from "../../../../Redux/OffersSlice";
import { toast } from "react-toastify";
import TrackingUrl from "./TrackingUrl";import { fetchAdvertiserList } from "../../../../Redux/AdvertiserSlice";
import { fetchPublisherList } from "../../../../Redux/PublisherSlice";
import ManagerSendOffer from "./SendOffer";
import ImpressionUrl from "../../../offers/OfferDetail/ImpressionUrl";
import { fetchManagerPublisherList } from "../../../../Redux/ManagerSlice";
import LinkTestingModal from "../../../../components/LinkTestingModal";

const ManagerOfferDetails = ()=> {

    const [openLinkTesting, setOpenLinkTesting] = useState(false)
    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData]  = useState({})
    const publisherList = useSelector((state)=> state.manager.publisherList)
    const dispatch =  useDispatch()

    const offerDetail = useSelector((state)=> state.offers.detail);
    const advertiser = useSelector((state)=> state.advertiser.list);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))

    useEffect(()=> {
        setFormData({vertical:offerDetail?.vertical,traffic: offerDetail?.traffic,operatingSystem: offerDetail?.operatingSystem, incentive: offerDetail?.incentive,...formData})
    },[offerDetail])

    useEffect(()=> {
        dispatch(fetchOfferDetail({partners_Id:loggedInUser.partners_Id,offerId:id}))
        dispatch(fetchManagerPublisherList({partners_Id:loggedInUser.partners_Id,managerId: loggedInUser.managerId}))
    },[])
    useEffect(()=>{
        dispatch(fetchAdvertiserList(loggedInUser.partners_Id))
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
            <div className='page_sec'>
                    {/* <h3 className="mt-4 mb-2 px-4">{offerDetail?.title}</h3> */}
                    <div className="container-fluid">
                    <div className="top-item px-2 py-2 bg-white mb-2 rounded">
                                <div className="important-links d-flex justify-content-end gap-4 items-center">
                                    <Link className="btn btn-outline-primary btn-sm" onClick={()=> setOpenLinkTesting(true)}>Link Test</Link>
                                    <Link to={`/affiliates/manager/postback_test/${id}`} className="btn btn-outline-primary btn-sm" >Conversion Test</Link>
                                    <Link to={`/affiliates/manager/offerSetting/${id}`} className="btn btn-outline-primary btn-sm" >Setting</Link>
                                </div>
                            </div>
                        <div className="row mt-2">
                            <div className="col-lg-6">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h4>{offerDetail?.title}</h4>
                                    </div>
                                    <div className="offersDataItem">
                                        <p>ID:</p>
                                        {!isEditable ?
                                            <span>{offerDetail?.offerId}</span>
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
                                        <p>Privacy level:</p>
                                        <div>
                                        {!isEditable ?
                                            <span>{offerDetail?.privacyLavel}</span>
                                            :
                                            <select className="form-control" name="privacyLavel" onChange={(e)=>handleInput(e)}>
                                                <option value="none" hidden>Select</option>
                                            <option>Public</option>
                                            <option>Private</option>
                                        </select>  
                                        }
                                        </div>
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
                                                {/* <button className="btn btn-outline-secondary btn-sm" >Add Postback</button>  */}
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
                                        {offerDetail?.event?.map((item)=>  <tr>
                                                <td>{item?.eventValue}</td>
                                                <td>{item?.eventType}</td>
                                                <td>{item?.payout}</td>
                                                <td>{item?._id}</td>
                                            </tr>)}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="mt-4">
                            <ManagerSendOffer offerId={id} />
                            </div>
                            </div>
                            <div className="col-lg-6">
                                <TrackingUrl offerId={id} />
                                <ImpressionUrl offerId={id} />
                                {/* <LandingPage offerDetail={offerDetail}/> */}
                                <div className="mt-4"></div>
                                {/* <ConversionUrl offerId={id}/> */}
                            </div>
                        </div>
                        <LinkTestingModal show={openLinkTesting} onHide={() => setOpenLinkTesting(false)} offerId={id}/>
                    </div>
            </div>
        </>
    )
}
export default ManagerOfferDetails