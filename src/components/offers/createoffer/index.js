import React, { useState, useEffect } from "react";
import axios from "axios";
import './createoffer.css';
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useNavigate } from 'react-router-dom';

const Createoffer = () => {
    const adminId = window.localStorage.getItem('subadminId');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        advertiser: '',
        privacyLevel: '',
        description: '',
        category: '',
        vertical: '',
        traffic: '',
        operatingSystem: '',
        incentive: '',
        subAdminId: adminId
    });

    const [showSecondForm, setShowSecondForm] = useState(false);
    const [showThirdForm, setShowThirdForm] = useState(false);

    const [formDatasecond, setFormDatasecond] = useState({
        goalValue: '',
        status: '',
        currency: '',
        payout: '',
        revenue: '',
        adminId: ''
    });

    const [formDatathird, setFormDatathird] = useState({
        geoAllowed: '',
        previewUrl: '',
        trackingUrl: '',
        adminId: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSecondFormChange = (e) => {
        setFormDatasecond({ ...formDatasecond, [e.target.name]: e.target.value });
    };

    const handleThirdFormChange = (e) => {
        setFormDatathird({ ...formDatathird, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("offer/createOffer", formData);
            const responseData = response.data;
            const id = responseData.responseResult._id;
            window.localStorage.setItem('_id', id);
            console.log(response, "====>>>")
            setShowSecondForm(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };
    const adminId2 = window.localStorage.getItem('_id');
    console.log(adminId2, "------pppooioio");

    const handleSecondFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`offer/addGoalValue?Id=${adminId2}`, formDatasecond);
            console.log(response,"44444444444"); // Log the entire response object
            if (response && response.data && response.data.responseResult) {
                const data = response.data.responseResult;
                console.log(data, "====MMMMMMMM");
                setFormDatasecond(data);
                console.log("Fetched data:", data);
                setShowThirdForm(true);
              } else {
                console.log("Invalid response format:", response);
              }

        } catch (error) {
            console.error("Error:", error);
        }
    };
    const handleThirdFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const Iid = window.localStorage.getItem('_id');
            setFormDatathird({ ...formDatathird, Iid });
            const response = await axios.put("offer/offerLandingPage", formDatathird);
            navigate('/offertable');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div className="signup-container">
                    <h2>Offer Create</h2>
                    {!showSecondForm ? ( // Render the first form if showSecondForm is false
                        <form onSubmit={handleSubmit} className="form">
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="title"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="advertiser">Advertiser</label>
                                        <input
                                            type="advertiser"
                                            id="advertiser"
                                            name="advertiser"
                                            value={formData.advertiser}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="privacyLavel">PrivacyLavel</label>
                                        <input
                                            type="privacyLavel"
                                            id="privacyLavel"
                                            name="privacyLavel"
                                            value={formData.privacyLavel}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <input
                                    type="description"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <input
                                    type="category"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    required
                                />
                            </div>


                            <div className="form-group">
                                <label htmlFor="vertical">Vertical</label>
                                <input
                                    type="vertical"
                                    id="vertical"
                                    name="vertical"
                                    value={formData.vertical}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="traffic">Traffic</label>
                                <input
                                    type="traffic"
                                    id="traffic"
                                    name="traffic"
                                    value={formData.traffic}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col">
                                        <label htmlFor="operatingSystem">Operating System</label>
                                        <input
                                            type="operatingSystem"
                                            id="operatingSystem"
                                            name="operatingSystem"
                                            value={formData.operatingSystem}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col">
                                        <label htmlFor="incentive">Incentive</label>
                                        <input
                                            type="incentive"
                                            id="incentive"
                                            name="incentive"
                                            value={formData.incentive}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>


                            <button type="submit">Create</button>
                        </form>
                    ) : showSecondForm && !showThirdForm ? (
                        <form onSubmit={handleSecondFormSubmit} className="form">
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="goalValue">GoalValue</label>
                                        <input
                                            type="goalValue"
                                            id="goalValue"
                                            name="goalValue"
                                            value={formDatasecond.goalValue}
                                            onChange={handleSecondFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <input
                                            type="status"
                                            id="status"
                                            name="status"
                                            value={formDatasecond.status}
                                            onChange={handleSecondFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="currency">Currency</label>
                                        <input
                                            type="currency"
                                            id="currency"
                                            name="currency"
                                            value={formDatasecond.currency}
                                            onChange={handleSecondFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="goalValue">Payout</label>
                                        <input
                                            type="Payout"
                                            id="Payout"
                                            name="Payout"
                                            value={formDatasecond.Payout}
                                            onChange={handleSecondFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-column">
                                    <div className="form-group">
                                        <label htmlFor="revenue">Revenue</label>
                                        <input
                                            type="revenue"
                                            id="revenue"
                                            name="revenue"
                                            value={formDatasecond.revenue}
                                            onChange={handleSecondFormChange}
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    ) : showThirdForm && (
                        <form onSubmit={handleThirdFormSubmit} className="form">

                            <div className="form-group">
                                <label htmlFor="geoAllowed">GeoAllowed</label>
                                <input
                                    type="geoAllowed"
                                    id="geoAllowed"
                                    name="geoAllowed"
                                    value={formDatathird.geoAllowed}
                                    onChange={handleThirdFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="previewUrl">PreviewUrl</label>
                                <input
                                    type="previewUrl"
                                    id="previewUrl"
                                    name="previewUrl"
                                    value={formDatathird.previewUrl}
                                    onChange={handleThirdFormChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="trackingUrl">TrackingUrl</label>
                                <input
                                    type="trackingUrl"
                                    id="trackingUrl"
                                    name="trackingUrl"
                                    value={formDatathird.previewUrl}
                                    onChange={handleThirdFormChange}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    )}
                </div>
            </Sidebar>
        </div>
    );
};

export default Createoffer;
