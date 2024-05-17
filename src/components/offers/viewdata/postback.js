import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../../Api/base';

const BoxComponent2 = () => {
  const { offerId } = useParams();
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

  return (
    <div style={{ flex: 1, margin: '10px' }}>
        <p>{trackingLinkUrl}</p>
    </div>
  );
};

export default BoxComponent2;
