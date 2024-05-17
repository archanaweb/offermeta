import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../Api/base";
import defaultLogo from '../../assets/images/default-logo.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from "../../Redux/DomainSlice";

const PartnerResetPassword = ()=> {

  const authOtp = localStorage.getItem("passwordotp")
  const authEmail = localStorage.getItem("email")
  const currentDomain = window.location.hostname;
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.loginPageImage
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({});
    useEffect(()=> {
      dispatch(fetchPartnerUserData(currentDomain))
    },[])

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

      const handleResetPassword = async (e)=> {
        e.preventDefault()
        const res = await fetch(BASE_URL + 'subAdmin/resetpasswordCommon', {
          method: 'PUT',
          headers: {
              'accept': 'application/json'
          },
          body: new URLSearchParams(formData)
        });
        const resData = await res.json()
        if(resData.responseCode === 200){
            toast.success(resData.responseMesage)
            navigate('/dashboard')
            localStorage.removeItem("otp")
            localStorage.removeItem("email")
            localStorage.setItem("userData", JSON.stringify(resData.responseResult)
            )
          }else{
            toast.error(resData.responseMessage);

          }
        console.log(resData)
      }
    return (
        <>
    <div className="login-wraper d-flex justify-content-center align-items-center">
    <div className="signup-container1">
    <div className="lgnLogo text-center">
    <img src={mainLogo ? mainLogo : defaultLogo} alt="logo" />
    </div>
      <form onSubmit={handleResetPassword} className="mb-3">
        <div className="form-group">
        <input className="form-control w-100"
          type="text"
          placeholder="Otp"
          name="otp"
          value={formData.otp}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
        <input className="form-control w-100"
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
        <input className="form-control w-100"
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        </div>
        <button className="btn btn-primary" type="submit">Update Password</button>
      </form>
    </div>
    </div>
        </>
    )
}

export default PartnerResetPassword