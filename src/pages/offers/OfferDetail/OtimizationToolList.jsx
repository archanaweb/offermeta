import React, { useState } from "react";
import BASE_URL from "../../../Api/base";
import { useParams } from "react-router-dom";

const OptimizationToolList = ()=> {
    const [optimList, setOptimiList]= useState()
    const {id} = useParams()
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const partnerId = LoggedInUser._id;
    // const fetchOptimizationList = async()=> {
    //     const response = await fetch(`${BASE_URL}conversion/optimizationToolsList?partners_Id=${partnerId}&publisherId=4&offerId=${id}`)
    //     const res = await response.json()
    //     console.log(res)
    //     setOptimiList(res?.responseResult)
    // }
    return (
        <>
          <div className="offersData">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>Optimization Tool</h3>
                {/* <Link to={`/landingPages?offerid=${id}`} className="btn btn-outline-secondary btn-sm" >Manage</Link> */}
        </div> 
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Event value</th>
                        <th>Percentage</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {/* {optimList?.map((item)=> <tr key={item?._id}>
                            <td>{item.title ? item.title : 'default'}</td>
                            <td>{item?.trackingUrl}</td>
                        </tr>)} */}
                   
                </tbody>
            </table>
        </div>                          
    </div>
        </>
    )
}
export default OptimizationToolList;
