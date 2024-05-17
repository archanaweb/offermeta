import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";
import { deletePubManagerPostback } from "../../../Redux/ManagerSlice";
import PostbackUrlModal from "../../../components/PostbackUrlModal";

const ManagerrPostbackList = ()=>{
const [showModal, setShowModal] = useState(false);
const [postbackUrl, setPostbcakUrl] = useState();
const [postbackList, setPostbackList] = useState([])
const managerUser = JSON.parse(localStorage.getItem('userData'));
const dispatch = useDispatch()

const fetchManagerPostback = async () => {
  const response = await fetch(BASE_URL + `publisherManagement/managerPostbackList?partners_Id=${managerUser.partners_Id}&managerId=${managerUser.managerId}`)
  const resData = await response.json()
  setPostbackList(resData.responseResult)
};

useEffect(()=>{
  fetchManagerPostback()
},[])
const handleViewPostback = (click)=> {
  setShowModal(true)
  setPostbcakUrl(click.postback)
}
const handleDelete = async(postback)=>{
  if(!window.confirm("Are you want to delete?")){
    return;
  }
  const deleteResponse = await  dispatch(deletePubManagerPostback({postbackId:postback.postbackId,publisherId: postback.publisherId,managerId:postback.managerId,partners_Id:postback.partners_Id,offerId: postback?.offerId}));
    const res = deleteResponse.payload;
    if(res?.responseCode === 200){
      toast.success(res?.responseMessage)
      fetchManagerPostback()
    }else{
      toast.error(res?.responseMessage);
    }
    console.log(deleteResponse)
}
    return (
        <>
            <div className='page_sec'>
                        <div className="container mt-2">
                        <div className='container_table'>
            <div className="table-container">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                  <input className="form-control w-25"
                    type="text"
                    placeholder="Search..."
                  />
                  <button className="btn btn-primary"><Link to='../postback/add'>Create Postback</Link></button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Offer</th>
                    <th>Publisher</th>
                    <th>Status</th>
                    <th>Postback</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {postbackList
                    ?.map((click) => (
                      <tr key={click?.postbackId}>
                        <td>{click.postbackId}</td>
                        <td>(ID: {click.offerId}) {click.offer}</td>
                        <td>(ID: {click.publisherId}) {click.publisher}</td>
                        <td><span className="statusBtn">{click.status}</span></td>
                        <td><button onClick={()=> handleViewPostback(click)} className="btn text-primary">{click.code}</button></td>
                        <td><button className="btn btn-outline-secondary btn-sm me-2"><Link to={`../postback/${click?.postbackId}?edit=1`} className=""> Edit</Link></button><button className="btn btn-danger btn-sm" onClick={()=> handleDelete(click)}> Delete</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
            </div>
            <PostbackUrlModal show={showModal} onHide={() => setShowModal(false)} postbackUrl={postbackUrl} handleViewPostback={handleViewPostback}/>
          </div>
            </div>
            </div>
        </>
    )
}

export default ManagerrPostbackList;