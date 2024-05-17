import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import BASE_URL from "../../../Api/base";
import { fetchMangEventReport} from "../../../Redux/PerformanceSlice";
import PerformanceReport from "./PerformanceReport";
import EventReport from "./EventReport";

const ManagerPerformance = ()=> {
    const [activeTab, setActiveTab] = useState('tab1')
    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };

    return (
        <>
        <div className='page_sec pt-3'>
        <div className="topTabs performanceTab mt-3">
                    <button className={activeTab === 'tab1' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab1')}>General Report</button>
                    <button className={activeTab === 'tab2' ? 'active-tab btn tabBtn' : 'btn tabBtn'} onClick={() => handleTabClick('tab2')}>Event Report</button>
                </div>
        {activeTab === 'tab1' && <PerformanceReport />}

        {activeTab === 'tab2' && <EventReport />}
        {/* {activeTab === 'tab3' && <div>Tab3</div>}
        {activeTab === 'tab4' && <div>Tab4</div>} */}
        </div>
        </>
    )
}
export default ManagerPerformance;