import React, { useEffect, useState } from "react";
import Navbar from '../../navbar';
import Sidebar from "../../Sidebar";
import PageTitle from "../../PageTitle";
import { fetchPublisherDetail, updatePublisher } from "../../../Redux/PublisherSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import { toast } from "react-toastify";
import { fetchPostBackDetail, updatePostback } from "../../../Redux/PostBackSlice";
import { fetchOfferList } from "../../../Redux/OffersSlice";

const ManagerUpdate = ()=> {
    const {id} = useParams()
    const [isEditable, setIsEditable] = useState(false);
    const [formData, setFormData] = useState({});
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const dispatch = useDispatch();
   
    const publisherData = useSelector((state)=> state.publisher);
    const offerData = useSelector((state)=> state.offers);
    const postbackData = useSelector((state)=> state.postback);

    const publisherList = publisherData.list;
    const offerList = offerData.list;
    const postback = postbackData.detail;

 
    var url_string = window.location.href; 
var url = new URL(url_string);



    const handleInput = (e) => {
        const FormData = {};
        const elementName = e.target.name;
        const elementValue = e.target.value;
        FormData[elementName] = elementValue;
        setFormData({...formData, ...FormData});
        console.log(FormData);
    }

    useEffect(()=>{
        if(postback){
            setFormData({...formData, ...postback});
        } 
        console.log("++++++++",offerData)
    },[postback])
    useEffect(()=> {
        dispatch(fetchPostBackDetail({
          Id: id
        }))
        dispatch(fetchOfferList(LoggedInUser._id));
        console.log(url.searchParams.get("edit")); 
        if(url.searchParams.get("edit") === '1'){
            setIsEditable(true);
        }
    },[]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const postbackDetailResponse = await dispatch(updatePostback({
            Id : id,
            ...formData
        }));;
        const res = postbackDetailResponse.payload;
            if(res?.resposneCode === 200){
                toast.success(res?.resposneMessage)
                setIsEditable(false)
            }else{
                toast.error(res?.resposneMessage || 'something went wrong');
            }
        };
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
                                        <h3>Postback Url</h3>
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
                                            <span>{postback?.publisherId}</span>
                                            :
                                            <input className="form-control" type="text" name="publisherId" value={formData?.publisherId} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Offer Id:</p>
                                        {!isEditable ?
                                            <span>{postback?.offer}</span>
                                            :
                                            // <input className="form-control" type="text" name="offerId" value={formData?.offerId} onChange={(e)=>handleInput(e)} />
                                            <select className="form-control"
                                            name="offerId" 
                                            onChange={(e)=>handleInput(e)}
                                            >
                                                <option value=''>Select Offer</option>
                                                {offerData.list.map((item)=> 
                                                <option 
                                                defaultValue={item.title === postback?.offer} 
                                                value={item._id} 
                                                key={item._id}>
                                                 {item.title}
                                                </option>
                                                )}

                                            </select>
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Level:</p>
                                        {!isEditable ?
                                           <span>{postback?.level}</span>
                                            :
                                            <input className="form-control" type="text" name="level" value={formData?.level} onChange={(e)=>handleInput(e)} />
                                        }
                                        
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Type:</p>
                                         {!isEditable ?
                                           <span>{postback?.type}</span>
                                            :
                                            <input className="form-control" type="text" name="type" value={formData?.type} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Postback Url:</p>
                                         {!isEditable ?
                                           <span>{postback?.postback}</span>
                                            :
                                            <input className="form-control" type="text" name="postback" value={formData?.postback} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Status:</p>
                                         {!isEditable ?
                                           <span>{postback?.status}</span>
                                            :
                                            <input className="form-control" type="text" name="status" value={formData?.status} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                    <div className="offersDataItem">
                                        <p>Conversion Status:</p>
                                         {!isEditable ?
                                           <span>{postback?.conversionStatus}</span>
                                            :
                                            <input className="form-control" type="text" name="conversionStatus" value={formData?.conversionStatus} onChange={(e)=>handleInput(e)} />
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Sidebar>
            </div>
        </>
    )
}
export default ManagerUpdate;