import React from "react";
import BASE_URL from "../../../Api/base";
import { toast } from "react-toastify";

const PublisherProfile = ()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const handleGenerateKey = async()=> {
        const response = await fetch(`${BASE_URL}publicher/genreatePublisherKey?partners_Id=${loggedInUser.partners_Id}&publisherId=${loggedInUser.publisherId}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json'
            }
        })
        const res = await response.json();
        if(res.responseCode === 200){
            toast.success('Key generated successfully');
            // localStorage.setItem('userData', JSON.stringify(loggedInUser));
        }else{
            toast.error(res.responseMessage)
        }
    }
    return (
        <>
        <div className='page_sec pt-3'>
            <div className="container">
          <div className="prifile-wrap">
            <div className="">
                <div className="profile-card col-lg-6">
                <div class="d-flex pb-2 justify-content-between align-item-center border-b"><h4 class="mb-0">Publisher Details</h4><div><button className="btn btn-outline-secondary">Edit</button></div></div>
                    <div className="generateKey text-end pt-2">
                        <button className="btn btn-primary" onClick={handleGenerateKey}>Generate Key</button>
                    </div>
                    <div className="userImage mt-2">
                        <img src={loggedInUser.headerImage} alt="user-img"></img>
                    </div>
                    <div className="userDetail mt-3">
                    <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>ID</b></p>
                            <p>{loggedInUser.publisherId}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Name</b></p>
                            <p>{loggedInUser.firstName} {loggedInUser.lastName}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Email</b></p>
                            <p>{loggedInUser.email}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Address</b></p>
                            <p>{loggedInUser.city}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Phone</b></p>
                            <p>{loggedInUser.mobileNumber}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Manager</b></p>
                            <p>(ID: {loggedInUser.managerId}) {loggedInUser.managerName}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>Company Name</b></p>
                            <p> {loggedInUser.companyName}</p>
                        </div>
                        <div className="d-flex justify-content-start align-items-center">
                            <p className="userTitle"><b>API Key</b></p>
                            <p> {loggedInUser.key}</p>
                        </div>
                    </div>
                
                </div>
            </div>
          </div>
          </div>
        </div>
        </>
    )
}

export default PublisherProfile;