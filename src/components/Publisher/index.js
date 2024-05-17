import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./publisher.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import Navbar from "../navbar";
import BASE_URL from "../../Api/base";
import PageTitle from "../PageTitle";
import updatePublisher from "./PublisherDetail";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublisherSearchList } from "../../Redux/PublisherSlice";

const StaticTable = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [subadminId, setSubAdminId] = useState('');
  const location = useLocation();
  const adminId = window.localStorage.getItem('subadminId')
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'))
  const userId = LoggedInUser?._id
  const publisherListBySearch = useSelector((state)=> state.publisher.updatedList)
  const dispatch = useDispatch()
  const totalPages = 8;

  const navigate = useNavigate()

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);
  const [apiHitCount, setApiHitCount] = useState(0);
;

  const fetchData = async () => {
    document.querySelector('body').classList.add('loading')
    try {
      const response = await axios.get(BASE_URL + `publicher/publisherList?partners_Id=${userId}`);
      const data = response.data.responseResult;
      setClickData(data.reverse());
      console.log("Fetched data:", data);
    } catch (error) {
      console.error('Error fetching click data:', error);
    }
    document.querySelector('body').classList.remove('loading')
  };

  useEffect(() => {
    const storedSubAdminId = localStorage.getItem('subadminId');
    setSubAdminId(storedSubAdminId);
    console.log('Stored SubAdminId:', storedSubAdminId);
  }, []);

  const downloadItem = async (publisher)=> {
      const res = await fetch(BASE_URL + `conversion/downloadDataInExcelSheetByPublisherId?publisherId=${publisher._id}`,{
        headers: {
          'accept': 'application/json'
      }
      });
      const contentType = res.headers.get('content-type');
      let fileExtension = '';
      const contentDisposition = res.headers.get('content-disposition');
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/);
        if (match) {
          const fileName = match[1];
          const parts = fileName.split('.');
          if (parts.length > 1) {
            fileExtension = parts.pop();
          }
        }
      }

      const rspBlob = await res.blob().then((blob) => ({
        blob,
        contentType,
        fileExtension
      }));

      const fileName = `downloaded_file.${rspBlob.fileExtension}`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(rspBlob.blob);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      // console.log('base64encodedData', url)
  }

  const handlePublisherLogin = async(id)=> {
    const publisherId = id?._id;
    console.log(publisherId)
      const response = await fetch(`${BASE_URL}publicher/publisherLoginById?partners_Id=${userId}&publisherId=${publisherId}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        }
      })
      const resData = await response.json()
      if(resData.responseCode === 200){
        toast.success(resData.responseMessage)
      }else (
        toast.error(resData.responseMessage)
      )
      localStorage.setItem('userData', JSON.stringify(resData.responsResult));
      navigate('/publisher/dashboard');
      console.log("publisherLogin",resData)
  }
  
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array to run the effect only once
  useEffect(() => {
    dispatch(fetchPublisherSearchList({partners_Id: userId, searchInputValue : searchInput}))
  }, [searchInput]); 
  useEffect(() => {
    console.log('publisherListBySearch',publisherListBySearch)
    setClickData(publisherListBySearch)
  }, [publisherListBySearch]); 


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
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
              <input className="form-control"
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={handleSearchInputChange}
              />
              <a href="/publisheradd" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create publisher</a>
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
              <th>CompanyName</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Mobile Number</th>
              <th>Status</th>
              <th>Country</th>
              <th>Region</th>
              <th>Street</th>
              <th>City</th>
              <th>PinCode</th>
              <th>Manager</th>
              <th>Download</th>
              <th>Action</th>
              {/* <th>SubadminId</th> New column for SubadminId */}
            </tr>
          </thead>
          {/* {Array.isArray(clickData) ? ( */}
          <tbody>
            {clickData
              ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((click, index) => (
                <tr key={click.id}>
                  <td>{click._id}</td>
                  <td>
                    <Link to={`/publisher/${click._id}`}>{click.companyName}</Link>
                    </td>
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
                  <td>(ID: {click.managerId}) {click.managerName}</td>
                  <td onClick={()=> downloadItem(click)}><i className="fa-solid fa-download"></i></td>
                  {/* <td>{subadminId}</td> Display SubadminId */}
                  <td>
                  <DropdownButton className="noCarat"
                key="start"
                id={`dropdown-button-drop-start`}
                drop=""
                variant="secondary"
                title={<i class="fa-solid fa-ellipsis-vertical"></i>}
              >
                <Dropdown.Item eventKey="1" onClick={()=>handlePublisherLogin(click)}><i class="fa-solid fa-arrow-right-to-bracket"></i> Login as</Dropdown.Item>
                        </DropdownButton>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};
export default StaticTable;