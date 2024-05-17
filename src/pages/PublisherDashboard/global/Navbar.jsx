import React, { useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from "react-router-dom";
import profile from '../../../assets/images/avtar.png'

const PublisherNavbar = ({setLogggedInUser})=> {
    const [isLogout, setIsLogout] = useState(false)
    const dropdownRef = useRef(null);
    const navigate = useNavigate()

    const openDropdown = ()=> {
        setIsLogout(!isLogout)
      }
      const handleClickOutside = (e)=> {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
          setIsLogout(false);
        }
      }
    const logoutUser = ()=> {
        localStorage.removeItem("userData");
        setLogggedInUser(null);
        navigate("/login")
      }
      useEffect(()=> {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      },[])
    return (
        <>
        <div className="navbar-container p-0">
    <Navbar>
        <Container>
          <div></div>
          <div className='right-nav'>
              <div className="profile" onClick={openDropdown}>
                <img src={profile} alt="Profile" className="profile-image cursor-pointer" />
              </div>
              {isLogout && 
              <div className='profile_option' ref={dropdownRef}>
                 <ul>
                  <li><button><Link to='publisher/profile'>Profile</Link> </button></li>
                  <li><button onClick={logoutUser}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button></li>
               </ul>
              </div>
              }
            </div>
        </Container>
      </Navbar>
      </div>
        </>
    )
}
export default PublisherNavbar;