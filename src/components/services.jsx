import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  CardMedia,
  Modal,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import MultiStepForm from "./MultiStepForm"; // ✅ Import the form

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getServices = async () => {
      const base = import.meta.env.VITE_BASE_URL;
      const url = `${base}/api/service`;
      const response = await axios.get(url);
      setServices(response.data.services);
    };
    getServices();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 8 }} id="services">
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <img
            src="Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" fontSize={48} fontWeight={"bold"}>
            What we Offer
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "left", width: "70%", color: "#999999" }}
            >
              Empowering you with innovative solutions, tailored to exceed your
              expectations!
            </Typography>
          </Box>
        </Box>

        {/* ✅ Services List */}
        <Grid2 container spacing={4}>
          {services.slice(0, 3).map((service, index) => (
            <Grid2 item size={{ xs: 12, md: 4, sm: 6 }} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card
                  sx={{
                    backgroundColor: "#222",
                    color: "#fff",
                    borderRadius: "12px",
                    overflow: "hidden",
                    boxShadow: 4,
                    height: "100%",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={service.image}
                    alt={service.name}
                    sx={{ height: 200, objectFit: "cover" }}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                      {service.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="grey.400"
                      sx={{
                        height: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {service.description}
                    </Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        component={Link}
                        to="/services"
                        variant="outlined"
                        sx={{
                          mt: 2,
                          color: "#6A5ACD",
                          borderColor: "#6A5ACD",
                          textTransform: "none",
                        }}
                      >
                        View All Services
                      </Button>

                      {/* ✅ Purchase Button - Opens Payment Form */}
                      <Button
                        variant="contained"
                        color="success"
                        sx={{ ml: 2, mt: 2 }}
                        onClick={() => {
                          setSelectedService(service);
                          setOpen(true);
                        }}
                      >
                        Purchase Service
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      </Container>

      {/* ✅ Payment Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
          {selectedService && (
            <MultiStepForm
              amount={"1000"} // ✅ Pass the amount
              serviceName={selectedService.name}
            />
          )}
        </Paper>
      </Modal>
    </Box>
  );
};

export default Services;
