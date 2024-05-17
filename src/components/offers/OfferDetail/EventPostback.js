import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../../Api/base';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventList } from '../../../Redux/EventValueSlice';

const EventPostback = ({ offerId , publisherId}) => {
  const [conversionUrl, setConversionUrl] = useState('');
  const [convListLength, setConvListLength] = useState('')
  const [postbackPublisherId, setPostbackPublisherId]  = useState()
  const [clickId, setClickId] = useState(''); 
  const [formData, setFormData] = useState('')
  const loogedIn = JSON.parse(localStorage.getItem('userData'))
  const subadminId = loogedIn._id;
  const eventlist = useSelector((state)=> state.eventvalue.list)

  const dispatch = useDispatch()

  const fetchConversionList = async ()=> {
    const response = await fetch(`${BASE_URL}conversion/ConversionList?partners_Id=${subadminId}`)
    const resData = await response.json()
    const conList = resData.responseResult
    const lastConvs = conList?.length-1
    const pubId = conList[lastConvs]?.publisherId
    setPostbackPublisherId(pubId)
    console.log('pubId><',pubId)
  }

  const handleChange = (e)=>{
    setFormData(e.target.value);
    setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id={replace_it}&event_value=${formData}`);
  }
  useEffect(() => {
    setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id={replace_it}&event_value=${formData}`);
  }, [conversionUrl,formData]);

  const fetchSentLog = async ()=> {
    const response = await fetch(`${BASE_URL}sentLogs/sentLog?publisherId=${postbackPublisherId}`)
    console.log('sentLogRes', response)
  }
  useEffect(()=> {
    console.log('foemdata>?>?>?', formData)
  },[formData])

  useEffect(() => {
    fetchConversionList()
    dispatch(fetchEventList(offerId))
  }, []);
  useEffect(()=>{
    console.log('eventList<>>>',eventlist)
    fetchSentLog()
  },[eventlist])

  const handleCopy =()=>{
    copy(conversionUrl);
    toast.success("Copied Successful!")
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Event Postback</h3>
        <div>
          <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
        </div>
        </div>
        <div>
          <div className='mt-2'>
            <p>{conversionUrl}</p>
            <select className='form-control'
              name="event_value"
              value={formData}
              onChange={handleChange}>
              <option value='' hidden>Select Event Value</option>
              {eventlist.map((item)=> <option key={item._id} value={item.eventValue}>{item?.eventValue}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPostback;
