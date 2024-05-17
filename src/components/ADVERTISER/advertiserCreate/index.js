import React, { useState, useEffect } from "react";
import axios from "axios";
import './advertisercreate.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import Navbar from "../../navbar";
import Sidebar from "../../Sidebar";
import BASE_URL from "../../../Api/base";
import PageTitle from "../../PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import  {createAdvertiser} from '../../../Redux/AdvertiserSlice'
import { toast } from "react-toastify";

const Addpublisher = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [country, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [editedOfferData, setEditedOfferData] = useState({});

  const dispatch = useDispatch();

  const manager = useSelector((state)=> state.manager);
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    fetchCountryList();
    dispatch(fetchManagerList(LoggedInUser._id))
    console.log("userId",LoggedInUser._id)
  }, []);

  const fetchCountryList = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/countrylist"); 
      const countryData = response.data.responseResult;
      setCountries(countryData);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  }; 
  
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    password: '',
    confirm_password: '',
    firstName: '',
    lastName: '',
    mobileNumber: '',
    country: '',
    managerId: '',
    partners_Id: LoggedInUser._id
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const advertiserResponse = await dispatch(createAdvertiser(formData));
    const res = advertiserResponse.payload;
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
      navigate('/advertiser')
    }else{
      toast.error(res.responseMessage);
    }
    console.log(advertiserResponse)
  
  };
  const handleFieldChange = (field, value) => {
    setEditedOfferData((prevData) => ({ ...prevData, [field]: value }));
  };
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountry,
    }));
  };
  const handlecountryChange = (e) => {
    const { name, value } = e.target;
    if (name === "country") {
      // Set the selected country separately
      setSelectedCountry(value);
      // Update the form data with the selected country value
      setFormData({ ...formData, [name]: value });
    } else {
      // For other fields, update the form data normally
      setFormData({ ...formData, [name]: value });
    }
  };


  return (
    <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
        <div className="signup-container">
          <h2 className="mb-4">Advertiser Create</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
              <label htmlFor="companyName">Company Name</label>
              <input className="form-control"
                type="companyName"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="privacyLavel">Status</label>
              <select className="form-control"
                type="privacyLavel"
                name="privacyLavel"
                value={formData.goalValue}
                onChange={handleChange}
                required
              >
                <option value="">Select status</option>
                <option value="Windows">Active</option>
                <option value="Mac">Inactive</option>
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="email">Email</label>
              <input className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="password">Password</label>
              <input className="form-control"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="confirm_password">Confirm password</label>
              <input className="form-control"
                type="confirm_password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="firstName">First Name</label>
              <input className="form-control"
                type="firstName"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="lastName">Last Name</label>
              <input className="form-control"
                type="lastName"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="mobileNumber">Contact No</label>
              <input className="form-control"
                type="mobileNumber"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="country">Country</label>
              <select className="form-control"
              value={country} onChange={handleCountryChange} name="country">
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={formData.country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
              <div className="form-group col-lg-6">
            <label htmlFor="region">region</label>
            <input className="form-control"
              type="region"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
            <div className="form-group col-lg-6">
              <label htmlFor="city">City</label>
              <input className="form-control"
                type="city"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="pinCode">PinCode</label>
              <input className="form-control"
                type="pinCode"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="manager">Manager</label>
              <select className="form-control" name="managerId" onChange={handleChange}>
                <option value="">Select manager</option>
                {manager.list?.filter((item)=> item.managerRole === "Advertiser Manager").map((item)=> <option key={item._id} value={item._id}>{item.name}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default Addpublisher;













