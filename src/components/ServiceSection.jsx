import React from "react";
import { Box, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

const services = [
  { src: "Icons/Home_icon.svg", title: "Find Your Dream Home" },
  { src: "Icons/Camera_icon.svg", title: "Unlock Property Value" },
  { src: "Icons/Building_icon.svg", title: "Effortless Property Management" },
  { src: "Icons/Sun_icon.svg", title: "Smart Investments, Informed Decisions" },
];

const ServicesSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0d",
        color: "white",
        padding: "20px",
        textAlign: "center",
        border:'1px solid #262626',
        boxShadow: "inset 0px 0px 20px rgba(255, 255, 255, 0.1)",
      }}
    >
      <Grid2 container spacing={3} justifyContent="center">
        {services.map((service, index) => (
          <Grid2 item size={{xs:12, sm:6, md:3}} key={index}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative", // Ensure the arrow icon is positioned correctly
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
              }}
            >
              {/* Arrow Icon positioned at top-right */}
              <ArrowOutwardIcon
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 20,
                  color: "#4D4D4D", // Match theme color
                }}
              />

              {/* Display service image */}
              <Box sx={{ marginBottom: "10px" }}>
                <img
                  src={service.src}
                  alt={service.title}
                  style={{ width: "60px", height: "60px" }}
                />
              </Box>
              <Typography variant="body2">{service.title}</Typography>
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default ServicesSection;
