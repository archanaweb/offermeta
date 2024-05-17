import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate , Link, json} from 'react-router-dom';
import BASE_URL from "../../../Api/base";

const AdvertiserLogin = () => {
  const navigate = useNavigate();
  const [subadminId, setSubAdminId] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState();
  const loggedInUser = JSON.parse(localStorage.getItem("userData"));

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(()=> {
    if(loggedInUser){
        navigate('/v2/dashboard');
    }
  },[])

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(BASE_URL + "admin/login", {
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        if (response.status === 200) {
          const responseData = response.data;
          if (responseData.responseCode == '200') {
            const subadminId = responseData.responsResult._id;
            const subadminEmail = responseData.responsResult.email;
            const loggedInUsername = responseData.responsResult.name;
            window.localStorage.setItem("subadminId", subadminId);
            setSubAdminId(subadminId);
            setUsername(loggedInUsername);
            const userData = JSON.stringify(responseData.responsResult);
            const userToken = responseData.token
            console.log(userToken)
            localStorage.setItem("userData", userData); 
            localStorage.setItem("adminToken", userToken)

            if (subadminId) {
              navigate("/v2/dashboard");
            } else {
              console.log("Invalid admin ID");
            }
          } else {
            console.log(responseData.responseMessage);
          }
          if(responseData.responseCode === 404){
              setErrorMessage(responseData.responseMessage)
          }
        } else {
          console.log("An error occurred. Please try again.");
        }
      })
      .catch((error) => {
        console.log("An error occurred. Please try again.");
      });
  };


  return (
    <div className="login-wraper">
    <div className="signup-container1">
      <h1 className="text-center mb-2">OffersMeta</h1>
      <h5 className="text-center mb-4"> Admin Panel</h5>
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
      <div className="forgetPass d-flex justify-content-between align-items-center">
        <p><Link to="/v2/forgotpassword"><i className="fa-solid fa-lock"></i>Forgot Password</Link></p>
        <p><Link to="/partner/signup">Create an account</Link></p>
      </div>
    </div>
    </div>
  );
};

export default AdvertiserLogin;
