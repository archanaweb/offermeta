import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { createIpAddress, deleteIpAddress, fetchIpList } from "../../../Redux/IpSlice";
import { fetchAdvertiserDetails } from "../../../Redux/AdvertiserSlice";

const IpList = ({advertiserId})=> {
    const ipList = useSelector((state)=> state.ipaddress.list)
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const advertiserDetail = useSelector((state)=> state.advertiser.detail)
    const [formData, setFormData] =  useState({partners_Id: LoggedInUser._id, advertiserId})
    const dispatch = useDispatch();

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleDelete = async(item)=> {
        console.log('ipAddress'. item)
        const ipDeleteRes = await dispatch(deleteIpAddress({ipAddress:item.ipAddress, partners_Id: LoggedInUser._id, advertiserId}))
        const res = ipDeleteRes.payload;
        if(res.responseCode === 200){
            toast.success(res.responseMessage)
            dispatch(fetchAdvertiserDetails({partners_Id: LoggedInUser._id, advertiserId}))
          }else(
            toast.error(res.responseMessage)
          )
         
    }
    const handleAddIp = async()=> {
        const addIpAddressRes = await dispatch(createIpAddress(formData))
        const res = addIpAddressRes.payload
        console.log('addIpAddressRes', res)
        if(res.responseCode === 200){
          toast.success(res.responseMessage)
          dispatch(fetchAdvertiserDetails({partners_Id: LoggedInUser._id, advertiserId}))
        }else(
          toast.error(res.responseMessage)
        )
      } 
      useEffect(()=> {
        dispatch(fetchIpList({partners_Id: LoggedInUser._id, advertiserId}))
      },[advertiserDetail])
      useEffect(()=> {
        dispatch(fetchAdvertiserDetails({partners_Id: LoggedInUser._id, advertiserId}))
      },[])
    return (
        <div className="offersData mt-4">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
                    <h3>IP Address</h3>
        </div>
        <form>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <input name='ipAddress' type="text" value={formData.ipAddress} onChange={handleChange} className="form-control w-50" placeholder="IP Address"/>
                <button type='button' className="btn btn-outline-secondary btn-sm" onClick={handleAddIp}>Add</button>
            </div>
            <p className="text-secondary px-4">Example: 127.00.001</p>
        </form>

        <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">Id</th>
                        <th className="text-center">Ip address</th>
                        <th className="text-center">Action</th>
                    </tr>
                </thead>
                <tbody>
                {ipList?.map((item)=> <tr>
                        <td className="text-center">{item?._id}</td>
                        <td className="text-center">{item?.ipAddress}</td>
                        <td className="text-center"><button className='border-0' type='button' onClick={()=>handleDelete(item)}><i className="fa-regular fa-trash-can text-danger px-2 py-2 bg-light rounded"></i></button></td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </div>
            )
}
export default IpList;