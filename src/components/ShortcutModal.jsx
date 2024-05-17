import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import BASE_URL from '../Api/base';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAdvertiserList } from '../Redux/AdvertiserSlice';

const ShortcutModal = (props)=> {
  const [selectedData, setSelectedData] = useState('')
  const [postbackUrl, setPostbackUrl] = useState('')
  const [formData, setFormData] = useState({})
//   const advertiserList = useSelector((state)=> state.advertiser.list)
  const dispatch = useDispatch()

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.name]: e.target.value });
}

  const handleSelect = (e)=> {
      e.preventDefault();
      setSelectedData(e.target.value)
      setPostbackUrl('')
  }
  const handleSubmit = ()=> {
    setPostbackUrl(`https://postback.offersmeta.in/conversion/postback?click_id=`)
    // if(postbackUrl){
    //     updateTrackingUrl()
    // }
  }
//   const trackingFormdata = (data) =>{
//     setTrackingData(data);
//   }

  const updateTrackingUrl = ()=> {
    var url = new URL(postbackUrl);
    const clickId = formData?.unique_id || '{unique_id}';
    const partnerTxnId = formData?.conv_id || '{conv_id}';
    const eventType = formData?.event_type || '{event_type}';
    const userAgent = formData?.user_agent || '{user_agent}';
    const googleAid = formData?.aaid || '{aaid}';
    const idfa = formData?.idfa || '{idfa}';
    const appVersion = formData?.app_version || '{app_version}';
    const country = formData?.country || '{country}';
    const convIP = formData?.client_ip || '{client_ip}';
    const event_Type = formData?.event_name || '{event_name}';
    const order_id = formData?.order_id || '{order_id}';
    const order_value = formData?.order_value || '{order_value}';
    const click_id = formData?.click_id || '{click_id}';
    const txnId3 = formData?.event_timestamp || '{event_timestamp}';
    const offerLookClick = formData?.hello || '{hello}';
    // affise
    const click_id2 = formData?.sub1 || '{click_id}';
    const user_Agent = formData?.uagent || '{uagent}';
    const sub9 = formData?.geo || '{geo}';
    const sub10 = formData?.city || '{city}';
    const ip = formData?.ip || '{ip}';
    const event_value = formData?.goal || '{goal}';
    const txn_id3 = formData?.status || '{status}';
    const txn_id1 = formData?.rand || '{rand}';
    const refer = formData?.referrer || '{referrer}';
    const txn_id2 = formData?.transactionid || '{transactionid}';
    // offer18
    const aff_sub1 = formData?.aff_sub1 || '{aff_sub1}';
    const conv_ip = formData?.ip || '{ip}';
    const event__value = formData?.event_name || '{event_name}';

    const selectOptions = {
        adosiz : {
            'unique_id': clickId,
            'partner_txnId': partnerTxnId,
            'event_type': eventType  
        },
        branch : {
            'user_Agent' : userAgent,
            'aaid': googleAid,
            'idfa': idfa,
            'app_Version': appVersion,
            'country': country,
            'client_ip': convIP,
            'event_Type': event_Type,
            'order_id': order_id,
            'order_value': order_value,
            'click_id': click_id,
            'event_timestamp': txnId3
        },
        offerlook : {
            'click_id': offerLookClick
        },
        affise : {
            'click_id': click_id2,
            'uagent': user_Agent,
            'geo': sub9,
            'city': sub10,
            'ip': ip,
            'goal': event_value,
            'event_Type': event_Type,
            'status': txn_id3,
            'rand': txn_id1,
            'refer': refer,
            'transactionid': txn_id2
        },
        offer18 : {
            'click_id': aff_sub1,
            'ip': conv_ip,
            'event_value': event__value
        }
    }
    for (const property in selectOptions[selectedData]) {
        url.searchParams.set(property, selectOptions[selectedData][property]);
      }
    
      setPostbackUrl(decodeURIComponent(url.href))
  }

  useEffect(()=> {
    if(postbackUrl){
    updateTrackingUrl()
    }
  },[postbackUrl])

