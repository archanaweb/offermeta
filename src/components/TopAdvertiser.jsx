import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import BASE_URL from "../Api/base";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const TopAdvertiser =({title,topOffer,topPub,topAdv, topManager})=> {
    const [activeTab, setActiveTab] = useState('tab1');
    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    //   const fetchTopOffers = async ()=> {
    //     setLoading(true)
    //     try {
    //       const res = await fetch(`${BASE_URL}top/topOffer?partners_Id=${subadminId}`)
    //       const resData = await res.json();
    //       setTopOffers(resData.offerStats)
    //     }catch(error){
    //       setLoading(false)
    //       toast.error('something went wrong in topoffers')
    //   }
    // }
    //   const fetchTopAdvertiser = async ()=> {  
    //     setLoading(true)
    //     try {
    //       const res = await fetch(`${BASE_URL}top/topAdvertiser?partners_Id=${subadminId}`)
    //       const resData = await res.json();
    //       setTopAdvertiser(resData.advertiserStats)
    //     } catch(error){
    //       setLoading(false)
    //       toast.error('something went wrong in topAdvertiser')
    //   }   
    //   }
    //   const fetchTopPublisher = async ()=> {
    //     setLoading(true)
    //     try {
    //       const res = await fetch(`${BASE_URL}top/topPublisher?partners_Id=${subadminId}`)
    //       const resData = await res.json();
    //       setTopPublisher(resData.publisherStats)
    //     }catch(error){
    //       setLoading(false)
    //       toast.error('something went wrong in topPublisher')
    //   }   
    //   }
    //   const fetchTopManager = async ()=> {
    //     setLoading(true)
    //     try {
    //       const res = await fetch(`${BASE_URL}top/topManager?partners_Id=${subadminId}`)
    //       const resData = await res.json();
    //       setTopManager(resData.managerStats)
    //     }catch(error){
    //       setLoading(false)
    //       toast.error('something went wrong in topManager')
    //   }   
    //   }

    //   async function fetchTopApis(){
    //     await fetchTopOffers()
    //     await fetchTopAdvertiser()
    //     await fetchTopPublisher()
    //     await fetchTopManager()
        
    // }
    // useEffect(()=>{
    //   fetchTopApis();
    // },[]);
    useEffect(()=>{
      console.log('top1',topOffer)
      console.log('top2',topPub)
      console.log('top3',topAdv)
      console.log('top4',topManager)
    },[topOffer,topPub,topAdv,topManager])
    return (
        <>
               <div className="topWrapper">
                <h3 className="pb-2">{title}</h3>
                <div className="topTabs">
                    <button className={activeTab === 'tab1' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab1')}>Today</button>
                    <button className={activeTab === 'tab2' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab2')}>Yesterday</button>
                    <button className={activeTab === 'tab3' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab3')}>MTD</button>
                    <button className={activeTab === 'tab4' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab4')}>Last Month</button>
                </div>
               {activeTab === 'tab1' && <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        {/* <th>Clicks</th> */}
                        <th>Conversions</th>
                        <th>Impressions</th>
                        <th>Payout</th>
                      </tr>
                    </thead>
                    <tbody>
                      {title === 'Top Offer' && topOffer?.map((item)=> 
                        <tr key={item.offerId}>
                          <td>(ID: {item.offerId}) {item.title}</td>
                          {/* <td>{item.totalClicks}</td> */}
                          <td>{item.totalConversions}</td>
                          <td>{item.totalImpressions}</td>
                          <td>{item.totalPayout}</td>
                      </tr>
                      ) }
                      
                      {title === 'Top Publisher' && topPub?.map((item,i)=> 
                        <tr key={item?.publisherId}>
                          <td>(ID: {item.publisherId}) {item.publisher_First_name} {item.publisher_Last_name}</td>
                          {/* <td>{item.totalClicks}</td> */}
                          <td>{item.totalConversions}</td>
                          <td>{item.totalImpressions}</td>
                          <td>{item.totalPayout}</td>
                      </tr>
                      ) }
                       {title === 'Top Advertiser' && topAdv?.map((item,i)=> 
                        <tr key={i}>
                          <td>(ID: {item.advertiserId}) {item.advertiser_First_name} {item.advertiser_Last_name}</td>
                          {/* <td>{item.totalClicks}</td> */}
                          <td>{item.totalConversions}</td>
                          <td>{item.totalImpressions}</td>
                          <td>{item.totalPayout}</td>
                      </tr>
                      ) }
                      {title === 'Top Manager' && topManager?.map((item,i)=> 
                        <tr key={item?.publisherManagerId}>
                          <td>(ID: {item.publisherManagerId}) {item.publisherManager}</td>
                          {/* <td>{item.totalClicks}</td> */}
                          <td>{item.totalConversions}</td>
                          <td>{item.totalImpressions}</td>
                          <td>{item.totalPayout}</td>
                      </tr>
                      ) }
                    </tbody>
                </table>
            </div>}
              {activeTab === 'tab2' && <div>This is Tab 2 Content</div>}
              {activeTab === 'tab3' && <div>This is Tab 3 Content</div>}
              {activeTab === 'tab4' && <div>This is Tab 4 Content</div>}
            </div>
        </>
    )
}
export default TopAdvertiser;