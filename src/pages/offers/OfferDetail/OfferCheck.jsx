import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom"
import BASE_URL from "../../../Api/base";

const OfferCheck =({offerId,offerDetail, trackingData, setTrackingData})=> {
    const [activeTab, setAtctiveTab] = useState('linkTesting')
    const LoggedInUser = JSON.parse(localStorage.getItem('userData'));
    const partnerId = LoggedInUser._id;
    const [formData, setFormData] = useState({})
    const [redirectUrl , setRedirectUrl]  = useState('')
    const [linkDetail , setLinkDetail]  = useState([])
    const [responseResult, setResponseResult] = useState(null);

    const handleChange = (e)=> {
        setFormData({...formData, [e.target.name] : e.target.value})
    }
    const handleUrlChange = (e)=> {
        setRedirectUrl(e.target.value)
    }
    
    const handleTrackingTesting = async()=> {
        try {
            const url = `${BASE_URL}subAdmin/trackingTesting?url=${encodeURIComponent(formData?.url)}`;
            console.log('url<>', url)
             // Replace with your backend URL
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setTrackingData(data);
          } catch (error) {
            console.log(error.message);
          }
    }
    const handleConversionTester = async()=> {
        const response = await fetch(`${BASE_URL}subAdmin/linkTester?url=${encodeURIComponent(redirectUrl)}`)
        const data = await response.json();
        console.log('convtesting', data)
    }
    const handleLinkTester = async()=> {
        const response = await fetch(`${BASE_URL}subAdmin/linkTester?url=${encodeURIComponent(redirectUrl)}`)
        const data = await response.json();
        setLinkDetail(data.resposneResult)
        console.log('linkDetail', data)
    }

    useEffect(()=>{
        console.log('trackingData', trackingData)
    },[trackingData])
    
    return (
        <>
    <div className="offersData mt-4">
        <div className="pb-2 mb-2 d-flex justify-content-between align-items-center border-b">
            <h3>Conversion Testing Tool</h3>
        </div>
        <div className="">
            <button className={activeTab === 'trackingTesting' ? 'btn active me-2' : 'btn me-2'}><Link to={`/postback_test/${offerId}`}>Tracking testing</Link></button>
            <button className={activeTab === 'offerCheck' ? 'btn active' : 'btn me-2'} onClick={()=> setAtctiveTab('offerCheck')}>Offer check</button>
            <button className={activeTab === 'linkTesting' ? 'btn active' : 'btn'} onClick={()=> setAtctiveTab('linkTesting')}>Link testing</button>
        </div>
        <div className="text-link pt-2">
           {activeTab === 'trackingTesting' && <><form>
            <label class="custom-field one">
                <input type="text" placeholder=" " name='url' className="form-control w-100" onChange={handleChange}/>
                <span class="cstmPlaceholder">Enter Url</span>
            </label>
            <div className="row mt-3">
                <div className="col-lg-6">
                <label class="custom-field one">
                <select type="text" placeholder=" " className="form-control w-100">
                    <option value='' hidden></option>
                    <option value='smartphone'>Smartphone(Android)</option>
                    <option value='tablet'>Tablet(Android)</option>
                    <option value='iPhone'>iPhone(iOS)</option>
                    <option value='iPad'>iPad(iOS)</option>
                    <option value='desktop'>Desktop</option>
                </select>
                <span class="cstmPlaceholder"><i className="fa-solid fa-mobile-screen-button"></i> Device</span>
            </label>
                </div>
                <div className="col-lg-6">
                <label class="custom-field one">
                <select type="text" placeholder=" " className="form-control w-100">
                    <option value='' hidden></option>
                   {offerDetail?.event.map((item)=> <option value=''>{item.eventValue}</option>)}
                </select>
                <span class="cstmPlaceholder">Event Value</span>
            </label>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col-lg-6">
                <label class="custom-field one">
                <input type="text" placeholder=" " className="form-control w-100" />
                <span class="cstmPlaceholder"><i className="fa-solid fa-globe"></i> Country</span>
            </label>
                </div>
                {/* <div className="col-lg-6" name='enable'>
                    <input type="checked"/>
                    <label class="" for='enable'>Is targeting enabled?</label>
                </div> */}
            </div>
            <button type="button" className="btn btn-primary" onClick={handleTrackingTesting}>Run test</button>
            </form>
           {trackingData && <div className="py-2 border border-gray-darker rounded mt-2 px-2 text-gray-darker">
                <p><b>Link:</b> {trackingData?.resposneResult ? trackingData?.resposneResult : 'null'}</p>
                <p><b>Click Id: </b>{trackingData?.click_id ? trackingData?.click_id : 'null'}</p>
                <p>P1: {trackingData?.p1 ? trackingData?.p1 : 'null'}</p>
                <p>P2: {trackingData?.p2 ? trackingData?.p2 : 'null'}</p>
                <p>P3: {trackingData?.p3 ? trackingData?.p3 : 'null'}</p>
                <p>P4: {trackingData?.p4 ? trackingData?.p4 : 'null'}</p>
                <p>P5: {trackingData?.p5 ? trackingData?.p5 : 'null'}</p>
                <p>Aff click Id: {trackingData?.aff_click_id ? trackingData?.aff_click_id: 'null'}</p>
                <p>Source: {trackingData?.source ? trackingData?.source : 'null'}</p>
                <p>GAID: {trackingData?.gaid ? trackingData?.gaid : 'null'}</p>
                <p>IDFA: {trackingData?.idfa ? trackingData?.idfa : 'null'}</p>
                <p>Device Id:{trackingData?.device_id ? trackingData?.device_id : 'null'}</p>
                <p>Android Id:{trackingData?.android_id ? trackingData?.android_id : 'null'}</p>
            </div>}
            </>}

            {activeTab === 'offerCheck' && <> <form>
            <label class="custom-field one">
                <input type="text" placeholder=" " name='url' className="form-control w-100" value={redirectUrl} onChange={handleUrlChange}/>
                <span class="cstmPlaceholder">Enter Url</span>
            </label>
            <div className="row mt-3">
                <div className="col-lg-6">
                <label class="custom-field one">
                <select type="text" placeholder=" " className="form-control w-100">
                    <option value='' hidden></option>
                    <option value='smartphone'>Smartphone(Android)</option>
                    <option value='tablet'>Tablet(Android)</option>
                    <option value='iPhone'>iPhone(iOS)</option>
                    <option value='iPad'>iPad(iOS)</option>
                    <option value='desktop'>Desktop</option>
                </select>
                <span class="cstmPlaceholder"><i className="fa-solid fa-mobile-screen-button"></i> Device</span>
            </label>
                </div>
                <div className="col-lg-6">
                <label class="custom-field one">
                <input type="text" placeholder=" " className="form-control w-100" />
                <span class="cstmPlaceholder"><i className="fa-solid fa-globe"></i> Country</span>
            </label>
                </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleConversionTester}>Run test</button>
            </form></>}
            {activeTab === 'linkTesting' && <> <form>
            <label class="custom-field one">
                <input type="text" placeholder=" " name='url' className="form-control w-100" value={redirectUrl} onChange={handleUrlChange}/>
                <span class="cstmPlaceholder">Enter Url</span>
            </label>
            <button type="button" className="btn btn-primary" onClick={handleLinkTester}>Run test</button>
            </form>
                <div className="table-responsive event-table mt-2">
                <table className="table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Domain</th>
                            <th>Redirect URL</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {linkDetail?.map((item, index)=> <tr>
                            <td>{index + 1}</td>
                            <td>{item?.Domain}</td>
                            <td>{item?.RedirectUrl}</td>
                            <td>{item?.Status}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
            
            </>}
        </div>                         
    </div>
        </>
    )
}
export default OfferCheck;