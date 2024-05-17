import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const OfferMacrosListModal = (props)=> {
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
            <span><b>Macro</b></span>
            <p className='mx-4'><b>Token</b></p>
            <p><b>{`Description (when to use)`}</b> </p>
          </div>
          <div className='trackingValue mt-4'>
            <span>Click ID</span>
            <p className='mx-4'>{`{click_id}`}</p>
            <p>This is the Platform's unique Click ID Macro </p>
          </div>
          <div className='trackingValue'>
            <span>PublisherID</span>
            <p className='mx-4'>{`{pub_id}`}</p>
            <p>To pass the  PublisherID in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Sub PublisherID</span>
            <p className='mx-4'>{`{source}`}</p>
            <p>To pass the Sub-PublisherID in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Click IP Address</span>
            <p className='mx-4'>{`{ip}`}</p>
            <p>To pass the IP address in the Offer URL</p>
          </div>
        
          <div className='trackingValue'>
            <span>Offer ID of Offer</span>
            <p className='mx-4'>{`{offer_id}`}</p>
            <p>To pass the Offer ID in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Offer Name of the Offer</span>
            <p className='mx-4'>{`{offer_name}`}</p>
            <p>To pass the Offer name in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>{`Device User Agent (URL) encoded)`}</span>
            <p className='mx-4'>{`{user_agent}`}</p>
            <p>To pass the Device user agent in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Advertiser's ID</span>
            <p className='mx-4'>{`{txn_id1}`}</p>
            <p>To pass Advertiser account ID (Advertiser data)</p>
          </div>
          <div className='trackingValue'>
            <span>{`Country Code (2-digit)`}</span>
            <p className='mx-4'>{`{country}`}</p>
            <p>To pass the Country name in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Exact Click Time</span>
            <p className='mx-4'>{`{timestamp}`}</p>
            <p>To pass click time in Unix Timestamp format</p>
          </div>
          <div className='trackingValue'>
            <span>{`Device ID (PublisherData)`}</span>
            <p className='mx-4'>{`{device_id}`}</p>
            <p>To pass Device ID in Offer URL (If received from Publishers in Publisher Tracking link)</p>
          </div>
          <div className='trackingValue'>
            <span>Google Advertising ID (PublisherData)</span>
            <p className='mx-4'>{`{gaid}`}</p>
            <p>To pass Google ID in Offer URL (If received from Publisher in PublisherTracking link)</p>
          </div>
          <div className='trackingValue'>
            <span>{`Android Device ID (PublisherData)`}</span>
            <p className='mx-4'>{`{android_id}`}</p>
            <p>To pass Android ID in Offer URL (If received from Publisher in PublisherTracking link)</p>
          </div>
          <div className='trackingValue'>
            <span>IOS Device ID</span>
            <p className='mx-4'>{`{idfa}`}</p>
            <p>To pass IDFA in Offer URL (If received from Publisher in Publisher Tracking link)</p>
          </div>
          <div className='trackingValue'>
            <span>Operating System</span>
            <p className='mx-4'>{`{os}`}</p>
            <p>To pass Operating system details in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Operating System Versions</span>
            <p className='mx-4'>{`{os_version}`}</p>
            <p>To pass Operating system version details in the Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>random</span>
            <p className='mx-4'>{`{random}`}</p>
            <p>To pass the random value in the Offer URL</p>
          </div>
          <p className='my-4'><b>Addition Macros to pass more information in the Advertiser URL</b></p>
          <div className='trackingValue mt-4'>
            <span><b>Macro</b></span>
            <p className='mx-4'><b>Token</b></p>
            <p><b>{`Description (when to use)`}</b> </p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB1</span>
            <p className='mx-4'>{`{sub1}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB2</span>
            <p className='mx-4'>{`{sub2}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB3</span>
            <p className='mx-4'>{`{sub3}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB4</span>
            <p className='mx-4'>{`{sub4}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB5</span>
            <p className='mx-4'>{`{sub5}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB6</span>
            <p className='mx-4'>{`{sub6}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB7</span>
            <p className='mx-4'>{`{sub7}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB8</span>
            <p className='mx-4'>{`{sub8}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB9</span>
            <p className='mx-4'>{`{sub9}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
          <div className='trackingValue'>
            <span>Dynamic PublisherSUB10</span>
            <p className='mx-4'>{`{sub10}`}</p>
            <p>Additional Data to receive from Publisher and pass in Offer URL</p>
          </div>
         
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default OfferMacrosListModal