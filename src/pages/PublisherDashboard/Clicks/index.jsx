import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import PublisherReportTab from "../../../components/PublisherReportTab";
import TablePagination from "../../../components/Pagination";
import { addDays, format } from "date-fns";
import { DateRangePicker } from "react-date-range";
import { Spinner } from "react-bootstrap";

const PublisherClicks = ()=> {
    const [loading, setLoading] = useState(true)
    const datePickerRef = useRef(null)
    const [open, setOpen] = useState(false)
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const publisherId = adminUser.publisherId;
    const [selectValue, setSelectValue] = useState("");
    const [clickList, setClickList] = useState([]);
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

    const fetchClickList = async(apiEndpoint) => {
      setLoading(true)
      try {
        const response = await fetch(BASE_URL+ apiEndpoint)
        const resData = await response.json()
        setClickList(resData.responseResult?.reverse())
        setTotalPage(resData.totalPages)
        setLoading(false)
      }catch(error) {
        console.log('Something went erong' , error)
        setLoading(false)
      }
    };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const handleClickOutside = (e)=> {
    if(datePickerRef.current && !datePickerRef.current.contains(e.target)){
      setOpen(false)
    }
  }
  const handleDateChange = (item)=> {
    setState([item.selection])
  }

  useEffect(() => {
    fetchClickList(`publicher/publisherClickList?partners_Id=${adminUser.partners_Id}&publisherId=${publisherId}&page=${currentPageValue}`);
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, []);
  useEffect(() => {
    {startDate ? fetchClickList(`publicher/publisherClickList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`) : fetchClickList(`publicher/publisherClickList?partners_Id=${adminUser.partners_Id}&publisherId=${publisherId}&page=${currentPageValue}`)}
  }, [currentPageValue]);

  const handleClickDate = ()=> {
    fetchClickList(`publicher/publisherClickList?partners_Id=${adminUser.partners_Id}&publisherId=${adminUser.publisherId}&page=${currentPageValue}&startDate=${startDate}&endDate=${endDate}`)
  }
  useEffect(()=> {
    setStartDate(format(state[0].startDate, 'yyyy-MM-dd'));
    setEndDate(format(state[0].endDate, 'yyyy-MM-dd'))
},[state])

    return (
        <>
            <div className='page_sec pt-2'>
                        <div className="container">
            <div className="table-container">
            <PublisherReportTab />
            <div className="row">
            <div className="col-lg-3">
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
                <div className="col-lg-2">
                    <button type="button" className="btn btn-primary" onClick={handleClickDate}>Apply</button>
                </div>
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
                <select className="form-control">
                  <option value="">Offer</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
            </div>
            <hr />
            <div className="table-responsive">
              <table className="table conversion-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Click Time</th>
                    {/* <th>Click ID</th> */}
                    <th>Offer</th>
                    {/* <th>Publisher</th> */}
                    <th>IP</th>
                    <th>Payout</th>
                    {/* <th>Revanue</th> */}
                    <th>Operating System</th>
                    <th>Category</th>
                    {/* <th>TrackingUrl</th> */}
                    <th>Traffic</th>
                    <th>Vertical</th>
                    <th>Pub ID</th>
                  <th>Source</th>
                  <th>Aff Click ID</th>
                  <th>GAID</th>
                  <th>IDFA</th>
                  <th>Compaign ID</th>
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
                { loading ? <tbody>
                          <tr>
                            <td colSpan={7}><div className='spinner'>
                </div></td>
                          </tr>
                        </tbody> : <tbody>
                  {clickList ?clickList
                    ?.map((click) => (
                      <tr key={click._id}>
                        <td>{click._id}</td>
                        <td>{click.clickTime}</td>
                        {/* <td>{click.clickId}</td> */}
                        <td>{`(ID: ${click.offerId}) ${click.title}`}</td>
                        {/* <td>{`(ID: ${click?.publisherManagerId}) ${click.publisher_First_name} ${click.publisher_Last_name}`}</td> */}
                        <td>{click.ipAddress}</td>
                        <td>{click.Payout}</td>
                        {/* <td>{click.revenue}</td> */}
                        {/* <td>{click.eventType}</td> */}
                        <td>{click?.operatingSystem}</td>
                        <td>{click?.category}</td>
                        {/* <td>{click?.trackingUrl}</td> */}
                        <td>{click?.traffic}</td>
                        <td>{click.vertical}</td>
                        <td>{click?.pub_id}</td>
                        <td>{click?.source}</td>
                        <td>{click?.aff_click_id}</td>
                        <td>{click?.gaid}</td>
                        <td>{click?.idfa}</td>
                        <td>{click?.campaign_id}</td>
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
                    )) : <tr><td colSpan={4}>Data not found</td></tr>}
                </tbody>}
              </table>
              </div>
            </div>
            <TablePagination totalPage={totalPage} path='/publisher/clicks' />
         
            </div>
            </div>
        </>
    )
}

export default PublisherClicks