import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerPublisherList } from "../../../Redux/ManagerSlice";
import { Link } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { fetchAdvertiserManagerList } from "../../../Redux/AdvertiserManagerSlice";

const AdvertiserManagerAdvertiserList = ()=> {
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const managerAdvList = useSelector((state)=> state.advertiserManager.list)
    const dispatch = useDispatch() 

    useEffect(()=>{
        dispatch(fetchAdvertiserManagerList({partners_Id:managerLoggedIn.partners_Id,managerId: managerLoggedIn.managerId}))
    },[])
    return (
        <>
            <div className='page_sec'>
              <div className="container">
                <div className='container_table'>
        <div className="table-container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
              <input className="form-control"
                type="text"
                placeholder="Search..."
              />
              <div className="d-flex justify-content-between align-items-center gap-4">
              <Link to="../addpublisher" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create publisher</Link>
              
              </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Mobile Number</th>
                <th>Company Name</th>
                <th>Country</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {managerAdvList ? managerAdvList
                ?.map((click) => (
                <tr key={click.advertiserId}>
                        <td>{click?.advertiserId}</td>
                        <td>{click?.mobileNumber}</td>
                        <td>{click?.companyName}</td>
                        <td>{click?.country}</td>
                        <td>{click?.street}</td>
                </tr>
                )) : <tr><td colSpan={4}>Data not found</td></tr>}
            </tbody>
          </table>
          </div>
        </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default AdvertiserManagerAdvertiserList;