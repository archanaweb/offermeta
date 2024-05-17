import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { fetchPublisherDetail, updatePublisher } from "../../../Redux/PublisherSlice";

const PublisherDetail = ()=> {
    const {id} = useParams()
    const [isEditable, setIsEditable] = useState(false)
    const [formData, setFormData] = useState({
        pinCode: '100222'
    });
    const dispatch = useDispatch();
    const manager = useSelector((state)=> state.manager);
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const publisherData = useSelector((state)=> state.publisher);
    const publisher = publisherData.detail;

    useEffect(() => {
        dispatch(fetchManagerList(LoggedInUser._id))
      }, []);
    useEffect(()=> {
        setFormData({...formData, ...publisher});
    },[publisher])

    useEffect(()=> {
        dispatch(fetchPublisherDetail({
            subAdminId: LoggedInUser._id,
            publisherId: id
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
        const publisherDetailResponse = await dispatch(updatePublisher({
            subAdminId: LoggedInUser._id,
            publisherId: id,
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
        useEffect(()=> {
            console.log('publisherDetail REs', publisher)
        },[publisher])
    return (
                <div className='page_sec pt-3'>
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="offersData">
                                    <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                        <h3>Publisher</h3>
                                        {isEditable ? 
                                        <div>
                                            <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                            <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                        </div> : 
                                            <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Company Name:</p>
                                        {!isEditable ?
                                            <span>{publisher?.companyName}</span>
                                            :
                                            <input className="form-control" type="text" name="companyName" value={formData?.companyName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Email:</p>
                                        {!isEditable ?
                                            <span>{publisher?.email}</span>
                                            :
                                            <input className="form-control" type="text" name="email" value={formData?.email} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>First Name:</p>
                                        {!isEditable ?
                                           <span>{publisher?.firstName}</span>
                                            :
                                            <input className="form-control" type="text" name="firstName" value={formData?.firstName} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Last Name:</p>
                                         {!isEditable ?
                                           <span>{publisher?.lastName}</span>
                                            :
                                            <input className="form-control" type="text" name="lastName" value={formData?.lastName} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Contact No:</p>
                                         {!isEditable ?
                                           <span>{publisher?.mobileNumber}</span>
                                            :
                                            <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>

                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                         {!isEditable ?
                                           <span>{publisher?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Country:</p>
                                         {!isEditable ?
                                           <span>{publisher?.country}</span>
                                            :
                                            <input className="form-control" type="text" name="country" value={formData?.country} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Region:</p>
                                         {!isEditable ?
                                           <span>{publisher?.region}</span>
                                            :
                                            <input className="form-control" type="text" name="region" value={formData?.region} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>City:</p>
                                         {!isEditable ?
                                           <span>{publisher?.city}</span>
                                            :
                                            <input className="form-control" type="text" name="city" value={formData?.city} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Street:</p>
                                         {!isEditable ?
                                           <span>{publisher?.street}</span>
                                            :
                                            <input className="form-control" type="text" name="street" value={formData?.street} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Key:</p>
                                         {!isEditable ?
                                           <span>{publisher?.key}</span>
                                            :
                                            <input className="form-control" type="text" name="key" value={formData?.key} onChange={(e)=>handleInput(e)} />
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
                                    <div className="offersDataItem">
                                        <p>Manager:</p>
                                         {!isEditable ?
                                           <span>(ID: {publisher?.managerId}) {publisher?.managerName}</span>
                                            :
                                        <div className="form-group col-lg-6">
                                            <select className="form-control" name="managerId" onChange={handleInput}>
                                              <option value="">Select manager</option>
                                              {manager.list?.filter((item)=> item.managerRole === "Publisher Manager" ).map((item)=> <option key={item.managerId} value={item.managerId}>(ID: {item.managerId}) {item.name}</option>)}
                                            </select>
                                          </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            )
}
export default PublisherDetail;