import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Card from '../components/Card/index';
import BASE_URL from "../Api/base";
import { toast } from "react-toastify";
import TotalChart from "../components/Chart";
import TopAdvertiser from "../components/TopAdvertiser";
import { tuple } from "rsuite/esm/@types/utils";
import { set } from "date-fns";
import { Link } from "react-router-dom";

  // function fetchData(url) {
  // return fetch(url)
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error('Network response was not ok');
  //   }
  //   return response.json();
  // });   
  //  }

const Dashboard =()=> {
    const [topOffers, setTopOffers] = useState([])
    const [topPublisher, setTopPublisher] = useState([])
    const [topAdvertiser, setTopAdvertiser] = useState([])
    const [topManager, setTopManager] = useState([])
    const [clickLoading, setClickLoading] = useState(true)
    const [convLoading, setConvLoading] = useState(true)
    const [crateLoading, setCrateLoading] = useState(true)
    const [revenueLoading, setRevenueLoading] = useState(true)
    const [payoutLoading, setPayoutLoading] = useState(true)
    const [profitLoading, setProfitLoading] = useState(true)
    const [loading, setLoading] = useState(false)
    const [clickTodayData, setClickTodayData] =  useState()
    const [clickYesterdayData, setClickYesterdayData] =  useState()
    const [clickWeekData, setClickWeekData] =  useState()
    const [clickMtdData, setClickMtdData] =  useState()
    const [conversionTodayData, setConversionTodayData] =  useState()
    const [conversionYesterdayData, setConversionYesterdayData] =  useState()
    const [conversionWeekData, setConversionWeekData] =  useState()
    const [conversionMtdData, setConversionMtdData] =  useState()
    const [payoutTodayData, setPayoutTodayData] =  useState()
    const [payoutYesterdayData, setPayoutYesterdayData] =  useState()
    const [payoutWeekData, setPayoutWeekData] =  useState()
    const [payoutMtdData, setPayoutMtdData] =  useState()
    const [revenueTodayData, setRevenueTodayData] =  useState()
    const [revenueYesterdayData, setRevenueYesterdayData] =  useState()
    const [revenueWeekData, setRevenueWeekData] =  useState()
    const [revenueMtdData, setRevenueMtdData] =  useState()
    const [profitTodayData, setProfitTodayData] =  useState()
    const [profitYesterdayyData, setProfitYesterdayData] =  useState()
    const [profitWeekData, setProfitWeekData] =  useState()
    const [profitMtdData, setProfitMtdData] =  useState()
    const [crateTodayData, setCrateTodayData] =  useState()   
    const [crateYesterdayData, setCrateYesterdayData] =  useState()   
    const [crateWeekData, setCrateWeekData] =  useState()   
    const [crateMtdData, setCrateMtdData] =  useState()   
    const [impressionTodayData, setImpressionTodayData] =  useState()
    const [impressionYesterdayData, setImpressionYesterdayData] =  useState()
    const [impressionWeekData, setImpressionWeekData] =  useState()
    const [impressionMtdData, setImpressionMtdData] =  useState()
    const [eventTodayData, setEventTodayData] =  useState()
    const [eventYesterdayData, setEventYesterdayData] =  useState()
    const [eventWeekData, setEventWeekData] =  useState()
    const [eventMtdData, setEventMtdData] =  useState()
    const [showCard, setShowCard]= useState(false)
    const [currentDate, setCurrentDate] = useState(new Date());
    const [yesterdayDate, setYesterdayDate] = useState(null);
    const [weekAgoDate, setWeekAgoDate] = useState(null);
    const [monthTillDate, setMonthTillDate] = useState(null);
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const subadminId = loggedInUser?._id
    const fetchClickTodayData = async ()=> {
      setClickLoading(true)
        try{
            const res = await fetch(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}`)
            const resData = await res.json();
            setClickTodayData(resData?.totalCount)
            setClickLoading(false)
            // toast.success('clickData')
        }catch(error){   
            setClickLoading(false)
            toast.error('something went wrong in clickdata')
        }
      }
    const fetchClickYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setClickYesterdayData(resData?.totalCount)
            // toast.success('clickData')
        }catch(error){    
            toast.error('something went wrong in clickdata')
        }
      }
    const fetchClickWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setClickWeekData(resData?.totalCount)
            // toast.success('clickData')
        }catch(error){    
            toast.error('something went wrong in clickdata')
        }
      }
    const fetchClickMtdData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setClickMtdData(resData?.totalCount)
            // toast.success('clickData')
        }catch(error){    
            toast.error('something went wrong in clickdata')
        }
      }
      const fetchConversionTodayData = async ()=> {
        setConvLoading(true)
        try{
            const res = await fetch(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}`)
            const resData = await res.json();
            setConversionTodayData(resData?.responseResult)
            setConvLoading(false)
        }catch(error){
            toast.error('something went wrong in conversionData')
            setConvLoading(false)
        }
      }
      const fetchConversionYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setConversionYesterdayData(resData?.responseResult)
        }catch(error){
            toast.error('something went wrong in conversionData')
        }
      }
      const fetchConversionWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setConversionWeekData(resData?.responseResult)
        }catch(error){
            toast.error('something went wrong in conversionData')
        }
      }
      const fetchConversionMtdData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setConversionMtdData(resData?.responseResult)
        }catch(error){
            toast.error('something went wrong in conversionData')
        }
      }
      const fetchCrateTodayData = async ()=> {
        setCrateLoading(true)
          try{
              const res = await fetch(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}`)
              const resData = await res.json();
              setCrateTodayData(resData?.totalConversion)
              setCrateLoading(false)
            }catch(error){
            toast.error('something went wrong in crData')
            setCrateLoading(false)
        }
      }
      const fetchCrateYesterdayData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setCrateYesterdayData(resData?.totalConversion)
            }catch(error){
            toast.error('something went wrong in crData')
        }
      }
      const fetchCrateWeekData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setCrateWeekData(resData?.totalConversion)
            }catch(error){
            toast.error('something went wrong in crData')
        }
      }
      const fetchCrateMtdData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setCrateMtdData(resData?.totalConversion)
            }catch(error){
            toast.error('something went wrong in crData')
        }
      }
      const fetchPayoutTodayData = async ()=> {
        setPayoutLoading(true)
          try{
              const res = await fetch(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}`)
              const resData = await res.json();
              setPayoutTodayData(resData?.totalPayout)
              setPayoutLoading(false) 
            }catch(error){
              toast.error('something went wrong in payoutData')
              setPayoutLoading(false) 
        }
      } 
      const fetchPayoutYesterdayData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setPayoutYesterdayData(resData?.totalPayout)
            }catch(error){
            toast.error('something went wrong in payoutData')
        }
      } 
      const fetchPayoutWeekData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setPayoutWeekData(resData?.totalPayout)
            }catch(error){
            toast.error('something went wrong in payoutData')
        }
      } 
      const fetchPayoutMtdData = async ()=> {
          try{
              const res = await fetch(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
              const resData = await res.json();
              setPayoutMtdData(resData?.totalPayout)
            }catch(error){
            toast.error('something went wrong in payoutData')
        }
      } 
      const fetchRevenueTodayData = async ()=> {
        setRevenueLoading(true)
          try{
              const res = await fetch(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}`)
              const resData = await res.json();
              setRevenueTodayData(resData?.totalRevenue)
              setRevenueLoading(false)
            }catch(error){
            toast.error('something went wrong in Revenuedata')
            setRevenueLoading(false)
        }
      }
      const fetchRevenueYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setRevenueYesterdayData(resData?.totalRevenue)
          }catch(error){
          toast.error('something went wrong in RevenueData')
      }
    } 
    const fetchRevenueWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setRevenueWeekData(resData?.totalRevenue)
          }catch(error){
          toast.error('something went wrong in RevenueData')
      }
    } 
    const fetchRevenueMtdData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setRevenueMtdData(resData?.totalRevenue)
          }catch(error){
          toast.error('something went wrong in RevenueData')
      }
    } 
      
      const fetchProfitTodayData = async ()=> {
        setProfitLoading(true)
          try{
              const res = await fetch(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}`)
              const resData = await res.json();
              setProfitTodayData(resData?.totalProfit)
              setProfitLoading(false) 
            }catch(error){
            toast.error('something went wrong in profitData')
            setProfitLoading(false) 
        }
      }
      const fetchProfitYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setProfitYesterdayData(resData?.totalProfit)
          }catch(error){
          toast.error('something went wrong in ProfitData')
      }
    } 
    const fetchProfitWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setProfitWeekData(resData?.totalProfit)
          }catch(error){
          toast.error('something went wrong in ProfitData')
      }
    } 
    const fetchProfitMtdData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setProfitMtdData(resData?.totalProfit)
          }catch(error){
          toast.error('something went wrong in ProfitData')
      }
    } 
      const fetchImpressionTodayData = async ()=> {
        try {
          const res = await fetch(`${BASE_URL}impression/totalImpression?partners_Id=${subadminId}`)
          const resData = await res.json();
          setImpressionTodayData(resData)
        }catch(error){
          toast.error('something went wrong in impressionData')
      }
      }
      const fetchImpressionYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}impression/totalImpression?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setImpressionYesterdayData(resData)
          }catch(error){
          toast.error('something went wrong in impressionData')
      }
    } 
    const fetchImpressionWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}impression/totalImpression?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setImpressionWeekData(resData)
          }catch(error){
          toast.error('something went wrong in impressionData')
      }
    }
    const fetchImpressionMtdData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}impression/totalImpression?partners_Id=${subadminId}&startDate=${monthTillDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setImpressionMtdData(resData)
          }catch(error){
          toast.error('something went wrong in impressionData')
      }
    }
      const fetchEventTodayData = async ()=> {
        try {
          const res = await fetch(`${BASE_URL}conversion/totalEvent?partners_Id=${subadminId}`)
          const resData = await res.json();
          setEventTodayData(resData)  
        }catch(error){
          toast.error('something went wrong in eventData')
      }
      }
      const fetchEventYesterdayData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalEvent?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setEventYesterdayData(resData)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    } 
    const fetchEventWeekData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}conversion/totalEvent?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
            const resData = await res.json();
            setEventWeekData(resData)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    }
    const fetchTopOffersData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}top/topOffer?partners_Id=${subadminId}`)
            const resData = await res.json();
            setTopOffers(resData?.offerStats)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    }
    const fetchTopPubData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}top/topPublisher?partners_Id=${subadminId}`)
            const resData = await res.json();
            setTopPublisher(resData?.publisherStats)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    }
    const fetchTopAdvData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}top/topAdvertiser?partners_Id=${subadminId}`)
            const resData = await res.json();
            setTopAdvertiser(resData?.advertiserStats)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    }
    const fetchTopManagerData = async ()=> {
        try{
            const res = await fetch(`${BASE_URL}top/topManager?partners_Id=${subadminId}`)
            const resData = await res.json();
            setTopManager(resData?.managerStats)
          }catch(error){
          toast.error('something went wrong in EventData')
      }
    }
    async function fetchTodayApis(){
      await fetchClickTodayData();
      await fetchConversionTodayData();
      await fetchCrateTodayData()
      await fetchRevenueTodayData()
      await fetchPayoutTodayData()
      await fetchProfitTodayData() 
      await fetchImpressionTodayData()
      await fetchEventTodayData()
      await fetchTopOffersData()
      await fetchTopPubData()
      await fetchTopAdvData()
      await fetchTopManagerData()
    }
    async function fetchYesterdayApis() {
      {yesterdayDate && await fetchClickYesterdayData()}
      {yesterdayDate && await fetchConversionYesterdayData();}
      {yesterdayDate && await fetchCrateYesterdayData()}
      {yesterdayDate && await fetchRevenueYesterdayData()}
      {yesterdayDate && await fetchPayoutYesterdayData()}
      {yesterdayDate && await fetchProfitYesterdayData()}
      {yesterdayDate && await fetchImpressionYesterdayData()}
      {yesterdayDate && await fetchEventYesterdayData()}
    }
    async function fetchWeekApis(){
        {weekAgoDate && await fetchClickWeekData()}
        {weekAgoDate && await fetchConversionWeekData();}
        {weekAgoDate && await fetchCrateWeekData()}
        {weekAgoDate && await fetchRevenueWeekData()}
        {weekAgoDate && await fetchPayoutWeekData()}
        {weekAgoDate && await fetchProfitWeekData()}
        {weekAgoDate && await fetchImpressionWeekData()}
        {weekAgoDate && await fetchEventWeekData()}
    }
    async function fetchMtdApis(){
        {monthTillDate && await fetchClickMtdData()}
        {monthTillDate && await fetchConversionMtdData()}
        {monthTillDate && await fetchCrateMtdData()}
        {monthTillDate && await fetchRevenueMtdData()}
        {monthTillDate && await fetchPayoutMtdData()}
        {monthTillDate && await fetchProfitMtdData()}
        {monthTillDate && await fetchImpressionMtdData()}
    }
    
    useEffect(() => {
      const yesterday = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(currentDate.getDate() - 7)
      yesterday.setDate(currentDate.getDate() - 1);
      const yesterdayYear = yesterday.getFullYear()
      const yesterdayMonth = (yesterday.getMonth() + 1).toString().padStart(2, '0');
      const yesterdayDay = yesterday.getDate().toString().padStart(2, '0');
      const startWeekYear = weekAgo.getFullYear()
      const startWeekMonth = (weekAgo.getMonth() + 1).toString().padStart(2, '0');
      const startWeekDay = weekAgo.getDate().toString().padStart(2, '0');
      const mtdYear = weekAgo.getFullYear()
      const mtdMonth = (weekAgo.getMonth() + 1).toString().padStart(2, '0');
      const mtdFotmattedDate = `${mtdYear}-${mtdMonth}-01`;
      const startWeekFormattedDate = `${startWeekYear}-${startWeekMonth}-${startWeekDay}`;
      const yesturdayFormattedDate = `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}`;
      setYesterdayDate(yesturdayFormattedDate);
      setWeekAgoDate(startWeekFormattedDate)
      setMonthTillDate(mtdFotmattedDate)
    }, []);

    useEffect(()=>{
      fetchTodayApis();
  },[]);
    useEffect(()=>{
      fetchYesterdayApis();
  },[yesterdayDate]);
    useEffect(()=>{
      fetchWeekApis();
  },[weekAgoDate]);
    useEffect(()=>{
      fetchMtdApis();
  },[monthTillDate]);
  // useMemo (()=>  {
  //   const fetchDataAsync = async()=> {
  //     try {
  //       const [clickToday] = await Promise.all([
  //         fetchData(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}`),
  //       ])
  //       const [convToday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}`)
  //       ])
  //       const [crateToday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}`)
  //       ])
  //       const [revenueToday, payoutToday, profitToday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}`),
  //         fetchData(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}`),
  //         fetchData(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}`)
  //       ])
  //       const [topOfferList, topPubList, topAdvList, topManagerList] = await Promise.all([
  //         fetchData(`${BASE_URL}top/topOffer?partners_Id=${subadminId}`),
  //         fetchData(`${BASE_URL}top/topPublisher?partners_Id=${subadminId}`),
  //         fetchData(`${BASE_URL}top/topAdvertiser?partners_Id=${subadminId}`),
  //         fetchData(`${BASE_URL}top/topManager?partners_Id=${subadminId}`)
  //       ])
  //       setTopOffers(topOfferList?.offerStats)
  //       setTopPublisher(topPubList?.publisherStats)
  //       setTopAdvertiser(topAdvList?.advertiserStats)
  //       setTopManager(topManagerList?.managerStats)
  //       if(yesterdayDate){
  //         const [clickYesterday] = await Promise.all([
  //         fetchData(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`),
  //       ])
  //       const [convYesterday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
  //       ])
  //       const [crateYesterday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
  //       ])
  //       const [revenueYesterday, payoutYesterday, profitYesterday] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`),
  //         fetchData(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`),
  //         fetchData(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}&startDate=${yesterdayDate}&endDate=${yesterdayDate}`)
  //       ])
  //       setClickYesterdayData(clickYesterday?.totalCount)
  //       setConversionYesterdayData(convYesterday?.responseResult)
  //       setCrateYesterdayData(crateYesterday?.totalConversion)
  //       setRevenueYesterdayData(revenueYesterday?.totalRevenue)
  //       setPayoutYesterdayData(payoutYesterday?.totalPayout)
  //       setProfitYesterdayData(profitYesterday?.totalProfit)
  //     }
  //     if(weekAgoDate){
  //       const [clickWeekAgo] = await Promise.all([
  //         fetchData(`${BASE_URL}tracking/totalClick?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`),
  //       ]);
  //       const [convWeekAgo] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalConversion?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
  //       ])
  //       const [crateWeekAgo] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/conversionRate?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
  //       ])
  //       const [revenueWeekAgo, payoutWeekAgo, profitWeekAgo] = await Promise.all([
  //         fetchData(`${BASE_URL}conversion/totalRevenue?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`),
  //         fetchData(`${BASE_URL}conversion/totalPayout?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`),
  //         fetchData(`${BASE_URL}conversion/totalProfit?partners_Id=${subadminId}&startDate=${weekAgoDate}&endDate=${yesterdayDate}`)
  //       ])
  //       setClickWeekData(clickWeekAgo?.totalCount)
  //       setConversionWeekData(convWeekAgo?.responseResult)
  //       setCrateWeekData(crateWeekAgo?.totalConversion)
  //       setRevenueWeekData(revenueWeekAgo?.totalRevenue)
  //       setPayoutWeekData(payoutWeekAgo?.totalPayout)
  //       setProfitWeekData(profitWeekAgo?.totalProfit)
  //     }
  //       setClickTodayData(clickToday.totalCount)
  //       setConversionTodayData(convToday.responseResult)
  //       setCrateTodayData(crateToday.totalConversion)
  //       setRevenueTodayData(revenueToday.totalRevenue)
  //       setPayoutTodayData(payoutToday.totalPayout)
  //       setProfitTodayData(profitToday.totalProfit)
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   fetchDataAsync()
  //   },[yesterdayDate,weekAgoDate])

    // useEffect(()=>{
    //   fetchDataAsync();
    // },[])
    return (
        <>
        <div className='page_sec  pt-3'>
            <div className='container'>
                <Row>
                    <Col xs={12} md={6} lg={4}>
                        <Card
                            loading={clickLoading}
                            title="Click"
                            yesterdayData={clickYesterdayData ? clickYesterdayData: '0'}
                            currentmonthData={clickWeekData ? clickWeekData : '0'}
                            lastmonthData={clickMtdData ? clickMtdData : '0'}
                            today={clickTodayData ? clickTodayData : '0'}
                        />
                    </Col>
                    <Col xs={12} md={6} lg={4}>
                    <Card
                      loading={convLoading}
                      title="Conversion"
                      yesterdayData={conversionYesterdayData ? conversionYesterdayData: '0'}
                      currentmonthData={conversionWeekData ? conversionWeekData : '0'}
                      lastmonthData={conversionMtdData ? conversionMtdData : '0'}
                      today={conversionTodayData ? conversionTodayData : '0'}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Card
                      loading={crateLoading}
                      title="CR"
                      yesterdayData={crateYesterdayData ? crateYesterdayData : '0'}
                      currentmonthData={crateWeekData ? crateWeekData : '0'}
                      lastmonthData={crateMtdData ? crateMtdData :'0'}
                      today={crateTodayData ? crateTodayData : '0'}
                    />
                  </Col>  
                  
                  <Col xs={12} md={6} lg={4}>
                    <Card
                      loading={revenueLoading}
                      title="Revenue"
                      yesterdayData={revenueYesterdayData ? revenueYesterdayData :'0'}
                      lastmonthData={revenueWeekData ? revenueWeekData :'0'}
                      currentmonthData={revenueMtdData ? revenueMtdData: '0'}
                      today={revenueTodayData ? revenueTodayData : '0'}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Card
                      loading={payoutLoading}
                      title="Payout"
                      yesterdayData={payoutYesterdayData ? payoutYesterdayData :'0'}
                      currentmonthData={payoutWeekData ? payoutWeekData : '0'}
                      lastmonthData={payoutMtdData ? payoutMtdData :'0'}
                      today={payoutTodayData ? payoutTodayData : '0'}
                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Card
                      loading={profitLoading}
                      title="Profit"
                      yesterdayData={profitYesterdayyData ? profitYesterdayyData : '0'}
                      currentmonthData={profitWeekData ? profitWeekData : '0'}
                      lastmonthData={profitMtdData ? profitMtdData :'0'}
                      today={profitTodayData ? profitTodayData : '0'} 
                    />
                  </Col>
                  {showCard && <> <Col xs={12} md={6} lg={4}>
                    <Card
                      title="Impression"
                      today={impressionTodayData?.responseResult ? impressionTodayData?.responseResult : '0'}
                      yesterdayData={impressionYesterdayData?.responseResult ? impressionYesterdayData.responseResult : '0'}
                      currentmonthData={impressionMtdData?.responseResult ? impressionMtdData.responseResult :'0'}
                      lastmonthData={impressionTodayData?.responseResult ? impressionTodayData.responseResult : '0'}

                    />
                  </Col>
                  <Col xs={12} md={6} lg={4}>
                    <Card title="Event"
                     today={eventTodayData?.totalEventValue ? eventTodayData?.totalEventValue : '0'}
                     yesterdayData={eventYesterdayData?.totalEventValue ? eventYesterdayData?.totalEventValue : '0'}
                     currentmonthData={eventWeekData?.totalEventValue ? eventWeekData?.totalEventValue : '0'}
                     lastmonthData={eventTodayData?.totalEventValue ? eventTodayData?.totalEventValue : '0'} />
                  </Col></>}
                  {<div className='d-flex justify-content-end position-relative'>
                  <button className="moreCard position-absolute" style={{top: '-18px'}} onClick={()=> setShowCard(!showCard)}>{!showCard ? 'Show More>>': '<<Show Less'}</button>
                  </div>}
                </Row>
                <div className="row mt-4">
                    <div className="col-lg-12">
                        <TotalChart click={clickTodayData} conversion={conversionTodayData} cRate={crateTodayData} revenue={revenueTodayData} payout={payoutTodayData} profilt={profitTodayData}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                    <TopAdvertiser title="Top Offer" topOffer={topOffers} />
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-lg-12">
                    <TopAdvertiser title="Top Publisher"  topPub={topPublisher}/>
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                    <TopAdvertiser title="Top Advertiser" topAdv={topAdvertiser} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-lg-12">
                    <TopAdvertiser title="Top Manager" topManager={topManager} />
                    </div>
                </div>

                <div className="poweredBy p-2 text-center bg-white">
                  <Link to='https://www.offersmeta.com/' target='_blank'><p className="mb-0">Powered By OffersMeta</p></Link>
                </div>
               
            </div>
        </div>
        </>
    )
}

export default Dashboard;
