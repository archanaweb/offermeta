import React, { useState, useEffect } from 'react';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEventList } from '../../../Redux/EventValueSlice';
import { advertiserGenerateToken, fetchAdvertiserDetails } from '../../../Redux/AdvertiserSlice';
import { fetchOfferDetail } from '../../../Redux/OffersSlice';

const AdveriserPostback = ({ advertiserId}) => {
  const [conversionUrl, setConversionUrl] = useState('');
  const [formData, setFormData] = useState('')
  const loogedIn = JSON.parse(localStorage.getItem('userData'))
  const mainPartner = loogedIn?._id
  const advertiserDetail = useSelector((state)=> state.advertiser.detail)
  const advertiserToken = useSelector((state)=> state.advertiser.generateTokenRes)

  const dispatch = useDispatch()
  
  useEffect(()=> {
    dispatch(fetchAdvertiserDetails({partners_Id: loogedIn._id, advertiserId}))
  },[])
  useEffect(()=> {
    if(mainPartner === 2){
      setConversionUrl(`https://postback.adomobi.com/conversion/postback?m=${mainPartner}&click_id={replace_it}&secure=${advertiserDetail?.secure}`);
    }else{
      setConversionUrl(`https://postback.offersmeta.in/conversion/postback?m=${mainPartner}&click_id={replace_it}&secure=${advertiserDetail?.secure}`);
    }
  },[advertiserDetail])

  const handleGenarateToken = async()=> {
    const generateTokenRes = await dispatch(advertiserGenerateToken({partners_Id: loogedIn._id, advertiserId: advertiserDetail.advertiserId}))
    const res = generateTokenRes.payload
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
      if(mainPartner){
        setConversionUrl(`https://postback.adomobi.com/conversion/postback?click_id={replace_it}&secure=${advertiserDetail?.secure}`);
    }else{
        setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id={replace_it}&secure=${advertiserDetail?.secure}`);
      }
    }else(
      toast.error(res.responseMessage)
    )
  }

  const handleCopy =()=>{
    copy(conversionUrl);
    toast.success("Copied Successful!")
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Advertiser Postback</h3>
        
        </div>
        <div>
          <div className='mt-2'>
            <div className='d-flex justify-content-between align-items-center mb-4'>
              <p className='font-italic text-secondary mb-0'>Secure Token: <b>{`${advertiserDetail?.secure}`}</b></p>
              <button className='btn btn-primary' onClick={()=>handleGenarateToken()}>Genarate</button>
            </div>
            <div className='d-flex justify-content-end mb-2'>
          <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
        </div>
            <textarea name='postback' value={conversionUrl} className='form-control w-100 py-2 px-2'></textarea>
            {/* <select className='form-control'
              name="event_value"
              value={formData}
              onChange={handleChange}>
              <option value='' hidden>Select Event Value</option>
              {eventlist?.map((item)=><option key={item._id} value={item.eventValue}>{item?.eventValue}</option>)}
            </select> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdveriserPostback;
