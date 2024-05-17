import React, { useEffect, useState } from "react";
import GeneralReport from "./GeneralReport";
import EventReport from "./EventReportTab";

const Performance = ()=> {
    const [activeTab, setActiveTab] = useState('tab1')

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    return (
        <>
        <div className='page_sec pt-3'>
          <div className="container">
          <div className="topTabs performanceTab">
                    <button className={activeTab === 'tab1' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab1')}>GENERAL REPORT</button>
                    <button className={activeTab === 'tab2' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab2')}>EVENT REPORT</button>
                    <button className={activeTab === 'tab3' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab3')}>GOOGLE ADS</button>
          </div>
        {activeTab === 'tab1' && 
          <GeneralReport />
        }

        {activeTab === 'tab2' && 
          <EventReport />
          }
        {activeTab === 'tab3' && <div className="table-container">Nothing found</div>}
        </div>
        </div>
        </>
    )
}
export default Performance;