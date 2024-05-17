import React from "react";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

const Adjust = ()=>{
    return (
        <>
            <div className='page_sec pt-3'>
                <div className="container integration-tabs">
                <Tabs>
                  <TabList>
                    <Tab><p>Integration Docs</p></Tab>
                    <Tab><p>Whitelist IPs</p></Tab>
                  </TabList>

                  <TabPanel>
                  <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                    <p><b>You can learn about Adjust Integration from here. Click here for Adjust partner form Link</b></p>
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
                      <tr>
												<td>Adding Goal Value</td>
												<td>
													<ul className="mb-4">
														<li>Create a goal with a goal value of 6 characters. (eg: purcha) you can keep the goal title as per wish.</li>
														<li>Add the goal_value in the event postback.</li>
														<li>Example: http://network.yourdomain.com/acquisition?click_id=security_token=hexamobi.trackier.co&amp;idfa=gaid=goal_value=purcha</li>
														<li>Add "purcha" in Token on Adjust Partner page</li>
													</ul>
												</td>
											</tr>
                    </tbody>
                  </table>
                     </div>
                  </div>
                  </TabPanel>
                  <TabPanel>
                  <div className="primary-shadow px-4 py-4" style={{background: "#fff"}}>
                  <form method="POST" id="select_adv">
									<div className="col-md-6">
										<label className="form-group">Select Advertisers</label>
										<select className="form-control" >
												<option value="">(ID: 4) HexaMobi</option>
												<option value="">(ID: 7) Ventures Media</option>
										</select>
										<div className="mt-2">
											<button type="submit" className="btn btn-rounded btn-primary btn-sm">Save</button>
										</div>
									</div>
								</form>
                  </div>
                  </TabPanel>
                </Tabs>
                   
                    
                </div>
            </div>
        </>
    )
}
export default Adjust