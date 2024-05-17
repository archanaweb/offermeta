import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from "../../../Api/base";
import logo from '../../../assets/images/logo2-1.png'
import hexaLogo from '../../../assets/images/hexa-logo-transparent.png'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountryList } from "../../../Redux/CountryListSlice";
import { fetchPlanList } from "../../../Redux/PlanSlice";
import { fetchPartnerUserData } from "../../../Redux/DomainSlice";
import defaultLogo from '../../../assets/images/default-logo.png'

const AdvertiserSignup = ({setLogggedInUser}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const partnerId = localStorage.getItem('subadminId');
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.loginPageImage;
  const dispatch = useDispatch()

  useEffect(()=> {
    const currentDomain = window.location.hostname;
    let user = localStorage.getItem("userData");
      if(user){
        navigate('/dashboard');
      }
      dispatch(fetchPartnerUserData(currentDomain))
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value , partners_Id:partnerId});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL +'advertiser/advertiserSignup',{
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
    })
    const resData = await response.json()
    if(resData?.responseCode === 200){
        toast.success(resData?.responseMessage)
        const user = localStorage.setItem('userData', JSON.stringify(resData.responseresult))
        setLogggedInUser(user)
        navigate('/advertiser/dashboard')
      }else{
        toast.error(resData?.responseMessage);
      }
      console.log("advertiser signup res",resData)
  };

  return (
    <div className="login-wraper py-4 d-flex justify-content-center align-items-center">
      <div className="signup-container1 signup-container2 pb-0">
        <div className="text-center">
          {/* <img src={logo} alt="logo" className="signupLogo" /> */}
          <img 
              src={mainLogo ? mainLogo : defaultLogo}
              alt="logo"
              className='signupLogo'
            />
      </div>
        <p className="text-center">Advertiser Signup</p>
        <form className="my-3 mb-4" onSubmit={handleSubmit}>
          <div className="form-group row">
            <div className="col-lg-6">
            {/* <label htmlFor="firstName">First Name</label> */}
            <input className="form-control w-100"
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              required
            />
            </div>
            <div className="col-lg-6">
            {/* <label htmlFor="lastName">Last Name</label> */}
            <input className="form-control w-100"
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            </div>
          </div>
          <div className="form-group row">
          <div className="col-lg-6">
            {/* <label htmlFor="email">Email</label> */}
            <input className="form-control"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>
          <div className="col-lg-6">
            {/* <label htmlFor="companyName">Company Name</label> */}
            <input className="form-control w-100"
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              required
            />
            </div>
          {/* <div className="col-lg-6">
            <label htmlFor="country">Country</label>
            <input className="form-control w-100"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          </div>
          <div className="form-group row">
          <div className="col-lg-6">
            <label htmlFor="region">Region</label>
            <input className="form-control w-100"
              type="text"
              id="region"
              name="region"
              value={formData.region}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-lg-6">
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
          </div>
          <div className="form-group row">
          <div className="col-lg-6">
            <label htmlFor="pincode">Pincode</label>
            <input className="form-control w-100"
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-lg-6">
            <label htmlFor="street">Street</label>
            <input className="form-control w-100"
              type="text"
              id="street"
              name="street"
              value={formData.street}
              onChange={handleChange}
              required
            />
          </div> */}
          </div>
          {/* <div className="form-group row">
            <div className="col-lg-6">
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
            <div className="col-lg-6">
            <label htmlFor="manager">Manager</label>
            <input className="form-control w-100"
              type="text"
              id="manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              required
            />
          </div>
          </div> */}

          <div className="form-group row">
          <div className="col-lg-6">
            {/* <label htmlFor="address"></label> */}
            <input className="form-control w-100"
              type="text"
              id="address"
              name="address"
              value={formData.address}
              placeholder="Address"
              onChange={handleChange}
              required
            />
            </div>
            <div className="col-lg-6">
            {/* <label htmlFor="mobileNumber">Mobile Number</label> */}
            <input className="form-control"
              type="number"
              id="mobileNumber"
              name="mobileNumber"
              placeholder="Mobile Number"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />
            </div>
      
          </div>
          
          <div className="form-group row">
            <div className="col-lg-6">
              {/* <label htmlFor="password">Password</label> */}
              <input className="form-control"
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-lg-6">
            {/* <label htmlFor="confirm_password">Confirm Password</label> */}
            <input className="form-control"
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
            />
          </div>
          </div>
         <hr className="signup-divider" />
          <div className="signup-bottom d-flex justify-content-between align-items-center">
          <div className="d-flex justify-content-start align-items-center gap-2">
            <span><Link to="/login">Already have account?</Link></span>
            <span><Link to='/publisher/signup'>Are you an publisher?</Link></span>
          </div>
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default AdvertiserSignup;
