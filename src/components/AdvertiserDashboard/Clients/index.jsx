import React, { useEffect, useState } from "react";
import AdminSidebar from "../Dashboard/Sidebar";
import AdvertiserNavbar from "../Dashboard/Navbar";
import { Link } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";

const AdminClients = ()=> {

  const loggedUser = JSON.parse(localStorage.getItem('userData'));
  const [clients, setClients] = useState([])
  const [status, setStatus] = useState({})

    const fetchAdminClients = async()=>{
        const response = await fetch(BASE_URL+`admin/partnersList?adminId=${loggedUser._id}`)
        const resData = await response.json()
        setClients(resData.responseResult)
    }

    const clientActiveStatus = async(client)=> {
      const res = await fetch(BASE_URL+`admin/AprovedSubAdmin?adminId=${loggedUser._id}&_id=${client._id}`,{
        method: "PUT",
        headers: {
          'accept': 'application/json'
      }
      });
      const resData = await res.json();
      console.log('resData clientActiveStatus',resData)
      return resData
    }
    const clientBlockeStatus = async(client)=> {
      const res = await fetch(BASE_URL+`admin/block?adminId=${loggedUser._id}&_id=${client._id}`,{
        method: "PUT",
        headers: {
          'accept': 'application/json'
      }
      });
      const resData = await res.json();
      console.log('resData clientBlockeStatus',resData)
      return resData
    }

    const updateStatus = async(client)=>{
      const clientStatus = client?.status
      if(clientStatus === "BLOCK" || clientStatus === "INACTIVE"){
        const clientActiveRes = await clientActiveStatus(client)
        if(clientActiveRes?.responseCode === 200){
          fetchAdminClients()
          toast.success(clientActiveRes?.responseMessage)
        }else{
          toast.error(clientActiveRes?.responseMessage);
        }
      }
      if(clientStatus === "ACTIVE"){
        const clientBlockRes = await clientBlockeStatus(client);
        if(clientBlockRes?.responseCode === 200){
          fetchAdminClients()
          toast.success(clientBlockRes?.responseMessage)
        }else{
          toast.error(clientBlockRes?.responseMessage);
        }
    }
    }

    useEffect(()=>{
        fetchAdminClients()
    },[])
    return (
        <>
         <div className="'Container-fluid">
                <AdminSidebar>
                <AdvertiserNavbar />
                    <div className='page_sec p-0'>
                        <div className="container mt-2">
                        <div className='container_table m-0'>
            <div className="table-container">
              <div className="row">
                <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                  <input className="form-control"
                    type="text"
                    placeholder="Search..."
                  />
                </div>
              
              </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Status</th>
                    <th>User Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clients
                    ?.map((click) => (
                      <tr key={click._id}>
                        <td>{click._id}</td>
                        <td><Link to={`../client/details/${click._id}`}>{click.name}</Link></td>
                        <td>{click.address}</td>
                        <td>{click.email}</td>
                        <td>{click.mobileNumber}</td>
                        <td><span className={click?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{click.status}</span></td>
                        <td>{click.userType}</td>
                        <td>
                          <DropdownButton className="noCarat"
                            key="start"
                            id={`dropdown-button-drop-start`}
                            drop=""
                            variant="secondary"
                            title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                          >
                          <Dropdown.Item eventKey="2" onClick={()=> updateStatus(click)}>{click.status === 'ACTIVE' ? 'Block' : 'Active'}</Dropdown.Item>
                          </DropdownButton>
                          </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
            </div>
          </div>
            </div>
            </div>
            </AdminSidebar>
            </div>
        </>
    )
}

export default AdminClients