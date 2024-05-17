import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../Api/base';

const BoxComponent1 = () => {
  const navigate = useNavigate()
  const { offerId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);
  const [trackingLinkUrl, setTrackingUrl] = useState('');

  useEffect(() => {
    fetchData();
  }, [offerId]);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchData = async () => {
    try {
      const subadminId = window.localStorage.getItem('subadminId');
      const response = await axios.get(
        BASE_URL + `offer/viewOffer?partners_Id=${subadminId}&offerId=${offerId}`
      );
      const responseData = response.data.responseResult;
      setData(responseData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const fetchPublishers = async () => {
    try {
      const subadminId = window.localStorage.getItem('subadminId');
      const response = await axios.get(
        BASE_URL + `publicher/publisherList?partners_Id=${subadminId}`
      );
      const publisherData = response.data.responseResult;
      setPublishers(publisherData);
    } catch (error) {
      console.error('Error fetching publishers:', error);
    }
  };

  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    setSelectedPublisherId(selectedId);
  };

  const generateTrackingUrl = () => {
    if (selectedPublisherId) {
      // Construct the tracking URL with selectedPublisherId and offerId
      const trackingLinkUrl = BASE_URL + `tracking/click?o=${selectedPublisherId}&a=${offerId}`;
      // Set the tracking URL in the state
      setTrackingUrl(trackingLinkUrl);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data available.</div>;
  }
  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = trackingLinkUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    alert('Tracking URL copied to clipboard!');
  };
  const handleManage= () => {
    navigate('/tracking');
  }


  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3 className='mb-0'>Tracking Link</h3>
        <div>
          <button onClick={handleCopy} className='mx-2 btn btn-primary btn-sm'>
              Copy
            </button>
            <button onClick={handleManage} className='btn btn-outline-secondary btn-sm'>
              Manage
            </button>
            </div>
            </div>
        <div>
          <div className='mb-2 mt-3'>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="">Select a publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher._id} >
                  {publisher.firstName}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-2'>
            <p>Tracking URL: {trackingLinkUrl}</p>
          </div>
          <button onClick={generateTrackingUrl} className='btn btn-primary'>Generate Tracking URL</button>
        </div>
      </div>
    </div>
  );
};

export default BoxComponent1;
