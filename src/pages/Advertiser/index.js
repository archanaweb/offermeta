import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import BASE_URL from "../../Api/base";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const AdvertiserList = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const loggedIn = JSON.parse(localStorage.getItem('userData'));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [clickData, setClickData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };
  const fetchData = async () => {
    setLoading(true)
    try {
      const response = await axios.get(BASE_URL + `advertiser/advertiserList?partners_Id=${loggedIn._id}`);
      const data = response.data?.responseResult; 
      setClickData(data);
      setLoading(false)
    } catch (error) {
      console.error('Error fetching click data:', error);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log('clickData', clickData)
  },[clickData]);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
      <div className='page_sec pt-3'>
        <div className="container">
      <div className="table-container">
        <div className="row d-flex justify-content-between align-items-center mb-3">
            <div className="col-lg-4">
          <input className="form-control w-100"
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div className="col-lg-3 d-flex justify-content-end">
           <Link to="/advertiseradd" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create Advertiser</Link>
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
              <th>COMPANY</th>
              <th>EMAIL</th>
              <th>NAME</th>
              <th>MOBILE NUMBER</th>
              <th>STATUS</th>
              <th>CREATED AT</th>
              <th>Country</th>
              <th>Manager</th>
            </tr>
          </thead>
            {loading? <><tbody> <tr>
                  <td colSpan={7}>
                  <div className='spinner'>
                </div>
                  </td>
                </tr></tbody></>:
            <tbody>
            {clickData?.length !== 0 ? clickData
              ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              ?.map((click, index) => (
                <tr key={click.advertiserId}>
                  <td>{click.advertiserId}</td>
                  {/* <td>{click.userType}</td> */}
                  <td><Link to={`/advertiser/${click.advertiserId}`}>{click.companyName}</Link></td>
                  <td>{click.email}</td>
                  <td>{click.firstName} {click.lastName}</td>
                  <td>{click.mobileNumber}</td>
                  <td><span className="statusBtn">{click.status}</span></td>
                  <td>{click.createdAt}</td>
                  <td>{click.country}</td>
                  {/* <td>{click.region}</td>
                  <td>{click.street}</td>
                  <td>{click.city}</td>
                  <td>{click.pinCode}</td> */}
                  <td>{click.managerName}</td>
                  {/* <td onClick={()=>handleGenarateToken(click)}>
                    <button className="btn btn-success">Generate</button>
                  </td> */}
                </tr>
              )): <tr><td colSpan={4}>No data found</td></tr>}
            </tbody>}
          
        </table>
        </div>
        {/* Pagination */}
      <Pagination className="pagination">
          {clickData?.length > itemsPerPage && (
            <>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </>
          )}

          {/* Display page numbers */}
          {clickData?.length > itemsPerPage &&
            Array.from({ length: Math.ceil(clickData?.length / itemsPerPage) })?.map((_, index) => (
              <Pagination.Item
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </Pagination.Item>
            ))}

          {clickData?.length > itemsPerPage && (
            <>
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(clickData?.length / itemsPerPage)}
              />
              
            </>
          )}
        </Pagination>
        </div>
        </div>
        </div>
  );
};
export default AdvertiserList;
