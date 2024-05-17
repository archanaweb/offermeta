import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../../../Api/base';
import copy from "copy-to-clipboard";
import { toast } from 'react-toastify';

const ConversionUrl = ({ offerId }) => {
  const [trackingLinkUrl, setTrackingUrl] = useState('');
  const [clickId, setClickId] = useState(''); 
  useEffect(() => {
    fetchData();
    fetchPublishers();
  }, [offerId]);

  const fetchData = async () => {
  };

  const fetchPublishers = async () => {
  };

  const handleInputChange = (event) => {
    setClickId(event.target.value);
  };
  useEffect(() => {
    setTrackingUrl(`${BASE_URL}conversion/postback?click_id={click_id}`);
  }, [clickId]);

  const handleCopy =()=>{
    copy(trackingLinkUrl);
    toast.success("Copied Successful!")
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3>Conversion Link</h3>
        <div>
        <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
        </div>
        </div>
        <div>
          <div className='mt-2'>
            <p>{trackingLinkUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversionUrl;
