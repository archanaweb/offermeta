import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImressionList } from "../../../Redux/ImpressionSlice";

const PublisherImpression = ()=> {
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const adminPartner = adminUser.subAdminId
    const [selectValue, setSelectValue] = useState("");
    console.log("adminUser",adminUser)
    const adminImpression = useSelector((state)=> state.impression.list)
    const dispatch = useDispatch()

    const handleSelectChange = (e) => {
      setSelectValue(e.target.value);
    };

    useEffect(()=>{
        dispatch(fetchImressionList(adminPartner))
    },[])

    return (
        <>
            <div className='page_sec pt-3'>
                        <div className="container">
            <div className="table-container">
            <div className="row mb-3">
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
              {/* <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Publisher</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Advertiser</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control">
                  <option value="">Manager</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div> */}
              {/* <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="d-flex justify-content-end">
                  <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
                </div>
              </div> */}
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Publiher</th>
                    <th>Offer</th>
                    <th>ipAddress</th>
                    <th>deviceName</th>
                    <th>impressionId</th>
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
                <tbody>
                  {adminImpression ? adminImpression
                    ?.map((click) => (
                    <tr key={click.id}>
                            <td>{`(ID: ${click.publiherId}) ${click.publisherName}`}</td>
                            <td>{`(ID: ${click.offerId}) ${click.offerName}`}</td>
                            <td>{click.ipAddress}</td>
                            <td>{click.deviceName}</td>
                            <td>{click.impressionId}</td>
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
                    )) : <tr><td colSpan={4}>Data not found</td></tr>}
                </tbody>
              </table>
              </div>
            </div>
          </div>
            </div>
        </>
    )
}

export default PublisherImpression