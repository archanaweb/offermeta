import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import PartnerForgotPassword from "./components/Login/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import './App.css';
import './index.css';
import Sidebar from "./components/global/sidebar/Sidebar";
import Navbar from "./components/global/navbar/Navbar";
import { Provider } from "react-redux";
import store from './Redux/store';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Offers from "./pages/offers";
import OfferDetails from "./pages/offers/OfferDetail";
import RequestOfferList from "./pages/offers/RequestOfferList";
import Createoffer from "./pages/offers/createoffer";
import AddCategory from "./pages/offers/createoffer/AddCategory";
import AddVertical from "./pages/offers/createoffer/AddVertical";
import AddTraffic from "./pages/offers/createoffer/AddTraffic";
import Publisher from "./pages/publisher";
import Addpublisher from "./pages/publisher/publisherCreate";
import PublisherDetail from "./pages/publisher/PublisherDetail";
import PostBackManagement from "./pages/PostBackMangement";
import Addpostback from "./pages/PostBackMangement/postbackCreate";
import PostbackDetail from "./pages/PostBackMangement/postbackDetail";
import Advertiser from "./pages/Advertiser";
import AddAdvertiser from "./pages/Advertiser/advertiserCreate";
import Performance from "./pages/Performance";
import Conversion from "./pages/statistics/Conversion";
import PixelLog from "./pages/statistics/PixelLog";
import SentLog from "./pages/statistics/SentLog";
import Impression from "./pages/Impression";
import Clicks from "./pages/statistics/Clicks";
import Manager from "./pages/Manager";
import AddManager from "./pages/Manager/managerCreate";
import ThemeCoustmize from "./pages/Setting";
import Profile from "./pages/Setting/Profile";
import MobileAppTracking from "./pages/Integration";
import AppsFlyer from "./pages/Integration/AppsFlyer";
import Singular from "./pages/Integration/Singular";
import Adjust from "./pages/Integration/Adjust";
import AppMetrica from "./pages/Integration/AppMetrica";
import Branch from "./pages/Integration/Branch";
import Kochava from "./pages/Integration/Kochava";
import PageNotFound from "./pages/PageNotFound";
import PublisherNavbar from "./pages/PublisherDashboard/global/Navbar";
import PublisherSidebar from "./pages/PublisherDashboard/global/Sidebar";
import PublisherSignup from "./pages/PublisherDashboard/Signup";
import PublisherDashboard from "./pages/PublisherDashboard/Dashboard";
import PublisherOffers from "./pages/PublisherDashboard/Offers";
import PublisherApprovedOfferDetails from "./pages/PublisherDashboard/Offers/OfferDetails/ApproveOffer";
import PublisherOfferDetails from "./pages/PublisherDashboard/Offers/OfferDetails";
import PublisherApprovedOffersList from "./pages/PublisherDashboard/Offers/MyOffer";
import PublisherConversion from "./pages/PublisherDashboard/Conversion";
import PublisherClicks from "./pages/PublisherDashboard/Clicks";
import PublisherSentLog from "./pages/PublisherDashboard/PubSentLog";
import PublisherPerformance from "./pages/PublisherDashboard/Performance";
import PublisherImpression from "./pages/PublisherDashboard/Impression";
import PublisherPostbackList from "./pages/PublisherDashboard/Postback";
import PublisherPostbackAdd from "./pages/PublisherDashboard/Postback/Create";
import PublisherProfile from "./pages/PublisherDashboard/Profile";
import ManagerSidebar from "./pages/ManagerDashboard/global/Sidebar";
import ManagerNavbar from "./pages/ManagerDashboard/global/Navbar";
import ManagerDashboard from "./pages/ManagerDashboard/Dashboard";
import ManagerOferList from "./pages/ManagerDashboard/Offer";
import ManagerOfferDetails from "./pages/ManagerDashboard/Offer/OfferDetails";
import ManagerPublisherList from "./pages/ManagerDashboard/ManagerPublisherList";
import ManagerPublisherDetail from "./pages/ManagerDashboard/ManagerPublisherList/ManagerPublisherDetails";
import ManagerPublisherCreate from "./pages/ManagerDashboard/ManagerPublisherList/ManagerPublisherCreate";
import ManagerClickList from "./pages/ManagerDashboard/ManagerClickList";
import ManagerConversionList from "./pages/ManagerDashboard/Conversion";
import ManagerPerformance from "./pages/ManagerDashboard/Performance";
import ManagerImpressionList from "./pages/ManagerDashboard/Impression";
import ManagerrPostbackList from "./pages/ManagerDashboard/Postback";
import ManagerPostbackAdd from "./pages/ManagerDashboard/Postback/Create";
import ManagerProfile from "./pages/ManagerDashboard/Profile";
import EventValueList from "./components/EventValue";
import CreateEventValue from "./components/EventValue/createEventValue";
import UpdateEvent from "./components/EventValue/Edit";
import LandingPage from "./components/LandingPage";
import CreateLandingPage from "./components/LandingPage/createLanding";
import UpdateLanding from "./components/LandingPage/Edit";
import AdvertiserLogin from "./components/AdvertiserDashboard/Login";
import AdvertiserDashboard from "./components/AdvertiserDashboard/Dashboard";
import ForgotPassword from "./components/AdvertiserDashboard/Login/ForgotPassword";
import ResetPassword from "./components/AdvertiserDashboard/Login/ResetPassword";
import VerifyOtp from "./components/AdvertiserDashboard/Login/VerifyOtp";
import AdminClients from "./components/AdvertiserDashboard/Clients";
import ClientsDetails from "./components/AdvertiserDashboard/Clients/ClientsDetails";
import AdvertiserDetail from "./pages/Advertiser/AdvertiserDetail";
import PartnerResetPassword from "./components/Login/ResetPassword";
import PartnerVerifyOtp from "./components/Login/PartnerVerifyOtp";
import InvalidClicks from "./pages/statistics/InvalidClicks";
import SettingData from "./pages/offers/OfferDetail/settingData";
import EventLogs from "./pages/statistics/EnentLogs";
import AdvertiserSignup from "./pages/AdvertiserDashboard/Signup";
import AdvertiserManagerDashboard from "./pages/AdvertiserDashboard/Dashboard";
import AdvertiserManagerAdvertiserList from "./pages/AdvertiserDashboard/Advertiser";
import PostbackTest from "./pages/offers/OfferDetail/PostbackTest";
import Signup from "./components/Signup";
import PrivateRoute from "./components/PrivateRoute";
import PublisherPrivateRoute from "./components/PublisherPrivateRoute";
import ManagerDetail from "./pages/Manager/ManagerDetail";
import PubPayments from "./pages/PublisherDashboard/Payments";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PubManagerPostbackDetail from "./pages/ManagerDashboard/Postback/Detail";
import Payments from "./pages/Payments";
import ManagerSentlogsList from "./pages/ManagerDashboard/Sentlog";
import ApiKey from "./pages/PublisherDashboard/Api";
import PubManagerRoute from "./components/PubManagerRoute";
import ManagerPostbackTest from "./pages/ManagerDashboard/Offer/OfferDetails/PostbackTest";
import ManagerOfferSettingData from "./pages/ManagerDashboard/Offer/OfferDetails/settingData";

