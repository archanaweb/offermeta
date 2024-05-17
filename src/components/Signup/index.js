  import React, { useEffect, useState } from "react";
  import axios from "axios";
  import { Link, useNavigate } from 'react-router-dom';
  import "./styles.css";
  import BASE_URL from "../../Api/base";
  import logo from '../../assets/images/logo2-1.png'
  import { toast } from "react-toastify";
  import PhoneInput from 'react-phone-input-2'
  import 'react-phone-input-2/lib/style.css'
  import { useDispatch, useSelector } from "react-redux";
  import { fetchPlanList } from "../../Redux/PlanSlice";
  import { fetchCountryList } from "../../Redux/CountryListSlice";

  const Signup = () => {
    const navigate = useNavigate();
    const [loginType, setLoginType] = useState("subadmin");
    const [phone, setPhone] = useState('');
    const [formData, setFormData] = useState({});
    const [isValid, setIsValid] = useState(true);
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    const planList = useSelector((state)=> state.plan.list)
    const countryList = useSelector((state)=> state.country.list)
    const dispatch = useDispatch()

    useEffect(()=> {
      let user = localStorage.getItem("userData");
        if(user){
          navigate('/login');
        }
        dispatch(fetchPlanList(1))
        dispatch(fetchCountryList())
    },[])
    const handleOnChange = (value, country) => {
      setPhone(value);
    };

    const handleChange = (e) => {
      setFormData({...formData, [e.target.name]: e.target.value, mobileNumber: phone });
    };
    const handleCheckEmail = ()=> {
      setIsValid(emailRegex.test(formData.email));
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsValid(emailRegex.test(formData.email))
      if(isValid){
        try {
          const apiEndpoint = loginType === "subadmin" ? "subAdmin" : "publicher"; 
          const response = await axios.post(BASE_URL + `${apiEndpoint}/signup`, formData);
          const resData = response.data;
          if(resData.responseCode === 200){
            console.log('domain', resData.responsResult.domain)
            localStorage.setItem("userDomainName", resData.responsResult.domain); 
            toast.success(resData.responseMessage)
            navigate('/login');
          }else{
            toast.error(resData.responseMessage);
          }
        } catch (error) {
          console.error("Error signing up:", error);
        }
      }else{
        toast.error('Email is not valid')
      }
      }
    
    return (
      <div className="login-wraper d-flex justify-content-center align-items-center">
        <div className="signup-container1 signup-container2">
          <div className="lgnLogo text-center">
            <img src={logo} alt="logo" className="signupLogo" width={100} />
        </div>
          <h3 className="text-center">Sign Up</h3>
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group row">
              <div className="col-lg-6">
              <label htmlFor="name">Name</label>
              <input className="form-control w-100"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              </div>
              <div className="col-lg-6">
              <label htmlFor="email">Email</label>
              <input className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleCheckEmail}
                autoComplete="nope"
                required
              />
              {isValid ? "" : <div className="mt-2" style={{color: 'red'}}>Email is not valid</div>}
            </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
              <label htmlFor="mobileNumber">Mobile Number</label>
                <PhoneInput
                className='w-100'
                country={'in'}
                value={formData.mobileNumber}
                onChange={handleOnChange}
                enableSearch={true}
                />
              </div>
              <div className="col-lg-6">
              <label htmlFor="skype">Skype Id</label>
              <input className="form-control w-100"
                type="text"
                id="skype"
                name="skype"
                value={formData.skypeId}
                onChange={handleChange}
                required
              />
            </div>
            </div>

            <div className="form-group row">
            <div className="col-lg-12">
              <label htmlFor="address">Address</label>
              <input className="form-control w-100"
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              </div>
            </div>
            <div className="form-group row">
            <div className="col-lg-6">
              <label htmlFor="address">Domain</label>
              <div className="d-flex domainInput">
              <input className="form-control w-75"
                type="text"
                id="domain"
                name="domain"
                value={formData.domain}
                onChange={handleChange}
                required
              />
              <input className="form-control w-25" type="text" placeholder="offersmeta.com"/>
              </div>
              </div>
              <div className="col-lg-6">
              <label htmlFor="planId">Plan Id</label>
              <select className="form-control"
                name="planId"
                value={formData.planId}
                onChange={handleChange}>
                  <option value='' hidden>Select</option>
                  {planList?.map((item)=> <option value={item._id}>(ID: {item._id}) {item.planName}</option> )}
              </select>
              </div>
            </div>
            
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="password">Password</label>
                <input className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="off"
                  required
                />
              </div>
              <div className="col-lg-6">
              <label htmlFor="confirm_password">Confirm Password</label>
              <input className="form-control"
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
              />
            </div>
            </div>
        
            <button className="btn btn-primary" type="submit" style={{ width: '100%', marginLeft: '0%' }}>Sign Up</button>
          </form>
          <div className="text-center">
            <span>If you are already Registered <Link to='/v2/login'><b>Login</b></Link></span>
          </div>
          {/* <p><Link to='/publisher/signup'>Register as a Publisher</Link></p> */}
        </div>
      </div>
    );
  };

  export default Signup;
