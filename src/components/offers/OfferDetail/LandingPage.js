import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../Redux/OffersSlice";
import { fetchLandingPageList } from "../../../Redux/LangingPageSlice";

const LandingPage =()=> {

    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const landingList = useSelector((state)=> state.landing.list);
    const offerDetail = useSelector((state)=> state.offers.detail);
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const partnerId = LoggedInUser._id

    const dispatch =  useDispatch()
    useEffect(()=> {
        dispatch(fetchOfferDetail(id))
        dispatch(fetchLandingPageList({partnerId,offerId: id}))
    },[])

    useEffect(()=> {
        console.log('landingList', landingList)
    },[landingList])
    
    return (
        <>
    <div className="offersData">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>Landing Pages</h3>
                <Link to={`/landingPages?offerid=${id}`} className="btn btn-outline-secondary btn-sm" >Manage</Link>
        </div> 
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>URL</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {landingList?.map((item)=> <tr key={item?._id}>
                            <td>{item.title ? item.title : 'default'}</td>
                            <td>{item?.trackingUrl}</td>
                        </tr>)}
                   
                </tbody>
            </table>
        </div>                          
    </div>
        </>
    )
}
export default LandingPage;