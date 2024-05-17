import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../Api/base';
import cardIcon from '../../../assets/images/trend.png'

const ManagerCard = ({title,apiendpoint,apiendpoint2, apiendpoint3,yesterdayDate, weekAgoDate})=> {

    const [total, setTotal] = useState() 
    const [totalAmount ,setTotalAmount] = useState(0)
    const [totalPayout ,setTotalPayout] = useState(0)
    const [totalRevenue ,setTotalRevenue] = useState(0)
    const [yesterdayData, setYesterdayData] = useState() 
    const [yesterdayAmount ,setYesterdayAmount] = useState(0)
    const [yesterdayPayout ,setYesterdayPayout] = useState(0)
    const [yesterdayRevenue ,setYesterdayRevenue] = useState(0)
    const [weekData, setWeekData] = useState() 
    const [weekAmount ,setWeekAmount] = useState(0)
    const [weekPayout ,setWeekPayout] = useState(0)
    const [weekRevenue ,setWeekRevenue] = useState(0)
    const [loading, setLoading] = useState(true)
    const loggedUesr = JSON.parse(localStorage.getItem('userData'));
    const managerId = loggedUesr.managerId;


    const fetchTotalData = async()=> {
          setLoading(true)
        try {
          const response = await fetch(`${BASE_URL}${apiendpoint}${managerId}` );
          const respResult = await response.json();
          const resTotal = respResult.responseResult;
          setTotal(resTotal);
          setTotalAmount(resTotal?.$)
          setTotalPayout(respResult?.totalPayout)
          setTotalRevenue(respResult?.totalRevenue)
          setLoading(false)
        } catch (error) {
          setLoading(false)
        }
    }
    const fetchYesterDayData = async()=> {
        const response = await fetch(`${BASE_URL}${apiendpoint2}` );
        const respResult = await response.json();
        const resTotal = respResult.responseResult;
        setYesterdayRevenue(respResult?.totalRevenue)
        setYesterdayPayout(respResult.totalPayout)
        setYesterdayData(resTotal);
        setYesterdayAmount(resTotal?.$)
    }
    const fetchWeekAgoData = async()=> {
        const response = await fetch(`${BASE_URL}${apiendpoint3}` );
        const respResult = await response.json();
        const resTotal = respResult.responseResult;
        setWeekRevenue(respResult?.totalRevenue)
        setWeekPayout(respResult?.totalPayout)
        setWeekData(resTotal);
        setWeekAmount(resTotal?.$)
    }

    useEffect(()=> {
        fetchTotalData()
    },[])
    useEffect(()=> {
        fetchYesterDayData()
    },[yesterdayDate])
    useEffect(()=> {
        fetchWeekAgoData()
    },[weekAgoDate])
  

    return (
        <div className="card">
            <div className="card-content">
            <div className='d-flex justify-content-between align-items-center'>
                <h6>{title}</h6>
                {title === 'Revenue' ?  <span className='card-currency'>USD</span> : title === 'Payout' ?  <span className='card-currency'>USD</span> : <img src={cardIcon} alt='growthIcon' width={30} />}
                </div>
                <div className='cardTop'>
                  <p>Today</p>
                  {title === 'Click' ?<> {loading ? <div className='spinner'></div> : <p className='counter-total'>{total ? total: '0'}</p>} </>: title === 'Conversion' ? <> {loading ? <div className='spinner'></div> : <p className='counter-total'>{total ? total: '0'}</p>}</> : title === 'Payout' ?  <> {loading ? <div className='spinner'></div> : <p className='counter-total'>{totalPayout ? totalPayout: '0'}</p>}</> : title === 'Revenue' ? <> {loading ? <div className='spinner'></div> : <p className='counter-total'>{totalRevenue ? totalRevenue : '0'}</p>}</> : <p className='counter-total'>0</p>}
                  {/* <p className='counter-total'>{title === 'Payout' ? {totalAmount} : title === 'Revenue' ? {totalAmount} : {total}}</p> */}
                </div>
                <hr />
        <div className='cardBottom'>
          <div className='cardBottomItem'>
            <span className='text-muted'>Yesterday</span>
            {title === 'Click' ? <span>{yesterdayData ? yesterdayData: '0'}</span> : title === 'Conversion' ? <span>{yesterdayData ? yesterdayData: '0'}</span> : title === 'Payout' ?  <span>{yesterdayPayout ? yesterdayPayout: '0'}</span> : title === 'Revenue' ? <span>{yesterdayRevenue ? yesterdayRevenue : '0'}</span> : <span>0</span>}
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>This Week</span>
            {title === 'Click' ? <span>{weekData ? weekData: '0'}</span> : title === 'Conversion' ? <span>{weekData ? weekData: '0'}</span> : title === 'Payout' ?  <span>{weekPayout ? weekPayout: '0'}</span> : title === 'Revenue' ? <span>{weekRevenue ? weekRevenue : '0'}</span> : <span>0</span>}
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>MTD</span>
            {title === 'Click' ? <span>{weekData ? weekData: '0'}</span> : title === 'Conversion' ? <span>{weekData ? weekData: '0'}</span> : title === 'Payout' ?  <span>{weekPayout ? weekPayout: '0'}</span> : title === 'Revenue' ? <span>{weekRevenue ? weekRevenue : '0'}</span> : <span>0</span>}
          </div>
      </div>
            </div>
            
        </div>
    )
}

export default ManagerCard
