import React, { useEffect, useState } from "react";
import AdminSidebar from "../../Dashboard/Sidebar";
import AdvertiserNavbar from "../../Dashboard/Navbar";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../../Api/base";

const ClientsDetails = ()=> {
    const [clientDetails, setClientDetails] = useState({})
    const {id} = useParams();
    const loggedUser = JSON.parse(localStorage.getItem('userData'))

    const fetchClientDetails = async()=> {
        const res = await fetch(BASE_URL+`admin/view?adminId=${loggedUser._id}&partners_Id=${id}`)
        const resData = await res.json()
        setClientDetails(resData.responseResult)
    }
    useEffect(()=>{
        fetchClientDetails()
    },[])

    return (
        <div className="'Container-fluid">
        <AdminSidebar>
        <AdvertiserNavbar />
            <div className='page_sec p-0'>

                <div className="container mt-2">
                    <div className='row'>
                        <div className="col-lg-6">
                            <div className="offersData">
                                <h4>Clients Details</h4>
                                <hr />
                                <div className="offersDataItem">
                                    <p>Id:</p>
                                    <span>{clientDetails._id}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>Name:</p>
                                    <span>{clientDetails.name}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>Status:</p>
                                    <span>{clientDetails.status}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>Address:</p>
                                    <span>{clientDetails.address}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>Email:</p>
                                    <span>{clientDetails.email}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>Phone:</p>
                                    <span>{clientDetails.mobileNumber}</span> 
                                </div>
                                <div className="offersDataItem">
                                    <p>User Type:</p>
                                    <span>{clientDetails.userType}</span> 
                                </div>
                            </div>

                        </div>

                    </div>
            </div>
            </div>
        </AdminSidebar>
        </div>
    )
}

export default ClientsDetails;