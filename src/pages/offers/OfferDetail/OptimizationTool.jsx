import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import BASE_URL from '../../../Api/base';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublisherList } from '../../../Redux/PublisherSlice';
import { fetchEventList } from '../../../Redux/EventValueSlice';

const OptimizationTool = ({offerId}) => {
  const [optimList, setOptimiList]= useState()
  const loggedIn = JSON.parse(localStorage.getItem('userData'))
  const [formData, setFormData] = useState({})
  const publisherList = useSelector((state)=> state.publisher.list)
  const eventlist = useSelector((state)=> state.eventvalue.list)
  const dispatch = useDispatch();

  const fetchOptimizationList = async()=> {
    const response = await fetch(`${BASE_URL}conversion/optimizationToolsList?partners_Id=${loggedIn?._id}&offerId=${offerId}`)
    const res = await response.json()
    console.log(res)
    setOptimiList(res?.responseResult)
}

  useEffect(() => {
    dispatch(fetchPublisherList(loggedIn._id))
    dispatch(fetchEventList({partners_Id:loggedIn._id,offerId}))
    fetchOptimizationList()
  }, []);

  const updateOptimizationTool = async() => {
    const optimizationToolRes = await fetch(BASE_URL+ `conversion/optimizationTools?partners_Id=${loggedIn._id}&publisherId=${formData.publisherId}&offerId=${offerId}&eventValue=${formData.eventValue}&number=${formData.number}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  });
      const res = await optimizationToolRes.json()
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
      setFormData({})
      fetchOptimizationList()
    }else{
      toast.error(res.responseMessage)
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  };
  const handleDelete = async(item)=>{
    const deleteRes = await fetch(`${BASE_URL}conversion/removeoptmizationTool?partners_Id=${loggedIn._id}&optimizationdata=${item.optimizationdata}`, {
      method: 'PUT',
      headers: {
          'accept': 'application/json'
      }
  })
    const res = await deleteRes.json()
    if(res.responseCode === 200){
      toast.success(res.responseMessage);
      fetchOptimizationList()
    }else {
      toast.error(res.responseMessage)
    }
  }


  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
            <h3 className='mb-0'>Optimization Tool Add</h3>
        </div>
        <hr />
        <div>
            <form>
              <div className='d-flex judtify-content-between gap-4 align-items-center'>
          <div className='mt-2 w-100'>
          <label htmlFor="publisherId">Publisher Id</label>
            <select onChange={handleChange} className='form-control w-100' name='publisherId'>
              <option value="">Select a publisher</option>
              {publisherList?.map((publisher) => (
                <option key={publisher.publisherId} value={publisher.publisherId} >
                  {`(ID: ${publisher.publisherId}) ${publisher.firstName} ${publisher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className='mt-2 w-100'>
          <label htmlFor="eventValue">Event Value</label>
            <select className='form-control w-100'
              name="eventValue"
              onChange={handleChange}>
              <option value='' hidden>Select</option>
              {eventlist?.map((item)=><option key={item._id} value={item.eventValue}>{item?.eventValue}</option>)}
            </select>
            </div>
            <div className='mt-2 w-100'>
            <label htmlFor="number">{`Percentage(%)`}</label>
                <input name='number' type='text' className='form-control w-100' value={formData?.number} onChange={handleChange} placeholder='percentage'/>
            </div>
            </div>
          <div className='g-2 rounded url-box mt-2 text-end'>
            <button type='button' className='btn btn-success' onClick={updateOptimizationTool}>Create</button>
          </div>
          </form>
        </div>
      </div>
      <div className='tool-list'>
      {/* <div className='d-flex justify-content-between align-item-center'>
            <h3 className='mb-0'>Add</h3>
        </div> */}
        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th>Publisher Id</th>
                        <th>Offer Id</th>
                        <th>Event Value</th>
                        <th>Number</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    
                        {optimList?.map((item)=> <tr key={item?._id}>
                            <td>{item?.publisherId}</td>
                            <td>{item?.offerId}</td>
                            <td>{item?.eventValue}</td>
                            <td>{item?.number}</td>
                            <td><button className='btn btn-danger btn-sm' onClick={()=> handleDelete(item)}>Delete</button></td>
                        </tr>)}
                   
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default OptimizationTool;
