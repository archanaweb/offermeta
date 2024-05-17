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
import { MdAutoGraph } from "react-icons/md";
import { FaArrowUpRightDots,FaMoneyBills } from "react-icons/fa6";
import { FiGrid ,FiBook} from 'react-icons/fi';
import { MdDashboard,MdBook,MdPerson } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import './sidebar.css';
import SubMenuItem from './SubMenuItem';
import defaultLogo from '../../../assets/images/default-logo.png'
import hexalogo from '../../../assets/images/hexa-logo-transparent.png'
import { useSelector, useDispatch } from 'react-redux';
import { fetchPartnerUserData } from '../../../Redux/DomainSlice';

const Sidebar = ({ children }) => {
  const currentDomain = window.location.hostname;
  const domainData = useSelector((state)=> state.subAdminUserData.detail)
  const mainLogo = domainData?.headerImage
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarBg = localStorage.getItem('bgColorSidebar')
  const userDomain = localStorage.getItem('userDomainName')
  const dispatch = useDispatch()
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
      icon: <FaArrowUpRightDots />
    },
    {
      path: "/statistics/conversion",
      name: "Conversion",
      icon: <FaChartLine />
    },
    {
      path: "/impression",
      name: "Impression",
      icon: <MdAutoGraph />
    },
    {
      path: "/payments",
      name: "Payments",
      icon: <FaMoneyBills />
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
    dispatch(fetchPartnerUserData(currentDomain))
    const handleResize = () => {
      setIsOpen(window.innerWidth >= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  useEffect(()=>{
    console.log('domainData',domainData)
  },[domainData])

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
      <div style={{ width: isOpen ? "var(--sidebarOpn-width)" : "var(--sidebarCls-width)", backgroundColor:sidebarBg}} className="sidebar">
        <div className="top_section">
            {/* <img style={{ display: isOpen ? "flex" : "none" }} 
              src={userDomain === 'hexamobi' ? hexalogo : mainLogo}
              alt="Profile"
              className={userDomain === 'hexamobi' ? 'logo-image hexalogo-image' : 'logo-image'}
            /> */}
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
      </div>
  );
};

export default Sidebar;
