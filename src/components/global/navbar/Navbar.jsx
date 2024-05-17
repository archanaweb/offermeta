import React, { useState, useEffect, useRef } from 'react';
import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import ShortcutModal from '../../ShortcutModal';

const Navbar = ({setLogggedInUser}) => {
  const dropdownRef = useRef(null);
  const [isLogout, setIsLogout] = useState(false)
  const user = JSON.parse(localStorage.getItem("userData"));
  const navigate = useNavigate();

  const logoutUser = ()=> {
    localStorage.removeItem("userData");
    setLogggedInUser(null);
    navigate("/login")
  }

  const openDropdown = ()=> {
    setIsLogout(!isLogout)
  }

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLogout(false);
      }
    }
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

  return (
    <div className='top_navbar'>
    <div className="navbar-container">
      <div className="navbar-box">
        <nav className="">
            <div className='left-nav'>
              <div className="search-bar text-dark">
                <button className='btn modal-btn'
                  type="button"
                  onClick={handleButtonClick}
                >
                  <span>
                    <i className="fa-solid fa-arrow-up-right-from-square"></i>
                  </span>
                  <span>Shortcuts</span>
                </button>
                <ShortcutModal
                  show={isPopupOpen}
                  onHide={() => setPopupOpen(false)}
                />
              </div>
            </div>
            <div className='right-nav'>
              <div className="profile gap-1" onClick={openDropdown}>
                <img src={user?.image} alt="Profile" className="profile-image" />
                <p className='mb-0'>{user?.name}</p>
              </div>
              {isLogout && 
              <div className='profile_option' ref={dropdownRef}>
                <ul>
                  <li>
                <button><Link to='/setting/profile'>Profile</Link> </button></li>
                  <li><button onClick={logoutUser}><i className="fa-solid fa-arrow-right-from-bracket"></i> Logout</button></li>
                </ul>
              </div>
              }
            </div>
        </nav>
      </div>
    </div>
  
</div>
  );
};

export default Navbar;

