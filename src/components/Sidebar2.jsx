import React, { useState, useEffect } from 'react';
import {
  FaTh,
  FaBars,
  FaBook,
  FaBookOpen,
  FaUserNurse,
  FaRecordVinyl,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768); // Set isOpen based on screen width
  const [activeSubMenu, setActiveSubMenu] = useState(null);

  const toggle = () => setIsOpen(!isOpen);

  const handleMouseEnter = (index) => {
    setActiveSubMenu(index);
  };

  const handleMouseLeave = () => {
    setActiveSubMenu(null);
  };


  const menuItem = [
    {
      path: "/dashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/offers",
      name: "Offers",
      icon: <FaBookOpen />
    },
    // {
    //   name: "Offers",
    //   icon: <FaBookOpen />,
    //   submenu: [
    //     {
    //       icon: <FaBookOpen />,
    //       path: "/offers",
    //       name: "Create Offer",
    //     },
    //     {
    //       icon: <FaWallet />,
    //       path: "/signup",
    //       name: "Signup",
    //     },
    //   ],
    // },
    {
      path: "/publisher",
      name: "Publisher",
      icon: <FaUserNurse />
    },
    {
      path: "/advertiser",
      name: "Adversier",
      icon: <FaUserNurse />
    },
    {
      path: "/revenuetable",
      name: "Report",
      icon: <FaRecordVinyl />
    },
    {
      path: "/payouttable",
      name: "Performance",
      icon: <FaBook />
    },
    {
      path: "/manager",
      name: "Manager",
      icon: <FaUserNurse />
    },
    {
      path: "/",
      name: "Login",
      icon: <FaUserNurse />
    },
    {
      path: "/signup",
      name: "Signup",
      icon: <FaSignInAlt />
    }
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

  return (
    <div className="content">
      <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWkHjLeC6ZaiEuv0sqrBOs17qKWeGxkXWDiuuAfsSPJk-LyQI-XmSwRP-iaK5_f0Aek50&usqp=CAU"
              alt="Profile"
              className="profile-image"
            />
          </h1>
          

          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            {item.submenu ? (
              <div className="menu_with_submenu">
                <NavLink
                  to={item.path}
                  className={`menu_link ${isOpen ? "hide" : ""}`}
                
                >
                <div className={`icon ${isOpen ? "hide" : ""}`}>{item.icon}</div>
                  {isOpen && <div className="menu_text">{item.name}</div>}
                </NavLink>
                {activeSubMenu === index && isOpen && (
                  <div className="submenu">
                    {item.submenu.map((submenuItem, submenuIndex) => (
                      <NavLink
                        key={submenuIndex}
                        to={submenuItem.path}
                        className="link"
                       
                      >
                        <div className="submenu_item">{submenuItem.name}</div>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
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
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
