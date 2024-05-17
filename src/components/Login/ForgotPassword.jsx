import React from "react";
import { useState , useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../Api/base";
import logo from '../../assets/images/logo2-1.png';
import defaultLogo from '../../assets/images/default-logo.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from "../../Redux/DomainSlice";

const PartnerForgotPassword = ()=> {
  const currentDomain = window.location.hostname;
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.loginPageImage
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: ""
      });

      useEffect(()=> {
        dispatch(fetchPartnerUserData(currentDomain))
      },[])

      const handleForgotPassword = async(e)=> {
        e.preventDefault()
        const res = await fetch(BASE_URL +'subAdmin/forgotPasswordCommon', {
            method: 'PUT',
            headers: {
                'accept': 'application/json'
            },
            body: new URLSearchParams(formData)
        })
        const resData = await res.json()
        if(resData.responseCode === 200){
            toast.success(resData.responseMessage)
            // localStorage.setItem("passwordotp", resData.responseResult)
            // localStorage.setItem("email", formData.email)
            navigate('/resetPassword')
          }else{
            toast.error(resData.responseMessage);
          }
      }
    return (
        <>
         <div className="login-wraper d-flex justify-content-center align-items-center">
    <div className="signup-container1">
    <div className="lgnLogo text-center">
      <img src={mainLogo ? mainLogo : defaultLogo} alt="logo" />
    </div>
      <form onSubmit={handleForgotPassword} className="mb-3">
        <div className="form-group">
        <input className="form-control"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
        />
        </div>
        <button className="btn btn-primary" type="submit">Reset Password</button>
      </form>
      <div className="forgetPass">
        <p><Link to="/login"><i className="fa-solid fa-lock"></i>Login</Link></p>
      </div>
    </div>
    </div>
        </>
    )
};

export default PartnerForgotPassword;