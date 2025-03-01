import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Typography, Button, Container, Grid2 } from "@mui/material";
import Navbar from "../components/Navbar";
import FooterComponent from "../components/footer";

const AboutUs = () => {

  return (
    <>
      <Navbar />

      {/* Header Section */}
      <Box
        sx={{
          background: "linear-gradient(to bottom, #141414, #1A1A1A)",
          color: "white",
          textAlign: "center",
          padding: "60px 0",
        }}
      >
        <Typography variant="h3" fontWeight={600}>
          About Us
        </Typography>
        <Typography variant="body1" sx={{ color: "#999999", mt: 2 }}>
          Read more about our vision, mission, and success!
        </Typography>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ backgroundColor: "#141414", color: "white", py: 10 }}>
        <Container maxWidth="lg">
          <Grid2 container spacing={6} alignItems="center">
            {/* Left Section */}
            <Grid2 item size={{xs:12, md:6}}>
              <Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
                We help in creating Legal Briefs
              </Typography>
              <Typography variant="body1" sx={{ color: "#999999", textAlign: "justify", mb: 3 }}>
                RK Realtors & Tax Consultants provide a comprehensive solution for all your real estate and business consulting needs. 
                Our team has a decade of experience in seeking the best real estate deals. Choose us, and we will ensure smooth 
                business operations. Want to register your business? Our comprehensive business registration and associated services 
                will provide you with the firm ground to navigate through the corporate world.
              </Typography>
              <Typography variant="body1" sx={{ color: "#999999", textAlign: "justify", mb: 3 }}>
                When you rely on RK Realtors and Tax Consultants, you have a trusted business partner on your side. Having a strong 
                foothold in the industry, we take pride in delivering top-notch solutions. We provide comprehensive business registration, 
                tax consultation, real estate services, and more. Our years of experience help us bring integrity, professionalism, and 
                reliability to our work. Whether you’re an individual, investor, or a business owner, our team is here to support you 
                every step of the way.
              </Typography>
              <Button
                component={Link}
                to="/services"
                sx={{
                  mt: 3,
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                  border: "2px solid #A187F0",
                  color: "#A187F0",
                  "&:hover": { backgroundColor: "#A187F0", color: "#fff" },
                }}
              >
                View All Services
              </Button>
            </Grid2>

            {/* Right Section */}
            <Grid2 item xs={12} md={6}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <img
                  src="/home-service-05.jpg"
                  alt="Person"
                  style={{
                    borderRadius: "12px",
                    width: "100%",
                    maxWidth: "500px",
                    objectFit: "cover",
                    boxShadow: "0px 0px 30px #262626",
                  }}
                />
              </Box>
            </Grid2>
          </Grid2>
        </Container>
      </Box>

      {/* Footer Section */}
      <FooterComponent />
    </>
  );
};

export default AboutUs;
