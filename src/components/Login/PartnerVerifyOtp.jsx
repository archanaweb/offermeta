import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BASE_URL from "../../Api/base";
import defaultLogo from '../../assets/images/default-logo.png'
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from "../../Redux/DomainSlice";

const PartnerVerifyOtp = ()=> {
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

      const handleOtp = (e)=> {
        e.preventDefault()
        if(formData.otp === authOtp) {
          navigate('/resetpassword')
          toast.success('Otp varified')
        }else{
          toast.error('Otp did not match')
        }
      }
      const handleResend = async()=> {
        const resendRes = await fetch(BASE_URL + `subAdmin/resendOtp`, {
          method: 'PUT',
          headers: {
              'accept': 'application/json'
          },
          body: new URLSearchParams({
                  email: authEmail,
                })
              })
        const resMessage  = await resendRes.json()
        if(resMessage.responseCode === 200){
          toast.success(resMessage.responseMesage)
          localStorage.setItem("passwordotp", resMessage.responseResult.otp)
        }else{
          toast.error(resMessage.responseMesage);
        }
      }
    return (
        <>
    <div className="login-wraper d-flex justify-content-center align-items-center">
    <div className="signup-container1">
    <div className="lgnLogo text-center">
    <img src={mainLogo ? mainLogo : defaultLogo} alt="logo" />
    </div>
      <form onSubmit={handleOtp} className="mb-3">
        <div className="form-group">
        <input className="form-control"
          type="number"
          placeholder="otp"
          onChange={(e) =>
            setFormData({ ...formData, otp: e.target.value })
          }
        />
        </div>
        <div className="forgetPass d-flex justify-content-between">
          <button  className="btn btn-primary" type="submit">Verify OTP</button>
          <button type="button" className="btn btn-outline-secondary" onClick={handleResend}><i className="fa-solid fa-rotate-right"></i> Resend</button>
       </div>
      </form>
      <div className="forgetPass d-flex justify-content-between">
       <Link to="/login"><i className="fa-solid fa-lock"></i>Login</Link>
      </div>
    </div>
    </div>
        </>
    )
}

export default PartnerVerifyOtp