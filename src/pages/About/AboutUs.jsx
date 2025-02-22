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
        display: "flex",
        flexDirection:"column",
        alignItems: "center",
        // justifyContent: "space-between",
        backgroundColor: "#141414",
        color: "white",
        // padding:"0px 0px"
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
