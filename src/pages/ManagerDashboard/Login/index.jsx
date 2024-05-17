import React, { useEffect, useState } from "react";
import { useNavigate , Link} from 'react-router-dom';
import BASE_URL from "../../../Api/base";
import logo from '../../../assets/images/logo2-1.png'
import { toast } from "react-toastify";

const ManagerLogin = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=> {
    let user = localStorage.getItem("userData");
    if(user){
        navigate('/dashboard');
    }
  },[])

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(BASE_URL + 'manager/login', {
        method: 'POST',
        headers: {
            'accept': 'application/json'
        },
        body: new URLSearchParams(formData)
    }
    )
    const resData = await response.json()
    if(resData.responseCode === 200){
        toast.success(resData.responseMessage)
        navigate('../dashboard')
        localStorage.setItem('userData', JSON.stringify(resData.responsResult))
    }else{
        toast.error(resData.responseMessage)
    }
    console.log(resData);
  };


  return (
    <div className="login-wraper">
    <div className="signup-container1">
      {/* <div className="lgnLogo text-center">
      <img src={logo} alt="logo"/>
      </div> */}
      <h1 className="text-center mb-4">AdoMobi</h1>
      <form onSubmit={handleLogin} className="mb-3">
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
        <div className="form-group">
        <input className="form-control"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        </div>
        {errorMessage && <p className="errorMsg" style={{color: "red"}}>{errorMessage}</p>}

        <button  className="btn btn-primary" type="submit" style={{width:'100%' , marginLeft:'0%', backgroundColor:'#0d6efd !importent'}}>Login</button>
      </form>
      <div className="forgetPass">
        <p><i className="fa-solid fa-lock"></i> Forgot Password</p>
      </div>
      <div className="text-center">
      <span to='signup'>If you are not Registered <Link to='signup'><b>Signup</b></Link></span>
      </div>
      <div className="text-center"><Link to="/advertiser/login">Login as Sub Admin</Link></div>
    </div>
    </div>
  );
};

export default ManagerLogin;
