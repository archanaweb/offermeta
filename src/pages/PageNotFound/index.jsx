import React from "react";
import errorImg from '../../assets/images/error-img.png'
import { Link } from "react-router-dom";

const PageNotFound = ()=> {
    return (
        <>
        <div className="page_sec pt-0">
            <div className="container">
                <div className="row align-items-center min-vh-100">
                    <div className="offset-lg-2 col-lg-8 col-md-12 col-sm-12 col-12">
                        <div className="error-sec">
                            <img className="img-fluid mb-6" src={errorImg}></img>
                            <div className="error-content text-center">
                            <h1 class="display-4 font-weight-bold">Under Development</h1>
                            <Link to="/dashboard" className="btn btn-primary btn-lg">Back to dashboard</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}
export default PageNotFound