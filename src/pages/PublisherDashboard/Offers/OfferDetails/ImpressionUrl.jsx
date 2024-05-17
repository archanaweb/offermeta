import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../../Api/base';
import { toast } from 'react-toastify';

const ImpressionUrl = ({offerId}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [trackingLinkUrl, setTrackingUrl] = useState('');
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
  const subAdminId = LoggedInUser._id
  const [formData, setFormData] = useState({});
  const [trackingData, setTrackingData] = useState({});
  const publisherUser = JSON.parse(localStorage.getItem('userData'));
  const mainPartner = publisherUser?.partners_Id


  const generateTrackingUrl = () => {
      const trackingLinkUrl = `https://go2.clicksmeta.com/impression/imp?m=${publisherUser.partners_Id}&o=${offerId}&a=${publisherUser.publisherId}`;
      const mainTrackingLinkUrl = `https://click.adomobi.com/impression/imp?m=${publisherUser.partners_Id}&o=${offerId}&a=${publisherUser.publisherId}`;
      if(mainPartner === 2){
        setTrackingUrl(mainTrackingLinkUrl)
      }else{
        setTrackingUrl(trackingLinkUrl);
      }
  };

  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = trackingLinkUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast.success("Copied Successful!")
  };
  const handleManage= () => {
    navigate('/tracking');
  }

  useEffect(()=>{
    generateTrackingUrl()
  },[])


  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3 className='mb-0'>Impression Link</h3>
        <div>
            
            </div>
            </div>
        <div>
          <div className='pt-2 mt-2 d-flex justify-content-between align-items-center rounded'>
            <p className='mb-2'>Genrated Url</p>
            <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
          </div>
          <div className='g-2 rounded url-box'>
          <textarea className='form-control w-100' type='text' value={trackingLinkUrl} />
            {/* <p className='mb-0'>{trackingLinkUrl && `<img src="${trackingLinkUrl}">`}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressionUrl;
