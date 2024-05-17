import React, { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import profile from '../../../assets/images/avtar.png'

const ManagerNavbar = ({setLogggedInUser})=> {
    const [isLogout, setIsLogout] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()
    const manager = JSON.parse(localStorage.getItem('userData'))

    const handleOutsideClick = (e)=> {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLogout(false);
      }
    }
    const openDropdown = ()=> {
        setIsLogout(!isLogout)
      }
    const logoutUser = ()=> {
        localStorage.removeItem("userData");
        setLogggedInUser(null);
        navigate("/login")
      }
      useEffect(()=>{
        document.addEventListener('mousedown', handleOutsideClick)
        return()=> {
          document.removeEventListener('mousedown', handleOutsideClick)
        }
      },[])
    return (
        <>
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <div></div>
          <div className='right-nav'>
              <div className="profile d-flex justify-content-between align-items-center gap-2" onClick={openDropdown}>
                <p className="mb-0">{manager?.name}</p>
                <img src={profile} alt="Profile" className="profile-image" />
              </div>
              {isLogout && 
              <div className='profile_option' ref={dropdownRef}>
                <ul>
                  <li><button><Link to='/affiliates/manager/profile'>Profile</Link> </button></li>
                  <li><button onClick={logoutUser}>Logout</button></li>
                </ul>
              </div>
              }
            </div>
        </Container>
      </Navbar>
        </>
    )
}
export default ManagerNavbar;