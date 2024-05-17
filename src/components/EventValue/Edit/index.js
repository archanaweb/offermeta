import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../../Redux/EventValueSlice";

const UpdateEvent = ()=>{

    let params = new URLSearchParams(document.location.search);
    let offerId = params.get("offerid");
    const {id} = useParams();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({});
    const eventList = useSelector((state)=> state.eventvalue.list);
    const eventDetail = eventList?.find((item)=> `${item?._id}` === id)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const dispatch = useDispatch();

    useEffect(()=>{
        setFormData({ ...formData, eventValue: eventDetail?.eventValue, revenue: eventDetail?.revenue, payout: eventDetail?.payout, eventType: eventDetail?.eventType, eventName: eventDetail?.eventName, offerId, partners_Id:LoggedInUser?._id});
        console.log('eventformdata', eventDetail)
    },[eventList])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

function extractNumbersFromString(inputString) {
  const regex = /[-+]?\d*\.?\d+/g;
  const matches = inputString?.match(regex);
  const numbers = matches.map(match => parseFloat(match));
  return numbers;
}

    const handleSubmit = async (e) => {
        e.preventDefault();
        var updatedFormData = formData;
        if(formData.revenue){
          updatedFormData.revenue = extractNumbersFromString(formData.revenue);
        }
        if(formData.payout){
          updatedFormData.payout = extractNumbersFromString(formData.payout);
        }

        const eventEditResponse = await dispatch(updateEvent({
            eventId: id,
            formData: updatedFormData
        }));
        const res = eventEditResponse.payload;
            if(res?.responseCode === 200){
                toast.success(res?.responseMessage)
                navigate(`/eventValue?offerid=${offerId}`)
            }else{
                toast.error(res?.responseMessage || 'something went wrong');
            }
        };
    return (
        <>
                <div className='page_sec pt-3'>
                    <div className="signup-container">
          <h2 className="mb-4">Edit Event</h2>
          <form onSubmit={handleSubmit} className="form row">
            <div className="form-group col-lg-6">
              <label htmlFor="eventValue">Event Value </label>
              <input className="form-control w-100"
                type="text"
                id="eventValue"
                name="eventValue"
                value={formData.eventValue}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group col-lg-6">
              <label htmlFor="eventName">Event Name </label>
              <input className="form-control w-100"
                type="text"
                id="eventName"
                name="eventName"
                value={formData.eventName}
                onChange={handleChange}
                required
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
              <label htmlFor="eventType">Objective</label>
              <input className="form-control w-100"
                type="text"
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">Update</button>
          </form>
        </div>
                </div>
        </>
    )
}

export default UpdateEvent