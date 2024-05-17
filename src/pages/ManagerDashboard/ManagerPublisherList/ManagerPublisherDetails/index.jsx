import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerPublisherDetail } from "../../../../Redux/ManagerSlice";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updatePublisher } from "../../../../Redux/PublisherSlice";

const ManagerPublisherDetail = ()=> {
    const {id} = useParams();
    const [isEditable, setIsEditable] = useState(false)
    const [formData, setFormData] = useState({
        pinCode: '100222'
    });
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const managerPublisherDetail = useSelector((state)=> state.manager.PublisherDetail)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchManagerPublisherDetail({partners_Id:managerLoggedIn.partners_Id, managerId: managerLoggedIn.managerId, publisherId: id}))
    },[])
    const handleInput = (e) => {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});
        console.log(FormData);
    }
    useEffect(()=>{
        if(managerPublisherDetail){
            setFormData({...formData, ...managerPublisherDetail});
        } 
    },[managerPublisherDetail])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const publisherDetailResponse = await dispatch(updatePublisher({
            subAdminId: managerLoggedIn.partners_Id,
            publisherId: id,
            formData
        }));;
        const res = publisherDetailResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
                dispatch(fetchManagerPublisherDetail({partners_Id:managerLoggedIn.partners_Id, managerId: managerLoggedIn.managerId, publisherId: id}))
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };

    return (
        <>
            <div className='page_sec'>
            <form className="container" onSubmit={handleSubmit}>
                    <div className="container-fluid mt-2">
                <div className="row">
                        <div className="col-lg-6">
                            <div className="offersData">
                                <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                <h3>Publisher Detalis</h3>
                                        {isEditable ? 
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                        </div> : 
                                            <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                        
                                    </div>
                               {!isEditable && <div className="offersDataItem">
                                        <p>ID:</p>
                                        <span>{managerPublisherDetail?.publisherId}</span>
                                </div>}
                                <div className="offersDataItem">
                                        <p>First Name:</p>
                                        {!isEditable ?
                                           <span>{managerPublisherDetail?.firstName}</span>
                                            :
                                            <input className="form-control" type="text" name="firstName" value={formData?.firstName} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Last Name:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.lastName}</span>
                                            :
                                            <input className="form-control" type="text" name="lastName" value={formData?.lastName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                <div className="offersDataItem">
                                        <p>Email:</p>
                                        {!isEditable ?
                                            <span>{managerPublisherDetail?.email}</span>
                                            :
                                            <input className="form-control" type="text" name="email" value={formData?.email} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                <div className="offersDataItem">
                                        <p>Mobile Number:</p>
                                        {!isEditable ? 
                                        <span>{managerPublisherDetail?.mobileNumber}</span>
                                        :
                                        <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                </div>
                                <div className="offersDataItem">
                                        <p>Company Name:</p>
                                        {!isEditable ?
                                            <span>{managerPublisherDetail?.companyName}</span>
                                            :
                                            <input className="form-control" type="text" name="companyName" value={formData?.companyName} onChange={(e)=>handleInput(e)} />
                                        }
                                </div>
                                <div className="offersDataItem">
                                        <p>Contact No:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.mobileNumber}</span>
                                            :
                                            <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>

                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Country:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.country}</span>
                                            :
                                            <input className="form-control" type="text" name="country" value={formData?.country} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Region:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.region}</span>
                                            :
                                            <input className="form-control" type="text" name="region" value={formData?.region} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>City:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.city}</span>
                                            :
                                            <input className="form-control" type="text" name="city" value={formData?.city} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Street:</p>
                                         {!isEditable ?
                                           <span>{managerPublisherDetail?.street}</span>
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
                                {isEditable && <div className="offersDataItem">
                                        <p>Password:</p>
                                         {!isEditable ?
                                           <span>101010</span>
                                            :
                                            <input className="form-control" type="text" name="password" value={formData?.password} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>}
                            </div>
                            </div>
                            </div>
                    </div>
               </form>
            </div>
        </>
    )
}

export default ManagerPublisherDetail;