import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import TablePagination from "../../../components/Pagination";
import { fetchOfferList } from "../../../Redux/OffersSlice";

const ManagerOferList = ()=> {
  // const [loading, setLoading] = useState(true)
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const managerOfferList = useSelector((state)=> state.offers.list)
    const loading = useSelector((state)=> state.offers.loading)
    const [selectValue, setSelectValue] = useState("");
    const dispatch = useDispatch() ;
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const getCurrentPage = params.get('page')

    const handleSelectChange = (e) => {
      setSelectValue(e.target.value);
    };

    useEffect(()=>{
        dispatch(fetchOfferList({partners_Id:managerLoggedIn.partners_Id, currentPage:getCurrentPage}))
    },[])
    return (
        <>
            <div className='page_sec'>
            <div className='container_table mt-3'>
                
    <div className="table-container">
    <div className="row mb-3">
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <select className="form-control" value={selectValue} onChange={handleSelectChange}>
          <option value="" hidden>Action</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Declined">Declined</option>
          <option value="Cancel">Cancel</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <select className="form-control">
          <option value="">Offer</option>
          <option value="option2">Select Option 2</option>
          <option value="option3">Select Option 3</option>
          <option value="option4">Select Option 4</option>
          <option value="option5">Select Option 5</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <select className="form-control">
          <option value="">Publisher</option>
          <option value="option2">Select Option 2</option>
          <option value="option3">Select Option 3</option>
          <option value="option4">Select Option 4</option>
          <option value="option5">Select Option 5</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <select className="form-control">
          <option value="">Advertiser</option>
          <option value="option2">Select Option 2</option>
          <option value="option3">Select Option 3</option>
          <option value="option4">Select Option 4</option>
          <option value="option5">Select Option 5</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <select className="form-control">
          <option value="">Manager</option>
          <option value="option2">Select Option 2</option>
          <option value="option3">Select Option 3</option>
          <option value="option4">Select Option 4</option>
          <option value="option5">Select Option 5</option>
        </select>
      </div>
      <div className="col-lg-2 col-md-3 col-sm-4 col-6">
        <div className="d-flex justify-content-end">
          <button className="btn btn-primary">Export <i className="fa-solid fa-cloud-arrow-down"></i></button>
        </div>
      </div>
    </div>
    <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Offer</th>
            <th>Objective</th>
            <th>package Name</th>
            <th>Payout</th>
            <th>Category</th>
            <th>status</th>
          </tr>
        </thead>
       {loading ? <tbody><tr><td colSpan={5}><div className="spinner"></div></td></tr></tbody> :
        <tbody>
          {managerOfferList?.map((click) => (
            <tr key={click.publiherId}>
                    <td>{click.offerId}</td>
                    <td><img src={click.image} alt="offer-img" style={{width: '40px'}}/></td>
                    <td><Link to={`../offer/${click.offerId}`}>{click.title}</Link></td>
                    <td>{click?.event[0]?.eventType}</td>
                    <td>{click.packageName}</td>
                    <td>{click?.event[0]?.payout}</td>
                    <td>{click.category}</td>
                    <td><span className={click?.status === "ACTIVE" ? 'statusBtn' : 'statusInactive'}>{click?.status}</span></td>
                    {/* <td>{click.impressionId}</td> */}
            </tr>
            ))}
        </tbody>}
      </table>
      </div>
    </div>
    <TablePagination data={managerOfferList} currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage={itemsPerPage} maxButtons={5} setItemsPerPage={setItemsPerPage}/>
  </div>
            </div>
        </>
    )
}

export default ManagerOferList;