import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../../Api/base';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagerPublisherList } from '../../../../Redux/ManagerSlice';

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
  const publisherList = useSelector((state)=> state.manager.publisherList)
  const dispatch = useDispatch()


  const generateTrackingUrl = (selectedId) => {
      const trackingLinkUrl = BASE_URL + `impression/imp?o=${offerId}&a=${selectedId}`;
      if (selectedId) {
        setTrackingUrl(trackingLinkUrl);
      }
  };
  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    console.log('selectedPub', selectedId)
    generateTrackingUrl(selectedId)
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
    dispatch(fetchManagerPublisherList(publisherUser._id))
  },[])


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
        <div className='mb-2 mt-3 position-relative'>
            <span className='position-absolute dropdownIcon'><b role="presentation"></b></span>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="none" hidden>Select a Publisher</option>
              {publisherList?.map((publisher) => (
                <option key={publisher?._id} value={publisher?._id}>
                  {`(ID: ${publisher?._id}) ${publisher.firstName} ${publisher.lastName}`}
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
            {/* <p className='mb-0'>{trackingLinkUrl && `<img src="${trackingLinkUrl}">`}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressionUrl;
