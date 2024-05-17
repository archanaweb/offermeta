import React, { useEffect, useState } from "react";
import BASE_URL from "../../../Api/base";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { deletePubPostBack } from "../../../Redux/PublisherPostbackSlice";

const PublisherPostbackList = ()=>{
const [postbackList, setPostbackList] = useState([])
const pubUser = JSON.parse(localStorage.getItem('userData'));
const dispatch = useDispatch()

const fetchPubPostback = async () => {
  const response = await fetch(BASE_URL + `publisherManagement/publisherPostbackList?partners_Id=${pubUser.partners_Id}&publisherId=${pubUser.publisherId}`)
  const resData = await response.json()
  setPostbackList(resData.responseResult)
};
const deleteItem = async(postback)=>{
  if(!window.confirm("Are you want to delete?")){
    return;
  }
  const deleteResponse = await  dispatch(deletePubPostBack({postbackId:postback.postbackId,publisherId: pubUser.publisherId,partners_Id:pubUser.partners_Id,offerId: postback?.offerId}));
    const res = deleteResponse.payload;
    if(res?.responseCode === 200){
      toast.success(res?.responseMessage)
      fetchPubPostback()
    }else{
      toast.error(res?.responseMessage);
    }
    console.log(deleteResponse)
}

useEffect(()=>{
  fetchPubPostback()
},[])
    return (
        <>
            <div className='page_sec pt-3'>
              <div className="container">
            <div className="table-container">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                  <input className="form-control w-25"
                    type="text"
                    placeholder="Search..."
                  />
                  <button className="btn btn-outline-primary"><Link to='../postback/add'>Create Postback</Link></button>
              </div>
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Conversion Status</th>
                    <th>Postback</th>
                    {/* <th>Type</th> */}
                    <th>Level</th>
                    {/* <th>User Type</th> */}
                    <th>Offer</th>
                    <th>Publisher</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {postbackList ? postbackList
                    ?.map((click) => (
                      <tr key={click?._id}>
                        <td>{click._id}</td>
                        <td>{click.conversionStatus}</td>
                        <td>{click.postback}</td>
                        {/* <td>{click.type}</td> */}
                        <td>{click.level}</td>
                        {/* <td>{click.userType}</td> */}
                        <td>{click.offer}</td>
                        <td>(ID: {click.publisherId}) {click.publisher}</td>
                        <td><button className="btn btn-danger btn-sm" onClick={()=> deleteItem(click)}>Delete</button></td>
                      </tr>
                    )) : <tr><td colSpan={4}>Data not found</td></tr>}
                </tbody>
              </table>
              </div>
            </div>
            </div>
            </div>
        </>
    )
}

export default PublisherPostbackList;