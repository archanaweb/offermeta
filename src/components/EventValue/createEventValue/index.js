import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addEventValue } from "../../../Redux/EventValueSlice";

const CreateEventValue = () => {
    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");

    const navigate = useNavigate();
    const eventvalue = useSelector((state)=> state.eventvalue)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

    const dispatch = useDispatch()
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value, partners_Id: LoggedInUser._id, offerId});
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        const eventvalueResponse = await dispatch(addEventValue(formData));
        const res = eventvalueResponse.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          navigate(`/eventValue?offerid=${offerId}`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(eventvalueResponse)
      };

    return (
                <div className='page_sec pt-3'>
                    <div className="signup-container">
          <h2 className="mb-4">Create Event Value</h2>
          <form onSubmit={handleSubmit} className="form row">
            {/* <div className="form-group col-lg-6">
              <label htmlFor="offerId">Offer Id</label>
             <p>{offerId}</p>
            </div> */}
            <div className="form-group col-lg-6">
              <label htmlFor="eventValue ">Event Value </label>
              <input className="form-control w-100"
                type="text"
                id="eventValue"
                name="eventValue"
                value={formData.eventValue}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="eventName ">Event Name </label>
              <input className="form-control w-100"
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="revenue">Revenue </label>
              <input className="form-control w-100"
                type="text"
                id="revenue"
                name="revenue"
                value={formData.revenue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group col-lg-6">
              <label htmlFor="payout">Payout</label>
              <input className="form-control w-100"
                type="text"
                id="payout"
                name="payout"
                value={formData.payout}
                onChange={handleChange}
                required
              />
                </div>
         
            <div className="form-group col-lg-6">
              <label htmlFor="status">Status</label>
              {/* <input className="form-control"
                type="text"
                id="status"   
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              /> */}
              <select className="form-control" 
              value={formData.status}
              onChange={handleChange}
              name="status"
              >
                <option value='' hidden>Select</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          

          <div className="form-group col-lg-6">
            <label htmlFor="eventType"> Objective </label>
            <input className="form-control w-100"
              type="text"
              id="eventType"
              name="eventType"
              value={formData.eventType}
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

export default CreateEventValue;