import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";

const RealEstateCTA = () => {
  return (
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#111",
        color: "#fff",
        py: 8,
        px: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        borderTop:"0.5px solid #999999",
        borderBottom:"0.5px solid #999999",
      }}
    >
      {/* Left Background Design */}
      <Box
        component="img"
        src="public/Icons/square-design-left.svg"
        alt="Square Design Left"
        sx={{
          position: "absolute",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "30%",
          opacity: "100%",
          zIndex: 1,
        }}
      />

      {/* Right Background Design */}
      <Box
        component="img"
        src="public/Icons/squre-design-right.svg"
        alt="Square Design Right"
        sx={{
          position: "absolute",
          right: 0,
          top: "50%",
          transform: "translateY(-50%)",
          width: "30%",
          opacity: "100%",
          zIndex: 1,
        }}
      />
      <Container maxWidth="lg" sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 2, }}>
        <Box sx={{ maxWidth: "70%" }}>
          <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
            Start Your Real Estate Journey Today
          </Typography>
          <Typography variant="body1" sx={{ color: "#999999" }}>
            Your dream property is just a click away. Whether you're looking for a new home, a strategic investment, or expert real estate advice, Estatein is here to assist you every step of the way. Take the first step towards your real estate goals and explore our available properties or get in touch with our team for personalized assistance.
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
        >
          Explore Properties
        </Button>
      </Container>
    </Box>
  );
};

export default RealEstateCTA;
