
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagerPublisherList } from '../../../../Redux/ManagerSlice';
import BASE_URL from '../../../../Api/base';
import { useEffect, useState } from 'react';

const ManagerSendOffer = ({offerId}) => {
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);
  const loggedIn = JSON.parse(localStorage.getItem('userData'))
  const managerPubList = useSelector((state)=> state.manager.publisherList)
  const dispatch = useDispatch() 

  useEffect(()=>{
    dispatch(fetchManagerPublisherList(loggedIn._id))
},[])

  const sendOfferMail = async() => {
    const mailRes = await fetch(BASE_URL+ `publicher/sendOfferToPublisher?publisherId=${selectedPublisherId}&offerId=${offerId}`, {
      method: 'POST',
      headers: {
          'accept': 'application/json'
      }
  });
      const res = await mailRes.json()
    if(res.responseCode === 200){
      toast.success(res.responseMessage)
    }else{
      toast.error(res.responseMessage)
    }
  };

  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    setSelectedPublisherId(selectedId); 
  };

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex justify-content-between align-item-center'>
          <h3 className='mb-0'>Send Mail</h3>
        </div>
        <div>
          <div className='mb-2 mt-3'>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="">Select a publisher</option>
              {managerPubList?.map((publisher) => (
                <option key={publisher._id} value={publisher._id} >
                  {`(ID: ${publisher._id}) ${publisher.firstName} ${publisher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <div className='g-2 rounded url-box'>
         <button type='button' className='btn btn-primary btn-sm' onClick={sendOfferMail}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSendOffer;
