import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./publisher.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import BASE_URL from "../../Api/base";
import { Dropdown, DropdownButton, Pagination, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublisherSearchList } from "../../Redux/PublisherSlice";

const Publisher = ({setLogggedInUser}) => {
  const [searchInput, setSearchInput] = useState("");
  const [selectValue, setSelectValue] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pubLoading, setPubLoading] = useState(true);
  const [itemsPerPage] = useState(10);
  const [subadminId, setSubAdminId] = useState('');
  const location = useLocation();
  const adminId = window.localStorage.getItem('subadminId')
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'))
  const userId = LoggedInUser?._id
  const publisherListBySearch = useSelector((state)=> state.publisher.updatedList)
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const [clickData, setClickData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(BASE_URL + `publicher/publisherList?partners_Id=${userId}`);
      const data = response.data.responseResult;
      setClickData(data);
      setPubLoading(false)
      console.log('pubList', data)
    } catch (error) {
      console.error('Error fetching click data:', error);
      toast.error('Something went wrong')
    }
  };

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
    const publisherId = id?.publisherId;
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
      const user = localStorage.setItem('userData', JSON.stringify(resData.responsResult));
      setLogggedInUser(user)
      navigate('/publisher/dashboard');
      console.log("publisherLogin",resData)
  }
  
  useEffect(() => {
    fetchData();
  }, []); 
  useEffect(() => {
    dispatch(fetchPublisherSearchList({partners_Id: userId, searchInputValue : searchInput}))
  }, [searchInput]); 
  useEffect(() => {
    setClickData(publisherListBySearch)
  }, [publisherListBySearch]); 

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
                <Link to="/publisheradd" className="btn btn-outline-primary"><i className="fa-solid fa-user-plus me-2"></i>Add publisher</Link>
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
          <div className="table-responsive mt-2">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>CompanyName</th>
                <th>Email</th>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Status</th>
                <th>Country</th>
                <th>Created</th>
                {/* <th>Region</th>
                <th>Street</th>
                <th>City</th>
                <th>PinCode</th>
                <th>Manager</th>
                <th>Download</th> */}
                <th>Manager</th>
                <th>Action</th>
              </tr>
            </thead>
            {pubLoading ? <tbody>
              <tr>
                <td colSpan={7}><div className='spinner'>
                </div></td>
              </tr>
              </tbody> :
              <tbody>
              {clickData ? clickData?.map((click, index) => (
                  <tr key={click.publisherId}>
                    <td>{click.publisherId}</td>
                    <td>
                      <Link to={`/publisher/${click.publisherId}`}>{click.companyName}</Link>
                      </td>
                    <td>{click.email}</td>
                    <td>{click.firstName} {click.lastName}</td> 
                    <td>{click.mobileNumber}</td>
                    <td><span className="statusBtn">{click.status}</span></td>
                    <td>{click.country}</td>
                    <td>{click.createdAt}</td>
                    <td>{click.managerName}</td>
                    {/* <td>{click.region}</td>
                    <td>{click.street}</td>
                    <td>{click.city}</td>
                    <td>{click.pinCode}</td>
                    <td>(ID: {click.managerId}) {click.managerName}</td>
                    <td onClick={()=> downloadItem(click)}><i className="fa-solid fa-download"></i></td> */}
                    <td>
                      <button className="btn btn-secondary btn-sm sign-btn" onClick={()=>handlePublisherLogin(click)}>Sign In</button>
                    {/* <DropdownButton className="noCarat"
                  key="start"
                  id={`dropdown-button-drop-start`}
                  drop=""
                  variant="secondary"
                  title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                >
                  <Dropdown.Item eventKey="1" onClick={()=>handlePublisherLogin(click)}><i class="fa-solid fa-arrow-right-to-bracket"></i> Login as</Dropdown.Item>
                  </DropdownButton> */}
                    </td>
                  </tr>
                )) : <tr><td colSpan={3}>Data not found</td></tr>}
            </tbody>}
          </table>
          </div>
          </div>
        </div>
        </div>
        );
};
export default Publisher;