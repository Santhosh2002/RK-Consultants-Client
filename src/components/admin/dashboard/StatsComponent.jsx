import React, { useState, useEffect } from "react";
import Popup from "../../utils/PopUp"; // Import your Popup component
import axios from "axios";
import VisitorsComponent from "./VisitosComponent";

function StatsComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [stats, setStats] = useState({
    happyClients: "...",
    projects: "...",
    daysOfWork: "...",
  });

  // Function to fetch stats
  const getCurrentStats = async () => {
    try {
      const url = import.meta.env.VITE_BASE_URL + "/api/stats";
      const response = await axios.get(url);
      setStats(response.data.stats);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  // Function to update stats
  const updateStats = async (id, newValue) => {
    try {
      const url = import.meta.env.VITE_BASE_URL + `/api/stats/` + id;
      const token = localStorage.getItem("authToken");
      const payload = newValue;
      console.log(payload);
      await axios.post(url, payload, {
        headers: { Authorization: `${token}` },
      });
    } catch (error) {
      console.error("Error updating stats:", error);
    }
  };

  // Ensure getCurrentStats is called only once
  useEffect(() => {
    getCurrentStats();
  }, []);

  const handleOpenPopup = (statType) => {
    setPopupTitle(statType);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpdateStats = async (newValue) => {
    try {
      // Update on the serve

      await updateStats(stats._id, { [popupTitle]: parseInt(newValue, 10) });

      // Update locally
      setStats((prevStats) => ({
        ...prevStats,
        [popupTitle]: parseInt(newValue, 10),
      }));

      handleClosePopup();
    } catch (error) {
      console.error("Error during stats update:", error);
    }
  };

  return (
    <>
      <div className=" bg-white">
        <div className="container  p-4 justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-center w-auto">
            {/* Happy Clients */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Happy Clients</p>
                  <h1 className="text-2xl font-bold text-black">
                    {stats?.happyClients}
                  </h1>
                </div>
                <div
                  className="text-sm rounded-lg bg-blue-500 text-white py-2 px-3 cursor-pointer"
                  onClick={() => handleOpenPopup("happyClients")}
                >
                  Update
                </div>
              </div>
            </div>

            {/* Total Projects */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Projects</p>
                  <h1 className="text-2xl font-bold text-black">
                    {stats?.projects}
                  </h1>
                </div>
                <div
                  className="text-sm rounded-lg bg-blue-500 text-white py-2 px-3 cursor-pointer"
                  onClick={() => handleOpenPopup("projects")}
                >
                  Update
                </div>
              </div>
            </div>

            {/* Total Days of Work */}
            <div className="bg-white p-4 rounded-md shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Days of Work</p>
                  <h1 className="text-2xl font-bold text-black">
                    {stats?.daysOfWork}
                  </h1>
                </div>
                <div
                  className="text-sm rounded-lg bg-blue-500 text-white py-2 px-3 cursor-pointer"
                  onClick={() => handleOpenPopup("daysOfWork")}
                >
                  Update
                </div>
              </div>
            </div>
          </div>
          <VisitorsComponent />
        </div>
      </div>

      {/* Popup Component */}
      <Popup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleUpdateStats}
      />
    </>
  );
}

export default StatsComponent;
