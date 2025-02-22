import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid2, Card, Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import NewServicePopup from "../../utils/NewServicePopup";
import UpdateServicePopup from "../../utils/UpdatingServices";

function ServicesComponent() {
  const url = import.meta.env.VITE_BASE_URL + "/api/service";
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(url);
        setServices(response.data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const handleDelete = async (id) => {
    setButtonLoading(true);
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`${url}/delete/${id}`, {
        headers: { Authorization: `${token}` },
      });
      setServices((prev) => prev.filter((service) => service._id !== id));
    } catch (error) {
      console.error("Error deleting service:", error);
      setError(error.message);
    }
    setButtonLoading(false);
  };

  if (loading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", color: "white" }}>
        Loading Services...
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        width: "100%",
        py: 6,
      }}
    >
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff" }}>
            Services
          </Typography>
          <Button
            onClick={() => setNewPopupOpen(true)}
            sx={{
              backgroundColor: "#A187F0",
              color: "#fff",
              "&:hover": { backgroundColor: "#805AD5" },
            }}
          >
            Add New Service
          </Button>
        </Box>
        <Grid2 container spacing={4}>
          {services.map((service) => (
            <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={service._id}>
              <Card
                component={motion.div}
                initial="hidden"
                whileInView="show"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  borderRadius: "12px",
                  border: "1px solid #444",
                  backgroundColor: "#1A1A1A",
                  color: "#fff",
                  padding: "24px",
                  minHeight: "100%",
                  gap: "16px",
                  boxShadow: 4,
                }}
              >
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={service.icon || service.image}
                    alt={service.name}
                    className="max-h-36 w-full object-cover rounded-md"
                  />
                </Box>
                <Typography variant="h6" fontWeight={600}>
                  {service.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#999999", flexGrow: 1, textAlign: "justify" }}
                >
                  {service.description}
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Button
                    sx={{ ml: 2, color: "red" }}
                    onClick={
                      buttonLoading ? () => {} : () => handleDelete(service._id)
                    }
                  >
                    {buttonLoading ? "Deleting..." : "Delete"}
                  </Button>
                  <Button
                    onClick={() => {
                      setSelectedService(service);
                      setUpdatePopupOpen(true);
                    }}
                    sx={{
                      px: 4,
                      py: 1,
                      border: "2px solid #A187F0",
                      borderRadius: "8px",
                      color: "#A187F0",
                      "&:hover": { backgroundColor: "#A187F0", color: "#fff" },
                    }}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Grid2>
          ))}
        </Grid2>
        <NewServicePopup
          isOpen={isNewPopupOpen}
          onClose={() => setNewPopupOpen(false)}
          onSubmit={() => {}}
        />
        <UpdateServicePopup
          isOpen={isUpdatePopupOpen}
          onClose={() => setUpdatePopupOpen(false)}
          onSubmit={() => {}}
          serviceData={selectedService}
        />
      </Container>
    </Box>
  );
}

export default ServicesComponent;
