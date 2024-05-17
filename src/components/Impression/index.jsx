import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalImpression } from "../../Redux/ImpressionSlice";

const Impression =({ title, yesterdayData, currentmonthData, lastmonthData, today })=> {
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const impression = useSelector((state)=> state.impression.click)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(fetchTotalImpression(LoggedInUser._id))
    },[])

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
            <span>{impression ? impression : '0'}</span>
          </div>
      </div>
    </div>
    </div>
        </>
    )
}

export default Impression;