import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalImpression } from "../../Redux/ImpressionSlice";
import BASE_URL from "../../Api/base";

const EventData =({ title, yesterdayData, currentmonthData, lastmonthData, today })=> {
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const [total, setTotal] = useState(0)

    const fetchTotal = async()=> {
        const res = await fetch(`${BASE_URL}conversion/totalEvent?partners_Id=${LoggedInUser._id}`)
        const resData = await res.json()
        setTotal(resData.responseResult)
    }

    const cardStyle = {
        borderRadius: 10, // Border size and color
      };
    return (
        <>
         <div className="card" style={cardStyle}>
      <div className="card-content">
          <h6>{title}</h6>
          <div className='cardTop'>
            <p>Today</p>
            <p className='counter-total'>{today}</p>
          </div>
        <hr />
        <div className='cardBottom'>
          <div className='cardBottomItem'>
            <span className='text-muted'>Yesterday</span>
            <span>{yesterdayData}</span>
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>This Week</span>
            <span>{currentmonthData}</span>
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'> MTD</span>
            <span>{total}</span>
          </div>
      </div>
    </div>
    </div>
        </>
    )
}

export default EventData;