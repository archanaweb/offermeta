import React from "react";
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Link } from "react-router-dom";

const AppMetrica = ()=>{
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="container">
                <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                <br />
                <div className="singular-table">

                <p class="title">To do the integration below are the Postback URLs which you can use to integrate on Appmetrica to send Trackier Install and Event data.</p>
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
export default AppMetrica