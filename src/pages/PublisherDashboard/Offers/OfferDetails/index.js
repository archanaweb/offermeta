import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../../Redux/OffersSlice";
import { updateOffer } from "../../../../Redux/OffersSlice";
import { toast } from "react-toastify";
import ImpressionUrl from "./ImpressionUrl";
import RequestOfferModal from "../../../../components/RequestOfferModal";
import TrackingUrl from "./TrackingUrl";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import OfferDescriptionModal from "../../../../components/OfferDescriptionModal";
import OfferKpiModal from "../../../../components/OfferKpiModal copy";

const PublisherOfferDetails = ()=> {
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false)
    const [openOfferKpiModal, setOpenOfferKpiModal] = useState(false)
    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const [formData, setFormData]  = useState({})
    const dispatch =  useDispatch()

    const offerDetail = useSelector((state)=> state.offers.detail);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const [isPopupOpen, setPopupOpen] = useState(false);

    const handleButtonClick = () => {
      setPopupOpen(!isPopupOpen);
    };

    useEffect(()=> {
        setFormData({vertical:offerDetail?.vertical,traffic: offerDetail?.traffic,operatingSystem: offerDetail?.operatingSystem, incentive: offerDetail?.incentive,...formData})
    },[offerDetail])

    useEffect(()=> {
        dispatch(fetchOfferDetail({partners_Id:loggedInUser.partners_Id,offerId:id}))
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
                        <div className="row mt-3">
                            <div className="col-lg-6">
                            <form className="" onSubmit={handleSubmit}>
                                <div className="offersData">
                                    <div className="pb-2 mb-2 border-b">
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                            <h4>{offerDetail?.title}</h4>
                                            {offerDetail?.privacyLavel === 'Required Aprooval' ? <button className="btn btn-danger btn-sm" type="button" onClick={handleButtonClick}>Request Offer</button>: <button className="btn btn-success btn-sm" type="button">Approved</button>}
                                            <div>
                                            <Link target='_blank' to={offerDetail?.previewUrl}>
                                                <button type='button' className="btn btn-sm btn-primary">Offer Preview</button>
                                            </Link>
                                        </div>
                                    </div>
                                            <RequestOfferModal  show={isPopupOpen}
                                            onHide={() => setPopupOpen(false) } publisherId={loggedInUser._id} offerId={id} handleButtonClick={handleButtonClick} />
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
                                            // <span>{offerDetail?.description}</span>
                                            <div> <Link onClick={()=> setOpenDescriptionModal(true)}>View</Link></div>
                                            :
                                            <CKEditor
                                            editor={ClassicEditor}
                                            data={formData?.description}
                                            onReady={(editor) => {
                                        }}
                                          onChange={(event, editor) => {
                                          const data = editor.getData();
                                          const evnt = {
                                            target : {
                                                name : 'description',
                                                value : data
                                            }};
                                            handleInput(evnt);
                                        }}
              />
                                            // <input className="form-control" type="text" name="description" value={formData?.description} onChange={(e)=>handleInput(e)} />
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
                                    <div className="offersDataItem">
                                        <p>Offer Kpi:</p>
                                        {!isEditable ?
                                            // <span>{offerDetail?.description}</span>
                                            <div> <Link onClick={()=> setOpenOfferKpiModal(true)}>View</Link></div>
                                            :
                                            <CKEditor
                                            editor={ClassicEditor}
                                            data={formData?.offerKpi}
                                            onReady={(editor) => {
                                        }}
                                          onChange={(event, editor) => {
                                          const data = editor.getData();
                                          const evnt = {
                                            target : {
                                                name : 'offerKpi',
                                                value : data
                                            }};
                                            handleInput(evnt);
                                        }}
                                 />
                                            // <input className="form-control" type="text" name="description" value={formData?.description} onChange={(e)=>handleInput(e)} />
                                        } 
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Geo</p>
                                        <div>
                                            <span>{offerDetail?.landingPage[0]?.geoAllowed}</span>
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
                                {offerDetail?.privacyLavel === 'Public' && <TrackingUrl offerId={id} offerDetail={offerDetail} />}
                                {offerDetail?.privacyLavel === 'Public' && <ImpressionUrl offerId={id} offerDetail={offerDetail} />}
                                <div className="mt-4"></div>
                            </div>
                        </div>
                        <OfferDescriptionModal show={openDescriptionModal} onHide={() => setOpenDescriptionModal(false)} offerId={id} offerDesc={offerDetail?.description}/>
                        <OfferKpiModal show={openOfferKpiModal} onHide={() => setOpenOfferKpiModal(false)} offerId={id} offerKpi={offerDetail?.offerKpi}/>
                    </div>
            </div>
        </>
    )
}
export default PublisherOfferDetails