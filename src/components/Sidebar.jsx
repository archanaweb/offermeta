import React, { useState, useEffect } from 'react';
import {
  FaDashboard,
  FaTh,
  FaBars,
  FaBook,
  FaBookOpen,
  FaUserNurse,
  FaRecordVinyl,
  FaSignOutAlt,
  FaSignInAlt,
  FaUsers,
  FaHandshake,
  FaCog,
  FaChartLine,
  FaBullhorn,
  FaEye,
  FaLink,
  FaUserTie,
} from "react-icons/fa";
import { FiGrid ,FiBook} from 'react-icons/fi';
import { MdDashboard,MdBook,MdPerson } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import SubMenuItem from './SubMenuItem';
import logo from '../../src/assets/images/logo2-1.png'
import hexalogo from '../../src/assets/images/hexa-logo-transparent.png'
import { useSelector } from 'react-redux';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarBg = localStorage.getItem('bgColorSidebar')
  const userDomain = localStorage.getItem('userDomainName')
  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FiGrid />
    },
    {
      name: "Offers",
      icon: <FaBullhorn />,
      submenu : [
        {
          path: "/offers",
          name: "Offer List",
        },
        // {
        //   path: "/add_category",
        //   name: "Add Category",
        // },
        // {
        //   path: "/add_vertical",
        //   name: "Add Vertical",
        // },
        // {
        //   path: "/add_traffic",
        //   name: "Add Traffic",
        // }
      ]
    },
    
    {
      name: "Publisher",
      icon: <FaUsers />,
      submenu : [
        {
          path: "/publishers",
          name: "Manage",
        },
        {
          path: "/postback",
          name: "Postback",
        }
      ]
    },
    {
      path: "/advertiser",
      name: "Advertiser",
      icon: <FaHandshake   />
    },
    {
      path: "/performance",
      name: "Performance",
      icon: <FaChartLine />
    },
    {
      path: "/statistics/conversion",
      name: "Conversion",
      icon: <FaChartLine />
    },
    {
      path: "/impression",
      name: "Impression",
      icon: <FaEye />
    },
    {
      path: "/manager",
      name: "Manager",
      icon: <FaUserTie />
    },
    {
      name: "Setting",
      icon: <FaCog />,
      submenu : [
        {
          path: "/setting/customize",
          name: "Customize",
        },
        {
          path: "/setting/profile",
          name: "Profile",
        },
      ]
    },
    {
      name: "Integration",
      icon: <FaLink />,
      submenu : [
        {
          path: "/integrate/apptracking",
          name: "Mobile App Tracking",
        },
      ]
    },

  ];

  useEffect(() => {
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
  // const sidebarStyle ={
  //   sidebarBgColor: sidebarBg,
  // }

  return (
    <div className="content">
      <div style={{ width: isOpen ? "var(--sidebarOpn-width)" : "var(--sidebarCls-width)", backgroundColor:sidebarBg}} className="sidebar">
        <div className="top_section">
            <img style={{ display: isOpen ? "flex" : "none" }} 
              src={userDomain === 'hexamobi' ? hexalogo : logo}
              alt="Profile"
              className={userDomain === 'hexamobi' ? 'logo-image hexalogo-image' : 'logo-image'}
              // "logo-image"
            />
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
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
      </div>
      <main style={{width: isOpen ? "calc(100% - var(--sidebarOpn-width))" : "calc(100% - var(--sidebarCls-width))"}}>{children}</main>
    </div>
  );
};

export default Sidebar;
