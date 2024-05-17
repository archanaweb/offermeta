import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../../Api/base';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';

const ConversionUrl = ({ offerId , publisherId}) => {
  const [conversionUrl, setConversionUrl] = useState('');
  const [convListLength, setConvListLength] = useState('')
  const [postbackPublisherId, setPostbackPublisherId]  = useState()
  const [clickId, setClickId] = useState(''); 
  const loogedIn = JSON.parse(localStorage.getItem('userData'))
  const subadminId = loogedIn._id

  useEffect(() => {
    setConversionUrl(`https://postback.offersmeta.in/conversion/postback?click_id={click_id}`);
  }, [conversionUrl]);

  const fetchConversionList = async ()=> {
    const response = await fetch(`${BASE_URL}conversion/ConversionList?partners_Id=${subadminId}`)
    const resData = await response.json()
    const conList = resData.responseResult
    // const lastConvs = conList?.length-1
    // const pubId = conList[lastConvs]?.publisherId
    // setPostbackPublisherId(pubId)
    // console.log('pubId><',pubId)
  }

  const fetchSentLog = async ()=> {
    const response = await fetch(`${BASE_URL}sentLogs/sentLog?publisherId=${postbackPublisherId}`)
    console.log('sentLogRes', response)
  }

  useEffect(() => {
    fetchConversionList()
  }, []);
  // useEffect(()=>{
  //   console.log('setpubId><oooo',postbackPublisherId)
  //   fetchSentLog()
  // },[postbackPublisherId])

  const handleCopy =()=>{
    copy(conversionUrl);
    toast.success("Copied Successful!")
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Global Postback</h3>
        <div>
        <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
        </div>
        </div>
        <div>
          <div className='mt-2'>
            <p>{conversionUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionUrl;
