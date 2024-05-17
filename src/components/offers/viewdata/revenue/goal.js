import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BASE_URL from '../../../../Api/base';

const Revenue = () => {
  const { offerId } = useParams();
  const [clickData, setClickData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const [isEditing, setIsEditing] = useState(false); // State to manage edit mode
  const [editedOfferData, setEditedOfferData] = useState({ title: '' }); // State to store edited offer data
  const [offerData, setOfferData] = useState({ title: '' }); // Define offerData state

  const handleEdit = () => {
    setIsEditing(true);
    setEditedOfferData({ ...offerData });
  };


  const handleSave = () => {
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + 'trackingLink/trackingList');
      const data = response.data.responseResult;
      setClickData(data);
    } catch (error) {
      console.error('Error fetching click data:', error);
      setClickData([]);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clickData.slice(indexOfFirstItem, indexOfLastItem);

  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className='track-link mt-4'>
      <div className="field" id="editableField">
        <div className='pb-2 mb-2 d-flex justify-content-between align-items-center border-b'>
          <h3>Revenue & Goals </h3>
          <div>
          {isEditing ? (
              <>
                <input className='form-control'
                  type="text"
                  value={editedOfferData.title}
                  onChange={(e) => setEditedOfferData({ ...editedOfferData, title: e.target.value })}
                />
                <button onClick={handleSave} className='mx-2 btn btn-primary btn-sm'>Save</button>
                <button onClick={handleCancel} className='btn btn-outline-secondary btn-sm'>Cancel</button>
              </>
            ) : (
              <>
                {offerData.title}
                <button onClick={handleEdit} className='btn btn-outline-secondary btn-sm'>Edit</button>
              </>
            )}
            </div>
        </div>
        <div>
          
          {/* The rest of the code remains unchanged */}
          {currentItems.length > 0 ? (
          <table>
            <thead>
              <tr>
                {/* <th>INSIGHT</th> */}
                <th>Id</th>
                <th>Value</th>
                <th>Type</th>
                {/* <th>Click Id</th>
                <th>Offer</th>
                <th>Affiliate</th>
                <th>IP</th> */}
                <th>Payout</th>
                <th>Revenue</th>
                {/* <th>Goal</th> */}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((click, index) => (
                <tr key={click.id}>
                  {/* <td>{index + 1}</td> */}
                  <td>{click._id}</td>
                  <td>{click.clickTime}</td>
                  <td>{click.type}</td>
                  {/* <td>{click.clickId}</td>
                  <td>{click.offerId}</td> */}
                  {/* <td>{click.affiliateId}</td> */}
                  {/* <td>{click.IP}</td> */}
                  <td>{click.Payout}</td>
                  <td>{click.revenue}</td>
                  {/* <td>{click.goalValue}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div>No click data available.</div>
        )}
      {clickData.length > itemsPerPage && (
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={nextPage} disabled={indexOfLastItem >= clickData.length}>Next</button>
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Revenue;
