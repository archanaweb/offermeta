import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../../Redux/OffersSlice";
import { fetchLandingPageList } from "../../../../Redux/LangingPageSlice";

const LandingPage =()=> {

    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const landingList = useSelector((state)=> state.landing.list);
    const offerDetail = useSelector((state)=> state.offers.detail);
    const publisherUser = JSON.parse(localStorage.getItem('userData'));
    const publisherUserId = publisherUser.partners_Id

    const dispatch =  useDispatch()
    useEffect(()=> {
        dispatch(fetchOfferDetail(id))
        dispatch(fetchLandingPageList({partnerId: publisherUserId,offerId: id}))
    },[])

    useEffect(()=> {
        console.log('landingList', landingList, publisherUserId, offerDetail)
    },[landingList])
    
    return (
        <>
    <div className="offersData">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>Landing Pages</h3> 
                {/* <Link to={`../landingPages?offerid=${id}`} className="btn btn-outline-secondary btn-sm" >Add Postback</Link> */}
        </div> 
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <td>Title</td>
                        <td>URL</td>
                    </tr>
                </thead>
                <tbody>
                    {landingList?.map((item, index)=> 
                        <tr key={item?._id}>
                             <td>{item.title ? item.title : 'default'}</td>
                            <td>{item?.trackingUrl}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>                          
    </div>
        </>
    )
}
export default LandingPage;