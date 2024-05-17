import React from "react";
import { Link } from "react-router-dom";

const Footer =()=> {
    return (
        <>
            <div className="footer bg-light pt-3 pb-3">
                <p className="text-center mb-0">2023 © Powered by <Link to='https://www.offersmeta.com/'>OffersMeta.</Link></p>
            </div>
        </>
    )
}

export default Footer;