const App = ()=> {
    const sidebarColor = localStorage.getItem('bgColorSidebar');
    const loggedUserData = JSON.parse(localStorage.getItem('userData'))
    const pathName = window.location.pathname
    const contrastColorText = (color)=> {
    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');
        // Parse the RGB values
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    }
    // Calculate the perceived luminance of a color
    const calculateLuminance = (rgb) => {
        const { r, g, b } = rgb;
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return luminance;
    };
    // Check if the color is dark
    const isDarkColor = (color) => {
        const rgb = hexToRgb(color);
        const luminance = calculateLuminance(rgb);
        return luminance < 0.5; // You can adjust this threshold as needed
    };
    // Get the body element
    const body = document.body;
  
    // Add a class based on the color's darkness
    if (isDarkColor(color)) {
        body.classList.add('dark-background');
    } else {
        body.classList.remove('dark-background');
    }
    }
  useEffect(()=> {
    if(sidebarColor){
    contrastColorText(sidebarColor)
  }
  console.log('pathName', pathName)
  },[])
    const [logggedInUser, setLogggedInUser] = useState();

    return (
        
        <>
        <div className="main">
        <ToastContainer />
        <Provider store={store}>
            <BrowserRouter>
           {pathName !== '/login' &&<> {logggedInUser && <>{loggedUserData?.userType === 'SUBADMIN' ? <Sidebar/> : <> {loggedUserData?.userType === 'PUBLICHER' ? <PublisherSidebar /> : <ManagerSidebar />}</>}</>}</>}
                <div className="right-content">
              {pathName !== '/login' && <>{logggedInUser && <>{loggedUserData?.userType === 'SUBADMIN' ?
                <Navbar setLogggedInUser={setLogggedInUser}/> : <>{loggedUserData?.userType === 'PUBLICHER' ?
                 <PublisherNavbar setLogggedInUser={setLogggedInUser}/> :
                 <ManagerNavbar setLogggedInUser={setLogggedInUser}/>}</>
            }</>}</>}
            <div className="main-content">
                <Routes>
                    <Route path="*" element={<PageNotFound />}></Route>
                    <Route path="/forgotPassword" element={<PartnerForgotPassword />} /> 
                    <Route path="/resetPassword" element={<PartnerResetPassword />} /> 
                    <Route path="/varifyotp" element={<PartnerVerifyOtp />} /> 
                    <Route path="/login" element={<Login loggedInUser={setLogggedInUser} />} />
                    <Route path="/privacy_policy" element={<PrivacyPolicy />} />
                    <Route path="/partner/signup" element={<Signup setLogggedInUser={setLogggedInUser} />} />
                    <Route path="/" element={<PrivateRoute loggedInUser={loggedUserData} setLogggedInUser={setLogggedInUser} />}>
                        <Route path="dashboard" element={<Dashboard />} />
                        <Route path="offers" element={<Offers />} />
                        <Route path="publishers" element={<Publisher setLogggedInUser={setLogggedInUser} />} />
                        <Route path="advertiser" element={<Advertiser />} />
                        <Route path="postback" element={<PostBackManagement />} />
                        <Route path="performance" element={<Performance />} />
                        <Route path="statistics/conversion" element={<Conversion />} />
                        <Route path="statistics/click" element={<Clicks />} />
                        <Route path="conversion/pixel_logs" element={<PixelLog />} />
                        <Route path="conversion/invalidclicks" element={<InvalidClicks />} />
                        <Route path="conversion/sentlogs" element={<SentLog />} />
                        <Route path="conversion/eventlogs" element={<EventLogs />} />
                        <Route path="impression" element={<Impression />} />
                        <Route path="landingPages" element={<LandingPage />} />
                        <Route path="eventValue" element={<EventValueList />} />
                        <Route path="eventValue/add" element={<CreateEventValue />} />
                        <Route path='/eventValue/edit/:id' element={<UpdateEvent />} />
                        <Route path='/landingPages/edit/:id' element={<UpdateLanding />} />
                        <Route path="landingPages/add" element={<CreateLandingPage />} />
                        <Route path="manager" element={<Manager setLogggedInUser={setLogggedInUser}/>} />
                        <Route path="manager/:id" element={<ManagerDetail />} />
                        <Route path="offers_request" element={<RequestOfferList />} />
                        <Route path="offer/:id" element={<OfferDetails />} /> 
                        <Route path="offerSetting/:id" element={<SettingData />} /> 
                        <Route path="postback_test/:id" element={<PostbackTest />} /> 
                        <Route path="publisher/:id" element={<PublisherDetail />} /> 
                        <Route path="advertiser/:id" element={<AdvertiserDetail />} /> 
                        <Route path="postback/:id" element={<PostbackDetail />} /> 
                        {/* <Route path="postback/:id" element={<PostbackDetail />} />  */}
                        <Route path="add_offers" element={<Createoffer />} /> 
                        <Route path="publisheradd" element={<Addpublisher />} /> 
                        <Route path="advertiseradd" element={<AddAdvertiser />} /> 
                        <Route path="postbackadd" element={<Addpostback />} /> 
                        <Route path="addmanager" element={<AddManager />} /> 
                        <Route path="add_category" element={<AddCategory />} /> 
                        <Route path="add_vertical" element={<AddVertical />} /> 
                        <Route path="add_traffic" element={<AddTraffic />} /> 
                        <Route path="setting/customize" element={<ThemeCoustmize sidebarColorChange={sidebarColor}/>} /> 
                        <Route path="setting/profile" element={<Profile />} /> 
                        <Route path="integrate/apptracking" element={<MobileAppTracking />} /> 
                        <Route path="integrate/appsflyer" element={<AppsFlyer />} /> 
                        <Route path="integrate/singular" element={<Singular />} /> 
                        <Route path="integrate/adjust" element={<Adjust />} /> 
                        <Route path="integrate/appmetrica" element={<AppMetrica />} /> 
                        <Route path="integrate/branch" element={<Branch />} /> 
                        <Route path="integrate/kochava" element={<Kochava />} /> 
                        <Route path="404-page" element={<PageNotFound />} /> 
                       
                        <Route path='payments' element={<Payments />} />
                    </Route>

                    {/* Admindashboard Route */}
                    {/* <Route path='/v2'>
                        <Route path='login' element={<AdvertiserLogin />}></Route>
                        <Route path='dashboard' element={<AdvertiserDashboard />}></Route>
                        <Route path="forgotpassword" element={<ForgotPassword />}></Route>
                        <Route path="varifyotp" element={<VerifyOtp />}></Route>
                        <Route path='resetpassword' element={<ResetPassword />}></Route>
                        <Route path='clients' element={<AdminClients />} />
                        <Route path='client/details/:id' element={<ClientsDetails />} />
                    </Route> */}

                    {/* PublisherDashboard Route */}
                    <Route path='/publisher/signup' element={<PublisherSignup setLogggedInUser={setLogggedInUser}/>} />
                    <Route path='/publisher' element={<PublisherPrivateRoute loggedInUser={loggedUserData} setLogggedInUser={setLogggedInUser} />}>
                        <Route path='dashboard' element={<PublisherDashboard />} />
                        <Route path='offers' element={<PublisherOffers />} />
                        <Route path='offerApproved' element={<PublisherApprovedOffersList />} />
                        <Route path="offer/:id" element={<PublisherOfferDetails />} />
                        <Route path="approvedOffer/:id" element={<PublisherApprovedOfferDetails />} />
                        <Route path='conversion' element={<PublisherConversion />} />
                        <Route path='clicks' element={<PublisherClicks />} />
                        <Route path='postback_logs' element={<PublisherSentLog />} />
                        <Route path='performance' element={<PublisherPerformance />} />
                        <Route path='impression' element={<PublisherImpression />} />
                        <Route path='api_key' element={<ApiKey />} />
                        <Route path='postback' element={<PublisherPostbackList/>} />
                        <Route path='postback/add' element={<PublisherPostbackAdd/>} />
                        {/* <Route path='landingPages' element={<PublisherLandingPageList />} />
                        <Route path='landingPages/add' element={<CreatePublisherLandingPage />} />
                        <Route path='landingPages/edit/:id' element={<UpdatePublisherLanding />} /> */}
                        <Route path='profile' element={<PublisherProfile />} />
                        <Route path='payments' element={<PubPayments />} />
                    </Route>

                    {/* Managerdashboard routes */}
                    <Route path='affiliates/manager' element={<PubManagerRoute loggedInUser={loggedUserData} setLogggedInUser={setLogggedInUser}/>}>
                        {/* <Route path='login' element={<ManagerLogin />}></Route> */}
                        <Route path='dashboard' element={<ManagerDashboard setLogggedInUser={setLogggedInUser}/>} />
                        <Route path='offer' element={<ManagerOferList />} />
                        <Route path='offer/:id' element={<ManagerOfferDetails />} />
                        <Route path="postback_test/:id" element={<ManagerPostbackTest />} />
                        <Route path="offerSetting/:id" element={<ManagerOfferSettingData />} />
                        <Route path='publishers' element={<ManagerPublisherList setLogggedInUser={setLogggedInUser}/>} />
                        <Route path='addpublisher' element={<ManagerPublisherCreate />} />
                        <Route path='publisherdata/:id' element={<ManagerPublisherDetail />} />
                        <Route path='clicks' element={<ManagerClickList />} />
                        <Route path='conversion' element={<ManagerConversionList />} />
                        <Route path='postbacklogs' element={<ManagerSentlogsList />} />
                        <Route path='performance' element={<ManagerPerformance />} />
                        <Route path='impression' element={<ManagerImpressionList />} />
                        <Route path='postback' element={<ManagerrPostbackList />} />
                        <Route path='postback/:id' element={<PubManagerPostbackDetail />} />
                        <Route path='postback/add' element={<ManagerPostbackAdd />} />
                        <Route path='profile' element={<ManagerProfile />} />
                    </Route>
                    <Route path='/advertiser/manager'>
                        <Route path='signup' element={<AdvertiserSignup setLogggedInUser={setLogggedInUser}/>} />
                        <Route path='dashboard' element={<AdvertiserManagerDashboard />} />
                        <Route path='advertiserList' element={<AdvertiserManagerAdvertiserList />} />
                    </Route>
                </Routes>
                
            </div>
            </div>
            </BrowserRouter>
            </Provider>
        </div>
        </>
    )
}

export default App