import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../Api/base';
import cardIcon from '../../../assets/images/trend.png'

const PublisherCard = ({title,apiendpoint,apiendpoint2, apiendpoint3})=> {
    const currentmonthData = 2000;
    const [clickLoading, setClickLoading] = useState(false)
    const [convLoading, setConvLoading] = useState(false)
    const [crateLoading, setCrateLoading] = useState(false)
    const [payoutLoading, setPayoutLoading] = useState(false)
    const [impLoading, setImpLoading] = useState(false)
    const [eventLoading, setEventLoading] = useState(false)
    const [total, setTotal] = useState(0)
    const [totalClick, setTotalClick] = useState(0)

    const [totalCurr, setTotalCurr] = useState(0)
    const [totalCrr, setTotalCrr] = useState(0)
    const [clickdata, setClickData] = useState({})
    const [convdata, setConvData] = useState({})
    const [payoutdata, setPayoutData] = useState({})
    const [crData, setCrData] = useState({})
    const [imprData, setImprData] = useState({})

    const [clickTodayData, setClickTodayData] = useState(0)
    const [clickYesterdayData, setClickYesterdayData] = useState(0)
    const [clickWeekData, setClickWeekData] = useState(0)
    const [conversionTodayData, setConversionTodayData] = useState(0)
    const [conversionYesterdayData, setConversionYesterdayData] = useState(0)
    const [conversionWeekData, setConversionWeekData] = useState(0)
    const [payoutTodayData, setPayoutTodayData] = useState(0)
    const [payoutYesterdayData, setPayoutYesterdayData] = useState(0)
    const [payoutWeekData, setPayoutWeekData] = useState(0)
    const [crTodayData, setCrTodayData] = useState(0)
    const [crYesterdayData, setCrYesterdayData] = useState(0)
    const [crWeekData, setCrWeekData] = useState(0)
    const [eventTodayData, setEventTodayData] = useState(0)
    const [eventYesterdayData, setEventYesterdayData] = useState(0)
    const [eventWeekData, setEventWeekData] = useState(0)
    
    const loggedUesr = JSON.parse(localStorage.getItem('userData'));
    const publisherId = loggedUesr.publisherId;

    const fetchTodayData = async()=> {
      setClickLoading(true)
      setConvLoading(true)
      setCrateLoading(true)
      setPayoutLoading(true)
      setImpLoading(true)
      setEventLoading(true)
      try {
        const response = await fetch(`${BASE_URL}${apiendpoint}${publisherId}`)
        const respResult = await response.json();
        const resToday = respResult.responseResult?.$;
        setClickLoading(false)
        setConvLoading(false)
        setCrateLoading(false)
        setPayoutLoading(false)
        setImpLoading(false)
        setEventLoading(false)
        setClickTodayData(respResult)
        setConversionTodayData(respResult)
        setPayoutTodayData(resToday)
        setCrTodayData(respResult?.totalConversion)
        setEventTodayData(respResult.responseResult)
      } catch (error) {
        console.log('Failed in fetching api', error)
        setClickLoading(false)
        setConvLoading(false)
        setCrateLoading(false)
        setPayoutLoading(false)
        setImpLoading(false)
        setEventLoading(false)
      }finally{
        setClickLoading(false)
        setConvLoading(false)
        setCrateLoading(false)
        setPayoutLoading(false)
        setImpLoading(false)
        setEventLoading(false)
      }
     
    }
    const fetchYesterdayData = async()=> {
      const response = await fetch(`${BASE_URL}${apiendpoint2}`)
      const respResult = await response.json();
      const resYesterday = respResult.responseResult?.$;
      setClickYesterdayData(respResult)
      setConversionYesterdayData(respResult)
      setPayoutYesterdayData(resYesterday)
      setCrYesterdayData(respResult?.totalConversion)
      setEventYesterdayData(respResult.responseResult)
    }
    const fetchWeekData = async()=> {
      const response = await fetch(`${BASE_URL}${apiendpoint3}`)
      const respResult = await response.json();
      const resWeek = respResult.responseResult?.$;
      setClickWeekData(respResult)
      setConversionWeekData(respResult)
      setPayoutWeekData(resWeek)
      setCrWeekData(respResult?.totalConversion)
      setEventWeekData(respResult.responseResult)
    }

const fetchApiData = async()=> {
  await fetchTodayData()
  await fetchYesterdayData()
  await fetchWeekData()
}

    useEffect(()=> {
      fetchApiData()
        console.log('apiurl<><>', apiendpoint2)
    },[])

    return (
        <div className="card">
            <div className="card-content">
            <div className='d-flex justify-content-between align-items-center'>
                <h6>{title}</h6>
                {title === 'Payout' ?  <span className='card-currency'>USD</span>  : <img src={cardIcon} alt='growthIcon' width={30} />}
                </div>
                <div className='cardTop'>
                  <p>Today</p>
                {title === 'Click' ? <>
                {clickLoading ? <div className='spinner'></div> : <p className='counter-total'>{clickTodayData?.totalCount ? clickTodayData?.totalCount : '0'} </p>}</>
                : title === 'Conversion' ? <>
                {convLoading ? <div className='spinner'></div> : <p className='counter-total'>{conversionTodayData.responseResult ? conversionTodayData.responseResult : '0'} </p>}</>
                : title === 'Payout' ? <>
                {crateLoading ? <div className='spinner'></div> : <p className='counter-total'>{payoutTodayData ? payoutTodayData : '0'} </p>}</>
                : title === 'CR' ? <>
                {payoutLoading ? <div className='spinner'></div> : <p className='counter-total'>{crTodayData ? crTodayData : '0'} </p>}</>
                : title === 'Impression' ? <>
                {impLoading ? <div className='spinner'></div> : <p className='counter-total'>{imprData?.todayClicks ? imprData?.todayClicks : '0'} </p>}</>
                :title === 'Event' ? <>
                {eventLoading ? <div className='spinner'></div> : <p className='counter-total'>{eventTodayData ? eventTodayData : '0'} </p>}</>
                :<span>{currentmonthData}</span>}
                </div>
                <hr />
        <div className='cardBottom'>
          <div className='cardBottomItem'>
            <span className='text-muted'>Yesterday</span>
            {title === 'Click' ? <span>{clickYesterdayData?.totalCount ? clickYesterdayData?.totalCount : '0'} </span>: title === 'Conversion' ? <span>{conversionYesterdayData.responseResult ? conversionYesterdayData.responseResult : '0'} </span>: title === 'Payout' ? <span>{payoutYesterdayData ? payoutYesterdayData : '0'} </span>:title === 'CR' ? <span>{crYesterdayData ? crYesterdayData : '0'} </span>: title === 'Impression' ? <span>{imprData?.yesterdayClicks ? imprData?.yesterdayClicks : '0'} </span>: title === 'Event' ? <span>{eventYesterdayData ? eventYesterdayData : '0'} </span>:<span>{currentmonthData}</span>}
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>This Week</span>
           {title === 'Click' ? <span>{clickWeekData?.totalCount ? clickWeekData?.totalCount : '0'} </span>: title === 'Conversion' ? <span>{conversionWeekData.responseResult ? conversionWeekData.responseResult : '0'} </span>: title === 'Payout' ? <span>{payoutWeekData ? payoutWeekData : '0'} </span>:title === 'CR' ? <span>{crWeekData ? crWeekData : '0'} </span>: title === 'Impression' ? <span>{imprData?.lastWeekClicks ? imprData?.lastWeekClicks : '0'} </span>:title === 'Event' ? <span>{eventWeekData ? eventWeekData : '0'} </span>:  <span>{currentmonthData}</span>}
          </div>
          <div className='cardBottomItem'>
            <span className='text-muted'>MTD</span>
            {title === 'Click' ? <span>{clickWeekData?.totalCount ? clickWeekData?.totalCount : '0'} </span>: title === 'Conversion' ? <span>{conversionWeekData.responseResult ? conversionWeekData.responseResult : '0'} </span>: title === 'Payout' ? <span>${payoutWeekData ? payoutWeekData : '0'} </span>:title === 'CR' ? <span>{crWeekData ?crWeekData : '0'} </span>: title === 'Impression' ? <span>{totalCrr ? totalCrr: '0'} </span>:title === 'Event' ? <span>{eventWeekData ? eventWeekData :'0'} </span>:  <span>{currentmonthData}</span>}
          </div>
      </div>
            </div>
            
        </div>
    )
}

export default PublisherCard
