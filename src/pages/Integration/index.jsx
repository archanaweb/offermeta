import React from "react";
import cardImg from '../../assets/images/appmetrica.png'
import trackier from '../../assets/images/mmp-trackier.png'
import appsflyer from '../../assets/images/appsflyer.png'
import singular from '../../assets/images/singular.png'
import adjust from '../../assets/images/adjust.png'
import branch from '../../assets/images/branch.png'
import Kochava from '../../assets/images/Kochava.png'
import { Link } from "react-router-dom";

const MobileAppTracking = ()=>{
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="container">
                    <div className="d-flex justify-content-between align-items-center gap-4">
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={trackier} alt="cardImg" />
                                <p>Highly Scalable Mobile Attribution Platform Is Here, Take Your Mobile Marketing To A Different Level.</p>
                                <button className="btn card-btn" type="button"> Click to login</button>
                            </div>
                        </div>
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={appsflyer} alt="cardImg" />
                                <p>Know With 100% Certainty Which User Converted From A Link Across Different Platforms. Take the Guesswork Out of Mobile Attribution for Good.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/appsflyer' className="link">Setup</Link></button>
                            </div>
                        </div>
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={singular} alt="cardImg" />
                                <p>The world top marketers at companies like Lyft, LinkedIn, Rovio and Microsoft use Singular to unify marketing data, apply attribution.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/singular' className="link">  Setup Instruction</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-4 d-flex justify-content-between align-items-center gap-4">
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={adjust} alt="cardImg" />
                                <p>we unify all your marketing activities into one powerful platform, giving you the insights you need to scale your Business.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/adjust' className="link">  Setup Instruction</Link></button>
                            </div>
                        </div>
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={cardImg} alt="cardImg" />
                                <p>The all-in-one install attribution, app analytics and marketing platform. Free &amp; unlimited,service was released by Yandex in 2013.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/appmetrica' className="link">   Setup Instruction</Link></button>
                            </div>
                        </div>
                        <div className="w-100 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={branch} alt="cardImg" />
                                <p>Know With 100% Certainty Which User Converted From A Link Across Different Platforms. Take the Guesswork Out of Mobile Attribution for Good.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/branch' className="link">   Setup Instruction</Link></button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="col-lg-4 primary-shadow card-box">
                            <div className="card-body text-center track-card">
                                <img src={Kochava} alt="cardImg" />
                                <p>Integrating with Kochava provides the mutual customer with the tools they need in order to successfully track their campaigns and syndicate their data to the tools they care about.</p>
                                <button className="btn card-btn" type="button"><Link to='/integrate/kochava' className="link"> Setup Instruction</Link></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MobileAppTracking