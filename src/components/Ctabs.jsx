import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const Ctabs = ()=> {
  const [isActive, setIsActive] = useState(true)
    return (
        <>
         <div className="conversion-tab">
              <div className="tab-link">
                <NavLink
                  to="/statistics/conversion"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Conversion
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/statistics/click"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Click
                </NavLink>
              </div>
              <div className="tab-link">
              <NavLink
                  to="/conversion/invalidclicks"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Invalid Click
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/conversion/eventlogs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Event Logs
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/conversion/pixel_logs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Pixel logs
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/conversion/sentlogs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Sent logs
                </NavLink>
              </div>
          </div>
        </>
    )
}
export default Ctabs;