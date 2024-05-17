import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const PublManagerReportTab = ()=> {
  const [isActive, setIsActive] = useState(true)
    return (
        <>
         <div className="conversion-tab">
              <div className="tab-link">
                <NavLink
                  to="/affiliates/manager/conversion"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Conversion
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/affiliates/manager/clicks"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Click
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/affiliates/manager/postbacklogs"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Postback logs
                </NavLink>
              </div>
          </div>
        </>
    )
}
export default PublManagerReportTab;