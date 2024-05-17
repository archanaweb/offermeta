import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BASE_URL from "../../../Api/base";
import logo from '../../../assets/images/logo2-1.png'
import defaultLogo from '../../../assets/images/default-logo.png'
import hexaLogo from '../../../assets/images/hexa-logo-transparent.png'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from "../../../Redux/DomainSlice";
import { fetchManagerList } from "../../../Redux/ManagerSlice";

const PublisherSignup = ({setLogggedInUser}) => {
  const currentDomain = window.location.hostname;
  const managerList = useSelector((state)=> state.manager.list)
  const navigate = useNavigate();
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.loginPageImage
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const partnerId = localStorage.getItem('partnerDomainId');

  useEffect(()=> {
    let user = localStorage.getItem("userData");
      if(user){
        navigate('/login');
      }
      dispatch(fetchPartnerUserData(currentDomain))
      dispatch(fetchManagerList(partnerId))
  },[])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value , partners_Id:partnerId});
    console.log('formDataPub', formData)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL +'publicher/addPublicher',{
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
    })
    const resData = await response.json()
    if(resData?.responseCode === 200){
        toast.success(resData?.responseMessage)
        // const user = localStorage.setItem('userData', JSON.stringify(resData.responseresult))
        // setLogggedInUser(user)
        navigate('/login')
      }else{
        toast.error(resData?.responseMessage);
      }
      console.log("publisher signup res",resData)
  };

  return (
    <div className="login-wraper d-flex justify-content-center align-items-center py-4">
      <div className="signup-container1 signup-container2 pb-0">
        <div className="text-center">
           <img 
              src={mainLogo ? mainLogo : defaultLogo}
              alt="logo"
              className='signupLogo'
            />
          {/* <img src={logo} alt="logo" className="signupLogo" /> */}
      </div>
        <p className="text-center">Publisher Signup</p>
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
              value={formData.lastName}
              placeholder="Last Name"
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
              value={formData.email}
              placeholder="Email"
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
              value={formData.companyName}
              placeholder="Company Name"
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
            {/* <label htmlFor="address">Address</label> */}
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
              value={formData.mobileNumber}
              placeholder="Mobile Number"
              onChange={handleChange}
              required
            />
            </div>
      
          </div>
          <div className="form-group row">
          <div className="col-lg-6">
            {/* <label htmlFor="manager">Manager</label> */}
            <select className="form-control" id="social"
              name="social"
              value={formData.social}
              onChange={handleChange}>
                <option value='' hidden>Select</option>
                <option value='skype'>Skype</option>
                <option value='telegram'>Telegram</option>
                
              </select>
          </div>
         {formData.social === 'skype' ? <div className="col-lg-6">
            <input className="form-control w-100"
              type="text"
              id="skypeId"
              name="skypeId"
              value={formData.skypeId}
              placeholder="Skype"
              onChange={handleChange}
              required
            />
            </div> :
              <div className="col-lg-6">
              <input className="form-control w-100"
                type="text"
                id="telegramId"
                name="telegramId"
                value={formData.telegramId}
                placeholder="Telegram"
                onChange={handleChange}
                required
              />
              </div>}
          </div>
          <div className="form-group row">
          <div className="col-lg-12">
            {/* <label htmlFor="manager">Manager</label> */}
            <select className="form-control" id="manager"
              name="managerId"
              value={formData.managerId}
              onChange={handleChange}>
                <option value='' hidden>Select manager</option>
                {managerList?.map((item)=> <option key={item.managerId} value={item.managerId}>{item.name}</option>)}
              </select>
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
                value={formData.password}
                autoComplete="new-password"
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
            <span><Link to='/advertiser/manager/signup'>Are you an advertiser?</Link></span>
          </div>
          <button className="btn btn-primary" type="submit">Sign Up</button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default PublisherSignup;