//   useEffect(()=> {
//     dispatch(fetchAdvertiserList(loggedUser._id))
//   },[])
    return (
        <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
           Shortcuts
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='modal-content'>
                  <div className=''>
                    {/* <p>Login as</p>
                    <div className='shortcutTabs'>
                      <ul>
                        <li><i class="fa-solid fa-right-to-bracket"></i><span>Affiliate</span></li>
                        <li><i class="fa-solid fa-right-to-bracket"></i><span>Advertiser</span> </li>
                        <li><i class="fa-solid fa-right-to-bracket"></i> <span>Enter ID</span></li>
                      </ul>
                    </div> */}
                    <p>Add</p>
                    <div className='shortcutTabs'>
                      <ul>
                        <li onClick={props.onHide}><i className="fa-solid fa-plus"> </i><Link to='/add_offers'><span>Offers</span></Link></li>
                        <li onClick={props.onHide}><i className="fa-solid fa-plus"> </i><Link to='/publisheradd'><span>Publishers</span></Link></li>
                        <li onClick={props.onHide}><i className="fa-solid fa-plus"> </i><Link to='/advertiseradd'><span>Advertiser</span></Link></li>
                      </ul>
                    </div>
                    <p>Action</p>
                    <div className='shortcutTabs mt-2'>
                    <ul className='d-flex justify-content-start gap-4'>
                        {/* <li className='w-25 text-start'>
                          <label>Advertiser</label>
                          <select className='form-control w-100' value={selectedData} name='choose' onChange={handleSelect}>
                            <option value='' hidden>Select advertiser</option>
                            {advertiserList?.map((item)=> <option key={item._id} value={item.advertiserId}>(ID: {item.advertiserId})</option>)}
                          </select></li> */}
                          <li className='w-25'>
                          <label>Postbacks</label>
                          <select className='form-control w-100' value={selectedData} name='choose' onChange={handleSelect}>
                            <option value='' hidden>Tracking Platform</option>
                            <option value='adosiz'>Adosiz</option>
                            <option value='branch'>Branch</option>
                            <option value='hasoffer'>Hasoffer</option>
                            <option value='offerlook'>Offerlook</option>
                            <option value='affise'>Affise</option>
                            <option value='offer18'>Offer18</option>
                            <option value='vnative'>Trackier</option>
                            <option value='cake'>Cake</option>
                            <option value='fuiseClick'>Fuise Click</option>
                            <option value='offersHub'>Offers Hub</option>
                          </select></li>
                      </ul>
                  </div>
                  <form>
                    {selectedData === 'adosiz' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{unique_id}"name='unique_id' id="adosiz_click_id_header" onChange={handleChange}/>
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Partner Trans ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{conv_id}" name='conv_id' id="conv_id_header" onChange={handleChange}/>
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Event Type</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{event_type}" name='event_type' id="event_type_id_header" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'branch' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">User-Agent</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{user_agent}" name='user_agent' id="adosiz_click_id_header" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Google aid</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{aaid}" name='aaid' id="conv_id_header" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">idfa</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{idfa}" name='idfa' id="event_type_id_header" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">App version</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{app_version}" name='app_version' id="event_type_id_header" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">country</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{country}" name='country' id="country" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Conv IP</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{client_ip}" name='client_ip' id="client_ip" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Event type</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{event_name}" name='event_name' id="event_name" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Order id</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{order_id}" name='order_id' id="order_id" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Order value</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{order_value}" name='order_value' id="order_value" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{click_id}" name='click_id' id="click_id" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Trans ID3</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{event_timestamp}" name='event_timestamp' id="event_timestamp" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'hasoffer' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{aff_sub}" name='aff_sub' id="aff_sub" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">USer-Agent</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{user_agent}" name='user_agent' id="user_agent" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Google aid</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{google_aid}" name='google_aid' id="google_aid" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">idfa</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{ios_ifa}" name='ios_ifa' id="ios_ifa" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Country</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{country_code}" name='country_code' id="country_code" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Conv IP</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{ip}" name='ip' id="ip" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Event type</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{goal_id}" name='goal_id' id="goal_id" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Trans ID4</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{session_timestamp_rakuten}" name='session_timestamp_rakuten' id="session_timestamp_rakuten" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Carrier</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{mobile_carrier}" name='mobile_carrier' id="mobile_carrier" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Partner Trans ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{transaction_id}" name='transaction_id' id="transaction_id" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'offerlook' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{hello}" name='hello' id="hello" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'affise' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">click_id</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{sub1}" name='sub1' id="sub1" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">user_agent</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{uagent}" name='uagent' id="uagent" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">sub9</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{geo}" name='geo' id="geo" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">sub10</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{city}" name='city' id="city" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">ip</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{ip}" name='ip' id="ip" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">event_value</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{goal}" name='goal' id="ip" onChange={handleChange} />
                        </div>
                        </div>
                    </div>

                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">txn_id3</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{status}" name='status' id="status" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">txn_id1</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{rand}" name='rand' id="rand" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">refer</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{referrer}" name='referrer' id="referrer" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">txn_id2</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{transactionid}" name='transactionid' id="transactionid" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'offer18' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{aff_sub1}" name='aff_sub1' id="aff_sub1" onChange={handleChange} />
                        </div>
                        </div>  
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">ip</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{ip}" name='ip' id="ip" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Event Value</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{event_name}" name='event_name' id="event_name" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData === 'vnative' && <div className='selectedData'>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Click ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{p1}" name='p1' id="p1" onChange={handleChange} />
                        </div>
                        </div>
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Partner Trans ID</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{txn_id}" name='txn_id' id="txn_id" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    <div class="form-group row pt-3">
                        <div class="col-md-6 mb-3">
                        <div class="">
                            <label class="form-label ">Event Type</label>
                        </div>
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="{goal_value}" name='goal_value' id="goal_value" onChange={handleChange} />
                        </div>
                        </div>
                    </div>
                    </div>}
                    {selectedData && <div>
                        <button type='button' className='btn btn-primary' onClick={handleSubmit}>Generate Posback URL</button>
                        <div className='mt-2'>
                            <span>{postbackUrl}</span>
                        </div>
                    </div>}
                  </form>
                </div>
                </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
}

export default ShortcutModal