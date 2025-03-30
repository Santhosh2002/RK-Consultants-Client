import React from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet";
import OurAchievements from "./Component/OurAchievements";
import OurValues from "./Component/OurValues";
import OurJourney from "./Component/OurJourney";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";

const AboutUs = () => {
  return (
    <Box
      id="about"
      sx={{
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#141414",
        color: "white",
        gap: "24px",
      }}
    >
      <Helmet>
        <title>About Us - Your Website Name</title>
        <meta
          name="description"
          content="Learn more about our journey, achievements, and values."
        />
      </Helmet>
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
