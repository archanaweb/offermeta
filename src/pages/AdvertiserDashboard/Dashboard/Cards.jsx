import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../Api/base';

const AdvertiserCard = ({title,apiendpoint})=> {

    const yesterdayData = 0;
    const currentmonthData = 0;
    const lastmonthData = 0;
    const [total, setTotal] = useState(0) 
    const [totalAmount ,setTotalAmount] = useState(0)
    const loggedUesr = JSON.parse(localStorage.getItem('userData'));
    const advertiserId = loggedUesr.advertiserId;


    const fetchTotalData = async()=> {
        const response = await fetch(`${BASE_URL}${apiendpoint}${advertiserId}` );
        const respResult = await response.json();
        const resTotal = respResult.responseResult;
        setTotal(resTotal);
        setTotalAmount(resTotal?.$)
    }

    useEffect(()=> {
        fetchTotalData()
    },[])
    useEffect(()=> {
      console.log('manager total', total)
      console.log('manager totalAmount', totalAmount)
  },[total, totalAmount])
  

    return (
        <div className="card">
            <div className="card-content">
                <h6>{title}</h6>
                <div className='cardTop'>
                  <p>Today</p>
                  {title === 'Payout' ?  <p className='counter-total'>{totalAmount ? totalAmount: '0'}</p> : title === 'Revenue' ? <p className='counter-total'>{totalAmount ? totalAmount : '0'}</p> : <p className='counter-total'>0</p>}
                  {/* <p className='counter-total'>{title === 'Payout' ? {totalAmount} : title === 'Revenue' ? {totalAmount} : {total}}</p> */}
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
            <span className='text-muted'>MTD</span>
            <span>{lastmonthData}</span>
          </div>
      </div>
            </div>
            
        </div>
    )
}

export default AdvertiserCard
