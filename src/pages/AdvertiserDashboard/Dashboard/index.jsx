import React from "react";
import TotalChart from "../../../components/Chart";
import ManagerCard from "./Cards";
import AdvertiserCard from "./Cards";

const AdvertiserManagerDashboard = ()=>{
    return (
        <>
            <div className='page_sec'>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4">
                        <AdvertiserCard title="Click" apiendpoint="manager/totalClick?advertiserTotalClick=" />
                        </div>
                        <div className="col-lg-4">
                        <AdvertiserCard title="Conversion" apiendpoint="manager/totalConversion?publisherManagerId="/>
                        </div>
                        <div className="col-lg-4">
                        <AdvertiserCard title="Payout" apiendpoint="manager/totalPayout?publisherManagerId="/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                        <AdvertiserCard title="Revenue" apiendpoint="manager/totalRevenue?publisherManagerId=" />
                        </div>
                        <div className="col-lg-4">
                        <AdvertiserCard title="Impression" apiendpoint="manager/totalImression?publisherManagerId="/>
                        </div>
                        <div className="col-lg-4">
                        <AdvertiserCard title="Event" apiendpoint="manager/totalEvent?publisherManagerId="/>
                        </div>
                    </div>
                    <div className="row">
                        <TotalChart />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdvertiserManagerDashboard;