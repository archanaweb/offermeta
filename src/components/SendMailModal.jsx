import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../Api/base';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchPublisherList } from '../Redux/PublisherSlice';

const SendMailModal = (props)=> {
    const [formData, setFormData] = useState({});
    const [trackingUrl ,setTrackingUrl] = useState('')
    const loggedIn = JSON.parse(localStorage.getItem('userData'))
    const publishers = useSelector((state)=> state.publisher.list)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const generateTrackingUrl = (pubId) => {
      const trackingLinkUrl = `https://go2.clicksmeta.com/tracking/click?m=${loggedIn._id}&o=${props.offerId}&a=${pubId}`;
      if (formData?.publisherId) {
        setTrackingUrl(trackingLinkUrl);
      }
    };
    const handleSubmit = async () => {
        const mailRes = await fetch(BASE_URL+ `publicher/sendOfferToPublisher?partners_Id=${loggedIn._id}&publisherId=${formData?.publisherId}&offerId=${props.offerId}&trackingLink=${trackingUrl}`, {
          method: 'POST',
          headers: {
              'accept': 'application/json'
          }
      });
          const res = await mailRes.json()
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          props.onHide()
        }else{
          toast.error(res.responseMessage)
        }
    }
    useEffect(()=>{
      dispatch(fetchPublisherList(loggedIn._id));
    },[])
    useEffect(()=>{
      generateTrackingUrl(formData.publisherId)
    },[formData])

    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Send Mail
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="sendMail">
                        <div className="form row">
                        <div className='form-group col-lg-12'>
                          <select onChange={handleChange} className='form-control' name='publisherId' value={formData?.publisherId}>
                            <option value="">Select a publisher</option>
                            {publishers.map((publisher) => (
                              <option key={publisher.publisherId} value={publisher.publisherId} >
                                {`(ID: ${publisher.publisherId}) ${publisher.firstName} ${publisher.lastName}`}
                              </option>
                            ))}
                          </select>
                        </div>
                            <div className="form-group col-lg-12">
                                <label>Tracking Link</label>
                                <textarea className="form-control w-100"
                                value={trackingUrl}
                                ></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Send</button>   
                        </div>
                        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default SendMailModal