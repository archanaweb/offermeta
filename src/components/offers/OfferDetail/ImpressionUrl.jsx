import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../Api/base';
import { toast } from 'react-toastify';

const ImpressionUrl = ({offerId}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);
  const [trackingLinkUrl, setTrackingUrl] = useState('');
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
  const subAdminId = LoggedInUser._id


  const [formData, setFormData] = useState({});
  const [trackingData, setTrackingData] = useState({});

  const trackingFormdata = (data) =>{
    setTrackingData(data);
  }
  const handleRadioChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.checked });
  }
  useEffect(() => {
    fetchData();
  }, [offerId]);

  useEffect(() => {
    fetchPublishers();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `offer/viewOffer?partners_Id=${subAdminId}&offerId=${offerId}`
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
      console.log("publisherData>>>",publisherData)
      setPublishers(publisherData);
    } catch (error) {
      console.error('Error fetching publishers:', error);
    }
  };

  const generateTrackingUrl = (selectedId) => {
    const trackingLinkUrl = BASE_URL + `impression/imp?o=${offerId}&a=${selectedId}`;
    if (selectedId) {
      setTrackingUrl(trackingLinkUrl);
    }
  };
  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    generateTrackingUrl(selectedId)
    setSelectedPublisherId(selectedId);
    
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
    toast.success("Copied Successful!")
  };
  const handleManage= () => {
    navigate('/tracking');
  }


  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3 className='mb-0'>Impression Link</h3>
        <div>
            {/* <button onClick={handleManage} className='btn btn-outline-secondary btn-sm'>
              Manage
            </button> */}
            </div>
            </div>
        <div>
          <div className='mb-2 mt-3'>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="">Select a publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher._id} value={publisher._id} >
                  {`(ID: ${publisher._id}) ${publisher.firstName} ${publisher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className='pt-2 mt-2 d-flex justify-content-between align-items-center rounded'>
            <p className='mb-2'>Genrated Url</p>
            <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
          </div>
          <div className='g-2 rounded url-box'>
          <textarea className='form-control w-100' type='text' value={trackingLinkUrl} />
            <p className='mb-0'>{trackingLinkUrl && `<img src="${trackingLinkUrl}">`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressionUrl;
