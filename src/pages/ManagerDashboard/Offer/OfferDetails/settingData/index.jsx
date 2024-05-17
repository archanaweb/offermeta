import React, { useState } from "react";
import LandingPage from "../LandingPage";
import { useParams } from "react-router-dom";

const ManagerOfferSettingData = ()=> {
    const [activeTab, setActiveTab] =  useState('showLandingPage');
    const {id}  = useParams()

    const handleTabClick = (tab) => {
        setActiveTab(tab);
      };
    return (
        <>
       <div className='page_sec pt-3'>
        <div className="container">
                <div className="bg-white px-2 py-2">
                <div className="row pt-2">
                    <div className="col-lg-3">
                        <div className="setting-items">
                            <ul className="list-group list-group-flush">
                                <li className={activeTab === 'showLandingPage' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('showLandingPage')}>Landing Page</li>
                                <li className={activeTab === 'showOptimisationTool' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('showOptimisationTool')}>Optimisation Tool</li>
                                <li className={activeTab === 'tab3' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('tab3')}>Cap</li>
                                <li className={activeTab === 'blockPub' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('blockPub')}>Block Publisher</li>
                                <li className={activeTab === 'tab5' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('tab5')}>Fallback</li>
                                <li className={activeTab === 'tab6' ? "list-group-item my-2 cursor-pointer active" : "list-group-item my-2 cursor-pointer"} onClick={() => handleTabClick('tab6')}>Geo Targeting</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-9">
                        {activeTab === 'showLandingPage' && <><p>Landing page</p></>}
                        {activeTab === 'showOptimisationTool' && <><p>Optimization tool</p></>}
                        {activeTab === 'tab3' && <><div>Tab3</div></>}
                        {activeTab === 'blockPub' &&<><p>Block publisher</p></>}
                        {activeTab === 'tab5' && <><div>Tab4</div></>}
                        {activeTab === 'tab6' && <><div>Tab5</div></>}
                    </div>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default ManagerOfferSettingData;