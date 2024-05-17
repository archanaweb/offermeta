import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublisherList } from "../../../Redux/PublisherSlice";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const BlockPublisher = ({offerId})=> {
    const [Loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const loggedIn = JSON.parse(localStorage.getItem('userData'))
    const [blockedPub, setBlockedPub] = useState([])
    const pubList  = useSelector((state)=> state.publisher.list)
    const [pubId, setPubId] = useState()
    const dispatch = useDispatch()

    const handleChange = (e)=>{
        setPubId(e.target.value)
        const loggedIn = JSON.parse(localStorage.getItem('userData'))
        setFormData({partners_Id: loggedIn._id , publisherId: e.target.value, offerId})
    }
    const handleBlockPublisher =async()=> {
        const blockPubRes = await fetch(`${BASE_URL}publisherApproved/blockPublisher`, {
            method: 'POST',
            headers: {
                'accept': 'application/json'
            },
            body: new URLSearchParams(formData)
        })
        const res = await blockPubRes.json()
        if(res.resposneCode === 200){
            toast.success(res.resposneMessage)
            FetchBlockPublisher()
        }else {
            toast.error(res.resposneMessage)
        }
    }
    const FetchBlockPublisher = async()=>{
        setLoading(true)
        try {
            const blockPubListRes = await fetch(`${BASE_URL}publisherApproved/blockPublisherList?partners_Id=${loggedIn._id}`)
            const res = await blockPubListRes.json()
            setBlockedPub(res.resposneResult)
            setLoading(false)
        }catch(error) {
            console.log('something went wrong', error)
            setLoading(false)
        }
    }
    const handlePubUnblock = async(item)=>{
        const pubUnblockRes = await fetch(`${BASE_URL}publisherApproved/unblockedPublisher`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json'
            },
            body: new URLSearchParams({
                'partners_Id': loggedIn._id,
                'Id': item.Id
            })
        });
        const res = await pubUnblockRes.json()
        if(res.resposneCode === 200){
            toast.success(res.resposneMessage)
            FetchBlockPublisher()
        } else {
            toast.error(res.resposneMessage)
        }
    }

    useEffect(()=>{
        FetchBlockPublisher()
        dispatch(fetchPublisherList(loggedIn._id))
    },[])
    return(
        <>
        <div className="py-2 px-2">
            <div className="block-pub">
                <div className="form-group">
                    <label htmlFor="publisherBlock">Select Publisher for Block</label>
                    <select className="form-control" name="publisherBlock" onChange={handleChange}>
                        <option value='' hidden>Select</option>
                        {pubList?.map((item)=> <option value={item.publisherId} key={item.publisherId}>(ID: {item.publisherId}) {item.firstName} {item.lastName}</option>)}
                    </select>
                    <button className="btn btn-primary mt-2" onClick={handleBlockPublisher}>Block</button>
                </div>
            </div>
            <div className="table-responsive event-table mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Publisher</th>
                            <th>Offer</th>
                            <th>Created At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                  {Loading ? <tbody>
                    <tr>
                      <td colSpan={4}>
                      <div className='spinner'>
                        <Spinner animation="border" />
                      </div>
                      </td>
                    </tr>
                    </tbody> : 
                    <tbody>
                    {blockedPub?.map((item, index)=> <tr>
                            <td>{item.Id}</td>
                            <td>(ID: {item?.publisherId}) {item?.publisher_First_name} {item?.publisher_Last_name}</td>
                            <td>(ID: {item?.offerId}) {item?.offerName}</td>
                            <td>{item?.createdAt}</td>
                            <td>{item?.updatedAt}</td>
                            <td><button className="btn btn-primary" onClick={()=> handlePubUnblock(item)}>Unblock</button></td>
                        </tr>)}
                    </tbody>}
                </table>
            </div>

        </div>

        </>
    )
}
export default BlockPublisher