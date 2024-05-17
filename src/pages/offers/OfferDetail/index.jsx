import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchOfferDetail, updateOffer } from "../../../Redux/OffersSlice";
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import EventPostback from "./EventPostback";
import SendOffer from "./SendOffer";
import TrackingUrl from "./TrackingUrl";
import LandingPage from "./LandingPage";
import ImpressionUrl from "./ImpressionUrl";
import ConversionUrl from "./ConversionUrl";
import OptimizationTool from "./OptimizationTool";
import OptimizationToolList from "./OtimizationToolList";
import OfferCheck from "./OfferCheck";
import SendMailModal from "../../../components/SendMailModal";
import LinkTestingModal from "../../../components/LinkTestingModal";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import OfferDescriptionModal from "../../../components/OfferDescriptionModal";
import OfferKpiModal from "../../../components/OfferKpiModal copy";

const OfferDetails = ()=> {
    const [openLinkTesting, setOpenLinkTesting] = useState(false)
    const [openMailModal, setOpenMailModal] = useState(false)
    const [openDescriptionModal, setOpenDescriptionModal] = useState(false)
    const [openOfferKpiModal, setOpenOfferKpiModal] = useState(false)
    const {id} = useParams()
    const [trackingData, setTrackingData] = useState({})
    const [isEditable, setIsEditable] =  useState(false);
    const [publisherId, setPublisherId] = useState()
    const [formData, setFormData]  = useState({})
    const [imageFile, setImageFile] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formDate, setFormDate] = useState({})
    const dispatch =  useDispatch()

    const offerDetail = useSelector((state)=> state.offers.detail);
    const advertiser = useSelector((state)=> state.advertiser.list);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))

    useEffect(()=> {
        setFormData({...offerDetail, ...formData})
        setFormDate({...offerDetail, ...formDate})
    },[offerDetail])
    useEffect(()=>{
        console.log('helloOfferDEtail',offerDetail)
    },[offerDetail])

    useEffect(()=> {
        dispatch(fetchOfferDetail({partners_Id:loggedInUser._id ,offerId:id}))
        dispatch(fetchAdvertiserList(loggedInUser._id))
        console.log(url.searchParams.get("edit")); 
        if(url.searchParams.get("edit") === '1'){
            setIsEditable(true);
        }
    },[])

    const trackingPublisherId = (pubId)=>{
        setPublisherId(pubId)
    }
    var url_string = window.location.href; 
    var url = new URL(url_string);
    const handleInput= (e)=> {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});    
    }
    const handleDateChange = (date, e)=>{
        const year = date?.getFullYear();
        const month = (date?.getMonth() + 1).toString().padStart(2, '0');
        const day = date?.getDate().toString().padStart(2, '0');
    
        // Create the formatted date string
        const formattedDate = `${year}-${month}-${day}`;
        setFormDate({...formDate, [e.target.name] : e.target.value})
    
        if (!startDate || (startDate && date >= startDate)) {
          setEndDate(formattedDate);
        } else {
          setStartDate(formattedDate);
          setEndDate(null);
        }
    }
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
      };
    const handleSubmit = async (e)=> {
        e.preventDefault()
        const form = new FormData();
        form.append('image', imageFile);
        form.append('title', formData.title);
        form.append('advertiserId',formData.advertiserId);
        form.append('privacyLavel', formData.privacyLavel);
        form.append('description', formData.description);
        form.append('category', formData.category);
        form.append('vertical', formData.vertical);
        form.append('traffic', formData.traffic);
        form.append('operatingSystem', formData.operatingSystem);
        form.append('incentive', formData.incentive);
        form.append('packageName', formData.packageName);
        form.append('previewUrl', formData.previewUrl);
        form.append('offerKpi', formData?.offerKpi);
        form.append('startDate', formDate.startDate);
        form.append('endDate', formDate.endDate);
        const updateOfferResponse = await dispatch(updateOffer({
            partners_Id: loggedInUser._id,
            offerId: id,
            formData: form
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
                <div className='page_sec pt-2'>
                        <div className="container-fluid">
                            <div className="top-item px-2 py-2 bg-white mb-2 rounded">
                                <div className="important-links d-flex justify-content-end gap-4 items-center">
                                    <Link className="btn btn-outline-primary btn-sm" onClick={()=> setOpenLinkTesting(true)}>Link Test</Link>
                                    <Link to={`/postback_test/${id}`} className="btn btn-outline-primary btn-sm" >Conversion Test</Link>
                                    <Link to={`/offerSetting/${id}`} className="btn btn-outline-primary btn-sm" >Setting</Link>
                                </div>
                            </div>
                            <div className="row">
                                <div className={!isEditable ? 'col-lg-6' : 'col-lg-9'}>
                                <form className="" onSubmit={handleSubmit}>
                                    <div className="offersData">
                                        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                            <div className="d-flex justify-content-start align-items-center gap-1">
                                                <h4>{offerDetail?.title}</h4>
                                                {/* {offerDetail.privacyLavel === 'Required Aprooval' && <button className="btn btn-danger btn-sm">Request Offer</button>} */}
                                            </div>
                                            {isEditable ? 
                                            <div>
                                                <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                            </div> : 
                                            <div>
                                                <button className="btn btn-outline-primary btn-sm me-2 hover-text-white" onClick={()=> setOpenMailModal(true)} type="button"><i className="fa-regular fa-paper-plane"></i> Mail</button> 
                                                <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)} type="button">Edit</button> 
                                            </div> } 
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Title:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.title}</span>
                                                :
                                                <input className="form-control" type="text" name="title" value={formData?.title} onChange={(e)=>handleInput(e)} />
                                            }
                                            
                                        </div>
                                        {!isEditable &&<div className="offersDataItem">
                                            <p>Id:</p>
                                        
                                                <span>{offerDetail?.offerId}</span> 
                                        </div>}
                                       <div className="offersDataItem">
                                            <p>Image:</p>
                                            {!isEditable ? <img src={offerDetail?.image} alt="Offer Img"/> :
                                             <>
                                             {/* <img src={offerDetail?.image} alt="Offer Img" /> */}
                                                <input
                                                className="form-control"
                                                type="file"
                                                id="image"
                                                name="image"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                         </>
                                            }
                                        </div>
                                        
                                        <div className="offersDataItem">
                                            <p>Status:</p>
                                            {!isEditable ?
                                               <div><span className={offerDetail?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{offerDetail?.status}</span></div>
                                                :
                                                <select className="form-control" name="status" value={formData?.status} onChange={(e)=>handleInput(e)}>
                                                <option value="none" hidden>Select</option>
                                                <option>ACTIVE</option>
                                                <option>INACTIVE</option>
                                            </select>  
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Advertiser:</p>
                                            {!isEditable ?
                                            <span>{`(ID: ${offerDetail?.advertiserId}) ${offerDetail?.advertiserFirstName} ${offerDetail?.advertiserLastName}`}</span>
                                                :
                                                <select className="form-control"
                                                name="advertiserId"
                                                onChange={(e)=>handleInput(e)}
                                                value={formData?.advertiserId}
                                                >
                                                    <option value="none" hidden>Select advertiser</option>
                                                    {advertiser?.map((item)=> <option key={item.advertiserId} value={item.advertiserId}>(ID: {item.advertiserId}) {item.firstName} {item.lastName}</option>)}
                                                </select>
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Privacy level:</p>
                                            {!isEditable ?
                                                <span>{offerDetail?.privacyLavel}</span>
                                                :
                                                <select className="form-control" name="privacyLavel" value={formData?.privacyLavel} onChange={(e)=>handleInput(e)}>
                                                    <option value="none" hidden>Select</option>
                                                <option>Public</option>
                                                <option>Private</option>
                                                <option>Required Aprooval</option>
                                            </select>  
                                            }
                                        </div>
                                        
                                        <div className="offersDataItem">
                                            <p className="w-25">Description:</p>
                                            {!isEditable ?
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
                                                
                                                // <textarea className="form-control" type="text" name="description" value={formData?.description} onChange={(e)=>handleInput(e)} />
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
                                            <p>Vertical:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.vertical}</span>
                                                :
                                                <input className="form-control" type="text" name="vertical" value={formData?.vertical} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Traffic:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.traffic}</span>
                                                :
                                                <input className="form-control" type="text" name="traffic" value={formData?.traffic} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Operating System:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.operatingSystem}</span>
                                                :
                                                <input className="form-control" type="text" name="operatingSystem" value={formData?.operatingSystem} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Incentive:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.incentive}</span>
                                                :
                                                <input className="form-control" type="text" name="incentive" value={formData?.incentive} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Package Name:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.packageName}</span>
                                                :
                                                <input className="form-control" type="text" name="packageName" value={formData?.packageName} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>preview Url:</p>
                                            {!isEditable ?
                                            <span><Link target='_blank' to={offerDetail?.previewUrl}><button type='button' className="btn btn-sm btn-primary">Offer Preview</button></Link></span>
                                                :
                                                <textarea className="form-control" name="previewUrl" value={formData?.previewUrl} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        {!isEditable && <div className="offersDataItem">
                                            <p>Geo:</p>
                                            <span>{offerDetail?.landingPage[0]?.geoAllowed}</span>
                                        </div>}
                                        <div className="offersDataItem">
                                            <p>Offert Kpi:</p>
                                            {!isEditable ?
                                            // <span>{offerDetail?.offerKpi}</span>
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
                                                // <textarea className="form-control" type="text" name="offerKpi" value={formData?.offerKpi} onChange={(e)=>handleInput(e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>Start Date:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.startDate}</span>
                                                :
                                                <input className="form-control" type="date" name="startDate" value={formDate?.startDate} onChange={(e)=>handleDateChange(new Date(e.target.value),e)} />
                                            }
                                        </div>
                                        <div className="offersDataItem">
                                            <p>End Date:</p>
                                            {!isEditable ?
                                            <span>{offerDetail?.endDate}</span>
                                                :
                                                <input className="form-control" type="date" name="endDate" value={formDate?.endDate} onChange={(e)=>handleDateChange(new Date(e.target.value),e)} />
                                            }
                                        </div>
                                    </div>
                                    </form>
                                    <div className="offersData mt-4">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h3>Revenue & Event Value</h3>
                                        <Link to={`/eventValue?offerid=${id}`}  className="btn btn-outline-secondary btn-sm">Manage</Link>
                                    </div>
                                    <div className="table-responsive event-table">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th>Event Value</th>
                                                    <th>Type</th>
                                                    <th>Revenue</th>
                                                    <th>Payout</th>
                                                    <th>Id</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {offerDetail?.event?.map((item)=> <tr>
                                                    <td>{item?.eventValue}</td>
                                                    <td>{item?.eventType}</td>
                                                    <td>{item?.revenue}</td>
                                                    <td>{item?.payout}</td>
                                                    <td>{item?._id}</td>
                                                </tr>)}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                               {!isEditable && <> 
                               
                               
                               {/* <div className="mt-4">
                               {offerDetail?.privacyLavel !== 'Required Aprooval' && <ConversionUrl offerId={id} clickId={trackingData.click_id}/>}
                                </div>  */}
                                {/* <div className="mt-4">
                                     <SendOffer  offerId={id}/> 
                                 </div> */}
                                {/* <div className="mt-4">
                                     <OptimizationTool  offerId={id}/> 
                                 </div> */}
                                  </>}
                                </div>
                                {!isEditable && <div className="col-lg-6">
                                    {offerDetail?.privacyLavel !== 'Required Aprooval' && <TrackingUrl offerId={id} trackingPublisherId={trackingPublisherId}/>}
                                    {offerDetail?.privacyLavel !== 'Required Aprooval' && <ImpressionUrl offerId={id} />}
                                    <div className="mt-4">
                               {offerDetail?.privacyLavel !== 'Required Aprooval' && <EventPostback offerId={id}/>}
                                </div> 
                                    {/* {offerDetail?.privacyLavel !== 'Required Aprooval' && <LandingPage />} */}
                                    {/* {offerDetail?.privacyLavel !== 'Required Aprooval' && <>
                                    <div className="offersData">
                                        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                            <h3>Setting</h3>
                                            <Link to={`/offerSetting/${id}`} className="btn btn-outline-secondary btn-sm" >Manage</Link>
                                        </div> 
                                    </div>
                                    </>} */}
                                    {/* {offerDetail?.privacyLavel !== 'Required Aprooval' && <OptimizationToolList offerId={id}/>} */}
                                    {/* {offerDetail?.privacyLavel !== 'Required Aprooval' && <OfferCheck offerId={id} offerDetail={offerDetail} trackingData={trackingData} setTrackingData={setTrackingData} />} */}
                                </div>}
                            </div>
                            <SendMailModal show={openMailModal} onHide={() => setOpenMailModal(false)} offerId={id}/>
                            <LinkTestingModal show={openLinkTesting} onHide={() => setOpenLinkTesting(false)} offerId={id}/>
                            <OfferDescriptionModal show={openDescriptionModal} onHide={() => setOpenDescriptionModal(false)} offerId={id} offerDesc={offerDetail?.description}/>
                            <OfferKpiModal show={openOfferKpiModal} onHide={() => setOpenOfferKpiModal(false)} offerId={id} offerKpi={offerDetail?.offerKpi}/>
                        </div>
                </div>
        </>
    )
}
export default OfferDetails