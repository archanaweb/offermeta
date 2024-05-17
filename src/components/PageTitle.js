import React from "react";

const PageTitle = ()=> {
    const currentPage = window.location.pathname.split("/").pop();
    return (
        <div className="mt-4"></div>
    )

}
export default PageTitle;