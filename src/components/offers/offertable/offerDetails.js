import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../../../Api/base';

const OfferDetails = ({ offerId }) => {
  const [offer, setOffer] = useState(null);

  useEffect(() => {
    const fetchOfferDetails = async () => {
      try {
        const response = await axios.get(BASE_URL + `offer/viewOffer?offerId=${offerId}`);
        const offerData = response.data;
        setOffer(offerData);
      } catch (error) {
        console.error('Error fetching offer details:', error);
      }
    };

    fetchOfferDetails();
  }, [offerId]);

  if (!offer) {
    return <div>Loading offer details...</div>;
  }

  return (
    <div>
      <h2>Offer Details</h2>
      <p>ID: {offer.id}</p>
      <p>Title: {offer.title}</p>
      {/* Display other offer details */}
    </div>
  );
};

export default OfferDetails;
