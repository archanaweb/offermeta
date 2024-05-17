import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addManager } from "../../../Redux/ManagerSlice";

const AddManager = () => {
  const loggedInUser = JSON.parse(localStorage.getItem('userData'))
  const dispatch = useDispatch()
  const manager = useSelector((state)=> state.manager);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({partners_Id: loggedInUser._id});
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const managerResponse = await dispatch(addManager(formData));
    const res = managerResponse.payload;
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
      navigate('/manager')
    }else{
      toast.error(res.responseMessage);
    }
    console.log(managerResponse)
  };

  return (
        <div className='page_sec pt-3'>
        <div className="signup-container">
          <h2 className="mb-4">Add Manager</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
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
            <div className="form-group col-lg-6">
              <label htmlFor="email">Email</label>
              <input className="form-control"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="skypeId">Skype Id</label>
              <input className="form-control w-100"
                type="text"
                id="skypeId"
                name="skypeId"
                value={formData.skypeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="mobileNumber">Mobile  Number</label>
              <input className="form-control w-100"
                type="text"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
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
           
            <div className="form-group col-lg-6">
              <label htmlFor="managerRole">Manager Role</label>
              <select
                className="form-control"
                name="managerRole"
                value={formData.managerRole}
                onChange={handleChange}>
                  <option>Select</option>
                  <option>Publisher Manager</option>
                  <option>Advertiser Manager</option>
                  <option>Account Manager required</option>
              </select>
            </div>
            <div className="form-group col-lg-6">
            <label htmlFor="password">Password</label>
            <input className="form-control w-100"
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
            <button type="submit" className="btn btn-primary">Create</button>
          </form>
        </div>
        </div>
     );
};

export default AddManager;












