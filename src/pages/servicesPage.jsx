import { motion } from "framer-motion";
import { fadeIn } from "../variants";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/footer";
import {
  Box,
  Typography,
  Container,
  Grid2,
  Card,
  Button,
  IconButton,
} from "@mui/material";
import Modal from "./Modal";
import ServiceCard from "../components/ServiceCard";

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const getServices = async () => {
    setIsLoading(true);
    const base = import.meta.env.VITE_BASE_URL;
    const url = `${base}/api/service`;
    try {
      const response = await axios.get(url);
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  return (
    <>
      <Navbar />

      <Box sx={{ backgroundColor: "#141414", color: "white", py: 6 }}>
        <Container maxWidth="lg">
          {/* Section Title */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              textAlign: "left",
              mb: 6,
            }}
          >
            <img
              src="Icons/abstract-Design.svg"
              alt="Icon"
              style={{ width: 70, height: "auto", marginBottom: 10 }}
            />
            <Typography variant="h3" fontWeight={600}>
              Services We Provide
            </Typography>
            <Typography
              variant="body1"
              sx={{ color: "#999999", maxWidth: "600px", mt: 2 }}
            >
              Our tailored solutions are designed to help you achieve your goals
              effortlessly.
            </Typography>
          </Box>

          {/* Services Grid2 */}
          <Grid2 container spacing={4}>
            {isLoading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                    <ShimmerCard />
                  </Grid2>
                ))
              : services.map((service, index) => (
                <ServiceCard service={service} />
                  // <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                  //   <Card
                  //     component={motion.div}
                  //     variants={fadeIn("up", 0.3)}
                  //     initial="hidden"
                  //     whileInView="show"
                  //     viewport={{ once: true, amount: 0.1 }}
                  //     sx={{
                  //       display: "flex",
                  //       flexDirection: "column",
                  //       justifyContent: "space-between",
                  //       borderRadius: "12px",
                  //       border: "5px solid #262626",
                  //       backgroundColor: "#1A1A1A",
                  //       color: "#fff",
                  //       padding: "24px",
                  //       boxShadow: "0px 0px 30px #262626",
                  //       minHeight: "100%",
                  //       alignItems: "center",
                  //       gap: "16px",
                  //     }}
                  //   >
                  //     <Box sx={{ display: "flex", justifyContent: "center" }}>
                  //       <img
                  //         src={service.icon || service.image}
                  //         alt={service.name}
                  //         className="max-h-36 w-full object-cover rounded-md"
                  //       />
                  //     </Box>
                  //     <Typography variant="h6" fontWeight={600}>
                  //       {service.name}
                  //     </Typography>
                  //     <Typography
                  //       variant="body2"
                  //       sx={{
                  //         color: "#999999",
                  //         flexGrow: 1,
                  //         textAlign: "justify",
                  //       }}
                  //     >
                  //       {service.description}
                  //     </Typography>
                  //     <Box sx={{ textAlign: "center" }}>
                  //       <Button
                  //         onClick={() => openModal(service)}
                  //         sx={{
                  //           px: 4,
                  //           py: 1,
                  //           border: "2px solid #A187F0",
                  //           borderRadius: "8px",
                  //           color: "#A187F0",
                  //           "&:hover": {
                  //             backgroundColor: "#A187F0",
                  //             color: "#fff",
                  //           },
                  //         }}
                  //       >
                  //         View Details
                  //       </Button>
                  //     </Box>
                  //   </Card>
                  // </Grid2>
                ))}
          </Grid2>
        </Container>
      </Box>

      {isModalOpen && selectedService && (
        <Modal service={selectedService} onClose={closeModal} />
      )}

      <FooterComponent />
    </>
  );
};

const ShimmerCard = () => (
  <Card
    sx={{
      backgroundColor: "#1A1A1A",
      border: "5px solid #262626",
      boxShadow: "0px 0px 30px #262626",
      padding: "24px",
      minHeight: "250px",
    }}
  />
);

export default ServicesPage;
