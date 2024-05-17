import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchManagerPostbackDetail, updateManagerPostback } from "../../../../Redux/ManagerSlice";
import { fetchOfferList } from "../../../../Redux/OffersSlice";

const PubManagerPostbackDetail = ()=> {
    const {id} = useParams()
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({});
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const dispatch = useDispatch();
    const offerData = useSelector((state)=> state.offers);
    const managerPostbackDetail = useSelector((state)=> state.manager.postbackDetail);
    var url_string = window.location.href; 
    var url = new URL(url_string)

    const handleInput = (e) => {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});
    }

    useEffect(()=>{
        if(managerPostbackDetail){
            setFormData({...formData, ...managerPostbackDetail});
        } 
    },[managerPostbackDetail])
    useEffect(()=> {
        dispatch(fetchManagerPostbackDetail({
            partners_Id:LoggedInUser.partners_Id,
            managerId:LoggedInUser.managerId,
            postbackId: id
        }))
        dispatch(fetchOfferList({partners_Id:LoggedInUser.partners_Id,currentPage: 1}));
        if(url.searchParams.get("edit") === '1'){
            setIsEditable(true);
        }
    },[]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const postbackDetailResponse = await dispatch(updateManagerPostback(formData));
        const res = postbackDetailResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                setIsEditable(false)
                dispatch(fetchManagerPostbackDetail({
                    partners_Id:LoggedInUser.partners_Id,
                    managerId:LoggedInUser.managerId,
                    postbackId: id
                }))
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
    return (
        <>
            <div className='page_sec pt-3'>
                <form className="container" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-lg-11">
                            <div className="offersData">
                                <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                                    <h3>Postback Detail</h3>
                                    {isEditable ? 
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                                        <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
                                    </div> : 
                                        <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }
                                    
                                </div>
                                <div className="offersDataItem">
                                    <p>Publisher Id:</p>
                                    {!isEditable ?
                                        <span>{managerPostbackDetail?.publisherId}</span>
                                        :
                                        <input className="form-control" type="text" name="publisherId" value={formData?.publisherId} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>
                                <div className="offersDataItem">
                                    <p>Offer Id</p>
                                    {!isEditable ?
                                        <span>(ID: {managerPostbackDetail?.offerId}) {managerPostbackDetail?.offer}</span>
                                        :
                                        // <input className="form-control" type="text" name="offerId" value={formData?.offerId} onChange={(e)=>handleInput(e)} />
                                        <select className="form-control"
                                        name="offerId" 
                                        onChange={(e)=>handleInput(e)}
                                        value={formData?.offerId}
                                        >
                                            <option value='' hidden>Select Offer</option>
                                            {offerData?.list?.map((item)=> 
                                            <option value={item.offerId} key={item.offerId}>
                                                (ID: {item.offerId}) {item.title}
                                            </option>
                                            )}

                                        </select>
                                    }
                                    
                                </div>
                                <div className="offersDataItem">
                                    <p>Level:</p>
                                    {!isEditable ?
                                        <span>{managerPostbackDetail?.level}</span>
                                        :
                                        <select className="form-control" name="level" value={formData?.level} onChange={(e)=>handleInput(e)}>
                                            <option value='' hidden>Select</option>
                                            <option value='Offer' hidden>Offer</option>
                                            <option value='Global' hidden>Global</option>
                                        </select>
                                    }
                                    
                                </div>
                               {formData?.event_value && <div className="offersDataItem">
                                    <p>Event value:</p>
                                        {!isEditable ?
                                        <span>{managerPostbackDetail?.event_value}</span>
                                        :
                                        <input className="form-control" type="text" readOnly name="event_value" value={formData?.event_value} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>}
                                <div className="offersDataItem">
                                    <p>Type:</p>
                                        {!isEditable ?
                                        <span>{managerPostbackDetail?.type}</span>
                                        :
                                        <input className="form-control" type="text" name="type" value={formData?.type} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>
                                <div className="offersDataItem">
                                    <p>Postback Url:</p>
                                        {!isEditable ?
                                        <span>{managerPostbackDetail?.postback}</span>
                                        :
                                        <textarea className="form-control" name="postback" value={formData?.postback} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>
                                <div className="offersDataItem">
                                    <p>Status:</p>
                                        {!isEditable ?
                                        <span>{managerPostbackDetail?.status}</span>
                                        :
                                        <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>
                                <div className="offersDataItem">
                                    <p>Conversion Status:</p>
                                        {!isEditable ?
                                        <span>{managerPostbackDetail?.conversionStatus}</span>
                                        :
                                        <input className="form-control" type="text" name="conversionStatus" value={formData?.conversionStatus} onChange={(e)=>handleInput(e)} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
export default PubManagerPostbackDetail;