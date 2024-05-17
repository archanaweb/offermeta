import React, { useState, useEffect } from 'react';
import {
  FaTh,
  FaBars,
  FaUserNurse,
  FaChartLine,
  FaEye,
  FaBeer,
  FaBullhorn,
  FaUserTie
} from "react-icons/fa";
import { FaArrowUpRightDots, FaMoneyBills } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { MdOutlineSettingsSuggest } from "react-icons/md";
import { FiGrid ,FiBook} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../../../components/sidebar.css';
import logo from '../../../assets/images/logo2-1.png';
import defaultLogo from '../../../assets/images/default-logo.png';
import hexalogo from '../../../assets/images/hexa-logo-transparent.png';
import SubMenuItem from './SubMenuItem';
import { useDispatch, useSelector } from "react-redux";
import { fetchPartnerUserData } from '../../../Redux/DomainSlice';
import managerProfile from '../../../assets/images/manager_profile.jpeg'
import { fetchManagerDetail } from '../../../Redux/ManagerSlice';

const PublisherSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarBg = localStorage.getItem('bgColorSidebar')
  const userDomain = localStorage.getItem('userDomainName')
  const loggedIn = JSON.parse(localStorage.getItem('userData'))
  const currentDomain = window.location.hostname;
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.headerImage;
  const managerDetail = useSelector((state)=> state.manager.detail)
  const dispatch = useDispatch()

  const menuItem = [
    {
      path: "publisher/dashboard",
      name: "Dashboard",
      icon: <FiGrid />
    },
    {
      name: "Offer",
      icon: <FaBullhorn />,
      submenu : [
        {
          path: "publisher/offers",
          name: "All offers",
        },
        {
          path: "publisher/offerApproved",
          name: "Approved offers",
        }
      ]
    },
    {
      path: "publisher/performance",
      name: "Performance",
      icon: <FaArrowUpRightDots/> 
    },
    {
      path: "publisher/conversion",
      name: "Conversion",
      icon: <FaChartLine />
    },
    {
      path: "publisher/impression",
      name: "Impression",
      icon: <MdAutoGraph />
    },
    {
      path: "publisher/payments",
      name: "Payments",
      icon: <FaMoneyBills />
    },
  
    {
      name: "Accounts",
      icon: <MdOutlineSettingsSuggest />,
      submenu : [
        {
          path: "publisher/api_key",
          name: "API",
        },
        {
          path: "publisher/profile",
          name: "Profile",
        },
        {
          path: "publisher/postback",
          name: "Postback",
        }
      ]
    },
    // {
    //   path: "publisher/profile",
    //   name: "Manager",
    //   icon: <FaUserTie />
    // },
  ];

  useEffect(() => {
    dispatch(fetchPartnerUserData(currentDomain))
    dispatch(fetchManagerDetail({partners_Id: loggedIn?.partners_Id, managerId: loggedIn?.managerId}))
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const heandleSubMenuClick = (id) =>{
    if(id === activeSubMenu){
      setActiveSubMenu(null);
    }else{
      setActiveSubMenu(id);
    }
  }

  return (
      <div style={{ width: isOpen ? "var(--sidebarOpn-width)" : "var(--sidebarCls-width)",backgroundColor:sidebarBg}} className="sidebar">
        <div className="top_section">
            <img style={{ display: isOpen ? "flex" : "none" }} 
              src={mainLogo ? mainLogo : defaultLogo}
              alt="Profile"
              className={userDomain === 'hexamobi' ? 'logo-image hexalogo-image' : 'logo-image'}
            />
          <div style={{ marginLeft: isOpen ? "25px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            className='menu-wrapper'
            key={index}
          >
            {item.submenu ? (
             <SubMenuItem 
             isOpen={isOpen} 
             item={item} 
             id={index}
             isActive={activeSubMenu === index} 
             heandleSubMenuClick={heandleSubMenuClick}
             />
            ) : (
              <NavLink
                to={item.path}
                className="link"
              >
                <div className={`icon ${isOpen ? "show" : ""}`}>{item.icon}</div>
                {isOpen && <div className="link_text">{item.name}</div>}
              </NavLink>
            )}
          </div>
        ))}
        <div className='managerProfile p-2 text-center'>
          <img src={managerDetail?.image ? managerDetail?.image : managerProfile} alt='managerProfile' width={60}/>
          <h4 className='pt-2 fira-sans-semibold'>{loggedIn?.managerName}</h4>
          {managerDetail?.skypeId && <div className='d-flex justify-content-around align-items-center'><i className="fa-brands fa-skype text-primary"></i> <p className='pt-0 fira-sans-semibold mb-0'>{managerDetail?.skypeId}</p></div>}
        </div>
      </div>
  );
};

export default PublisherSidebar;
