import React, { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertiserDetails, fetchAdvertiserList } from '../../../Redux/AdvertiserSlice';
import { fetchOfferDetail } from '../../../Redux/OffersSlice';
import { fetchEventList } from '../../../Redux/EventValueSlice';

const ConversionUrl = ({ offerId , publisherId, clickId}) => {
  const [conversionUrl, setConversionUrl] = useState('');
  const loogedIn = JSON.parse(localStorage.getItem('userData'))
  const mainPartner = loogedIn?._id
  const [formData, setFormData] = useState('')
  const offerDetail = useSelector((state)=> state.offers.detail)
  const subadminId = loogedIn._id;
  const advertiserDetail = useSelector((state)=> state.advertiser.detail)
  const eventlist = useSelector((state)=> state.eventvalue.list)
  const dispatch = useDispatch()

  const handleChange = (e)=>{
    setFormData(e.target.value);
    if(mainPartner === 2){
      setConversionUrl(`https://postback.adomobi.com/conversion/postback?m=${loogedIn?._id}&click_id={click_id}&secure=${formData}`);
    }else {
      setConversionUrl(`https://postback.offersmeta.in/conversion/postback?m=${loogedIn?._id}&click_id={click_id}&secure=${formData}`);
    }
  }

  useEffect(() => {
    if(mainPartner === 2){
    {formData ? setConversionUrl(`https://postback.adomobi.com/conversion/postback?m=${loogedIn?._id}&click_id=${clickId}&secure=${advertiserDetail?.secure}`) : setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id=${clickId}&secure=${advertiserDetail?.secure}`)}
  }else{
      {formData ? setConversionUrl(`https://postback.offersmeta.in/conversion/postback?m=${loogedIn?._id}&click_id=${clickId}&secure=${advertiserDetail?.secure}`) : setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id=${clickId}&secure=${advertiserDetail?.secure}`)}
    }
  }, [conversionUrl,formData,advertiserDetail,clickId]);

  const handleCopy =()=>{
    copy(conversionUrl);
    toast.success("Copied Successful!")
  }
  useEffect(() => {
    dispatch(fetchEventList({partners_Id:loogedIn._id, offerId}))
    dispatch(fetchOfferDetail({partners_Id:loogedIn._id ,offerId}))
  }, []);
  useEffect(() => {
    dispatch(fetchAdvertiserDetails({partners_Id: loogedIn._id, advertiserId:offerDetail?.advertiserId}))
  }, [offerDetail]);

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Conversion Global Postback</h3>
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
              <option value='' hidden>Select Event</option>
              {eventlist?.map((item)=><option key={item._id} value={item.eventValue}>{item?.eventValue}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionUrl;