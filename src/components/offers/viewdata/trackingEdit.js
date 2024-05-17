import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../Sidebar";
import Navbar from "../../navbar";
import { useNavigate, useParams } from "react-router-dom";
import BASE_URL from "../../../Api/base";

const Tracking = () => {
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
    url: "",
    status: "",
    goalurl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call the API with newData to save the new data
      await axios.post(BASE_URL + "tracking/trackingList", newData);

      // Assuming the response contains the newly added data with an ID
      const addedData = { ...newData, id: "newlyGeneratedId" };

      // Update the clickData state with the new data
      setClickData((prevData) => [...prevData, addedData]);
      setNewData({
        title: "",
        revenue: "",
        payout: "",
        url: "",
        status: "",
        goalurl: "",
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

  return (
    <div className="Container_card" style={{ display: "flex", height: "100%" }}>
      <Sidebar>
        <Navbar />
        <div style={{ flex: 1, margin: "10px", overflow: "auto" }}>
          <div className="field" id="editableField">
            <div style={{ border: "1px solid black", padding: "10px" }}>
              <h4>Tracking Link</h4>
            </div>
            <div style={{ border: "1px solid black", padding: "10px", marginRight: "20%", marginLeft: "20%" }}>
              
              {/* ... (rest of the code for the table and pagination) */}
            </div>
          </div>
        </div>
      </Sidebar>

      {isDrawerOpen && (
        <div
          style={{
            flex: 1,
            backgroundColor: "#f1f1f1",
            width: "50%",
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
         <form onSubmit={handleSubmit} style={{ display: "flex", flexWrap: "wrap", alignItems: 'center', marginLeft: '20%', marginRight: '20%' }}>
                <input
                  type="text"
                  name="title"
                  value={newData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <input
                  type="text"
                  name="revenue"
                  value={newData.revenue}
                  onChange={handleChange}
                  placeholder="Revenue"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <input
                  type="text"
                  name="payout"
                  value={newData.payout}
                  onChange={handleChange}
                  placeholder="Payout"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <input
                  type="text"
                  name="url"
                  value={newData.url}
                  onChange={handleChange}
                  placeholder="URL"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <input
                  type="text"
                  name="status"
                  value={newData.status}
                  onChange={handleChange}
                  placeholder="Status"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <input
                  type="text"
                  name="goalurl"
                  value={newData.goalurl}
                  onChange={handleChange}
                  placeholder="Goal URL"
                  required
                  style={{ flex: "1 1 100%", maxWidth: "50%", marginRight: "20%", borderRadius:'0px' }}
                />
                <button type="submit">Add Data</button>
              </form>
        </div>
      )}

      {/* Button to toggle the drawer */}
      <button
        style={{ position: "fixed", right: "10px", bottom: "10px" }}
        onClick={toggleDrawer}
      >
        Toggle Drawer
      </button>
    </div>
  );
};

export default Tracking;
