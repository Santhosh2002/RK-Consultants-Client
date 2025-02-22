import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import Popup from "../../utils/PopUp";
import VisitorsComponent from "./VisitosComponent";

function StatsComponent() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [stats, setStats] = useState({
    happyClients: "...",
    projects: "...",
    daysOfWork: "...",
  });

  useEffect(() => {
    getCurrentStats();
  }, []);

  const getCurrentStats = async () => {
    try {
      const url = import.meta.env.VITE_BASE_URL + "/api/stats";
      const response = await axios.get(url);
      setStats(response.data.stats);
    } catch (error) {
      toast.error(`Error fetching stats: ${error.message}`);
    }
  };

  const handleOpenPopup = (statType) => {
    setPopupTitle(statType);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleUpdateStats = async (newValue) => {
    try {
      await updateStats(stats._id, { [popupTitle]: parseInt(newValue, 10) });
      setStats((prevStats) => ({
        ...prevStats,
        [popupTitle]: parseInt(newValue, 10),
      }));
      handleClosePopup();
    } catch (error) {
      toast.error(`Error updating stats: ${error.message}`);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <Container maxWidth="xl">
        <ToastContainer />

        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "40px" }}
        >
          Admin Panel: Statistics
        </Typography>
        <Grid2 container spacing={4}>
          {stats &&
            Object?.entries(stats)
              ?.filter(([key]) => !["_id", "__v"].includes(key))
              ?.map(([key, value]) => (
                <Grid2
                  item
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                  key={key}
                >
                  <Card
                    sx={{
                      borderRadius: 3,
                      border: "1px solid #444",
                      backgroundColor: "#222",
                      color: "#fff",
                      boxShadow: 4,
                      padding: 2,
                    }}
                  >
                    <CardContent>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        sx={{ textTransform: "capitalize" }}
                      >
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </Typography>
                      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                        {value}
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "#6A5ACD",
                          color: "#fff",
                          textTransform: "none",
                          marginTop: 2,
                        }}
                        onClick={() => handleOpenPopup(key)}
                      >
                        Update
                      </Button>
                    </CardContent>
                  </Card>
                </Grid2>
              ))}
        </Grid2>
        <VisitorsComponent />

        <Popup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          onSubmit={handleUpdateStats}
        />
      </Container>
    </Box>
  );
}

export default StatsComponent;
