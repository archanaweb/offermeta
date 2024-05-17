import React, { useEffect, useState } from "react";
import TotalChart from "../../../components/Chart";
import ManagerCard from "./Cards";

const ManagerDashboard = ({setLogggedInUser})=>{
    const loggedIn = JSON.parse(localStorage.getItem('userData'));
    const partnerId = loggedIn?.partners_Id;
    const managerId = loggedIn.managerId;
    const currentDate = new Date();
    const [yesterdayDate, setYesterdayDate] = useState(null);
    const [weekAgoDate, setWeekAgoDate] = useState(null);
    useEffect(() => {
        const yesterday = new Date();
        const weekAgo = new Date();
        weekAgo.setDate(currentDate.getDate() - 7)
        yesterday.setDate(currentDate.getDate() - 1);
        const yesterdayYear = yesterday.getFullYear()
        const yesterdayMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
        const yesterdayDay = yesterday.getDate().toString().padStart(2, '0');
        const startWeekYear = weekAgo.getFullYear()
        const startWeekMonth = (weekAgo.getMonth() + 1).toString().padStart(2, '0');
        const startWeekDay = weekAgo.getDate().toString().padStart(2, '0');
        const startWeekFormattedDate = `${startWeekYear}-${startWeekMonth}-${startWeekDay}`;
        const yesturdayFormattedDate = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;
        setYesterdayDate(yesturdayFormattedDate);
        setWeekAgoDate(startWeekFormattedDate)
        setLogggedInUser(loggedIn)
      }, []);
    return (
        <>
            <div className='page_sec'>
                <div className="container mt-3">
                    <div className="row">
                        <div className="col-lg-4">
                        <ManagerCard title="Click" apiendpoint={`manager/totalClick?partners_Id=${partnerId}&publisherManagerId=`} apiendpoint2={`manager/totalClick?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalClick?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`}  yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
                        </div>
                        <div className="col-lg-4">
                        <ManagerCard title="Conversion" apiendpoint={`manager/totalConversion?partners_Id=${partnerId}&publisherManagerId=`} apiendpoint2={`manager/totalConversion?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalConversion?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
                        </div>
                        <div className="col-lg-4">
                        <ManagerCard title="Payout" apiendpoint={`manager/totalPayout?partners_Id=${partnerId}&publisherManagerId=`} apiendpoint2={`manager/totalPayout?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalPayout?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-4">
                        <ManagerCard title="Revenue" apiendpoint={`manager/totalRevenue?partners_Id=${partnerId}&publisherManagerId=`}  apiendpoint2={`manager/totalRevenue?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalRevenue?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
                        </div>
                        <div className="col-lg-4">
                        <ManagerCard title="Impression" apiendpoint={`manager/totalImression?partners_Id=${partnerId}&publisherManagerId=`} apiendpoint2={`manager/totalImression?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalImression?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
                        </div>
                        <div className="col-lg-4">
                        <ManagerCard title="Event" apiendpoint={`manager/totalEvent?partners_Id=${partnerId}&publisherManagerId=`} apiendpoint2={`manager/totalEvent?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`manager/totalEvent?partners_Id=${partnerId}&publisherManagerId=${managerId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} yesterdayDate={yesterdayDate} weekAgoDate={weekAgoDate} />
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

export default ManagerDashboard;