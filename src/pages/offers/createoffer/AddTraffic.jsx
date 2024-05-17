import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addTraffic } from "../../../Redux/OffersSlice";

const AddTraffic = () => {
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const categoryRes = await dispatch(addTraffic({...formData, partners_Id:loggedInUser._id}))
        const res = categoryRes.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          navigate(`/add_offers`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(categoryRes)
    }
    useEffect(()=>{
        
    },[])

  return (
        <div className='page_sec pt-3'>
          <div className='container'>
          <h2 className="mb-4">Add Traffic</h2>
                    <div className="container signup-container">
                        <form onSubmit={handleSubmit} className="form row">
                            <div className="form-group col-lg-6">
                                <label htmlFor="trafficName">Traffic Name</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="trafficName"
                                    name="trafficName"
                                    value={formData.trafficName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>                        </form>
                        </div>
          
          </div>
        </div>
     );
};

export default AddTraffic;
