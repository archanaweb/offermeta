import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMangEventReport, fetchPEventReport, fetchPubEventReport } from "../../Redux/PerformanceSlice";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import { parEventReportFilterByAdvertiser, parEventReportFilterByOffer } from "../../Redux/PartnerReportFilter";

function EventReportFilter({setEventReport, setTotalPage, currentPageValue, startDate, endDate}) {
    const loggedUser = JSON.parse(localStorage.getItem('userData'));
    const [selectValue, setSelectValue] = useState("");
    const [filterOfferId, setFilterOfferId] = useState()
    const [filterPubId, setFilterPubId] = useState()
    const [filterAdvId, setFilterAdvId] = useState()
    const [filterManagerId, setFilterManagerId] = useState()
    const offerList =  useSelector((state)=> state.offers.list)
    const pubList =  useSelector((state)=> state.publisher.list)
    const advList =  useSelector((state)=> state.advertiser.list)
    const managerList =  useSelector((state)=> state.manager.list)
    const filterList =  useSelector((state)=> state.parEventReportFilters.list)
    const eventReportByPub = useSelector((state)=> state?.performance?.pubEventReport)
    const eventReportByManager = useSelector((state)=> state?.performance?.mangEventReport)
    const dispatch =  useDispatch()

    const handleChangeOffer = (e)=> {
        setFilterOfferId(e.target.value)
      }
      const handleChangePub = (e)=> {
        console.log('pubId',e.target.value)
        setFilterPubId(e.target.value)
      }
      const handleChangeAdv = (e)=> {
        setFilterAdvId(e.target.value)
      }
      const handleChangeManager = (e)=> {
        setFilterManagerId(e.target.value)
      }
      const handleSelectChange = (e) => {
        setSelectValue(e.target.value);
      };

    async function fetchApis() {
        await dispatch(fetchOfferList({partners_Id: loggedUser._id, currentPage: 1}))
        await dispatch(fetchPublisherList(loggedUser._id))
        await dispatch(fetchAdvertiserList(loggedUser._id))
        await dispatch(fetchManagerList(loggedUser._id))
      }
    useEffect(()=> {
        dispatch(parEventReportFilterByOffer({partners_Id: loggedUser._id, offerId: filterOfferId, startDate, endDate}))
    },[filterOfferId])
    useEffect(()=> {
      dispatch(fetchPubEventReport({apiEndpoint : `eventReport/publisherEventValueReport?partners_Id=${loggedUser._id}&publisherId=${filterPubId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`}))
    },[filterPubId])
    useEffect(()=> {
      dispatch(parEventReportFilterByAdvertiser({partners_Id: loggedUser._id, advertiserId: filterAdvId, startDate, endDate}))
    },[filterAdvId])
    useEffect(()=> {
      dispatch(fetchMangEventReport({apiEndpoint : `eventReport/managerEventReport?partners_Id=${loggedUser._id}&publisherManagerId=${filterManagerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`}))
    },[filterManagerId])

    useEffect(()=> {
        if(filterOfferId){
          setEventReport(filterList)
          setTotalPage(0)
        }
        if(filterAdvId){
          setEventReport(filterList)
          setTotalPage(0)
        }
      },[filterList])
      useEffect(()=> {
        if(filterPubId){
          setEventReport(eventReportByPub)
          setTotalPage(0)
        }
      },[eventReportByPub])
      useEffect(()=> {
        if(filterManagerId){
          setEventReport(eventReportByManager)
          setTotalPage(0)
        }
      },[eventReportByManager])
      useEffect(()=>{
        fetchApis()
      },[])
  return (
    <>
    <div className="filters">
          <div className="row">
            <div className="col-2">
              <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                <option value="">Action</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeOffer}>
                  <option value="">Select OfferId</option>
                  {offerList?.map((item)=> <option value={item.offerId} key={item.offerId}>(ID: {item.offerId}) {item.title}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangePub}>
                  <option value="">Select PublisherId</option>
                  {pubList?.map((item)=> <option value={item.publisherId} key={item.publisherId}>(ID: {item.publisherId}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeAdv}>
                  <option value="">Select AdvertiserId</option>
                  {advList?.map((item)=> <option value={item.advertiserId} key={item.advertiserId}>(ID: {item.advertiserId}) {item.firstName} {item.lastName}</option>)}
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" onChange={handleChangeManager}>
                  <option value="">Select ManagerId</option>
                  {managerList?.map((item)=> <option value={item.managerId} key={item.managerId}>(ID: {item.managerId}) {item.name}</option>)}
                </select>
              </div>
            <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="d-flex justify-content-end">
                <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
            </div>
          </div>
        </div>
        </>
  )
}

export default EventReportFilter