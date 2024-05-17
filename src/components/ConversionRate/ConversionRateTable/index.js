import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./table.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
const StaticTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const location = useLocation();
  const [subadminId, setSubAdminId] = useState('');
  const adminId = window.localStorage.getItem('subadminId');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('trackingLink/trackingList');
      const data = response.data.responseResult; // Access the responseResult property
      setClickData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
  };

  // Calculate the indexes of the current page's items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = clickData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
    <div className='container_table'>
      <div className="table-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="links-container">
          <div className="row">
            <div className="col-2">
              <a href="/ctable">Conversion</a>
            </div>
            <div className="col-2">
              <a href="/table">Click</a>
            </div>
            <div className="col-2">
              <a href="#">Invalid Click</a>
            </div>
            <div className="col-2">
              <a href="#">Pixel logs</a>
            </div>
            <div className="col-2">
              <a href="#">sent logs</a>
            </div>
          </div>
        </div>
        <div className="select-fields-container">
          <div className="row">
            <div className="col-2">
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="">Select Option 1</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
            <div className="col-2">
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="">Select Option 1</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
            <div className="col-2">
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="">Select Option 1</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
            <div className="col-2">
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="">Select Option 1</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
          </div>
          <div className="row" style={{ marginTop: '-1em' }}>
            <div className="search-bar1"></div>
            <div className="search-bar1"></div>
            <div className="d-flex justify-content-end">
              <select value={selectValue} onChange={handleSelectChange}>
                <option value="">Select Option 1</option>
                <option value="option2">Select Option 2</option>
                <option value="option3">Select Option 3</option>
                <option value="option4">Select Option 4</option>
                <option value="option5">Select Option 5</option>
              </select>
            </div>
        
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
     
          </div>
        </div>
        <div className="containerdate">
          <div className="date-field"><input type="date" /></div>
          <div className="button-container">
            <button className="button">Button 1</button>
            <button className="button">Button 2</button>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>INSIGHT</th>
              <th>Id</th>
              <th>Date</th>
              <th>Click Id</th>
              <th>Offer</th>
              <th>Affiliate</th>
              <th>IP</th>
              <th>Payout</th>
              <th>Revanue</th>
              <th>Event Type</th>
        

            </tr>
          </thead>
          {Array.isArray(clickData) ? (
            <tbody>
              {currentItems.map((click, index) => (
                <tr key={click.id}>
                  <td>{index + 1}</td>
                  <td>{click._id}</td>
                  <td>{click.clickTime}</td>
                  <td>{click.clickId}</td>
                  <td>{click.offerId}</td>
                  <td>{click.affiliateId}</td>
                  <td>{click.ipAddress}</td>
                  <td>{click.Payout}</td>
                  <td>{click.revenue}</td>
                  <td>{click.eventType}</td>
                
                </tr>
              ))}
            </tbody>
          ) : (
            <div>No click data available.</div>
          )}
        </table>
       {/* Pagination */}
       <div className="pagination">
          {clickData.length > itemsPerPage && (
            <>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
              p
              </button>
            </>
          )}

          {/* Display page numbers */}
          {clickData.length > itemsPerPage &&
            Array.from({ length: Math.ceil(clickData.length / itemsPerPage) }).map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

          {clickData.length > itemsPerPage && (
            <>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(clickData.length / itemsPerPage)}
              >
              N
              </button>
            </>
          )}
        </div>
      </div>
    </div>
    </Sidebar>
    </div>
  );
};
export default StaticTable;
