import React, { useState } from "react";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import OurAchievements from "./Component/OurAchievements";
import OurValues from "./Component/OurValues";
import OurJourney from "./Component/OurJourney"
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";


const AboutUs = () => {
  return (
    <Box
     id="about"
      sx={{
        width:"100vw",
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        backgroundColor: "#141414",
        color: "white",
        gap:"24px"
      }}
    >
      <Navbar />
      <OurJourney />
      <OurAchievements />
      <OurValues />
      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default AboutUs;
