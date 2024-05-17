import React from "react";
import '../../src/App.css';
import '../../src/index.css';
import { Spinner } from "react-bootstrap";

const SpinnerLoading = ()=> {
    return (
        <>
    <div className='skeleton-container'>
        <div className='spinner'>
            <Spinner animation="border" />
        </div>
    </div>
        </>
    )
}

export default SpinnerLoading;