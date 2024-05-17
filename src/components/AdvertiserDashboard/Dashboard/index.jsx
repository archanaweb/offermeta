import React from "react";
import AdvertiserNavbar from "./Navbar";
import AdminCard from "./Cards";
import AdminSidebar from "./Sidebar";

const AdvertiserDashboard = ()=> {
    return (
        <>
            <div className="'Container-fluid">
                <AdminSidebar>
                <AdvertiserNavbar />
                    <div className='page_sec'>
                        <div className="container mt-4">
                            <div className="row">
                                <div className="col-lg-4">
                                <AdminCard title="Active Clients" />
                                </div>
                                <div className="col-lg-4">
                                <AdminCard title="Pending Clients"/>
                                </div>
                                <div className="col-lg-4">
                                </div>
                            </div>
                        </div>
                    </div>
                </AdminSidebar>
            </div>
        </>
    )
}

export default AdvertiserDashboard;