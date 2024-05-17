import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , Link, useLocation} from 'react-router-dom';
import BASE_URL from "../../Api/base";
import { toast } from "react-toastify";
import Footer from "../Footer";
import defaultLogo from '../../assets/images/default-logo.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from "../../Redux/DomainSlice";

const Login = ({loggedInUser}) => {
  const currentDomain = window.location.hostname;
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.loginPageImage
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [isShow, setIsShow] = useState(false)
  const userDomain = localStorage.getItem('userDomainName')
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const currentDomainName = params.get('localhost');
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let user = localStorage.getItem("userData");
  useEffect(()=> {
    dispatch(fetchPartnerUserData(currentDomain))
  },[])
  useEffect(()=> {
    console.log('domaindata', domainData)
   localStorage.setItem('partnerDomainId', domainData?._id)
  },[domainData])

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "subAdmin/singleLogin", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.responseCode == '200') {
            const subadminId = responseData.responsResult._id;
            window.localStorage.setItem("subadminId", subadminId);
            const userData = JSON.stringify(
              responseData.responsResult
            );
            localStorage.setItem("userData", userData); 
            loggedInUser(userData);
            localStorage.setItem("userDomainName", responseData.responsResult.domain); 
            if (responseData.responsResult.userType === 'SUBADMIN') {
              console.log('login response',responseData)
              navigate('/dashboard');
              toast.success(responseData.responseMessage)
            } else if (responseData.responsResult.userType === 'PUBLICHER') {
              console.log('login response',responseData)
              navigate("/publisher/dashboard");
              toast.success(responseData.responseMessage)
              toast.success('login Publisher')
            }else if (responseData.responsResult.userType === 'MANAGER') {
              console.log('login response',responseData)
              navigate("/affiliates/manager/dashboard");
              toast.success(responseData.responseMessage)
            }else if (responseData.responsResult.userType === 'ADVERTISER') {
              navigate("/advertiser/dashboard");
              toast.success(responseData.responseMessage)
            }
             else {
              toast.error('Email and password not valid')
            }
          } else {
            console.log(responseData.responseMessage);
            toast.error(response.data.responseMessage)
          }
          if(responseData.responseCode === 404){
              setErrorMessage(responseData.responseMessage)
          }
        } else {
          console.log("An error occurred. Please try again.");
          toast.error('Something went wrong')
        }
      })
      .catch((error) => {
        console.log("An error occurred. Please try again.");
        toast.error('Something went wrong')
      });
  };


  return (
    <>
      <div className="login-wraper d-flex justify-content-around align-items-center flex-column">
        <div className="d-flex justify-content-center align-items-center p-4">
          <div className="signup-container1 py-4">
            <div className="lgnLogo text-center">
              <img src={mainLogo ? mainLogo : defaultLogo} alt="logo" />
            </div>
            <form onSubmit={handleLogin} className="mb-1">
              <div className="form-group form-icon">
              <input className="form-control"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
              <i className="fa-solid fa-envelope"></i>
              </div>
              <div className="form-group form-icon">
                <input className="form-control"
                  type={isShow ? "text" : 'password'}
                  placeholder='Password'
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="password-icon">
                <i className="fa-solid fa-key"></i>
                {isShow ? <i className="fa-regular fa-eye-slash" onClick={()=> setIsShow(false)}></i> :
                <i className="fa-regular fa-eye" onClick={()=> setIsShow(true)}></i>}
                </div>
              </div>
              {errorMessage && <p className="errorMsg" style={{color: "red"}}>{errorMessage}</p>}
              <button  className="btn btn-primary" type="submit" style={{width:'100%' , marginLeft:'0%', backgroundColor:'#0d6efd !importent'}}>Login</button>
            </form>
            <div className="forgetPass d-flex justify-content-between align-item-center mt-2">
              <p><i className="fa-solid fa-lock"></i><Link to='/forgotPassword'> Forgot Password </Link></p>
              <p><Link to='/publisher/signup'>Create an account</Link></p>
            </div>
          <div>
            <hr />
              <p>
                  - View our <Link to="/privacy_policy">Privacy Policy</Link><br />
                  - You must have <Link target="_blank" to="https://www.google.com/cookies.html">cookies enabled</Link> to use this site (cookies enabled)
                  <Link target="_blank" to=""> terms and conditions</Link>
              </p>
          </div>
          </div>
        </div>
        <div className="footerpt pb-3">
          <p className="text-center mb-0">2023 © Powered by <Link to='https://www.offersmeta.com/'>OffersMeta.</Link></p>
      </div>
      </div>
    </>
  );
};

export default Login;
