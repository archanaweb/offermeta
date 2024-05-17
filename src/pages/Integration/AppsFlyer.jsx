import React from "react";
import PageTitle from '../../components/PageTitle';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/navbar';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const AppsFlyer = ()=>{
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="container integration-tabs">
                <Tabs>
                  <TabList>
                    <Tab><p>Integration Docs</p></Tab>
                    <Tab><p>Privacy Postback</p></Tab>
                  </TabList>

                  <TabPanel>
                  <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                    <h4 class="mb-4">Hi There!</h4>
                    <ul>
                        <li>Already integrated with AppsFlyer? Setup the postback and attribution link as per the below mentioned instructions.</li>
                        <li>Not yet integrated with AppsFlyer? Get referred by your advertiser and become their partner, or contact the appsflyer team via their </li>
                        <li>Appsflyer has updated their Postback Management process for the partners, where you have to setup the format of the attribution link and the postback yourself.</li>
                    </ul>
                    <p><b>These are the formats of global install and event postback that you need to set as over the partner interface:</b></p>
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
                        <td>Global Install Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                    </tbody>
                  </table>
                     </div>
                     <p><b>Attribution link parameters:</b></p>
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
                        <td>Global Install Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                    </tbody>
                  </table>
                     </div>
                     <p>For more information, you can access our support article here.</p>
                  </div>
                  </TabPanel>
                  <TabPanel>
                  <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                    <p>For more information regarding privacy postback you can check this help article : Click Here</p>
                    <p className="mt-3"><b>Advanced Privacy Postback (for iOS 14)</b></p>
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
                        <td>Install Advanced Privacy Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                      <tr>
                        <td>Event Advanced Privacy Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                    </tbody>
                  </table>
                     </div>
                     <p><b>Advanced Privacy Postback (for SKAdNetwork)</b></p>
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
                        <td>Global Install Postback</td>
                        <td>https://hexamobi.trackier.co/acquisition?click_id=&security_token=d4a4e46956ccc1d03d2d&idfa=&gaid=</td>
                      </tr>
                    </tbody>
                  </table>
                     </div>
                     <p>For more information, you can access our support article here.</p>
                  </div>
                  </TabPanel>
                </Tabs>
                   
                    
                </div>
            </div>
        </>
    )
}
export default AppsFlyer