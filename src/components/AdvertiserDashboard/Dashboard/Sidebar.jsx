import React, { useState, useEffect } from 'react';
import {
  FaTh,
  FaBars,
  FaUserNurse,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import '../../sidebar.css';
import logo from '../../../assets/images/logo2-1.png'

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);
  const toggle = () => setIsOpen(!isOpen);
  const sidebarBg = localStorage.getItem('bgColorSidebar')

  const menuItem = [
    {
      path: "/v2/dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/v2/clients",
      name: "Clients",
      icon: <FaUserNurse />
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

  return (
    <div className="content">
      <div style={{ width: isOpen ? "var(--sidebarOpn-width)" : "var(--sidebarCls-width)",backgroundColor:sidebarBg}} className="sidebar">
        <div className="top_section">
            <img style={{ display: isOpen ? "flex" : "none" }} 
              src={logo}
              alt="Profile"
              className="logo-image"
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
             <></>
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

export default AdminSidebar;
