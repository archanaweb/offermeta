import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";

const ForgotPassword = ()=> {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: ""
      });

      const handleForgotPassword = async(e)=> {
        e.preventDefault()
        const res = await fetch(BASE_URL +'admin/forgotPassword', {
            method: 'PUT',
            headers: {
                'accept': 'application/json'
            },
            body: new URLSearchParams(formData)
        })
        const resData = await res.json()
        if(resData.responseCode === 200){
            toast.success(resData.responsMessage)
            localStorage.setItem("otp", resData.responseResult)
            localStorage.setItem("email", formData.email)
            navigate('/v2/varifyotp')
          }else{
            toast.error(resData.responseMesage);
          }
        console.log("forgot res",resData)
      }
 
    return (
        <>
    <div className="login-wraper">
    <div className="signup-container1">
      <h1 className="text-center mb-2">AdoMobi</h1>
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
        <button  className="btn btn-primary" type="submit">Reset Password</button>
      </form>
      <div className="forgetPass">
        <p><Link to="/advertiser/login"><i className="fa-solid fa-lock"></i>Login</Link></p>
      </div>
    </div>
    </div>
        </>
    )
}

export default ForgotPassword