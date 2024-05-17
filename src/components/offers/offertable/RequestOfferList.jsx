import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { approveOffer, fetchRequiredOfferList } from "../../../Redux/OffersSlice";
import { json } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import PageTitle from "../../PageTitle";
import { toast } from "react-toastify";

const RequestOfferList = ()=> {
    const loggedIn = JSON.parse(localStorage.getItem('userData'))
    const requestList = useSelector((state)=> state.offers.requestOfferList)
    const dispatch = useDispatch()

    useEffect(()=> {
        dispatch(fetchRequiredOfferList(loggedIn?._id))
    },[])
    const handleapproveOffer = async (offerId)=> {
        const approveOfferRes = await dispatch(approveOffer({partners_Id:loggedIn?._id, offerId }))
        const res = approveOfferRes.payload
        console.log('approveOfferRes',res)
        if(res.responseCode === 200){
            toast.success(res.responseMessage)
            dispatch(fetchRequiredOfferList(loggedIn?._id))
        }else{
            toast.error(res.responseMessage)
        }
    }
    return (
        <>
         <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle/>
          <div className='container_table'>
            <div className="table-container">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    {/* <th>Partrner Id</th> */}
                    <th>Offer</th>
                    <th>Publisher</th>
                    <th>Question</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestList ? requestList?.map((item) => (
                     <tr>
                        <td>{item?._id}</td>
                        {/* <td>{item.partners_Id}</td> */}
                        <td>(ID: {item.offerId}) {item.offerName}</td>
                        <td>(ID: {item.publisherId}) {item.publisherName}</td>
                        <td>{item.question}</td>
                        <td>{item.status}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={()=> handleapproveOffer(item.offerId)}>Approve</button></td>
                     </tr>
                    )) : <tr><td colSpan={4}>No data found</td></tr>}
                </tbody>
              </table>
              </div>

            </div>
            </div>
            </div>
            </Sidebar>
            </div>
        </>
    )
}
export default RequestOfferList;