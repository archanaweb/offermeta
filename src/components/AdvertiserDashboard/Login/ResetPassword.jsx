import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";

const ResetPassword = ()=> {

  const authOtp = localStorage.getItem("otp")
  const authEmail = localStorage.getItem("email")
    const navigate = useNavigate();

    const [formData, setFormData] = useState({});

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value});
    }

      const handleResetPassword = async (e)=> {
        e.preventDefault()
        const res = await fetch(BASE_URL + 'admin/resetPassword', {
          method: 'PUT',
          headers: {
              'accept': 'application/json'
          },
          body: new URLSearchParams({
                  email: authEmail,
                  otp: authOtp,
                  ...formData
                })
        });
        const resData = await res.json()
        if(resData.responseCode === 200){
            toast.success(resData.responseMesage)
            localStorage.removeItem("otp")
            localStorage.removeItem("email")
            localStorage.setItem("userData", JSON.stringify(resData.responseResult)
            )
            navigate('/v2/dashboard')
          }else{
            toast.error(resData.responseMesage);

          }
        console.log(resData)
      }
    return (
        <>
    <div className="login-wraper">
    <div className="signup-container1">
      <h1 className="text-center mb-2">AdoMobi</h1>
      <form onSubmit={handleResetPassword} className="mb-3">
        <div className="form-group">
        <input className="form-control"
          type="password"
          placeholder="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
        />
        </div>
        <div className="form-group">
        <input className="form-control"
          type="password"
          placeholder="Confirm Password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={handleChange}
        />
        </div>
        <button  className="btn btn-primary" type="submit">Update Password</button>
      </form>
    </div>
    </div>
        </>
    )
}

export default ResetPassword