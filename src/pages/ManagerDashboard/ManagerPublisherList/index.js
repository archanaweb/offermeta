import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchManagerPublisherList } from "../../../Redux/ManagerSlice";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";

const ManagerPublisherList = ({setLogggedInUser})=> {
    const managerLoggedIn = JSON.parse(localStorage.getItem('userData'))
    const managerPubList = useSelector((state)=> state.manager.publisherList)
    const dispatch = useDispatch() 
    const navigate = useNavigate()

    const downloadItem = async ()=> {
      const res = await fetch(BASE_URL + `manager/dataExport?publisherManagerId=${managerLoggedIn._id}`,{
        headers: {
          'accept': 'application/json'
      }
      });
      const contentType = res.headers.get('content-type');
      let fileExtension = '';
      const contentDisposition = res.headers.get('content-disposition');
      if (contentDisposition) {
        const match = contentDisposition.match(/filename="(.+?)"/);
        if (match) {
          const fileName = match[1];
          const parts = fileName.split('.');
          if (parts.length > 1) {
            fileExtension = parts.pop();
          }
        }
      }

      const rspBlob = await res.blob().then((blob) => ({
        blob,
        contentType,
        fileExtension
      }));

      const fileName = `downloaded_file.${rspBlob.fileExtension}`;
      const a = document.createElement('a');
      a.href = URL.createObjectURL(rspBlob.blob);
      a.download = fileName;
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  }

  const handlePublisherLogin = async(id)=> {
    const publisherId = id?.publisherId;
    console.log(publisherId)
      const response = await fetch(`${BASE_URL}publicher/publisherLoginById?partners_Id=${managerLoggedIn?.partners_Id}&publisherId=${publisherId}`, {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/x-www-form-urlencoded'
        }
      })
      const resData = await response.json()
      if(resData.responseCode === 200){
        toast.success(resData.responseMessage)
      }else (
        toast.error(resData.responseMessage)
      )
      const user = localStorage.setItem('userData', JSON.stringify(resData.responsResult));
      setLogggedInUser(user)
      navigate('/publisher/dashboard');
      console.log("publisherLogin",resData)
  }

    useEffect(()=>{
        dispatch(fetchManagerPublisherList({partners_Id:managerLoggedIn.partners_Id,managerId: managerLoggedIn.managerId}))
    },[])
    return (
        <>
            <div className='page_sec'>
              <div className="container">
                <div className='container_table'>
        <div className="table-container">
          <div className="row">
            <div className="col-lg-12 d-flex justify-content-between align-items-center mb-3">
              <input className="form-control"
                type="text"
                placeholder="Search..."
              />
              <div className="d-flex justify-content-between align-items-center gap-4">
              <div onClick={downloadItem}><i className="fa-solid fa-download"></i></div>
              <Link to="../addpublisher" className="btn btn-secondary btn-lg addData"><i className="fa-solid fa-plus me-2"></i>Create publisher</Link>
              
              </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Publisher Name</th>
                <th>Mobile Number</th>
                <th>Company Name</th>
                <th>Country</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {managerPubList ? managerPubList
                ?.map((click) => (
                <tr key={click._id}>
                        <td>{click.publisherId}</td>
                        <td><Link to={`../publisherdata/${click.publisherId}`}>{click.firstName} {click.lastName}</Link></td>
                        <td>{click.mobileNumber}</td>
                        <td>{click.companyName}</td>
                        <td>{click.country}</td>
                        <td>{click.street}</td>
                        <td>
                      <button className="btn btn-secondary btn-sm sign-btn" onClick={()=>handlePublisherLogin(click)}>Sign In</button>
                      </td>
                </tr>
                )) : <tr><td colSpan={4}>Data not found</td></tr>}
            </tbody>
          </table>
          </div>
        </div>
                </div>
            </div>
            </div>
        </>
    )
}

export default ManagerPublisherList;