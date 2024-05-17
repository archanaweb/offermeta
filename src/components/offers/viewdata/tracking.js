import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../Api/base";

const Tracking = () => {
    const [editingItemId, setEditingItemId] = useState(null);
    const { offerId } = useParams();
    const navigate = useNavigate();
    const [clickData, setClickData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 2;
    const [isEditing, setIsEditing] = useState(false);
    const [editedOfferData, setEditedOfferData] = useState({ eventValue: "", trackingUrl: "" });

    const [newData, setNewData] = useState({
        title: "",
        revenue: "",
        payout: "",
        status: "",
        geoAllowed: "",
        eventValue: "",
        trackingUrl: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Call the API with newData to save the new data
            await axios.post(BASE_URL + `offer/addLandingPage?offerId=${offerId}`, newData);

            // Assuming the response contains the newly added data with an ID
            const addedData = { ...newData, id: "newlyGeneratedId" };

            // Update the clickData state with the new data
            setClickData((prevData) => [...prevData, addedData]);
            setNewData({
                title: "",
                revenue: "",
                payout: "",
                status: "",
                geoAllowed: "",
                eventValue: "",
                trackingUrl: "",
            }); // Clear the form after successful submission
        } catch (error) {
            console.error("Error adding data:", error);
        }
    };

    // ... (rest of the code, including useEffect, fetchData, handleEdit, handleSave, handleCancel, and other functions)

    // Drawer handling
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(BASE_URL + 'tracking/trackingList');
            const data = response.data.responseResult;
            setClickData(data);
        } catch (error) {
            console.error('Error fetching click data:', error);
            setClickData([]);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = clickData.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
    const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

    const handleEdit = (clickId) => {
        setEditedOfferData({ ...clickData.find((item) => item.id === clickId) });
        setEditingItemId(clickId);
    };

    const handleSave = async () => {
        try {
            // Call the API with edited data and offerId
            await axios.put(
                BASE_URL + `tracking/${offerId}`, // Replace with the API endpoint for updating the data
                editedOfferData
            );

            // Assuming the response contains the updated data
            const updatedData = { ...editedOfferData, id: offerId };
            const updatedClickData = clickData.map((click) =>
                click.id === offerId ? updatedData : click
            );

            setClickData(updatedClickData);
            setEditingItemId(null); // Disable editing mode for the current row
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleCancel = () => {
        setEditingItemId(null); // Disable editing mode for the current row
    };
    const handleAdd = () => {
        navigate('/trackingEdit')
    }

    return (
        <div className='Container_card'>
            <Sidebar>
                <Navbar />
                <div style={{ flex: 1, margin: '10px' }}>
                    <div className="field" id="editableField">
                        <div style={{ border: '1px solid black', padding: '10px' }}>
                            <h3>Tracking Link</h3>
                        </div>
                        <button
                            style={{ position: "relative", right: "10px", bottom: "10px" }}
                            onClick={toggleDrawer}
                        >
                            + Manage Add Tracking
                        </button>
                        {isDrawerOpen && (
                            <div
                                style={{
                                    backgroundColor: "#f1f1f1",
                                    width: "40%",
                                    position: "fixed",
                                    right: 0,
                                    top: 0,
                                    bottom: 0,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "center",
                                    padding: "20px",
                                }}
                            >
                                <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: 'center'}}>
                                    <input
                                        type="text"
                                        name="eventValue"
                                        value={newData.eventValue}
                                        onChange={handleChange}
                                        placeholder="Event Value"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <input
                                        type="text"
                                        name="revenue"
                                        value={newData.revenue}
                                        onChange={handleChange}
                                        placeholder="Revenue"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <input
                                        type="text"
                                        name="payout"
                                        value={newData.payout}
                                        onChange={handleChange}
                                        placeholder="Payout"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <input
                                        type="text"
                                        name="trackingUrl"
                                        value={newData.trackingUrl}
                                        onChange={handleChange}
                                        placeholder="trackingUrl"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <input
                                        type="text"
                                        name="status"
                                        value={newData.status}
                                        onChange={handleChange}
                                        placeholder="Status"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <input
                                        type="text"
                                        name="geoAllowed"
                                        value={newData.geoAllowed}
                                        onChange={handleChange}
                                        placeholder="GeoAllowed"
                                        required
                                        style={{ flex: "1 1 100%", maxWidth: "100%", marginRight: "20%", borderRadius: '0px' }}
                                    />
                                    <div>
                                    <button  style={{maxWidth: "100%"}} type="submit">Add Data</button>
                                    </div>
                                </form>
                            </div>
                        )}


                        <div style={{ border: '1px solid black', padding: '10px' }}>
                            {currentItems.length > 0 ? (
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>URL</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentItems.map((click, index) => (
                                            <tr key={click.id}> {/* Add the "key" prop with a unique identifier */}
                                                {editingItemId === click.id ? (
                                                    <>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={editedOfferData.eventValue}
                                                                onChange={(e) =>
                                                                    setEditedOfferData({
                                                                        ...editedOfferData,
                                                                        eventValue: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <input
                                                                type="text"
                                                                value={editedOfferData.trackingUrl}
                                                                onChange={(e) =>
                                                                    setEditedOfferData({
                                                                        ...editedOfferData,
                                                                        trackingUrl: e.target.value,
                                                                    })
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <button onClick={handleSave}>Save</button>
                                                            <button onClick={handleCancel}>Cancel</button>
                                                        </td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{click.eventValue}</td>
                                                        <td>{click.trackingUrl}</td>
                                                        <td>
                                                            <button onClick={() => handleEdit(click.id)}>
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </>
                                                )}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div>No click data available.</div>
                            )}
                            {clickData.length > itemsPerPage && (
                                <div className="pagination">
                                    <button onClick={prevPage} disabled={currentPage === 1}>
                                        Previous
                                    </button>
                                    <button
                                        onClick={nextPage}
                                        disabled={indexOfLastItem >= clickData.length}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Sidebar>
        </div>
    );
};

export default Tracking;
