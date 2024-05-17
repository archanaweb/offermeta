import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPublisher } from "../../../Redux/PublisherSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";
import BASE_URL from "../../../Api/base";

const Addpublisher = () => {
  const [country, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const dispatch = useDispatch()
  const manager = useSelector((state)=> state.manager);
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

  const fetchCountryList = async () => {
    try {
      const response = await axios.get(BASE_URL + "user/countrylist"); // Replace with your API endpoint
      const countryData = response.data.responseResult; // Assuming the response data is an array of country objects
      setCountries(countryData);
    } catch (error) {
      console.error("Error fetching country list:", error);
    }
  }; 

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    partners_Id: LoggedInUser._id
  });

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setSelectedCountry(selectedCountry);
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: selectedCountry,
    }));
  };
  

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const advertiserResponse = await dispatch(addPublisher(formData));
    console.log(advertiserResponse)
    const res = advertiserResponse.payload;
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
      navigate('/publisher')
    }else{
      toast.error(res.responseMessage);
    }
    console.log(advertiserResponse)
  };

  
  useEffect(() => {
    fetchCountryList();
    dispatch(fetchManagerList(LoggedInUser._id))
  }, []);

  return (
        <div className='page_sec pt-3'>
        <div className="signup-container">
          <h2 className="mb-4">Publisher Create</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
              <label htmlFor="companyName">Company Name</label>
              <input className="form-control w-100"
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="email">Email</label>
              <input className="form-control w-100"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="firstName">First Name</label>
              <input className="form-control w-100"
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="lastName">Last Name</label>
              <input className="form-control w-100"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="mobileNumber">Contact No</label>
              <input className="form-control w-100"
                type="number"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="country">Country</label>
              <select className="form-control w-100" value={country} onChange={handleCountryChange} name="country">
                <option value="">Select a country</option>
                {countries.map((country) => (
                  <option key={country.code} value={formData.country?.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="region">region</label>
              <input className="form-control w-100"
                type="text"
                id="region"   
                name="region"
                value={formData.region}
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="form-group col-lg-6">
              <label htmlFor="city">City</label>
              <input className="form-control w-100"
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
            <label htmlFor="street">Street</label>
            <input className="form-control w-100"
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div>
            <div className="form-group col-lg-6">
              <label htmlFor="pinCode">PinCode</label>
              <input className="form-control w-100"
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="managerId">Manager</label>
              <select className="form-control" name="managerId" onChange={handleChange}>
                <option value="">Select manager</option>
                {manager.list?.filter((item)=> item.managerRole === "Publisher Manager" ).map((item)=> <option key={item.managerId} value={item.managerId}>(ID: {item.managerId}) {item.name}</option>)}
              </select>
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="password">Password</label>
              <input className="form-control w-100"
                type="text"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="confirm_password">Confirm password</label>
              <input className="form-control w-100"
                type="text"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
        </div>
     );
};

export default Addpublisher;












