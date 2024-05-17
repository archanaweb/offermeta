import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageTitle from "../PageTitle";
import Navbar from "../navbar";
import Sidebar from "../Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { deletePostBack, fetchPostBackList } from "../../Redux/PostBackSlice";
import { toast } from "react-toastify";
import { Dropdown, DropdownButton, Pagination } from "react-bootstrap";

const PostBackManagement = ()=> {

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const loggedUser = JSON.parse(localStorage.getItem('userData'))
    const postback = useSelector((state)=> state.postback)
    const dispatch = useDispatch()
    useEffect(()=> {
        console.log("postback list>>>>>>>>>",postback)
    },[postback])

    const fetchPostBack = async ()=> {
        const postbackResponse = await  dispatch(fetchPostBackList(loggedUser._id));
        const res = postbackResponse.payload;
        if(res?.resposneCode === 200){
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
      const deleteResponse = await  dispatch(deletePostBack(postback._id));
        const res = deleteResponse.payload;
        if(res?.resposneCode === 200){
          dispatch(fetchPostBackList());
          toast.success(res?.resposneMessage)
        }else{
          toast.error(res?.resposneMessage);
        }
        console.log(deleteResponse)
    }

    useEffect(()=> {
        fetchPostBack()
    },[])

    const paginate = (pageNumber) => {
      setCurrentPage(pageNumber);
    };

    return (
        <>
         <div className='Container_card'>
      <Sidebar>
        <Navbar />
        <div className='page_sec'>
          <PageTitle />
        <div className="table-container">
        <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
              <input className="form-control"
                type="text"
                placeholder="Search..."
              />
              <Link to="/postbackadd" className="btn btn-secondary"><i className="fa-solid fa-plus me-2"></i>Create Postback</Link>
            </div>
        </div>
        <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Offer</th>
              <th>Publisher</th>
              <th>Status</th>
              <th>Type</th>
              <th>Code</th>
              <th>Postback</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {postback.list?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((click, index) => (
                <tr key={click.id}>
                  <td>{click._id}</td>
                 
                  <td>{click.offerId && <span>(ID: {click.offerId})</span>} {click.offer}</td>
                  <td>{click.publisherId && <span>(ID: {click.publisherId})</span>} {click.publisher}</td>
                  <td><span className="statusBtn">{click.status}</span></td>
                  <td>{click.type}</td>
                  <td>{click.code}</td>
                  <td>
                    <Link to={`/postback/${click._id}`}>{click.postback}
                    </Link>
                   </td>
                  <td> <DropdownButton className="noCarat"
              key="start"
              id={`dropdown-button-drop-start`}
              drop=""
              variant="secondary"
              title={<i class="fa-solid fa-ellipsis-vertical"></i>}
            >
              <Dropdown.Item eventKey="1">
                <Link to={`/postback/${click._id}?edit=1`}>
                  <i class="fa-regular fa-pen-to-square"></i>
                Edit
                </Link>
              </Dropdown.Item>
              <Dropdown.Item eventKey="2" onClick={()=> deleteItem(click)}><i class="fa-solid fa-trash"></i> Delete</Dropdown.Item>
            </DropdownButton></td>
                </tr>
              ))}
          </tbody>
        </table>
        </div>

        <Pagination className="pagination">
          {postback.list?.length > itemsPerPage && (
            <>
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </>
          )}

          {/* Display page numbers */}
          {postback.list?.length > itemsPerPage &&
            Array.from({ length: Math.ceil(postback.list?.length / itemsPerPage) }).map((_, index) => (
              <Pagination.Item
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </Pagination.Item>
            ))}

          {postback.list?.length > itemsPerPage && (
            <>
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(postback.list?.length / itemsPerPage)}
              />
              
            </>
          )}
        </Pagination>
        </div>
        </div>
      </Sidebar>
    </div>
        </>
    )
}
export default PostBackManagement;