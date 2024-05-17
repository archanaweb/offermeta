import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageTitle from "../PageTitle";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deletePostBack, fetchPostBackList } from "../../Redux/PostBackSlice";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import BASE_URL from "../../Api/base";

const Manager = ()=> {

    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const manager = useSelector((state)=> state.manager)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const fetchManager = async ()=> {
        const managerResponse = await  dispatch(fetchManagerList(loggedInUser._id));
        const res = managerResponse.payload;
        if(res?.responseCode === 200){
          toast.success(res?.responseMessage)
        }else{
          toast.error(res?.resposneMessage);
        }
        console.log(managerResponse)
    }

    // const deleteItem = async(postback)=>{
    //   if(!window.confirm("Are you want to delete?")){
    //     return;
    //   }
    //   const deleteResponse = await  dispatch(deletePostBack(postback._id));
    //     const res = deleteResponse.payload;
    //     if(res?.resposneCode === 200){
    //       dispatch(fetchPostBackList());
    //       toast.success(res?.resposneMessage)
    //     }else{
    //       toast.error(res?.resposneMessage);
    //     }
    //     console.log(deleteResponse)
    // }
    const handleManagerLogin = async(managerId)=> {
      console.log('managerData',id)
      const idManager = id?.managerId;
        const response = await fetch(`${BASE_URL}manager/managerLoginById?partners_Id=${loggedInUser.partners_Id}&managerId=${managerId}`, {
          method: 'POST',
          headers: {
              'accept': 'application/json',
              'content-type': 'application/x-www-form-urlencoded'
          }
        })
        const resData = await response.json()
        if(resData.responseCode === 200){
          toast.success(resData.responseMessage)
        }else (
          toast.error(resData.responseMessage)
        )
        localStorage.setItem('userData', JSON.stringify(resData.responsResult));
        navigate('/manager/dashboard');
        console.log("publisherLogin",resData)
    }

    useEffect(()=> {
        fetchManager()
    },[])
    useEffect(()=> {
      console.log("Manager List",manager)
      console.log("partner user",loggedInUser)
  },[manager])

    return (
        <>
         <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
        <div className="table-container">
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
              <input className="form-control"
                type="text"
                placeholder="Search..."
              />
              <Link to="/addmanager" className="btn btn-secondary"><i className="fa-solid fa-plus me-2"></i>Create Manager</Link>
            </div>
        </div>
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>name</th>
              <th>Manager Role</th>
              <th>Address</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>User Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {manager.list ? manager.list?.map((click, index) => (
                <tr key={click.id}>
                  <td>{click._id}</td>
                  <td>{click.name}</td>
                  <td>{click.managerRole}</td>
                  <td>{click.address}</td>
                  <td>{click.mobileNumber}</td>
                  <td>{click.email}</td>
                  <td>{click.userType}</td>
                  <td><span className="statusBtn">{click.status}</span></td>
                  <td>
                    <DropdownButton className="noCarat"
                      key="start"
                      id={`dropdown-button-drop-start`}
                      drop=""
                      variant="secondary"
                      title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                    >
              <Dropdown.Item eventKey="1" onClick={()=>handleManagerLogin(click)}><i class="fa-solid fa-arrow-right-to-bracket"></i> Login as</Dropdown.Item>
              <Dropdown.Item eventKey="2">
                <Link to={`/postback/${click._id}?edit=1`}>
                  <i class="fa-regular fa-pen-to-square"></i>
                Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="3"><i class="fa-solid fa-trash"></i> Delete</Dropdown.Item>
            </DropdownButton></td>
                </tr>
              )) : <tr><td colSpan={4}>Data not found</td></tr>}
          </tbody>
        </table>
        </div>
        </div>
        </div>
      </Sidebar>
    </div>
        </>
    )
}
export default Manager;