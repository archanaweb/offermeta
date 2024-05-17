import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchApprovedPublisherList } from "../../../Redux/PublisherSlice";

const PublisherApprovedOffersList = ()=> {
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const approverOfferList = useSelector((state)=> state.publisher.approvedOfferList)
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(fetchApprovedPublisherList(adminUser.publisherId))
    },[])

    return (
        <>
            <div className='page_sec pt-3'>
            <div className="container">
            <div className="table-container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Offer</th>
                    <th>Publisher</th>
                    <th>Question</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {approverOfferList ? approverOfferList
                    ?.map((click) => (
                      <tr key={click._id}>
                        <td>{click._id}</td>
                        <td> <Link to={`../approvedOffer/${click.offerId}`}>
                        (ID: {click.offerId}) {click.offerName}</Link>
                        </td>
                        <td>
                        (ID: {click.publisherId}) {click.publisherName}
                        </td>
                       <td>{click.question}</td>
                       <td><span className="statusBtn">{click.status}</span></td>
                      </tr>
                    )): <tr><td colSpan={4}>Data not found</td></tr>}
                </tbody>
              </table>
              </div>
            </div>
        
            </div>
            </div>
        </>
    )
}

export default PublisherApprovedOffersList