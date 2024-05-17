import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MacrosListModal = (props)=> {
    return (
        <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Tracking Values
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>Publisher Tracking Link Macro and Postback Parameter.</span>
          <div className='trackingValue mt-4'>
            <span>aff_click_id</span>
            <p className='mx-4'>Publisher Click ID. Unique ID for every click sent from the Publisher.</p>
          </div>
          <div className='trackingValue'>
            <span>source</span>
            <p className='mx-4'>Use this to get source from the publisher.</p>
          </div>
          <div className='trackingValue'>
            <span>gaid</span>
            <p className='mx-4'>Use this to get gaid from the publisher.</p>
          </div>
          <div className='trackingValue'>
            <span>idfa</span>
            <p className='mx-4'>Use this to get idfa from the publisher.</p>
          </div>
        
          <div className='trackingValue'>
            <span>p1</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p2</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p3</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p4</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p5</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p6</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p7</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p8</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p9</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>p10</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>event_name</span>
            <p className='mx-4'>Event (Offer install, uninstall, subscribe, deactivation)</p>
          </div>
          <div className='trackingValue'>
            <span>id</span>
            <p className='mx-4'>Session IP4/6</p>
          </div>
          <div className='trackingValue'>
            <span>offer_id</span>
            <p className='mx-4'>OfferID</p>
          </div>
          <div className='trackingValue'>
            <span>event_type</span>
            <p className='mx-4'>Offer Model - CPC, CPA,CPM etc</p>
          </div>
          <div className='trackingValue'>
            <span>payout</span>
            <p className='mx-4'>Offer Payout</p>
          </div>
          <div className='trackingValue'>
            <span>currency</span>
            <p className='mx-4'>Payout Currency (USD,INR, EUR)</p>
          </div>
          <div className='trackingValue'>
            <span>user_agent</span>
            <p className='mx-4'>Device UserAgent Urlencoded</p>
          </div>
          <div className='trackingValue'>
            <span>device_id</span>
            <p className='mx-4'>Device ID</p>
          </div>
          <hr />
          <span>Additional Publisher Tracking Link Macro and Postback Parameter.</span>
          <div className='trackingValue mt-2'>
            <span>sub_id1</span>
            <p className='mx-4'>Publisher Sub ID 1 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>sub_id2</span>
            <p className='mx-4'>Publisher Sub ID 2 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>sub_id3</span>
            <p className='mx-4'>Publisher Sub ID 3 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>sub_id4</span>
            <p className='mx-4'>Publisher Sub ID 4 specified in the tracking link.</p>
          </div>
          <div className='trackingValue'>
            <span>sub_id5</span>
            <p className='mx-4'>Publisher Sub ID 5 specified in the tracking link.</p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default MacrosListModal