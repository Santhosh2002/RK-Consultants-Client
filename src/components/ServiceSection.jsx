import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0d",
        color: "white",
        padding: "20px",
        textAlign: "center",
        border: "5px solid #262626",
        boxShadow: "inset 0px 0px 20px #262626",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        style={{ display: "flex", gap: "20px", whiteSpace: "nowrap" }}
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
      >
        {[...services, ...services].map((service, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "relative",
              background: "#1A1A1A",
              padding: "20px",
              borderRadius: "12px",
              textAlign: "center",
              border: "1px solid #262626",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
              gap: "16px",
              minWidth: "300px",
              // aspectRatio:"1.5/1",
            }}
          >
            <ArrowOutwardIcon
              sx={{
                position: "absolute",
                top: 8,
                right: 8,
                fontSize: 20,
                color: "#4D4D4D",
              }}
            />
            <Box sx={{ marginBottom: "10px" }}>
              <img
                src="icons/Home_icon.svg"
                alt={service.name}
                style={{ width: "60px", height: "60px" }}
              />
            </Box>
            <Typography variant="body2">{service.name}</Typography>
          </motion.div>
        ))}
      </motion.div>
    </Box>
  );
};

export default ServicesSection;
