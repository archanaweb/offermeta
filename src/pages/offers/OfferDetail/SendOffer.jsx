import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../../Api/base';

const SendOffer = ({offerId}) => {
  const [publishers, setPublishers] = useState([]);
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem('userData'))

  const fetchPublishers = async () => {
    try {
      const response = await axios.get(
        BASE_URL + `publicher/publisherList?partners_Id=${loggedIn._id}`
      );
      const publisherData = response.data.responseResult;
      console.log("publisherData>>>",publisherData)
      setPublishers(publisherData);
    } catch (error) {
      console.error('Error fetching publishers:', error);
      toast.error('Something went wrong')
    }
  };

  useEffect(() => {
    fetchPublishers();
  }, []);

  const sendOfferMail = async() => {
    const mailRes = await fetch(BASE_URL+ `publicher/sendOfferToPublisher?publisherId=${selectedPublisherId}&offerId=${offerId}`, {
      method: 'POST',
      headers: {
          'accept': 'application/json'
      }
  });
      const res = await mailRes.json()
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
    }else{
      toast.error(res.responseMessage)
    }
  };

  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    setSelectedPublisherId(selectedId); 
  };


  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
        <h3 className='mb-0'>Send Mail</h3>
            </div>
        <div>
          <div className='mb-2 mt-3'>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="">Select a publisher</option>
              {publishers.map((publisher) => (
                <option key={publisher.publisherId} value={publisher.publisherId} >
                  {`(ID: ${publisher.publisherId}) ${publisher.firstName} ${publisher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className='g-2 rounded url-box'>
            <button type='button' className='btn btn-primary btn-sm' onClick={sendOfferMail}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SendOffer;
