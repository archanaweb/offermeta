import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

const PublisherReportTab = ()=> {
  const [isActive, setIsActive] = useState(true)
    return (
        <>
         <div className="conversion-tab">
              <div className="tab-link">
                <NavLink
                  to="/publisher/conversion"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Conversion
                </NavLink>
              </div>
              <div className="tab-link">
                <NavLink
                  to="/publisher/clicks"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Click
                </NavLink>
              </div>
              {/* <div className="tab-link">
                <NavLink
                  to="/conversion/pixel"
                  className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }
                  >Pixel logs
                </NavLink>
              </div> */}
              <div className="tab-link">
                <NavLink
                  to="/publisher/postback_logs"
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
export default PublisherReportTab;