import React, { useEffect, useMemo, useState } from "react";
import './createoffer.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { fetchAdvertiserList } from "../../../Redux/AdvertiserSlice";
import { createOffer, fetchCategoryList, fetchTrafficList, fetchVerticalList } from "../../../Redux/OffersSlice";
import { fetchCountryList } from "../../../Redux/CountryListSlice";
import OfferMacrosListModal from "../../../components/OfferMacroList";
import countryList from "react-select-country-list";

const Createoffer = () => {
    const adminId = localStorage.getItem('subadminId');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [imageFile, setImageFile] = useState(null);
    const [modalShow, setModalShow] = useState(false)
    const advertiser = useSelector((state)=> state.advertiser.list)
    const countries = useSelector((state)=> state.country.list)
    const categoryList = useSelector((state)=> state.offers.categoryList)
    const verticalList = useSelector((state)=> state.offers.verticalList)
    const trafficList = useSelector((state)=> state.offers.trafficList)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [formDate, setFormDate] = useState({})
    const [showOfferkpi, setShowOfferkpi] = useState(true)
    const options = useMemo(() => countryList().getValues(), [])

    const currencies = [
        {
            symbol: '$',
            name:'doller',
            currency: '$',
            country: 'United States'
        },
        {
            symbol: '€',
            currency: 'Euro',
            country: 'European Union'
        },
        {
            symbol: '£',
            currency: 'British Pound',
            country: 'United Kingdom'
        },
        {
            symbol: '¥',
            currency: 'Japanese Yen',
            country: 'Japan'
        },
        {
            symbol: 'CHF',
            currency: 'Swiss Franc',
            country: 'Switzerland'
        },
        {
            symbol: 'AU$',
            currency: 'Australian Dollar',
            country: 'Australia'
        },
        {
            symbol: 'CA$',
            currency:  'Canadian Dollar',
            country: 'Canada'
        },
        {
            symbol: '¥',
            currency: 'Chinese Yuan',
            country: 'China'
        },
        {
            symbol: '₽',
            currency: 'Russia Ruble',
            country: 'Russia'
        },
        {
            symbol: 'INR',
            name: 'Indian Rupee',
            currency: 'INR',
            country: 'India'
        },
    ]

    useEffect(()=> {
        dispatch(fetchAdvertiserList(LoggedInUser?._id))
        dispatch(fetchCategoryList(LoggedInUser?._id))
        dispatch(fetchVerticalList(LoggedInUser?._id))
        dispatch(fetchTrafficList(LoggedInUser?._id))
    },[]);

    const [formData, setFormData] = useState({subAdminId:adminId});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

    };
    const handleDateChange = (date, e) => {
        const year = date?.getFullYear();
        const month = (date?.getMonth() + 1).toString().padStart(2, '0');
        const day = date?.getDate().toString().padStart(2, '0');
    
        // Create the formatted date string
        const formattedDate = `${year}-${month}-${day}`;
        setFormDate({...formDate, [e.target.name] : e.target.value})
    
        if (!startDate || (startDate && date >= startDate)) {
          setEndDate(formattedDate);
        } else {
          setStartDate(formattedDate);
          setEndDate(null);
        }
      };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        console.log("image",file)
        setImageFile(file);
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        const updateFormData = new FormData()
        updateFormData.append('image', imageFile);
        updateFormData.append('partners_Id', LoggedInUser?._id);
        updateFormData.append('title', formData.title);
        updateFormData.append('advertiserId', formData.advertiserId);
        updateFormData.append('privacyLavel', formData.privacyLavel);
        updateFormData.append('description', formData.description);
        updateFormData.append('category', formData.category);
        updateFormData.append('vertical', formData.vertical);
        updateFormData.append('traffic', formData.traffic);
        updateFormData.append('incentive', formData.incentive);
        updateFormData.append('operatingSystem', formData.operatingSystem);
        updateFormData.append('eventType', formData.eventType);
        {formData.eventValue && updateFormData.append('eventValue', formData.eventValue);}
        updateFormData.append('currency', formData.currency);
        updateFormData.append('revenue', formData.revenue);
        updateFormData.append('payout', formData.payout);
        updateFormData.append('eventName', 'Default');
        updateFormData.append('eventValue', 'Default');
        updateFormData.append('geoAllowed', formData.geoAllowed);
        updateFormData.append('country_code', formData.country_code);
        updateFormData.append('previewUrl', formData.previewUrl);
        updateFormData.append('trackingUrl', formData.trackingUrl);
        updateFormData.append('impressionUrl', formData.impressionUrl);
        updateFormData.append('packageName', formData.packageName);
        updateFormData.append('startDate', formDate.startDate);
        updateFormData.append('endDate', formDate.endDate);
        updateFormData.append('offerKpi', formData.offerKpi);
        const offerResponse = await dispatch(createOffer(updateFormData));
        const res = offerResponse.payload;
        if(res?.responseCode === 200){
          toast.success(res.responseMessage)
          navigate('/offers')

        }else{
          toast.error(res?.responseMessage);
        }
        console.log(offerResponse)
      };
    useEffect(()=> {
        dispatch(fetchCountryList())
    },[]);
    useEffect(()=> {
        console.log('options', options)
    },[options]);
    useEffect(()=>{
        console.log('formData', formDate)
    },[formDate])

    return (
                <div className='page_sec pt-3'>
                <div className="signup-container">
                    <h2 className="mb-4">Offer Create</h2>
                    <div className="container">
                        <form onSubmit={handleSubmit} className="form row create-offer">
                            <div className="form-group col-lg-6">
                                <label htmlFor="image">Image</label>
                                <input
                                    className="form-control"
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="title">Title</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="advertiser">Advertiser</label>
                                <select className="form-control" name="advertiserId" onChange={handleChange}>
                <option value="" hidden>Select advertiser</option>
                {advertiser?.map((item)=> <option key={item.advertiserId} value={item.advertiserId}>{`(ID: ${item.advertiserId}) ${item.firstName} ${item.lastName}`}</option>)}
              </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="privacyLavel">Privacy Level</label>
                                <select className="form-control" value={formData.privacyLavel} name="privacyLavel" 
                                onChange={handleChange} selected>
                                     <option value="none" hidden>Select</option>
                                    <option>Public</option>
                                    <option>Private</option>
                                    <option>Required Aprooval</option>
                                </select>
                            </div>
                            <div className="form-group col-lg-12">
                                    <label htmlFor="description">Description</label>
                                 <CKEditor
                                  value={formData.description}
                                    editor={ClassicEditor}
                                    data="<p>Hello</p>"
                                    onReady={(editor) => {
                                    console.log('CKEditor React Component is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                const data = editor.getData();
                                const evnt = {
                                    target : {
                                        name : 'description',
                                        value : data
                                    }};
                                    handleChange(evnt);
                                }}
      />
      
                            </div>
                            {showOfferkpi &&  <div className="form-group col-lg-12">
                                <label htmlFor="offerKpi">Offer Kpi</label>
                                 <CKEditor
                                  value={formData.offerKpi}
                                    editor={ClassicEditor}
                                    data="<p>Hello</p>"
                                    onReady={(editor) => {
                                    console.log('CKEditor React Component is ready to use!', editor);
                                }}
                                onChange={(event, editor) => {
                                const data = editor.getData();
                                const evnt = {
                                    target : {
                                        name : 'offerKpi',
                                        value : data
                                    }};
                                    handleChange(evnt);
                                }}
      />
                            </div>}
                            <div className="form-group col-lg-6">
                                <label htmlFor="category">Category</label>
                                <select className="form-control" name="category" onChange={handleChange}>
                <option value="" hidden>Select Category</option>
                {categoryList?.map((item)=> <option key={item._id} value={item.categoryName}>{item.categoryName}</option>)}
              </select>
              <Link to='/add_category'><i class="fa-solid fa-plus"></i></Link>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="vertical">Vertical</label>
                                <select className="form-control" name="vertical" onChange={handleChange}>
                                    <option value="" hidden>Select Vertical</option>
                                    {verticalList?.map((item)=> <option key={item._id} value={item.verticalName}>{item.verticalName}</option>)}
                                </select>
                                <Link to='/add_vertical'><i class="fa-solid fa-plus"></i></Link>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="traffic">Traffic</label>
                                <select className="form-control" name="traffic" onChange={handleChange}>
                                    <option value="" hidden>Select Traffic</option>
                                    {trafficList?.map((item)=> <option key={item._id} value={item.trafficName}>{item.trafficName}</option>)}
                                </select>
                                <Link to='/add_traffic'><i class="fa-solid fa-plus"></i></Link>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="operatingSystem">Operating System</label>
                                <select className="form-control" value={formData.operatingSystem} onChange={handleChange} name="operatingSystem" selected>
                                    <option value="" hidden>Select</option>
                                    <option>Linux</option>
                                    <option>Window</option>
                                    <option>Android</option>
                                    <option>iOS</option>
                                </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="incentive">Incentive</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="incentive"
                                    name="incentive"
                                    value={formData.incentive}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="eventType">Objective</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="eventType"
                                    name="eventType"
                                    value={formData.eventType}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="form-group col-lg-6">
                                <label htmlFor="eventValue">Event value</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="eventValue"
                                    name="eventValue"    
                                    value={formData.eventValue}
                                    onChange={handleChange}
                                />
                            </div> */}
                            <div className="form-group col-lg-6">
                                <label htmlFor="currency">Currency</label>
                                <select className="form-control" name="currency" onChange={handleChange}>
                                <option value="" hidden>Select</option>
                                {currencies?.map((item,i)=> <option key={i} value={item.currency}>{item.currency}</option>)}
                            </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="payout">Payout</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="payout"
                                    name="payout"
                                    value={formData.payout}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="revenue">Revenue</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="revenue"
                                    name="revenue"
                                    value={formData.revenue}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* <div className="form-group col-lg-6">
                                <label htmlFor="eventName">Event Name</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="eventName"
                                    name="eventName"
                                    value={formData.eventName}
                                    onChange={handleChange}
                                    required
                                />
                            </div> */}
                            <div className="form-group col-lg-6">
                                <label htmlFor="geoAllowed">GeoAllowed</label>
                                <select className="form-control" 
                                 name="geoAllowed"
                                 value={formData.geoAllowed}
                                 onChange={handleChange}>
                                    <option value='' hidden>Select</option>
                                    {countries.map((item)=> <option>{item.name}</option>)}
                                </select>
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="geoAllowed">Country code</label>
                                <select 
                                    className="form-control" 
                                    name="country_code" 
                                    onChange={handleChange}>
                                    <option value='' hidden>Select</option>
                                    {options.map((item)=> <option>{item}</option>)}
                                    </select>
                            </div>
                            <div className="form-group col-lg-12">
                                <label htmlFor="trackingUrl">TrackingUrl</label>
                                <textarea
                                    className="form-control"
                                    id="trackingUrl"
                                    name="trackingUrl"
                                    value={formData.trackingUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                             <button className='button btnModal' type='button' variant="primary" onClick={() => setModalShow(true)}>Advertiser Macros & Parameters</button>
                             <OfferMacrosListModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                            <div className="form-group col-lg-12">
                                <label htmlFor="previewUrl">PreviewUrl</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="previewUrl"
                                    name="previewUrl"
                                    value={formData.previewUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-12">
                                <label htmlFor="impressionUrl">Impression Url</label>
                                <textarea
                                    className="form-control w-100"
                                    id="impressionUrl"
                                    name="impressionUrl"
                                    value={formData.impressionUrl}
                                    onChange={handleChange}  
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="startDate">Start Date</label>
                                <input
                                    className="form-control w-100"
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    value={formDate.startDate}
                                    onChange={(e) => handleDateChange(new Date(e.target.value), e)}
                                    required
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="endDate">End Date</label>
                                <input
                                    className="form-control w-100"
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    value={formDate.endDate}
                                    onChange={(e) => handleDateChange(new Date(e.target.value), e)}
                                    required   
                                />
                            </div>
                            <div className="form-group col-lg-6">
                                <label htmlFor="packageName">package Name</label>
                                <input
                                    className="form-control w-100"
                                    type="text"
                                    id="packageName"
                                    name="packageName"
                                    value={formData.packageName}
                                    onChange={handleChange}   
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
                </div>
           );
};

export default Createoffer;