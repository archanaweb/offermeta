import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchOfferDetail } from "../../../Redux/OffersSlice";
import { fetchLandingPageList } from "../../../Redux/LangingPageSlice";

const LandingPage =()=> {

    const {id} = useParams()
    const [isEditable, setIsEditable] =  useState(false);
    const landingList = useSelector((state)=> state.landing.list);
    const offerDetail = useSelector((state)=> state.offers.detail);

    const dispatch =  useDispatch()
    useEffect(()=> {
        dispatch(fetchOfferDetail(id))
        console.log("offerdetail>>>>>",offerDetail)

        dispatch(fetchLandingPageList(id))
    },[])

    useEffect(()=> {
        console.log("landing list",landingList)
    },[landingList])
    
    return (
        <>
        <div className="col-lg-6">
    <div className="offersData">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>landingDetail</h3>
            {isEditable ? 
            <div>
                <button type="submit" className="btn btn-primary btn-sm me-2">Save</button>
                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(false)}>Cancel</button>
            </div> : 
                <button className="btn btn-outline-secondary btn-sm" onClick={()=> setIsEditable(true)}>Edit</button> }    
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
                    {landingList.map((item, index)=> 
                        <tr>
                            <td>{item?.title || offerDetail?.eventValue}</td>
                            <td>{item?.trackingUrl}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>                          
    </div>
</div>
        </>
    )
}
export default LandingPage;