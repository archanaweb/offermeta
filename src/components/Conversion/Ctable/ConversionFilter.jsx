import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { conversionFilterBysearchParams } from "../../../Redux/ConversionFilterSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../../Api/base";
const ConversionFilter = ({isFilter, setIsFilter, setClickData, fetchData})=> {
    const [searchParamValues, setSearchParamValues] = useState([])
    const searchParamList = useSelector((state)=> state.conversionFilter.list)
    const conversionList = useSelector((state)=> state.conversionFilter.list)
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const handleClear = ()=> {
        fetchData();
        setIsFilter(false)
        toast.success('Clear filter data successfully')
    }

    const handleChange = (e)=> {
         console.log('searchParamValues',e.target.checked)
         if(e.target.checked){
            setSearchParamValues([...searchParamValues,e.target.value])
         }else{
            setSearchParamValues(searchParamValues.filter(value => value !== e.target.value));
         }
    }

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const searchParamRes = await dispatch(conversionFilterBysearchParams({searchParams: searchParamValues}))
        const res = searchParamRes.payload;
        if(res?.responseCode === 200){
          toast.success(res.responseMessage)
          setClickData(res.responseResult)
          setIsFilter(false)
        }else{
          toast.error(res?.responseMessage);
        }
        console.log(searchParamRes)
    }

    useEffect(()=>{
        console.log('searchParamValues', searchParamValues)
    },[searchParamValues])
    return (
        <>
            <div className="sidebar-filter p-4">
                <span onClick={()=> setIsFilter(false)}><i className="fa-solid fa-xmark fa-lg"></i></span>
                <h4 className="mt-4"><i className="fa-solid fa-filter"></i> Search Filter</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="filter-options d-flex justify-content-between align-items-center">
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub1' name="Sub1" onChange={handleChange}/> Sub1
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub2' name="Sub2" onChange={handleChange}/> Sub2
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='Sub3' name="Sub3" onChange={handleChange} /> Sub3
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">                           
                             <input type="checkbox" value='Sub4' name="Sub4" onChange={handleChange} /> Sub4
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub5' name="Sub5" onChange={handleChange} /> Sub5
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub6' name="Sub6" onChange={handleChange} /> Sub6
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='Sub7' name="Sub7" onChange={handleChange} /> Sub7
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='source' name="Source" onChange={handleChange} /> Source
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub9' name="Sub9" onChange={handleChange} /> Sub9
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub10' name="Sub10" onChange={handleChange} /> Sub10
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='Txn_ID1' name="Txn_ID1" onChange={handleChange} /> Txn_ID1
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID2' name="Txn_ID2" onChange={handleChange} /> Txn_ID2
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID3' name="Txn_ID3" onChange={handleChange} /> Txn_ID3
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID4' name="Txn_ID4" onChange={handleChange} /> Txn_ID4
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='Txn_ID5' name="Txn_ID5" onChange={handleChange} /> Txn_ID5
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID6' name="Txn_ID6" onChange={handleChange} /> Txn_ID6
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID7' name="Txn_ID7" onChange={handleChange} /> Txn_ID7
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID8' name="Txn_ID8" onChange={handleChange} /> Txn_ID8
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='sale_amount' name="sale_amount" onChange={handleChange} />Sale Amount
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_id' name="order_id" onChange={handleChange} /> Order ID
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_value' name="order_value" onChange={handleChange} /> Order Value
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='app_name' name="app_name" onChange={handleChange} /> App Name
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='sale_amount' name="sale_amount" onChange={handleChange} />Sale Amount
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_id' name="order_id" onChange={handleChange} /> Order ID
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID7' name="Txn_ID7" onChange={handleChange} /> Txn_ID7
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID8' name="Txn_ID8" onChange={handleChange} /> Txn_ID8
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='sale_amount' name="sale_amount" onChange={handleChange} />Sale Amount
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_id' name="order_id" onChange={handleChange} /> Order ID
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_value' name="order_value" onChange={handleChange} /> Order Value
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='app_name' name="app_name" onChange={handleChange} /> App Name
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='sale_amount' name="sale_amount" onChange={handleChange} />Sale Amount
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='order_id' name="order_id" onChange={handleChange} /> Order ID
                            </div>
                        </div>
                    </div>
                    <hr onChange={handleChange} />
                    <div className="filter-options d-flex justify-content-between align-items-center">
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Sub1' name="Sub1" onChange={handleChange} /> App ID
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='gaid' name="gaid" onChange={handleChange} /> Gaid
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='idfa' name="idfa" onChange={handleChange} /> IDFA
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='referer' name="referer" onChange={handleChange} /> Referer
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='event_id' name="event_id" onChange={handleChange} /> Event ID
                            </div>
                        </div>
                        <div className="">
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='conversion_ip' name="conversion_ip" onChange={handleChange} /> Conversion IP
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='os_version' name="os_version" onChange={handleChange} /> OS Version
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='os' name="os" onChange={handleChange} /> OS
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='user_agent' name="user_agent" onChange={handleChange} /> User Agent
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='device_id' name="device_id" onChange={handleChange} /> Device ID
                            </div>
                        
                        </div>
                        <div className="">
                        <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='device_version' name="device_version" onChange={handleChange} /> Device Version
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='user_id' name="user_id" onChange={handleChange} /> User ID
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='user_name' name="user_name" onChange={handleChange} /> User Name
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='Txn_ID6' name="Txn_ID6" onChange={handleChange} /> Txn_ID6
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='latitude' name="latitude" onChange={handleChange} /> Latitude
                            </div>
                        </div>
                        <div className="">
                        <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='longitude' name="longitude" onChange={handleChange} /> Longitude
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='android ID' name="android ID" onChange={handleChange} />Android ID
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='android_version' name="android_version" onChange={handleChange} /> Android Version
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='advertiser_name' name="advertiser_name" onChange={handleChange} /> Advertiser Name
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='user_type' name="user_type" onChange={handleChange} /> User Type
                            </div>
                            {/* <div className="d-flex justify-content-start align-items-center gap-2 mb-2"> 
                                <input type="checkbox" value='ip' name="ip" onChange={handleChange} />IP
                            </div>
                            <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                                <input type="checkbox" value='event_name' name="event_name" onChange={handleChange} /> Event Name
                            </div> */}
                        </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-end align-item-center gap-2 mt-2">
                        <button className="btn btn-primary" type="submit">Apply</button>
                        <button className="btn btn-success" onClick={handleClear} type='button'>Clear</button>
                        <button className="btn btn-secondary" onClick={()=>setIsFilter(false)} type='button'>Close</button>
                    </div>
                </form>
            </div> 
        </>
    )
}

export default ConversionFilter;