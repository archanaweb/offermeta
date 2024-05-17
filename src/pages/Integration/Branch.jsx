import React from "react";
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";

const Branch = ()=>{
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="container">
                <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                <div className="row">
                    <div className="col-md-9">
                        <h6 className="mail-title">Mail to: <Link href="mailto:partners-@singular.com">partners-int@singular.net</Link></h6>
                    </div>
                    <div className="col-md-3">
                        <h6 className="mail-title">CC : <Link href="mailto:subhom@trackier.com">subhomoy@trackier.com</Link></h6>
                    </div>
                </div>
                <br />
                <p>If you do not currently have an integration with Singular, complete the ad Partners Registration application <Link target="_block" href="#">https://www.singular.net/partner-integrations/</Link></p>

                <div className="alert alert-box">
                    <i className="fa fa-info-circle mr-2"></i>Please copy below email content and mail it to the mentioned email id
                    <button data-toggle="tooltip" data-placement="top" data-original-title="Copy" className="close copy-text" data-clipboard-target="#content"></button>
				        </div>
                <div className="singular-table">
                <h4 className="text-primary">Hi Branch,</h4>
                <p className="title"><b>We would like to initiate the integration process between  Singular and Trackier. Please find below Install and Event Postback</b></p>
                <div className="table-responsive mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Attribution</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Global Install Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                      <tr>
                        <td> Event Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                    </tbody>
                  </table>
                     </div>
                     <p class="title"><b>Macro List for Tracking link URL</b></p>
                     <div className="table-responsive mb-4">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Macro</th>
                        <th>For</th>
                      </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>click_id</td>
                            <td>Click Id</td>
                        </tr>
                        <tr>
                            <td>publisher_id</td>
                            <td>Publisher id</td>
                        </tr>
                        <tr>
                            <td>source</td>
                            <td>Sub Publisher Id</td>
                        </tr>
                        <tr>
                            <td>gaid</td>
                            <td>Android device ID</td>
                        </tr>
                        <tr>
                            <td>idfa</td>
                            <td>Ios device ID</td>
                        </tr>
                    </tbody>
                  </table>
                     </div>
                </div>
                </div>
                </div>
            </div>
        </>
    )
}
export default Branch