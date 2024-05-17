import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { fetchPublisherDetail, updatePublisher } from "../../../Redux/PublisherSlice";
import { fetchAdvertiserDetails, updatedAdvertiserDetails } from "../../../Redux/AdvertiserSlice";
import AdveriserPostback from "./AdveriserPostback";
import IpList from "./IpList";

const AdvertiserDetail = ()=> {
    const {id} = useParams()
    const [isEditable, setIsEditable] = useState(false);
    const [advertiserDetail, setAdvertiserDetail] = useState(null);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const advertiserData = useSelector((state)=> state.advertiser.detail);

    useEffect(() => {
        dispatch(fetchManagerList(LoggedInUser._id))
      }, []);
    useEffect(()=> {
        setFormData({...formData, ...advertiserData});
        setAdvertiserDetail(advertiserData)
    },[advertiserData])

    useEffect(()=> {
        dispatch(fetchAdvertiserDetails({
            partners_Id: LoggedInUser._id,
            advertiserId: id
        }))
    },[]);

    const handleInput = (e) => {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});
        console.log(FormData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const advertiserDetailResponse = await dispatch(updatedAdvertiserDetails({
            formData,
            partners_Id:LoggedInUser._id
        }));;
        const res = advertiserDetailResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
                dispatch(fetchAdvertiserDetails({
                    partners_Id: LoggedInUser._id,
                    advertiserId: id
                }))
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
    return (
                <div className='page_sec pt-3'>
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h3>Advertiser</h3>
                                        {isEditable ? 
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                        </div> : 
                                            <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                        
                                    </div>
                                    {!isEditable && <div className="offersDataItem">
                                        <p>ID:</p>
                                            <span>{advertiserData?.advertiserId}</span>
                                    </div>}
                                    <div className="offersDataItem">
                                        <p>Company Name:</p>
                                        {!isEditable ?
                                            <span>{advertiserData?.companyName}</span>
                                            :
                                            <input className="form-control" type="text" name="companyName" value={formData?.companyName} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>First Name:</p>
                                        {!isEditable ?
                                           <span>{advertiserData?.firstName}</span>
                                            :
                                            <input className="form-control" type="text" name="firstName" value={formData?.firstName} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Last Name:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.lastName}</span>
                                            :
                                            <input className="form-control" type="text" name="lastName" value={formData?.lastName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Email:</p>
                                        {!isEditable ?
                                            <span>{advertiserData?.email}</span>
                                            :
                                            <input className="form-control" type="email" name="email" value={formData?.email} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Contact No:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.mobileNumber}</span>
                                            :
                                            <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>

                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Country:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.country}</span>
                                            :
                                            <input className="form-control" type="text" name="country" value={formData?.country} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Region:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.region}</span>
                                            :
                                            <input className="form-control" type="text" name="region" value={formData?.region} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>City:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.city}</span>
                                            :
                                            <input className="form-control" type="text" name="city" value={formData?.city} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Street:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.street}</span>
                                            :
                                            <input className="form-control" type="text" name="street" value={formData?.street} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Pin Code:</p>
                                         {!isEditable ?
                                           <span>101010</span>
                                            :
                                            <input className="form-control" type="text" name="pinCode" value={formData?.pinCode} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    {advertiserData?.managerName && 
                                    <div className="offersDataItem">
                                        <p>Manager:</p>
                                         {!isEditable ?
                                           <span>{advertiserData?.managerName
                                           }</span>
                                            :
                                            <span>{advertiserData?.managerName
                                            }</span>
                                        }
                                    </div>}
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <AdveriserPostback advertiserId={id} />
                                <IpList advertiserId={id}/>
                            </div>
                        </div>
                    </form>
                </div>
            )
}
export default AdvertiserDetail;