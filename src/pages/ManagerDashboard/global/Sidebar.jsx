import React, { useState, useEffect } from 'react';
import { FaTh,FaBars,FaUserNurse, FaUsers, FaChartLine, FaEye, FaBullhorn} from "react-icons/fa";
import { FaArrowUpRightDots, FaMoneyBills } from "react-icons/fa6";
import { MdAutoGraph } from "react-icons/md";
import { LuServerCrash } from "react-icons/lu";
import { FiGrid ,FiBook} from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import '../../../components/sidebar.css';
import logo from '../../../assets/images/logo2-1.png'
import hexalogo from '../../../assets/images/hexa-logo-transparent.png'
import SubMenuItem from '../../../components/SubMenuItem';
import data from '../../../components/menuItem.json'

const ManagerSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarBg = localStorage.getItem('bgColorSidebar')
  const userDomain = localStorage.getItem('userDomainName')
  const userDetail  = JSON.parse(localStorage.getItem('userData'))
  const userDataType = userDetail.userType;

  const menuItem = userDataType === "ADVERTISER" ?data.advertiserMenuItem : data.managerMenuItem;
  
  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'FiGrid':
        return <FiGrid />;
      case 'FaBullhorn':
        return <FaBullhorn />;
      case 'FaUsers':
        return <FaUsers />;
      case 'FaUserNurse':
        return <FaUserNurse />;
      case 'FaChartLine':
        return <FaChartLine />;
      case 'FaArrowLine':
        return <FaArrowUpRightDots />;
      case 'MdAutoGraph':
        return <MdAutoGraph />;
      case 'FaMoneyBills':
        return <FaMoneyBills />;
      case 'LuServerCrash':
        return <LuServerCrash />;
      default:
        return null;
    }
  };
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

  return (
      <div style={{ width: isOpen ? "var(--sidebarOpn-width)" : "var(--sidebarCls-width)",backgroundColor:sidebarBg}} className="sidebar">
        <div className="top_section">
            <img style={{ display: isOpen ? "flex" : "none" }} 
              src={logo}
              alt="Profile"
              className='logo-image'
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
                <div className={`icon ${isOpen ? "show" : ""}`}>{renderIcon(item.icon)}</div>
                {isOpen && <div className="link_text">{item.name}</div>}
              </NavLink>
            )}
          </div>
        ))}
      </div>
  );
};

export default ManagerSidebar;
