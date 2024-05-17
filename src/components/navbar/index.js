import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import './navbar.css';
import BoxComponent2 from '../offers/viewdata/postback';
import { Link, useLocation, useNavigate } from "react-router-dom";
import profile from '../../assets/images/avtar.png'
import ShortcutModal from '../ShortcutModal';
import BASE_URL from '../../Api/base';
import { toast } from 'react-toastify';

const Navbar = () => {

  const dropdownRef = useRef(null);
  const [isLogout, setIsLogout] = useState(false)
  const user = JSON.parse(localStorage.getItem("userData"));
  const location = useLocation();
  const [selectedOption, setSelectedOption] = useState('');
  const [showInputFields, setShowInputFields] = useState(false);
  const navigate = useNavigate();

  const logoutUser = ()=> {
    localStorage.removeItem("userData");
    navigate("/login")
  }

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setShowInputFields(true);
  };  
  const openDropdown = ()=> {
    setIsLogout(!isLogout)
  }

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleButtonClick = () => {
    setPopupOpen(!isPopupOpen);
  };

  // useEffect(() => {
  //   fetchOptionsFromAPI();
  // }, []);

  // const fetchOptionsFromAPI = () => {
  //   fetch('apiEndpoint')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setOptions(data); // Assuming the API response is an array of objects with 'value' and 'label'
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // };
  const [options, setOptions] = useState([
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    // Add more options as needed
  ]);

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

    // const uploadProfile = async ()=> {
    //   const response = await fetch(BASE_URL + 'subAdmin/uploadImage')
    //   const resMessage = await response.json()
    //   if(resMessage.responseCode === 200){
    //     toast.success(resMessage.responseMessage)
    //   }
    // }

  return (
    <div className='top_navbar'>
    <div className="navbar-container">
      <div className="navbar-box">
        <nav className="">
            <div className='left-nav'>
              <div className="search-bar text-dark">
                <button className='btn modal-btn'
                  type="Integration"
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
                {/* Popup content */}
                {/* {isPopupOpen && (
                <div className='shortcutPopup-content'>
                  <div className='popup-header'>
                  <h3>Shortcuts</h3>
                  <i class="fa-regular fa-circle-xmark" onClick={handleButtonClick}></i>
                  </div>
                  <div className='popup-body'>
                    <p>Login as</p>
                    <div className='shortcutTabs'>
                      <ul>
                        <li>Affiliate</li>
                        <li>Advertiser</li>
                        <li>Enter ID</li>
                      </ul>
                    </div>
                    <p>Search</p>
                    <div className='shortcutTabs'>
                      <ul>
                        <li>Offer</li>
                        <li>Affiliate</li>
                        <li>Enter ID</li>
                      </ul>
                    </div>
                    <p>Action</p>
                    <div className='shortcutTabs'>
                      <button className='btn'> Add offer <i class="fa-solid fa-arrow-right"></i></button>
                      <button className='btn'> Add Affiliate <i class="fa-solid fa-arrow-right"></i></button>
                  </div>
                  
                </div>
                </div>
                )} */}

              </div>
            </div>
            <div className='right-nav'>
              <div className="profile gap-1" onClick={openDropdown}>
                <img src={user?.image} alt="Profile" className="profile-image" />
                <p className='mb-0'>{user.name}</p>
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

