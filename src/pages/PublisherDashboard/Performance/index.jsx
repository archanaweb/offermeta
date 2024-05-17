import React, { useEffect, useState } from "react"; 
import PerformanceReport from "./PerformanceReport";
import EventReport from "./EventReport";

const PublisherPerformance = ()=> {
    const [activeTab, setActiveTab] = useState('tab1')
    const handleTabClick = (tab) => {
      console.log('activeTab', activeTab)
      setActiveTab(tab);
    };
    useEffect(()=> {
      
    },[])

    return (
        <>
        <div className='page_sec pt-3'>
          <div className="container">
        <div className="topTabs performanceTab">
                    <button className={activeTab === 'tab1' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab1')}>General Report</button>
                    <button className={activeTab === 'tab2' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab2')}>Event Report</button>
                </div>
        {activeTab === 'tab1' && 
          <PerformanceReport />
        }

        {activeTab === 'tab2' && 
        <EventReport />
          }
          </div>
        </div>
        </>
    )
}
export default PublisherPerformance;