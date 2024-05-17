import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchOfferDetail } from "../../Redux/OffersSlice";
import { deleteEvent, fetchEventList } from "../../Redux/EventValueSlice";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";

const EventValueList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [totalPages, setTotalPage] = useState(1)
  let params = new URLSearchParams(document.location.search);
  let offerId = params.get("offerid");

  const eventvalue = useSelector((state)=> state.eventvalue.list);
  const offerDetail = useSelector((state)=> state.offers.detail);
  const dispatch =  useDispatch()
  const LoggedInUser = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    dispatch(fetchOfferDetail(offerId))
    dispatch(fetchEventList({partners_Id: LoggedInUser._id,offerId}))
  },[]);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=> {
    setTotalPage(Math.ceil(eventvalue?.length / itemsPerPage))
  },[eventvalue])

  const deleteItem = async(event)=>{
    if(!window.confirm("Are you want to delete?")){
      return;
    }
    const deleteResponse = await  dispatch(deleteEvent({offerId, eventId: event?._id}));
    console.log("event delete res",deleteResponse)
      const res = deleteResponse.payload;
      if(res?.resposneCode === 200){
        dispatch(fetchEventList({partners_Id: LoggedInUser._id,offerId}));
        toast.success(res?.responseMessage)
      }else{
        dispatch(fetchEventList({partners_Id: LoggedInUser._id,offerId}));
        toast.error(res?.responseMessage);
      }
      console.log(deleteResponse)
  }

  return (
        <div className='page_sec pt-3'>
        {  offerId ?
        <div className="table-container">
            {/* <h3>{offerDetail?.title}</h3> */}

            <div className="row">
              <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
                <input className="form-control w-25"
                  type="text"
                  placeholder="Search..."
                />
                <Link to={`/eventValue/add?offerid=${offerId}`} className="btn btn-secondary"><i className="fa-solid fa-plus me-2"></i>Add Event Value</Link>
              </div>
          </div>
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Event ID</th>
                <th>Event Value </th>
                <th>Event Name </th>
                <th>Objective</th>
                <th>Revenue</th>
                <th>Payout</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {eventvalue?.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item?._id}</td>
                    <td>{item?.eventValue}</td>
                    <td>{item?.eventName}</td>
                    <td>{item?.eventType}</td>
                    <td>{item?.revenue}</td>
                    <td>{item?.payout}</td>
                    <td> <DropdownButton className="noCarat"
                        key="start"
                        id={`dropdown-button-drop-start`}
                        drop=""
                        variant="secondary"
                        title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                      >
                        <Dropdown.Item eventKey="1">
                          <Link to={`/eventValue/edit/${item._id}?offerid=${offerId}`}>
                            <i className="fa-regular fa-pen-to-square"></i>
                          Edit
                          </Link>
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2"><Link onClick={()=> deleteItem(item)}><i class="fa-solid fa-trash"></i> Delete</Link></Dropdown.Item>
                      </DropdownButton>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          </div> :
          <div>Offer Not Found.</div>
          }
           {/* Pagination */}
           <div className="customPagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} 
                onClick={() => handlePageChange(index + 1)} 
                className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
          </div>
          {/*  */}
        </div>
  );
};
export default EventValueList;