import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { approveOffer, fetchRequiredOfferList } from "../../Redux/OffersSlice";

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
        if(res.responseCode === 200){
            toast.success(res.responseMessage)
            dispatch(fetchRequiredOfferList(loggedIn?._id))
        }else{
            toast.error(res.responseMessage)
        }
    }
    return (
        <>
        <div className='page_sec pt-3'>
          <div className='container'>
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
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {requestList ? requestList?.map((item) => (
                     <tr>
                        <td>{item?._id}</td>
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
        </>
    )
}
export default RequestOfferList;