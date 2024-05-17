import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerClickList, fetchManagerConversionList, fetchManagerList, fetchManagerPublisherList } from "../../../Redux/ManagerSlice";
import { Link, useLocation } from "react-router-dom";
import TablePagination from "../../../components/Pagination";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import PublManagerReportTab from "../../../components/PubManagerReportTab";
import ConversionFilter from "./ConversionFilter";
import { fetchOfferList } from "../../../Redux/OffersSlice";
import { managerConversionFilterByOffer, managerConversionFilterByPublisher } from "../../../Redux/ManagerConversionFilterSlice";
import BASE_URL from "../../../Api/base";

const ManagerConversionList = ()=> {
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [param, setParam] = useState()
    const [filterOfferId, setFilterOfferId] = useState()
    const [filterPubId, setFilterPubId] = useState()
    const offerList =  useSelector((state)=> state.offers.list)
    const pubList =  useSelector((state)=> state.manager.publisherList)
    const convFilterList =  useSelector((state)=> state.managerConversionFilters.list)
    const [isFilter , setIsFilter] = useState(false)
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const [apiData, setApiData] =  useState()
    const loading = useSelector((state)=> state.manager.conversionLoading)
    const [selectValue, setSelectValue] = useState("");
    const dispatch = useDispatch() 
    const [totalPage, setTotalPage] = useState(1);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const currentPageValue = params.get('page');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [state, setState] = useState([
      {
        startDate: new Date(),
        endDate: addDays(new Date(), 7),
        key: 'selection'
      }
    ]);

    const handleSelectChange = (e) => {
      setSelectValue(e.target.value);
    };
    const fetchManagerConversion = async(apiEndPoint)=> {
      const managerClickRes = await dispatch(fetchManagerConversionList(apiEndPoint))
      const res = await managerClickRes.payload;
      setTotalPage(res?.totalPages)
      setApiData(res?.responseResult)
    }

    const handleExportData = async () => {
      console.log('exportFun')
      let apiUrl = `manager/downloadDataInExcelSheetByManager?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&selectedParams=${param}&startDate=${startDate}&endDate=${endDate}`;
      if(filterOfferId){
        apiUrl = `manager/downloadDataInExcelSheetByOfferId?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&offerId=${filterOfferId}&startDate=${startDate}&endDate=${endDate}`
      }
      if(filterPubId){
        apiUrl = `manager/downloadDataInExcelSheetByPublisherId?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&publisherId=${filterPubId}&startDate=${startDate}&endDate=${endDate}`
      }
      try {
        const response = await axios.get(`${BASE_URL}${apiUrl}`, {
          responseType: 'blob', // Set the response type to blob
        });
  
        const blob = new Blob([response.data], { type: 'text/csv' });
  
        // Create a download link and trigger a click event
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = 'data.csv';
        downloadLink.click();
      } catch (error) {
        // toast.error('Something went wrong')
        console.error('Error downloading file:', error);
      }
    };

    const handleChangeOffer = async (e)=> {
      setFilterOfferId(e.target.value)
  }
  const handleChangePub = (e)=> {
    setFilterPubId(e.target.value)
  }

  useEffect(()=> {
      dispatch(managerConversionFilterByOffer({partners_Id: managerLoggedIn.partners_Id, publisherManagerId: managerLoggedIn.managerId, offerId: filterOfferId}))
  },[filterOfferId])
  useEffect(()=> {
      dispatch(managerConversionFilterByPublisher({partners_Id: managerLoggedIn.partners_Id, managerId: managerLoggedIn.managerId, publisherId: filterPubId}))
  },[filterPubId])

  useEffect(()=> {
    if(filterOfferId){
      setApiData(convFilterList)
      setTotalPage(0)
    }
    if(filterPubId){
      setApiData(convFilterList)
      setTotalPage(0)
    }
  },[convFilterList])

    const handleClickOutside = (e)=> {
      if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
        setOpen(false)
      }
    }
    const handleDateChange = (item)=> {
      setState([item.selection])
    }

    async function fetchConversionApis() {
      await fetchManagerConversion(`manager/conversionList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}`);
      await dispatch(fetchOfferList({partners_Id: managerLoggedIn.partners_Id,currentPage: 1}))
      await dispatch(fetchManagerPublisherList({partners_Id:managerLoggedIn.partners_Id,managerId: managerLoggedIn.managerId}))
    }
    useEffect(()=>{
      console.log('filterLits',convFilterList)
      fetchConversionApis()
      document.addEventListener('click', handleClickOutside)
      return () => {
        document.removeEventListener('click', handleClickOutside)
      }
    },[])
    useEffect(()=>{
      {startDate ? fetchManagerConversion(`manager/conversionList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) :
      fetchManagerConversion(`manager/conversionList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}`)}
  },[currentPageValue])

  const handleReceiveData = (dataFromChild) => {
    console.log('Data received from child:', dataFromChild);
    setParam(dataFromChild)
  };

  const handleClickDate = ()=> {
      fetchManagerConversion(`manager/conversionList?partners_Id=${managerLoggedIn.partners_Id}&publisherManagerId=${managerLoggedIn.managerId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) 
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
  },[state])
    return (
        <>
          <div className={isFilter ? 'sidebar-filter-opened' : ''} style={{position: 'relative',
      minHeight: '100%',
      top: '0PX'}}>
          <div className='page_sec'>
            <div className="container">
          <div className='mt-2' >
            <div className="table-container">
            <div className="filter-btn">
                    <PublManagerReportTab />
                    <div className="right-buttons">
                    {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
                    <button className='btn btn-outline-primary' onClick={()=> setIsFilter(true)}><i className="fa-solid fa-filter fa-lg"></i></button>
                    </div>
                </div>
            <div className="row mb-3 justify-content-between">
              <div className="col-lg-9">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                    <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                      <option value="" hidden>Action</option>
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                      <option value="Cancel">Cancel</option>
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                    <select className="form-control" onChange={handleChangeOffer}>
                      <option value="" hidden>Offer</option>
                      {offerList?.map((item)=> 
                        <option key={item?.offerId} value={item?.offerId}>(ID: {item.offerId}) {item.title}</option>)}
                    </select>
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-4 col-6">
                    <select className="form-control" onChange={handleChangePub}>
                      <option value="" hidden>Publisher</option>
                      {pubList?.map((item)=> <option value={item.publisherId} key={item.publisherId}>(ID: {item.publisherId}) {item.firstName} {item.lastName}</option>)}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="row justify-content-end">
                  <div className="col-lg-10 col-md-3 col-sm-4 col-6">
                    <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" onClick={handleExportData}>Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
      <div className="col-lg-9">
        <div className="row">
    <div className="col-lg-4">
              <div className="calenderWrap" ref={datePickerRef}>
                <div className="calenderInput">
                  <i className="fa-regular fa-calendar"></i>
                  <input value={`${format(state[0].startDate, 'yyyy-MM-dd')} to ${format(state[0].endDate, 'yyyy-MM-dd')}`} 
                  readOnly 
                  className="inputBox"
                  onClick={()=> setOpen(!open)} />
                </div>
              {open &&  <DateRangePicker className="calenderElement"
                  onChange={item => handleDateChange(item)}
                  showSelectionPreview={true}
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  ranges={state}
                  direction="horizontal"
                />}
              </div>
                </div>
            <div className="col-lg-3">
              <button type="button" className="btn btn-primary" onClick={handleClickDate}>Apply</button>
            </div>
            </div>
            </div>
      <div className="col-lg-3">
        <input className="form-control w-100"
          type="text"
          placeholder="Search..."
        />
    </div>
  </div>
            <div className="table-responsive mt-3">
              <table className="table conversion-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Conversion Time</th>
                    <th>Publisher</th>
                    <th>Offer</th>
                    <th>IP Address</th>
                    <th>Incentive</th>
                    <th>Operating System</th>
                    <th>Traffic</th>
                    <th>Vertical</th>
                    <th>Category</th>
                    <th>Payout</th>
                    <th>Revenue</th>
                    <th>Event Value</th>
                    <th>Privacy Level</th>
                    <th>Affiliate Id</th>
                    <th>Tracking Url</th>
                    <th>Click Id</th>
                    <th>Pub ID</th>
                  <th>Source</th>
                  <th>Aff Click ID</th>
                  <th>GAID</th>
                  <th>IDFA</th>
                  <th>P1</th>
                  <th>P2</th>
                  <th>P3</th>
                  <th>P4</th>
                  <th>P5</th>
                  <th>P6</th>
                  <th>P7</th>
                  <th>P8</th>
                  <th>P9</th>
                  <th>P10</th>
                  <th>Sub ID1</th>
                  <th>Sub ID2</th>
                  <th>Sub ID3</th>
                  <th>Sub ID4</th>
                  <th>Sub ID5</th>
                  <th>Event Token</th>
                  <th>Campaign ID</th>
                  <th>Sub 1</th>
                  <th>Sub 2</th>
                  <th>Sub 3</th>
                  <th>Sub 4</th>
                  <th>Sub 5</th>
                  <th>Sub 6</th>
                  <th>Sub 7</th>
                  <th>Sub 8</th>
                  <th>Sub 9</th>
                  <th>Sub 10</th>
                  <th>Txn_ID1</th>
                  <th>Txn_ID2</th>
                  <th>Txn_ID3</th>
                  <th>Txn_ID4</th>
                  <th>Txn_ID5</th>
                  <th>Txn_ID6</th>
                  <th>Txn_ID7</th>
                  <th>Txn_ID8</th>
                  <th>Sale Amount</th>
                  <th>Adv Revenue</th>
                  <th>Impression ID</th>
                  <th>Order ID</th>
                  <th>Order Value</th>
                  <th>App Name</th>
                  <th>App ID</th>
                  <th>Referer</th>
                  <th>Event ID</th>
                  <th>Conversion IP</th>
                  <th>OS Version</th>
                  <th>OS</th>
                  <th>User Agent</th>
                  <th>Device ID</th>
                  <th>Device Version</th>
                  <th>User ID</th>
                  <th>User Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Android ID</th>
                  <th>Android Version</th>
                  <th>Advertiser ID</th>
                  <th>Advertiser Name</th>
                  <th>User Type</th>
                  <th>IP</th>
                  <th>Event Name</th>
                  </tr>
                </thead>
               {loading ? <tbody>
                <tr>
                <td colSpan={5}>
                  <div className="spinner"></div>
                  </td>
                  </tr>
                  </tbody> :
                <tbody>
                  {apiData
                    ?.map((click) => (
                    <tr key={click._id}>
                            <td>{click._id}</td>
                            <td>{click.conversionTime}</td>
                            {/* <td>{click.publisherManagerId}</td>
                            <td>{click.publisherManager}</td> */}
                            <td>(ID: {click.publisherId}) {click.publisher_First_name} {click.publisher_Last_name}</td>
                            <td>(ID: {click.offerId}) {click.title}</td>
                            <td>{click.ipAddress}</td>
                            <td>{click.incentive}</td>
                            <td>{click.operatingSystem}</td>
                            <td>{click.traffic}</td>
                            <td>{click.vertical}</td>
                            <td>{click.category}</td>
                            <td>{click.Payout}</td>
                            <td>{click.revenue}</td>
                            <td>{click.eventValue}</td>
                            <td>{click.privacyLavel}</td>
                            <td>{click.affiliateId}</td>
                            <td>{click.trackingUrl}</td>
                            <td>{click.clickId}</td>
                            <td>{click?.pub_id}</td>
                        <td>{click?.source}</td>
                        <td>{click?.aff_click_id}</td>
                        <td>{click?.gaid}</td>
                        <td>{click?.idfa}</td>
                        <td>{click?.p1}</td>
                        <td>{click?.p2}</td>
                        <td>{click?.p3}</td>
                        <td>{click?.p4}</td>
                        <td>{click?.p5}</td>
                        <td>{click?.p6}</td>
                        <td>{click?.p7}</td>
                        <td>{click?.p8}</td>
                        <td>{click?.p9}</td>
                        <td>{click?.p10}</td>
                        <td>{click?.sub_id1}</td>
                        <td>{click?.sub_id2}</td>
                        <td>{click?.sub_id3}</td>
                        <td>{click?.sub_id4}</td>
                        <td>{click?.sub_id5}</td>
                        <td>{click.eventToken}</td>
                        <td>{click?.campaign_id}</td>
                        <td>{click?.sub1}</td>
                        <td>{click?.sub2}</td>
                        <td>{click?.sub3}</td>
                        <td>{click?.sub4}</td>
                        <td>{click?.sub5}</td>
                        <td>{click?.sub6}</td>
                        <td>{click?.sub7}</td>
                        <td>{click?.sub8}</td>
                        <td>{click?.sub9}</td>
                        <td>{click?.sub10}</td>
                        <td>{click?.txn_id1}</td>
                        <td>{click?.txn_id2}</td>
                        <td>{click?.txn_id3}</td>
                        <td>{click?.txn_id4}</td>
                        <td>{click?.txn_id5}</td>
                        <td>{click?.txn_id6}</td>
                        <td>{click?.txn_id7}</td>
                        <td>{click?.txn_id8}</td>
                        <td>{click?.sale_amount}</td>
                        <td>{click?.adv_revenue}</td>
                        <td>{click?.impression_id}</td>
                        <td>{click?.order_id}</td>
                        <td>{click?.order_value}</td>
                        <td>{click?.app_name}</td>
                        <td>{click?.app_id}</td>
                        <td>{click?.referer}</td>
                        <td>{click?.event_id}</td>
                        <td>{click?.conversion_ip}</td>
                        <td>{click?.os_version}</td>
                        <td>{click?.os}</td>
                        <td>{click?.user_agent}</td>
                        <td>{click?.device_id}</td>
                        <td>{click?.device_version}</td>
                        <td>{click?.user_id}</td>
                        <td>{click?.user_name}</td>
                        <td>{click?.latitude}</td>
                        <td>{click?.longitude}</td>
                        <td>{click?.android_id}</td>
                        <td>{click?.android_version}</td>
                        <td>{click?.advertiser_id}</td>
                        <td>{click?.advertiser_name}</td>
                        <td>{click?.user_type}</td>
                        <td>{click?.ip}</td>
                        <td>{click?.event_name}</td>
                    </tr>
                    ))}
                </tbody>}
              </table>
              </div>
            </div>
            <ConversionFilter sFilter={isFilter} setIsFilter={setIsFilter} setClickData={setApiData} fetchData={fetchManagerConversion} sendDataToParent={handleReceiveData}/> 
                <div class="sidebar-backdrop"></div> 
            <TablePagination totalPage={totalPage} path='/affiliates/manager/conversion' />
          </div>
          </div>
          </div>
          </div>
        </>
    )
}

export default ManagerConversionList;