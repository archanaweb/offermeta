import React, { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './navbarlog.css';
import { useLocation } from "react-router-dom";

const Navbar = ({username}) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const currentPage = location.pathname.split("/").pop();

  // Capitalize the current page name
  const currentPageCapitalized = currentPage.charAt(0).toUpperCase() + currentPage.slice(1);

  return (
    <div className="navbar-container">
      <div className="navbar-box">
        <nav className="navbar d-flex justify-content-between align-items-center">
          <div className='row'>
            <div className='col-8'>
              <div className="search-bar text-dark">
              </div>
            </div>
            <div className='col-3'>
              <div className="profile">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkHjLeC6ZaiEuv0sqrBOs17qKWeGxkXWDiuuAfsSPJk-LyQI-XmSwRP-iaK5_f0Aek50&usqp=CAU" alt="Profile" className="profile-image" />
              </div>
            </div>
          </div>
        </nav>
      </div>


      <nav className="navbar d-flex justify-content-between align-items-center">
        <div className="sear">
          <div className="search-bar text-dark">
          {currentPageCapitalized}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

