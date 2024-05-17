import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../Api/base';

const OfferDetails = () => {
  const [offerData, setOfferData] = useState(null);

  useEffect(() => {
    // Make an API request to fetch the offer details
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const storedFormData = JSON.parse(localStorage.getItem('formData'));
      const subadminId = window.localStorage.getItem('subadminId')
      const offerId = window.localStorage.getItem('_id');
      const response = await axios.get(BASE_URL + `viewOffer?partners_Id=${subadminId}&offerId=${offerId}`); // Replace with the appropriate API endpoint
      const responseData = response.data;
      setOfferData(responseData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!offerData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Offer Details</h2>
      <div>
        <h3>Form 1</h3>
        <p>Title: {offerData.title}</p>
        <p>Advertiser: {offerData.advertiser}</p>
        <p>Privacy Level: {offerData.privacyLevel}</p>
        <p>Description: {offerData.description}</p>
        <p>Category: {offerData.category}</p>
        <p>Vertical: {offerData.vertical}</p>
        <p>Traffic: {offerData.traffic}</p>
        <p>Operating System: {offerData.operatingSystem}</p>
        <p>Incentive: {offerData.incentive}</p>
      </div>
      <div>
        <h3>Form 2</h3>
        <p>Goal Value: {offerData.goalValue}</p>
        <p>Status: {offerData.status}</p>
        <p>Currency: {offerData.currency}</p>
        <p>Payout: {offerData.payout}</p>
        <p>Revenue: {offerData.revenue}</p>
      </div>
      <div>
        <h3>Form 3</h3>
        <p>Geo Allowed: {offerData.geoAllowed}</p>
        <p>Preview URL: {offerData.previewUrl}</p>
        <p>Tracking URL: {offerData.trackingUrl}</p>
      </div>
    </div>
  );
};

export default OfferDetails;
