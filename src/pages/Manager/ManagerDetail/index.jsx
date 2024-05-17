import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchManagerDetail, fetchManagerList, updateManager } from "../../../Redux/ManagerSlice";
import { fetchPublisherDetail, updatePublisher } from "../../../Redux/PublisherSlice";

const ManagerDetail = ()=> {
    const {id} = useParams()
    const [isEditable, setIsEditable] = useState(false)
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const managerDetail = useSelector((state)=> state.manager.detail);

    useEffect(()=> {
        setFormData({...formData, ...managerDetail});
    },[managerDetail])

    useEffect(()=> {
        dispatch(fetchManagerDetail({
            partners_Id: LoggedInUser._id,
            managerId: id
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
        const publisherDetailResponse = await dispatch(updateManager({
            subAdminId: LoggedInUser._id,
            Id: id,
            formData
        }));;
        const res = publisherDetailResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
    return (
                <div className='page_sec pt-3'>
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-9">
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h3>Manager</h3>
                                        {isEditable ? 
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                        </div> : 
                                            <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                        
                                    </div>
                                    {!isEditable && <div className="offersDataItem">
                                        <p>Manager Id:</p>
                                            <span>{managerDetail?.managerId}</span>
                                    </div>}
                                    <div className="offersDataItem">
                                        <p>Email:</p>
                                        {!isEditable ?
                                            <span>{managerDetail?.email}</span>
                                            :
                                            <input className="form-control" type="email" name="email" value={formData?.email} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Skype Id:</p>
                                        {!isEditable ?
                                            <span>{managerDetail?.skypeId}</span>
                                            :
                                            <input className="form-control" type="text" name="skypeId" value={formData?.skypeId} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Name:</p>
                                        {!isEditable ?
                                           <span>{managerDetail?.name}</span>
                                            :
                                            <input className="form-control" type="text" name="name" value={formData?.name} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Contact No:</p>
                                         {!isEditable ?
                                           <span>{managerDetail?.mobileNumber}</span>
                                            :
                                            <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>

                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                         {!isEditable ?
                                           <span>{managerDetail?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    { !isEditable &&    <div className="offersDataItem">
                                        <p>Manager Role:</p>
                                        
                                           <span>{managerDetail?.managerRole}</span>
                                                                                    
                                    </div>}
                                    <div className="offersDataItem">
                                        <p>Address:</p>
                                         {!isEditable ?
                                           <span>{managerDetail?.address}</span>
                                            :
                                            <input className="form-control" type="text" name="address" value={formData?.address} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Password:</p>
                                         {!isEditable ?
                                           <span>{managerDetail?.password}</span>
                                            :
                                            <input className="form-control" type="text" name="password" value={formData?.password} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
}
export default ManagerDetail;