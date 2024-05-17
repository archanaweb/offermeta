import React, { useEffect, useState } from "react";
import PublisherCard from "./Cards";
import TotalChart from "../../../components/Chart";
import { Link } from "react-router-dom";

const PublisherDashboard = ()=>{
    const loggedUesr = JSON.parse(localStorage.getItem('userData'));
    const partnerId = loggedUesr.partners_Id;
    const [currentDate, setCurrentDate] = useState(new Date())
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
        // Create the formatted date string
        const startWeekFormattedDate = `${startWeekYear}-${startWeekMonth}-${startWeekDay}`;
        const yesturdayFormattedDate = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;
        setYesterdayDate(yesturdayFormattedDate);
        setWeekAgoDate(startWeekFormattedDate)
      }, []);
    return (
        <>
                    <div className='page_sec pt-3'>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-4">
                                   {yesterdayDate && weekAgoDate && <PublisherCard title="Click" apiendpoint={`publicher/totalPublisherClick?partners_Id=${partnerId}&publisherId=`} apiendpoint2={`publicher/totalPublisherClick?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`publicher/totalPublisherClick?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`}/>}
                                </div>
                                <div className="col-lg-4">
                                    {yesterdayDate && weekAgoDate && <PublisherCard title="Conversion" apiendpoint={`publicher/totalPublisherConverion?partners_Id=${partnerId}&publisherId=`} apiendpoint2={`publicher/totalPublisherConverion?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`publicher/totalPublisherConverion?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`}/>}
                                </div>
                                <div className="col-lg-4">
                                    {yesterdayDate && weekAgoDate && <PublisherCard title="CR" apiendpoint={`publicher/PublisherConversionRate?partners_Id=${partnerId}&publisherId=`} apiendpoint2={`publicher/PublisherConversionRate?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`publicher/PublisherConversionRate?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`}/>}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-4">
                                    {yesterdayDate && weekAgoDate && <PublisherCard title="Impression" apiendpoint="publicher/PublisherTotalImpression?affiliateId=" apiendpoint2='publicher/publisherImpData?affiliateId=' />}
                                </div>
                                <div className="col-lg-4">
                                    {yesterdayDate && weekAgoDate && <PublisherCard title="Event" apiendpoint={`publicher/PublisherTotalEvent?partners_Id=${partnerId}&publisherId=`} apiendpoint2={`publicher/PublisherTotalEvent?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`publicher/PublisherTotalEvent?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`} />}
                                </div>
                                <div className="col-lg-4">
                                    {yesterdayDate && weekAgoDate && <PublisherCard title="Payout" apiendpoint={`publicher/totalPublisherPayout?partners_Id=${partnerId}&publisherId=`} apiendpoint2={`publicher/totalPublisherPayout?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`} apiendpoint3={`publicher/totalPublisherPayout?partners_Id=${partnerId}&publisherId=${loggedUesr.publisherId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`}/>}
                                </div>
                            </div>
                            <div className="row">
                                <TotalChart />
                            </div>
                            <div className="poweredBy p-2 text-center bg-white">
                                <Link to='https://www.offersmeta.com/' target='_blank'><p className="mb-0">Powered By OffersMeta</p></Link>
                            </div>
                        </div>
                    </div>
               </>
    )
}

export default PublisherDashboard;