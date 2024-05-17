import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../../Api/base';
import TrackingForm from './TrackingForm';
import { toast } from 'react-toastify';
import MacrosListModal from '../../../../components/MacrosListModal';
import { useDispatch, useSelector } from 'react-redux';
import { fetchManagerPublisherList } from '../../../../Redux/ManagerSlice';

const TrackingUrl = ({offerId}) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [publishers, setPublishers] = useState([]);
  const [trackingLinkUrl, setTrackingUrl] = useState('');
  const [modalShow, setModalShow] = React.useState(false);
  const [selectedPublisherId, setSelectedPublisherId] = useState(null);

  const [formData, setFormData] = useState({});
  const [trackingData, setTrackingData] = useState({});
  const managerLogged = JSON.parse(localStorage.getItem('userData'));
  const mainPartner = managerLogged.partners_Id
  const publisherList = useSelector((state)=> state.manager.publisherList)
  const dispatch = useDispatch()

  const trackingFormdata = (data) =>{
    setTrackingData(data);
  }


  const handleRadioChange = (e) =>{
      setFormData({ ...formData, [e.target.name]: e.target.checked });
  }

  const updateTrackingUrl = ()=> {
    var url = new URL(trackingLinkUrl);
    const affclickid = trackingData?.aff_click_id || '{your-click-id}';
    const affid = trackingData?.aff_id || '{your-sub-aff-id}';
    const subid1 = trackingData?.subid1 || '{your-click-id}';
    const subid2 = trackingData?.subid2 || '{your-sub-aff-id}';
    const idfa = trackingData?.idfa || '{your-idfa-id}';
    const gaid = trackingData?.gaid || '{your-gaid}';
    const sourceid = trackingData?.sourceid || '{your-sourceid}';

    if(formData.clickid){
      url.searchParams.set('aff_click_id', affclickid);
      url.searchParams.set('affiliate_id', affid);
    }else{
      url.searchParams.delete('aff_click_id')
      url.searchParams.delete('affiliate_id')
    }

    if(formData.subid){
      url.searchParams.set('sub_id1', subid1);
      url.searchParams.set('sub_id2', subid2);
    }else{
      url.searchParams.delete('sub_id1')
      url.searchParams.delete('sub_id2')
    }
    
    if(formData.mobileid){
      url.searchParams.set('idfa', idfa);
      url.searchParams.set('gaid', gaid);
    }else{
      url.searchParams.delete('idfa')
      url.searchParams.delete('gaid')
    }
    
    if(formData.sourceid){
      url.searchParams.set('source_id', sourceid);
    }else{
      url.searchParams.delete('source_id')
    }

    setTrackingUrl(decodeURIComponent(url.href))
  }

  useEffect(()=> {
    if(trackingLinkUrl){
      updateTrackingUrl()
    }
  },[formData, trackingLinkUrl, trackingData])

  // const generateTrackingUrl = () => {
  //   const trackingLinkUrl = BASE_URL + `tracking/click?o=${offerId}&a=${publisherUser._id}`;
  //   setTrackingUrl(trackingLinkUrl)
  // };
  
  useEffect(()=> {
    console.log('pubList',publisherList)
  },[publisherList])

  const generateTrackingUrl = (selectedId) => {
    const trackingLinkUrl = `https://go2.clicksmeta.com/tracking/click?m=${mainPartner}&o=${offerId}&a=${selectedId}`;
    const mainTrackingLinkUrl = `https://click.adomobi.com/tracking/click?m=${mainPartner}&o=${offerId}&a=${selectedId}`;
    console.log(trackingLinkUrl)
    if (selectedId) {
      if(mainPartner === 2){
        setTrackingUrl(mainTrackingLinkUrl)
      }else{
        setTrackingUrl(trackingLinkUrl);
      }
    }
  };
  
  const handlePublisherChange = (event) => {
    const selectedId = event.target.value;
    console.log('selectedPub', selectedId)
    generateTrackingUrl(selectedId)
    setSelectedPublisherId(selectedId)
  };
  useEffect(()=> {
    generateTrackingUrl()
    dispatch(fetchManagerPublisherList({partners_Id:managerLogged.partners_Id,managerId: managerLogged.managerId}))
  },[])
  const handleCopy = () => {
    const textField = document.createElement('textarea');
    textField.innerText = trackingLinkUrl;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
    toast.success("Copied Successful!")
  };
  const handleManage= () => {
    navigate('/tracking');
  }

  return (
    <div>
      <div className='track-link'>
        <div className='d-flex pb-2 justify-content-between align-item-center border-b'>
        <h4 className='mb-0'>Tracking Link</h4>
        <div>
            {/* <button onClick={handleManage} className='btn btn-outline-secondary btn-sm'>
              Manage
            </button> */}
            </div>
            </div>
        <div>

        <div className='mb-2 mt-3 position-relative'>
            <span className='position-absolute dropdownIcon'><b role="presentation"></b></span>
            <select onChange={handlePublisherChange} className='form-control'>
              <option value="none" hidden>Select a Publisher</option>
              {publisherList?.map((publisher) => (
                <option key={publisher?.publisherId} value={publisher?.publisherId}>
                  {`(ID: ${publisher?.publisherId}) ${publisher.firstName} ${publisher.lastName}`}
                </option>
              ))}
            </select>
          </div>
          <small class="help-block">To generate a tracking link, select an affiliate from below. Tracking links records click for reporting.</small>
          <div className='pt-2 mt-2 d-flex justify-content-between align-items-center rounded'>
            <p className='mb-2'>Genrated Url</p>
            <i className="fa-regular fa-copy copy-bg" title="Copy" onClick={handleCopy}></i>
          </div>
          <div className='pb-2 g-2 rounded url-box'>
            <textarea className='form-control w-100' type='text' value={trackingLinkUrl} />
          </div>
           
          <div className='macroWrapper mt-2'>
            <div className='form-group d-flex justify-content-between'>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="clickid" /> Add Click ID
              </label>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="subid" /> Add Sub ID
              </label>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="deeplink" /> Add Deep Link
              </label>
          </div>

          <div className='form-group d-flex justify-content-between'>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="sourceid" /> Add Source ID
              </label>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="landingpage" /> Add Landing Page
              </label>
              <label className="radio-inline">
                <input onChange={handleRadioChange} type="checkbox" name="mobileid" /> Add Mobile ID
              </label>
          </div>
          </div>

          <TrackingForm 
            affiliateidChecked = {formData?.clickid}
            subidChecked = {formData?.subid}
            sourceidChecked = {formData?.sourceid}
            mobileidChecked = {formData?.mobileid}
            trackingFormdata = {trackingFormdata} 
          />
        </div>
        <button className='button btnModal' variant="primary" onClick={() => setModalShow(true)}>Additional Macros</button>
        <MacrosListModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      </div>
    </div>
  );
};

export default TrackingUrl;
