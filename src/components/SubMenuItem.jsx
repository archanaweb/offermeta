import React, { useState } from "react";
import Collapse from 'react-bootstrap/Collapse';
import { NavLink } from "react-router-dom";

const SubMenuItem = ({isOpen, item, id, isActive, heandleSubMenuClick})=> {

  const btnClick = () =>{
    heandleSubMenuClick(id);
  }

    return (
        <div className="menu_with_submenu">
        <div className="link" 
        onClick={btnClick}
        aria-controls="example-collapse-text"
        aria-expanded={isActive}>
          <div className={`icon ${isOpen ? "show" : ""}`}>{item.icon}</div>
          {isOpen &&
            <>
            <div className="link_text">{item.name}</div>
            <i className="fa-solid fa-chevron-down ms-auto"></i>
            </>
          }
        </div>
        <Collapse in={isActive}>
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
          </Collapse>
      </div>
    )
}
export default SubMenuItem;