import React, { useState, useEffect } from 'react';
import BASE_URL from '../../../Api/base';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventList } from '../../../Redux/EventValueSlice';
import { advertiserGenerateToken, fetchAdvertiserDetails } from '../../../Redux/AdvertiserSlice';
import { fetchOfferDetail } from '../../../Redux/OffersSlice';

const EventPostback = ({ offerId}) => {
  const [conversionUrl, setConversionUrl] = useState('');
  const [formData, setFormData] = useState('')
  const loogedIn = JSON.parse(localStorage.getItem('userData'))
  const mainPartner = loogedIn?._id;
  const offerDetail = useSelector((state)=> state.offers.detail)
  const subadminId = loogedIn._id;
  const advertiserDetail = useSelector((state)=> state.advertiser.detail)
  const eventlist = useSelector((state)=> state.eventvalue.list)

  const dispatch = useDispatch()
  const handleChange = (e)=>{
    setFormData(e.target.value);
    if(mainPartner === 2){
      setConversionUrl(`https://postback.adomobi.com/conversion/postback?m=${loogedIn?._id}&click_id={replace_it}&secure=${advertiserDetail?.secure}&event_value=${formData}`);
    }else{
      setConversionUrl(`https://postback.offersmeta.in/conversion/postback?m=${loogedIn?._id}&click_id={replace_it}&secure=${advertiserDetail?.secure}&event_value=${formData}`);
    }
  }
  useEffect(() => {
    if(mainPartner === 2){
    setConversionUrl(`https://postback.adomobi.com/conversion/postback?m=${loogedIn?._id}&click_id={replace_it}&secure=${advertiserDetail?.secure}&event_value=${formData}`);
  }else{
      setConversionUrl(`https://postback.offersmeta.in/conversion/postback?m=${loogedIn?._id}&click_id={replace_it}&secure=${advertiserDetail?.secure}&event_value=${formData}`);
    }
  }, [advertiserDetail,formData]);

  useEffect(() => {
    dispatch(fetchEventList({partners_Id:loogedIn._id, offerId}))
    dispatch(fetchOfferDetail({partners_Id:loogedIn._id ,offerId}))
  }, []);
  useEffect(() => {
    dispatch(fetchAdvertiserDetails({partners_Id: loogedIn._id, advertiserId:offerDetail?.advertiserId}))
  }, [offerDetail]);

  const handleCopy =()=>{
    copy(conversionUrl);
    toast.success("Copied Successful!")
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Conversion Postback</h3>
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
              {eventlist?.map((item)=><option key={item._id} value={item.eventValue}>{item?.eventValue}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPostback;
