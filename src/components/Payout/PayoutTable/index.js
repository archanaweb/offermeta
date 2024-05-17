import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./table.css";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import PageTitle from "../../PageTitle";
import Ctabs from "../../Ctabs";

const StaticTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
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
        <div className='page_sec'>
          <PageTitle />
        <div className="table-container">
           <Ctabs />
          <div className="container">
            <div className="row">
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Status</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Advertiser</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Availability</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Country</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                  <option value="">Goal</option>
                  <option value="option2">Select Option 2</option>
                  <option value="option3">Select Option 3</option>
                  <option value="option4">Select Option 4</option>
                  <option value="option5">Select Option 5</option>
                </select>
              </div>
              <div className="col-lg-2 col-md-3 col-sm-4 col-6">
                <div className="d-flex justify-content-end">
                  <select className="form-control" value={selectValue} onChange={handleSelectChange}>
                    <option value="">Select Option 1</option>
                    <option value="option2">Select Option 2</option>
                    <option value="option3">Select Option 3</option>
                    <option value="option4">Select Option 4</option>
                    <option value="option5">Select Option 5</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12">
                <div className="search-bar1"></div>
              </div>
              <div className="col-12">
                <div className="search-bar1"></div>
              </div>
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
              <th>Goal</th>

            </tr>
          </thead>
          {Array.isArray(clickData) ? (
            <tbody>
              {clickData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((click, index) => (
                <tr key={click.id}>
                  <td>{index + 1}</td>
                  <td>{click._id}</td>
                  <td>{click.clickTime}</td>
                  <td>{click.clickId}</td>
                  <td>{click.offerId}</td>
                  <td>{click.affiliateId}</td>
                  <td>{click.IP}</td>
                  <td>{click.Payout}</td>
                  <td>{click.revenue}</td>
                  <td>{click.goalValue}</td>
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
