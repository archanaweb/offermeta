import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfferList, offerActive, offerInactive } from "../../../Redux/OffersSlice";
import { toast } from "react-toastify";
import TablePagination from "../../../components/Pagination";

const PublisherOffers = ()=> {
    const [totalPage, setTotalPage] = useState(1);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')
    const adminUser = JSON.parse(localStorage.getItem('userData'));
    const adminPartner = adminUser.partners_Id
    const adminOffers = useSelector((state)=> state.offers.list)
    const dispatch = useDispatch()

    const handleStatus = async(offer)=>{
      const offerStatus = offer?.status
      if(offerStatus === "INACTIVE"){
        const offerActiveResponse = await dispatch(offerActive({
          partners_Id: adminPartner,
          offerId: offer._id
        }));
        const res = offerActiveResponse.payload;
        if(res?.responseMessage === "offer ACTIVE successfully"){
          dispatch(fetchOfferList(adminPartner));
          toast.success(res?.responseMessage)
        }else{
          toast.error(res?.responseMessage);
        }
      }
      if(offerStatus === "ACTIVE"){
      const offerInactiveResponse = await dispatch(offerInactive({
        partners_Id: adminPartner,
        offerId: offer._id
      }));
      const res = offerInactiveResponse.payload;
      console.log("status res",res)
      if(res?.responseMessage === "offer INACTIVE successfully"){
        dispatch(fetchOfferList(adminPartner));
        toast.success(res?.responseMessage)
      }else{
        toast.error(res?.responseMessage);
      }
    }
    }
    const handleFetchOfferList = async()=> {
      const offerListRes = await dispatch(fetchOfferList({partners_Id:adminUser.partners_Id,currentPage:getCurrentPage}));
      const res = offerListRes.payload
      setTotalPage(res.totalPages)
    }
    useEffect(()=> {
      handleFetchOfferList()
    },[])
    useEffect(()=> {
      handleFetchOfferList()
    },[getCurrentPage])
    return (
        <>
            <div className='page_sec pt-3'>
                        <div className="container">
            <div className="table-container">
              <div className="row d-flex justify-content-between align-items-center mb-3">
                <div className="col-lg-4">
                  <input className="form-control w-100"
                    type="text"
                    placeholder="Search..."
                  />
              </div>
                  {/* <button type="button" className="btn btn-primary"><Link to='../offerApproved'>My Offer</Link></button> */}
            </div>
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>THUMBNAIL</th>
                    <th>NAME</th>
                    <th>STATUS</th>
                    <th>Objective</th>
                    <th>Package Name</th>
                    <th>CATEGORY</th>
                    <th>Geo</th>
                    <th>PAYOUT</th>
                    <th>VISIBILITY</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOffers
                    ?.map((click) => (
                      <tr key={click.id}>
                        <td>{click.offerId}</td>
                        <td>
                          {click.image && <img src={click.image} alt={click.title} style={{ width: "40px"}} />}
                        </td>
                        <td>
                          <Link to={`../offer/${click.offerId}`}>{click.title}</Link>
                        </td>
                        <td onClick={()=> handleStatus(click)}><span className={click?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{click?.status}</span></td>
                        {/* <td>{`${click.advertiserFirstName} ${click.advertiserLastName}`}</td> */}
                        <td>{click.event[0]?.eventType}</td>
                        <td>{click.packageName}</td>
                        <td>{click.category}</td>
                        <td>{click.landingPage[0].geoAllowed}</td>
                        <td>{click.event[0]?.payout}</td>
                        {/* <td>{click.event[0].revenue}</td> */}
                        <td><button className={click?.privacyLavel === "Required Aprooval" ? 'btn btn-danger btn-sm' : 'btn btn-success btn-sm'}>{click?.privacyLavel}</button></td>
                      </tr>
                    ))}
                </tbody>
              </table>
              </div>
              <TablePagination totalPage={totalPage} path='/publisher/offers' />
            </div>
         
            </div>
            </div>
           </>
    )
}

export default PublisherOffers