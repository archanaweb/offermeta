import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";

const VerifyOtp = ()=> {

  const authOtp = localStorage.getItem("otp")

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

      const handleOtp = (e)=> {
        e.preventDefault()
        if(formData.otp === authOtp) {
          navigate('/v2/resetpassword')
          toast.success('Otp varified')
        }else{
          toast.error('Otp did not match')
        }
      }
    return (
        <>
    <div className="login-wraper">
    <div className="signup-container1">
      <h1 className="text-center mb-2">AdoMobi</h1>
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
          <button type="button" className="btn btn-outline-secondary"><i className="fa-solid fa-rotate-right"></i> Resend</button>
       </div>
      </form>
      <div className="forgetPass d-flex justify-content-between">
       <Link to="/advertiser/login"><i className="fa-solid fa-lock"></i>Login</Link>
      </div>
    </div>
    </div>
        </>
    )
}

export default VerifyOtp