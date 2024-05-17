import React from "react";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import PageTitle from "../../PageTitle";

const CreateLandingPage = ()=> {
    return (
        <>
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div className='page_sec'>
                    <PageTitle/>
                    <div>Create Landing Page</div>
                </div>
            </Sidebar>
            </div>
        </>
    )
}

export default CreateLandingPage;