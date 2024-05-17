import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './box.css'
import BASE_URL from '../../../Api/base';
import PageTitle from '../../PageTitle';

const BoxComponent = ({ onSelectOffer }) => {
  const [offerData, setOfferData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedOfferData, setEditedOfferData] = useState({});
  const { offerId } = useParams();
  console.log(typeof onSelectOffer); // Check the type in the console


  const handleEdit = () => {
    setIsEditing(true);
    setEditedOfferData({ ...offerData }); // Create a copy of offerData
  };

  const handleSubmit = async () => {
    try {
      // Call API to save the edited data
      const response = await axios.put(BASE_URL + 'offer/updateOffer?offerId=${offerId}', editedOfferData);
      const responseData = response.data.responseResult;
      console.log(responseData);
      setOfferData(responseData);
      setIsEditing(true);
      // Instead of directly setting the state, call onSelectOffer from the StaticTable component
      if (typeof onSelectOffer === "function") {
        onSelectOffer(editedOfferData); // This will update the table data on TablePage
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleFieldChange = (field, value) => {
    setEditedOfferData((prevData) => ({ ...prevData, [field]: value }));
  };

  useEffect(() => {
    fetchData();
  }, [offerId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `offer/viewOffer?offerId=${offerId}`);
      const responseData = response.data.responseResult;
      setOfferData(responseData);
      setEditedOfferData(responseData); // Initialize editedOfferData with fetched data
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }

  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!offerData) {
    return <div>No data available.</div>;
  }
  const handleStatusChange = (e) => {
    setEditedOfferData((prevData) => ({ ...prevData, offerStatus: e.target.value }));
  };

  const Radio = ({ name, value, checked, onChange, text }) => (
    <label
      style={{
        backgroundColor: value === 'yes' ? 'green' : 'red',
        color: 'white',
        cursor: 'pointer',
        flex: "1 3",
        padding: "2px",
      }}
    >
      <input className='form-control'
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      {text}
    </label>
  );
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return (
    <div>
      <form className="container" onSubmit={handleSubmit}>
      <div className="field" id="editableField">
          <div className='offersData'>
          <div className='pb-2 mb-2 d-flex justify-content-between align-items-center border-b'>
          <h3>
            {capitalizeFirstLetter(offerData.title)}  
          </h3>
          <div>
            {isEditing ? (
              <>
                <button type="submit" className='mx-2 btn btn-primary btn-sm'>Save</button>
                <button type="button" onClick={handleCancel} className='btn btn-outline-secondary btn-sm'>Cancel</button>
              </>
            ) : (
              <button onClick={handleEdit} className='btn btn-outline-secondary btn-sm'>Edit</button>
            )}
            </div>
            </div>
            <div className='offersDataItem'>
              <p>Offer ID:</p>
              <span> {offerData._id}</span>
            </div>
            <div className='offersDataItem'>
              <p>
                Advertiser:
              </p>
              {isEditing ? (
                  <input className="form-control"
                    type="text"
                    value={editedOfferData.advertiser || ''}
                    onChange={(e) => handleFieldChange('advertiser', e.target.value)}
                  />
                ) : (
                <span>{offerData.advertiser}</span> 
                )}
            </div>
            <div className='offersDataItem'>
              <p>
                Name:
              </p>
              {isEditing ? (
                  <input className="form-control"
                    type="text"
                    value={editedOfferData.title || ''}
                    onChange={(e) => handleFieldChange('title', e.target.value)}
                  />
                ) : (
                 <span>{offerData.title}</span> 
                )}
            </div>
            <div className='offersDataItem'>
              <p>
                Privacy Level:
              </p>
              {isEditing ? (
                  <input className="form-control"
                    type="text"
                    value={editedOfferData.privacyLevel || ''}
                    onChange={(e) => handleFieldChange('privacyLevel', e.target.value)}
                  />
                ) : (
                 <span>{ offerData.privacyLevel}</span>
                )}
            </div>
              <div className='offersDataItem' style={{ display: 'flex', alignItems: 'center' }}>
                <p>Status:</p>
                {/* <Radio
                  name="status"
                  value="yes"
                  checked={editedOfferData.offerStatus === 'yes'}
                  onChange={handleStatusChange}
                  text={editedOfferData.offerStatus === 'yes' ? 'On' : 'Off'}
                /> */}
              </div>
            <div className='offersDataItem'>
              <p>
                Operating System:
              </p>
              {isEditing ? (
                  <input className="form-control"
                    type="text"
                    value={editedOfferData.operatingSystem || ''}
                    onChange={(e) => handleFieldChange('operatingSystem', e.target.value)}
                  />
                ) : (
                 <span>{offerData.operatingSystem}</span> 
                )}
            </div>
          </div>
      </div>
      </form>
      </div>
  );
};

export default BoxComponent;
