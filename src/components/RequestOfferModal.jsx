import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../Api/base';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestOffer } from '../Redux/OffersSlice';

const RequestOfferModal = (props)=> {
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmitRequest = async (e) => {
        e.preventDefault();
        const requestOfferRes = await dispatch(requestOffer({publisherId: props.publisherId, offerId: props.offerId, formData}))
        const res = requestOfferRes.payload;
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          props.handleButtonClick()
          navigate(`/publisher/offer/${props.offerId}`)
        }else{
          toast.error(res.responseMessage);
        }
        console.log(requestOfferRes)
    }
    useEffect(()=> {
        console.log('props', props)
    })

    return (
        <Modal
        {...props}
        size="l"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Request Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="request-offer">
                        <div className="form row">
                            <div className="form-group col-lg-12">
                                <label htmlFor="question">Question</label>
                                <textarea className="form-control w-100"
                                name="question"
                                value={formData.question}
                                onChange={handleChange}
                                ></textarea>
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handleSubmitRequest}>Submit</button>   
                        </div>
                        </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    )
}

export default RequestOfferModal