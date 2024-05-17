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
    <div>
      <div className='track-link'>
        <h3 className='border-b'>Conversion URL</h3>
        <div>
          <div>
            <input className='form-control'
              type="text"
              placeholder="Enter Click ID"
              value={clickId}
              onChange={handleInputChange}
            />
          </div>
          <div className='mt-2'>
            <p>Conversion URL: {trackingLinkUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxComponent2;