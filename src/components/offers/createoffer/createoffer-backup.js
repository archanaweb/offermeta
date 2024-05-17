import React, { useState } from "react";
import axios from "axios";
import './createoffer.css';
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useNavigate } from 'react-router-dom';
import BASE_URL from "../../../Api/base";

const Createoffer = () => {
    const adminId = localStorage.getItem('subadminId');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        logo: null,
        advertiser: '',
        privacyLevel: '',
        description: '',
        category: '',
        vertical: '',
        traffic: '',
        operatingSystem: '',
        incentive: '',
        goalValue: '',
        status: '',
        currency: '',
        payout: '',
        revenue: '',
        // adminId: '',
        subAdminId: adminId,
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          // Create a new FormData instance and add all form data
          const formDataTosend = new FormData();
          Object.entries(formData).forEach(([key, value]) => {
            formDataTosend.append(key, value);
          });
      
          const response = await axios.post(BASE_URL + "offer/createOffer", formDataTosend);
          const responseData = response.data;
          console.log(responseData, '--------------------------responseData');
          const id = responseData.responseResult._id;
          window.localStorage.setItem('_id', id);
          console.log(response, "====>>>");
          navigate('/Offers'); // Redirect to the '/Offers' page after successful submission.
        } catch (error) {
          console.error("Error:", error);
        }
      };
    const handleLogoChange = (e) => {
        // Set the logo value to the selected file
        setFormData({ ...formData, logo: e.target.files[0] });
      };

    return (
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div className="signup-container">
                    <h2>Offer Create</h2>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="logo">Logo</label>
                            <input
                                type="file"
                                id="logo"
                                name="logo"
                                accept="image/*" // Restrict the file type to images
                                onChange={handleLogoChange}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="privacyLevel">privacyLevel</label>
                            <input
                                type="privacyLevel"
                                id="privacyLevel"
                                name="privacyLevel"
                                value={formData.privacyLevel}
                                onChange={handleChange}
                                required
                            />
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
                        <div className="form-row">
                            <div className="form-column">
                                <div className="form-group">
                                    <label htmlFor="goalValue">GoalType</label>
                                    <input
                                        type="goalValue"
                                        id="goalValue"
                                        name="goalValue"
                                        value={formData.goalValue}
                                        onChange={handleChange}
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
                                        value={formData.status}
                                        onChange={handleChange}
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
                                        value={formData.currency}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-column">
                                <div className="form-group">
                                    <label htmlFor="payout">Payout</label>
                                    <input
                                        type="payout"
                                        id="payout"
                                        name="payout"
                                        value={formData.payout}
                                        onChange={handleChange}
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
                                        value={formData.revenue}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="geoAllowed">GeoAllowed</label>
                            <input
                                type="geoAllowed"
                                id="geoAllowed"
                                name="geoAllowed"
                                value={formData.geoAllowed}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="previewUrl">PreviewUrl</label>
                            <input
                                type="previewUrl"
                                id="previewUrl"
                                name="previewUrl"
                                value={formData.previewUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="trackingUrl">TrackingUrl</label>
                            <input
                                type="trackingUrl"
                                id="trackingUrl"
                                name="trackingUrl"
                                value={formData.trackingUrl}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit">Create</button>
                    </form>
                </div>
            </Sidebar>
        </div>
    );
};

export default Createoffer;