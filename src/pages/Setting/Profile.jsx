import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { editProfile, uploadProfileImg } from "../../Redux/ProfileSlice";

const Profile = ()=>{
    const loggedInUser = JSON.parse(localStorage.getItem('userData'))
    const [editable, setEditable] =  useState(false)
    const [formData, setFormData] = useState({})
    const [profileImg, setProfileImg] = useState()
    const dispatch = useDispatch()

    const handleEdit = ()=> {
        setEditable(true)
        setFormData({...loggedInUser, ...formData})
    }

    const handleInput = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value})
        console.log('formDta', formData)
    }

    const handleSubmit = async(e)=> {
        e.preventDefault()
        const editResponse = await dispatch(editProfile({
            partners_Id : loggedInUser._id,
            formData
        }))
        const res = editResponse.payload;
        if(res?.responseCode === 200){
            toast.success(res?.responseMesage)
            setEditable(false)
            localStorage.setItem('userData', JSON.stringify(res.responseResult))
        }else{
            toast.error(res?.responseMesage || 'something went wrong');
        }
    }
    const handleProfileChange = (e)=> {
        setProfileImg(e.target.files[0])
    }
    const saveProfilePic = async(e)=> {
        e.preventDefault()
        const form = new FormData();
        form.append('partners_Id', loggedInUser._id);
        form.append('image', profileImg);
       const uploadProfileRes =  await dispatch(uploadProfileImg(form))
       const resMessage = uploadProfileRes.payload
       console.log('uploadProfileRes',uploadProfileRes)
       if(resMessage?.responceCode === 200){
        toast.success(resMessage.resposneMessage)
        setEditable(false)
        localStorage.setItem('userData', JSON.stringify(resMessage.responsResult))
       }else(
        toast.error(resMessage.responsMessage)
       ) 
    }


    return (
        <>
        <div className='page_sec pt-3'>
        <div className="container">
            <div className="prifile-wrap container-fluid">
                <div className="row">
                    <div className="profile-card col-lg-6">
                    <div class="d-flex pb-2 justify-content-between align-item-center border-b">
                        <h4 class="mb-0">Partner Account</h4>
                    <div>
                        {editable ? <div><button className="btn btn-outline-secondary" onClick={()=> setEditable(false)}>Cancel</button>  </div>: <button className="btn btn-outline-secondary" onClick={handleEdit}>Edit</button>}
                    </div>
                        </div>
                        <div className="userImage mt-2">
                            <form onSubmit={saveProfilePic}>
                                <div className="d-flex justify-content-start align-items-center gap-2">
                                <p className="userTitle"> <img src={loggedInUser.image} alt="user-img" style={{width: '50px'}}></img></p>
                                    {editable && <> <input class="form-control" type="file" id="profile-img" accept="image/*" required onChange={handleProfileChange}/> <button type="submit" className="btn btn-outline-secondary btn-sm">Save</button> <hr /></>}
                                </div>
                            </form>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className="userDetail mt-3">
                        {!editable && <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Partner ID</b></p>
                                <p>{loggedInUser._id}</p>
                            </div>}
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Name</b></p>
                                {!editable?
                                <p>{loggedInUser.name}</p> :
                                <input className="form-control" type="text" name="name" value={formData?.name} onChange={(e)=>handleInput(e)} />
                            }
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Email</b></p>
                                {!editable ? 
                                <p>{loggedInUser.email}</p> :
                                <input className="form-control" type="text" name="email" value={formData?.email} onChange={(e)=>handleInput(e)} />
                                }
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Address</b></p>
                            {!editable ?
                                <p>{loggedInUser.address}</p> :
                                <input className="form-control" type="text" name="address" value={formData?.address} onChange={(e)=>handleInput(e)} />
                                }
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Phone</b></p>
                                {!editable ? 
                                <p>{loggedInUser.mobileNumber}</p> :
                                <input className="form-control" type="text" name="mobileNumber" value={formData?.mobileNumber} onChange={(e)=>handleInput(e)} />
                                }
                            </div>
                            <div className="d-flex justify-content-start align-items-center">
                                <p className="userTitle"><b>Skype ID</b></p>
                                {!editable ? 
                                <p>{loggedInUser.skypeId}</p> :
                                <input className="form-control" type="text" name="skypeId" value={formData?.skypeId} onChange={(e)=>handleInput(e)} />
                                }
                            </div>
                        </div>
                        <div className="mt-2">
                        {editable && <button type="submit" className="btn btn-primary"> Save</button>}
                        </div>
                        </form>
                    
                    </div>
                </div>
            </div>
          </div>
          </div>
        </>
    )
}

export default Profile;