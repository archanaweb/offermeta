import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./advertiser.css";
import Sidebar from "../Sidebar";
import Navbar from '../navbar';
import BASE_URL from "../../Api/base";
import PageTitle from "../PageTitle";
import { Pagination } from "react-bootstrap";
const StaticTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [subadminId, setSubAdminId] = useState('');
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);
  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `advertiser/advertiserList?partners_Id=${loggedIn._id}`);
      const data = response.data.responseResult; 
      setClickData(data.reverse());
      console.log(data);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
  };

  useEffect(() => {

    const storedSubAdminId = localStorage.getItem('subadminId');
    setSubAdminId(storedSubAdminId);
    console.log('Stored SubAdminId:', storedSubAdminId);

  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (<>
      <div className='Container_card'>
    <Sidebar>
      <Navbar />
      <div className='page_sec'>
          <PageTitle />
      <div className="table-container">
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
          <input className="form-control"
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
           <a href="/advertiseradd" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create Advertiser</a>
        </div>
       
      </div>
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
          <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>ADVERTISER</th>
              <th>COMPANY</th>
              <th>EMAIL</th>
              <th>FIRST NAME</th>
              <th>LAST NAME</th>
              <th>MOBILE NUMBER</th>
              <th>STATUS</th>
              <th>Country</th>
                <th>Region</th>
                <th>Street</th>
                <th>City</th>
                <th>PinCode</th>
                <th>Manager</th>
            </tr>
          </thead>
            <tbody>
            {clickData
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((click, index) => (
                <tr key={click.id}>
                  <td>{index + 1}</td>
                  <td>{click.userType}</td>
                  <td>{click.companyName}</td>
                  <td>{click.email}</td>
                  <td>{click.firstName}</td>
                  <td>{click.lastName}</td>
                  <td>{click.mobileNumber}</td>
                  <td><span className="statusBtn">{click.status}</span></td>
                  <td>{click.country}</td>
                  <td>{click.region}</td>
                  <td>{click.street}</td>
                  <td>{click.city}</td>
                  <td>{click.pinCode}</td>
                  <td>{click.managerName}</td>
                </tr>
              ))}
            </tbody>
          
        </table>
        </div>
        {/* Pagination */}
      <Pagination className="pagination">
          {clickData.length > itemsPerPage && (
            <>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </>
          )}

          {/* Display page numbers */}
          {clickData.length > itemsPerPage &&
            Array.from({ length: Math.ceil(clickData.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </Pagination.Item>
            ))}

          {clickData.length > itemsPerPage && (
            <>
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(clickData.length / itemsPerPage)}
              />
              
            </>
          )}
        </Pagination>
        </div>
        </div>
      </Sidebar>
    </div>
    </>
  );
};
export default StaticTable;
