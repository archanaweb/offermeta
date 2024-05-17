import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchImressionList } from "../../Redux/ImpressionSlice";
import { impressionFilterByAdvertiser, impressionFilterByManager, impressionFilterByOffer, impressionFilterByPublisher } from "../../Redux/ImpressionFilterSlice";
import { fetchOfferList } from "../../Redux/OffersSlice";
import { fetchPublisherList } from "../../Redux/PublisherSlice";
import { fetchAdvertiserList } from "../../Redux/AdvertiserSlice";
import { fetchManagerList } from "../../Redux/ManagerSlice";
import TablePagination from "../../components/Pagination";

const Impression = ()=> {
    const [selectValue, setSelectValue] = useState("");
    const [clickData, setClickData] = useState()
    const [totalPage, setTotalPage] = useState(1);
    const impression = useSelector((state)=> state.impression.list)
    const loggedIn = JSON.parse(localStorage.getItem('userData'));
    const [filterOfferId, setFilterOfferId] = useState()
    const [filterPubId, setFilterPubId] = useState()
    const [filterAdvId, setFilterAdvId] = useState()
    const [filterManagerId, setFilterManagerId] = useState()
    const offerList =  useSelector((state)=> state.offers.list)
    const pubList =  useSelector((state)=> state.publisher.list)
    const advList =  useSelector((state)=> state.advertiser.list)
    const managerList =  useSelector((state)=> state.manager.list)
    const filterByOfferList =  useSelector((state)=> state.impressionFilter.list)
    const dispatch = useDispatch()
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

    const fetchImpression = async ()=> {
        const impressionResponse = await  dispatch(fetchImressionList({partners_Id: LoggedInUser?._id, getCurrentPage}));
        const res = impressionResponse.payload;
        if(res?.responseCode === 200){
          toast.success(res?.responseMessage)
          setTotalPage(res.totalPages)
        }else{
          toast.error(res?.responseMessage);
        }
        console.log(impressionResponse)
    }
    const handleChangeOffer = (e)=> {
      setFilterOfferId(e.target.value)
    }
    const handleChangePub = (e)=> {
      setFilterPubId(e.target.value)
    }
    const handleChangeAdv = (e)=> {
      setFilterAdvId(e.target.value)
    }
    const handleChangeManager = (e)=> {
      setFilterManagerId(e.target.value)
    }

    useEffect(()=>{
      dispatch(impressionFilterByOffer({partners_Id: loggedIn._id, offerId: filterOfferId}))
    },[filterOfferId])
    useEffect(()=>{
      dispatch(impressionFilterByPublisher({partners_Id: loggedIn._id, publisherId: filterPubId}))
    },[filterPubId])
    useEffect(()=>{
      dispatch(impressionFilterByAdvertiser({partners_Id: loggedIn._id, advertiserId: filterAdvId}))
    },[filterAdvId])
    useEffect(()=>{
      dispatch(impressionFilterByManager({partners_Id: loggedIn._id, managerId: filterManagerId}))
    },[filterManagerId])
    useEffect(()=> {
      setClickData(filterByOfferList)
    },[filterByOfferList])
    useEffect(()=> {
      dispatch(fetchImressionList({partners_Id: LoggedInUser?._id, getCurrentPage}));
    },[getCurrentPage])
  
    
    const handleSelectChange = (e) => {
      setSelectValue(e.target.value);
    };
    async function fetchImpressionApis() {
      await fetchImpression()
      await dispatch(fetchOfferList(loggedIn._id))
      await dispatch(fetchPublisherList(loggedIn._id))
      await dispatch(fetchAdvertiserList(loggedIn._id))
      await dispatch(fetchManagerList(loggedIn._id))
    }

    useEffect(()=> {
      fetchImpressionApis()
    },[])
    useEffect(()=>{
      setClickData(impression)
    },[impression])

    return (
        <>
        <div className='page_sec pt-3'>
          <div className="container">
          <div className="table-container">
          <div className="row d-flex justify-content-between align-items-center mb-3">
              <div className="col-lg-4">
                <input className="form-control w-100"
                  type="text"
                  placeholder="Search..."
                />
              </div>
              <div className="right-buttons">
                {/* <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button> */}
                {/* <Link to="/postbackadd" className="btn btn-secondary"><i className="fa-solid fa-plus me-2"></i>Create Postback</Link> */}
              </div>
          </div>
          <div className="">
              <div className="row">
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                    <option value="" hidden>Action</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                    <option value="Cancel">Cancel</option>
                  </select>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <select className="form-control" onChange={handleChangeOffer}>
                    <option value="">Select OfferId</option>
                    {offerList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.title}</option>)}
                  </select>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <select className="form-control" onChange={handleChangePub}>
                    <option value="">Select PublisherId</option>
                    {pubList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.firstName} {item.lastName}</option>)}
                  </select>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <select className="form-control" onChange={handleChangeAdv}>
                    <option value="">Select AdvertiserId</option>
                    {advList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.firstName} {item.lastName}</option>)}
                  </select>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <select className="form-control" onChange={handleChangeManager}>
                    <option value="">Select ManagerId</option>
                    {managerList?.map((item)=> <option value={item._id} key={item._id}>(ID: {item._id}) {item.name}</option>)}
                  </select>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                  <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                  </div>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <div className="search-bar1"></div>
                </div>
                <div className="col-12">
                  <div className="search-bar1"></div>
                </div>
              </div>
            </div>
          <div className="table-responsive">
          <table className="table table-style2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Publisher</th>
                <th>Offer</th>
                <th>IP Address</th>
                <th>Device Name</th>
                <th>Impression ID</th>
                <th>V1</th>
                    <th>V2</th>
                    <th>V3</th>
                    <th>V4</th>
                    <th>V5</th>
                    <th>V6</th>
                    <th>V7</th>
                    <th>V8</th>
                    <th>V9</th>
                    <th>V10</th>
                    <th>Sub pid</th>
                    <th>Offer ID</th>
                    <th>P ID</th>
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
                    <th>Revenue2</th>
                    <th>Impression ID</th>
                    <th>Order ID</th>
                    <th>Order Value</th>
                    <th>App Name</th>
                    <th>App ID</th>
                    <th>Gaid</th>
                    <th>IDFA</th>
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
            <tbody>
              {clickData ? clickData?.map((click, index) => (
                  <tr key={click.id}>
                    <td>{click?._id}</td>
                    <td><Link>{`(ID: ${click.publisherManagerId}) ${click.publisherManagerName}`}</Link></td>
                    <td><Link>{`(ID: ${click.offerId}) ${click.title}`}</Link></td>
                    <td>{click.ipAddress}</td>
                    <td>{click.operatingSystem}</td>
                    <td>{click.imp_id}</td>
                    <td>{click?.v1}</td>
                          <td>{click?.v2}</td>
                          <td>{click?.v3}</td>
                          <td>{click?.v4}</td>
                          <td>{click?.v5}</td>
                          <td>{click?.v6}</td>
                          <td>{click?.v7}</td>
                          <td>{click?.v8}</td>
                          <td>{click?.v9}</td>
                          <td>{click?.v10}</td>
                          <td>{click?.sub_pid}</td>
                          <td>{click?.gaid}</td>
                          <td>{click?.off_id}</td>
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
                          <td>{click?.revenue2}</td>
                          <td>{click?.impression_id}</td>
                          <td>{click?.order_id}</td>
                          <td>{click?.order_value}</td>
                          <td>{click?.app_name}</td>
                          <td>{click?.app_id}</td>
                          <td>{click?.gaid}</td>
                          <td>{click?.idfa}</td>
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
                )) :  <tr><td colSpan={4}>Data not found</td></tr>}
            </tbody>
          </table>
          </div>
          <TablePagination totalPage={totalPage} path={`/impression`}/>
          </div>
        </div>
        </div>
        </>
    )
}
export default Impression;