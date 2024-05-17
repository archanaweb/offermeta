import React, { useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from "react-router-dom";
import profile from '../../../assets/images/avtar.png'
import dashboardImg from '../../../assets/images/dashboard.png'

const AdvertiserNavbar = ()=> {
    const [isLogout, setIsLogout] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const openDropdown = ()=> {
        setIsLogout(!isLogout)
      }
    const logoutUser = ()=> {
        localStorage.removeItem("userData");
        navigate("/v2/login")
      }
    return (
        <>
    <Navbar bg="light" data-bs-theme="light">
        <Container>
          <div></div>
          <div className='right-nav'>
              <div className="profile" onClick={openDropdown}>
                <img src={profile} alt="Profile" className="profile-image" />
              </div>
              {isLogout && 
              <div className='profile_option' ref={dropdownRef}>
                <button onClick={logoutUser}>Logout</button>
              </div>
              }
            </div>
        </Container>
      </Navbar>
        </>
    )
}
export default AdvertiserNavbar;