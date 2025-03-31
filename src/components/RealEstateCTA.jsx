import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const RealEstateCTA = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect small screens

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        backgroundColor: "#141414",
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderTop: "1px solid #262626",
        borderBottom: "1px solid #262626",
      }}
    >
      {/* Left Background Design - Full Height */}
      <Box
        component="img"
        src="/Icons/square-design-left.svg"
        alt="Square Design Left"
        sx={{
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%", // Ensures full height
          width: "auto",
          maxWidth: "30%",
          objectFit: "cover", // Ensures it covers without distortion
          opacity: "100%",
          zIndex: 1,
        }}
      />

      {/* Right Background Design - Full Height */}
      <Box
        component="img"
        src="/Icons/squre-design-right.svg"
        alt="Square Design Right"
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          height: "100%", // Ensures full height
          width: "auto",
          maxWidth: "30%",
          objectFit: "cover", // Ensures it covers without distortion
          opacity: "100%",
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 2,
          textAlign: isMobile ? "center" : "left",
          gap: "16px",
          padding: isMobile ? "80px 16px" : "80px",
        }}
      >
        <Box sx={{ maxWidth: isMobile ? "100%" : "70%", mb: isMobile ? 2 : 0 }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Start Your Real Estate Journey Today
          </Typography>
          <Typography variant="body1" sx={{ color: "#999999" }}>
            Your dream property is just a click away. Whether you're looking for
            a new home, a strategic investment, or expert real estate advice,
            Estatein is here to assist you every step of the way. Take the first
            step towards your real estate goals and explore our available
            properties or get in touch with our team for personalized
            assistance.
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#6A5ACD",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "16px",
            fontWeight: "bold",
            padding: "12px 24px",
            textTransform: "none",
          }}
          onClick={() => {
            navigate("/properties");
          }}
        >
          Explore Properties
        </Button>
      </Box>
    </Box>
  );
};

export default RealEstateCTA;
