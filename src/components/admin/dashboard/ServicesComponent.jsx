import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Grid2,
  Card,
  Box,
  Typography,
  Button,
  Container,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import NewServicePopup from "../../utils/NewServicePopup"; // ✅ only one Popup now
import {
  fetchServices,
  deleteService,
  getServices,
  getServicesLoader,
  getServicesError,
} from "../../../store/servicesSlice";
import ServiceCard from "./ServicesCard";
import { Add } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ServicesComponent() {
  const dispatch = useDispatch();
  const services = useSelector(getServices);
  const loading = useSelector(getServicesLoader);
  const error = useSelector(getServicesError);

  const [isPopupOpen, setPopupOpen] = useState(false); // ✅ single popup state
  const [selectedService, setSelectedService] = useState(null); // ✅ for update
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching services:", error);
    }
  }, [error]);

  const handleDelete = async (id) => {
    setButtonLoading(true);
    try {
      await dispatch(deleteService(id)).then((res) => {
        if (res.error) {
          toast.error("Failed to delete Service");
        } else {
          toast.success("Service deleted successfully");
        }
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
    setButtonLoading(false);
  };

  const handleAddNew = () => {
    setSelectedService(null); // Clear previous selected
    setPopupOpen(true);
  };

  const handleEditService = (service) => {
    setSelectedService(service);
    setPopupOpen(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
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
      <ToastContainer />

      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(100vh - 170px)`,
        }}
      >
        <Box display={"flex"} flexDirection="column" gap={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Admin Panel: Services
            </Typography>
            <Button
              onClick={handleAddNew}
              startIcon={<Add />}
              sx={{
                backgroundColor: "#A187F0",
                color: "#fff",
                "&:hover": { backgroundColor: "#805AD5" },
              }}
            >
              New Service
            </Button>
          </Box>

          {/* Services grid */}
          <Grid2 container spacing={4}>
            {services.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                deleteAction={handleDelete}
                updateAction={handleEditService} // ✅ pass edit handler
              />
            ))}
          </Grid2>

          {/* New or Update Popup */}
          <NewServicePopup
            isOpen={isPopupOpen}
            onClose={() => setPopupOpen(false)}
            existingService={selectedService} // ✅ pass if updating
          />
        </Box>
      </Container>
    </Box>
  );
}

export default ServicesComponent;
