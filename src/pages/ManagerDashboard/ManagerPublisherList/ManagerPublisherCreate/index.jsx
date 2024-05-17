import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addManagerPublisher } from "../../../../Redux/ManagerSlice";
import axios from "axios";
import BASE_URL from "../../../../Api/base";
import { toast } from "react-toastify";

const ManagerPublisherCreate = ()=> {
    const [country, setSelectedCountry] = useState("");
    const [countries, setCountries] = useState([]);
    const dispatch = useDispatch()
    const manager = useSelector((state)=> state.manager);
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
  
    const fetchCountryList = async () => {
      try {
        const response = await axios.get(BASE_URL + "user/countrylist");
        const countryData = response.data.responseResult;
        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching country list:", error);
      }
    }; 
    
    useEffect(() => {
        fetchCountryList();
      }, []);
  
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
  
    const handleCountryChange = (event) => {
      const selectedCountry = event.target.value;
      setSelectedCountry(selectedCountry);
      setFormData((prevFormData) => ({
        ...prevFormData,
        country: selectedCountry,
      }));
    };
    
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const managerPublisher = await dispatch(addManagerPublisher({
        managerId: LoggedInUser._id,
        formData}));
      console.log("managerPub>>",managerPublisher)
      const res = managerPublisher.payload;
      if(res.resposneMessage === "Publisher Add Sucessfully"){
        toast.success(res.resposneMessage)
        navigate('../publishers')
      }else{
        toast.error(res.resposneMessage);
      }
      console.log(managerPublisher)
    };
    return (
        <>
          <div className='page_sec'>
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
                  type="text"
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
                <select className="form-control w-100" name="country" id="country" value={country} onChange={handleCountryChange} name="country">
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={formData?.country?.name}>
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
                     
        </>
    )
}
export default ManagerPublisherCreate;