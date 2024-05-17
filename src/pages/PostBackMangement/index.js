import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";
import { deletePostBack, fetchPostBackList } from "../../Redux/PostBackSlice";
import PostbackUrlModal from "../../components/PostbackUrlModal";
import TablePagination from "../../components/Pagination";

const PostBackManagement = ()=> {
    const [showModal, setShowModal] = useState(false);
    const [postbackUrl, setPostbcakUrl] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const loggedUser = JSON.parse(localStorage.getItem('userData'))
    const postback = useSelector((state)=> state.postback)
    const dispatch = useDispatch()
    const [totalPage, setTotalPage] = useState(1);
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')

    const fetchPostBack = async ()=> {
        const postbackResponse = await  dispatch(fetchPostBackList({partnerId: loggedUser._id, currentPage: getCurrentPage}));
        const res = postbackResponse.payload;
        const data = res.responseResult;
        if(res?.responseCode === 200){
          setTotalPage(res.totalPages)
          toast.success(res?.resposneMessage)
        }else{
          toast.error(res?.resposneMessage);
        }
        console.log(postbackResponse)
    }

    const deleteItem = async(postback)=>{
      if(!window.confirm("Are you want to delete?")){
        return;
      }
      const deleteResponse = await  dispatch(deletePostBack({postbackId:postback.postbackId,partners_Id:loggedUser._id,offerId: postback?.offerId}));
        const res = deleteResponse.payload;
        if(res?.responseCode === 200){
          toast.success(res?.responseMessage)
          dispatch(fetchPostBackList({partnerId: loggedUser._id, currentPage: getCurrentPage}));
        }else{
          toast.error(res?.responseMessage);
        }
        console.log(deleteResponse)
    }

    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };
    const handleViewPostback = (click)=> {
      setShowModal(true)
      setPostbcakUrl(click.postback)
    }
    useEffect(()=> {
        fetchPostBack()
    },[])
    useEffect(()=> {
        fetchPostBack()
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
              <div className="col-lg-3 d-flex justify-content-end">
                <Link to="/postbackadd" className="btn btn-outline-primary"><i className="fa-solid fa-user-plus me-2"></i>Create Postback</Link>
              </div>
          </div>
          <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Offer</th>
                <th>Publisher</th>
                <th>Event Value</th>
                <th>Status</th>
                {/* <th>Type</th> */}
                <th>Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {postback.list?.map((click, index) => (
                  <tr key={click.postbackId}>
                    <td>{click.postbackId}</td>
                    <td><Link to={`/postback/${click.postbackId}`}>{click.offerId && <span>(ID: {click.offerId})</span>} {click.offer}</Link></td>
                    <td>{click.publisherId && <span>(ID: {click.publisherId})</span>} {click.publisher}</td>
                    <td>{click.event_value ? click.event_value : 'Global'}</td>
                    <td><span className="statusBtn">{click.status}</span></td>
                    {/* <td><Link to={`/postback/${click.postbackId}`}>{click.type}</Link></td> */}
                    <td><button onClick={()=> handleViewPostback(click)} className="btn text-primary">{click.code}</button></td>
                    <td> <DropdownButton className="noCarat"
                      key="start"
                      id={`dropdown-button-drop-start`}
                      drop=""
                      variant="secondary"
                      title={<i class="fa-solid fa-ellipsis-vertical"></i>}
                    >
                <Dropdown.Item eventKey="1">
                  <Link to={`/postback/${click.postbackId}?edit=1`}>
                    <i class="fa-regular fa-pen-to-square"></i>
                  Edit
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" onClick={()=> deleteItem(click)}><i className="fa-solid fa-trash"></i> Delete</Dropdown.Item>
              </DropdownButton></td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
          {/* Pagination */}
          {/* <div className="customPagination">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button key={index} 
              onClick={() => handlePageChange(index + 1)} 
              className={currentPage === index + 1 ? 'active' : ''}>
                {index + 1}
              </button>
            ))}
          </div> */}
          {/*  */}
          <TablePagination totalPage={totalPage} path='/postback' />
            <PostbackUrlModal show={showModal} onHide={() => setShowModal(false)} postbackUrl={postbackUrl} handleViewPostback={handleViewPostback}/>
          </div>
          </div>
          </div>
        </>
    )
}
export default PostBackManagement;