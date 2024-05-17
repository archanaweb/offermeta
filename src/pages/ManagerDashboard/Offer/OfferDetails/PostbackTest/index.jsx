import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BASE_URL from "../../../../../Api/base";
import { fetchEventList } from "../../../../../Redux/EventValueSlice";
import { fetchOfferDetail } from "../../../../../Redux/OffersSlice";
import { fetchAdvertiserDetails } from "../../../../../Redux/AdvertiserSlice";

const ManagerPostbackTest = ()=> {
    const {id} = useParams()
    const loogedIn = JSON.parse(localStorage.getItem('userData'))
    const [trackingLoading, setTrackingLoading] = useState(false)
    const [conversionLoading, setConversionLoading] = useState(false)
    const [postbackUrl, setPostbackUrl] = useState()
    const [postbackSuccessMsg,setPostbackSuccessMsg] = useState()
    const [trackingData, setTrackingData] = useState()
    const [eventValue, setEventValue] = useState()
    const offerDetail = useSelector((state)=> state.offers.detail)
    const eventlist = useSelector((state)=> state.eventvalue.list)
    const advertiserDetail = useSelector((state)=> state.advertiser.detail)
    const [formData, setFormData] = useState({})
    const dispatch = useDispatch()
    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleEventChange = (e)=>{
      setEventValue(e.target.value);
      console.log('eventValue', e.target.value)
      setPostbackUrl(`https://postback.offersmeta.in/conversion/postback?m=${loogedIn?.partners_Id}&click_id=${trackingData.click_id}&secure=${advertiserDetail?.secure}&event_value=${e.target.value}`);
    }

    const handleTrackingTesting = async()=> {
      setTrackingLoading(true)
        try {
            const url = `${BASE_URL}subAdmin/trackingTesting?url=${encodeURIComponent(formData?.url)}`;
             // Replace with your backend URL
            const response = await fetch(url);
            if (!response.ok) {
              setTrackingLoading(false)
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrackingData(data);
            setTrackingLoading(false)
          } catch (error) {
            console.log(error.message);
            setTrackingLoading(false)
          }
    }
    const handleConversionTester = async()=> {
      setConversionLoading(true)
     try {
       const response = await fetch(`${BASE_URL}subAdmin/conversionTestingTool?url=${encodeURIComponent(postbackUrl)}`)
       const data = await response.json();
      //  toast.success(data.responseMessage)
       setPostbackSuccessMsg(data.responseMessage)
       setConversionLoading(false)
     } catch (error) {
      console.log('Something went wrong', error)
      setConversionLoading(false)
     }
  }

    useEffect(() => {
      dispatch(fetchEventList({partners_Id:loogedIn.partners_Id, offerId: id}))
      dispatch(fetchOfferDetail({partners_Id:loogedIn.partners_Id ,offerId: id}))
    }, []);
    useEffect(() => {
      dispatch(fetchAdvertiserDetails({partners_Id: loogedIn.partners_Id, advertiserId:offerDetail?.advertiserId}))
    }, [offerDetail]);
    return (
        <>
         <div className='page_sec pt-3'>
        <div className="container">
        <div className="bg-white px-2 py-2">
          <div className="offersData mt-4">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>Conversion Testing Tool</h3>
        </div>
        <form>
        <label class="custom-field one">
                <input type="text" placeholder=" " name='url' className="form-control w-100" onChange={handleChange}/>
                <span class="cstmPlaceholder">Enter Url</span>
            </label>
            <button type="button" className="btn btn-primary mt-4" onClick={handleTrackingTesting}>Step 1) Run Test</button>
        </form>{trackingLoading ?<div className="p-2 text-center"><div className="spinner"></div></div>: <>{trackingData &&<> <div className="py-2 border border-gray-darker rounded mt-2 px-2 text-gray-darker mt-4 testing-result">
                <p><b>Link:</b> {trackingData?.resposneResult}</p>
                {/* <p><b>Click Id: </b>{trackingData?.click_id}</p> */}
                <p><b>P1:</b> {trackingData?.p1}</p>
                <p><b>P2: </b>{trackingData?.p2}</p>
                <p><b>P3: </b>{trackingData?.p3}</p>
                <p><b>P4: </b>{trackingData?.p4}</p>
                <p><b>P5: </b>{trackingData?.p5}</p>
                <p><b>Aff click Id:</b>{trackingData?.aff_click_id}</p>
                <p><b>Source:</b>{trackingData?.source}</p>
                <p><b>GAID:</b>{trackingData?.gaid}</p>
                <p><b>IDFA:</b>{trackingData?.idfa ? trackingData?.idfa : 'null'}</p>
                <p><b>Device Id:</b>{trackingData?.device_id}</p>
                <p><b>Android Id:</b>{trackingData?.android_id}</p>
            </div>
            <div className="postback mt-4">
              <div className="mt-2">
              <label htmlFor="event_value">Select Event Value</label>
              <select className='form-control'
              name="event_value"
              onChange={handleEventChange}>
              <option value='' hidden>Select Event</option>
              {eventlist?.map((item)=><option key={item._id} value={item.eventValue}>{item.eventValue}</option>)}
            </select>
            <p>{postbackUrl}</p>
              </div>
            <div className="row mt-3">
                <div className="col-lg-6">
                <label class="custom-field one">
                <select type="text" placeholder=" " className="form-control w-100">
                    <option value='' hidden></option>
                    <option value='smartphone'>Smartphone(Android)</option>
                    <option value='tablet'>Tablet(Android)</option>
                    <option value='iPhone'>iPhone(iOS)</option>
                    <option value='iPad'>iPad(iOS)</option>
                    <option value='desktop'>Desktop</option>
                </select>
                <span class="cstmPlaceholder"><i className="fa-solid fa-mobile-screen-button"></i> Device</span>
            </label>
                </div>
                <div className="col-lg-6">
                <label class="custom-field one">
                <input type="text" placeholder=" " className="form-control w-100" />
                <span class="cstmPlaceholder"><i className="fa-solid fa-globe"></i> Country</span>
            </label>
                </div>
            </div>
            <button type="button" className="btn btn-primary mt-4" onClick={handleConversionTester}>Step 2) Fire Postback</button>
            {conversionLoading ? <div className="p-2 text-center"> <div className="spinner text-center"></div></div> : <>{postbackSuccessMsg && <p className="p-2 text-white bg-success mt-2 rounded">{postbackSuccessMsg}</p>}</>}
            
            </div>
            </>
            }</>}
        
        </div>
        </div>
        </div>
        </div>

        </>
    )
}
export default ManagerPostbackTest