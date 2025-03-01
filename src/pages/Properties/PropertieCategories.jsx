import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
  Grid2,
  OutlinedInput,
  FormControl,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import PropertyCategory from "../../components/PropertyCategory";
import CategoriesList from "../../components/CategoriesList";

const MotionBox = motion(Box);

const PropertieCategories = () => {
  return (
    <Box
      id="property-catagories"
      sx={{ backgroundColor: "#191919", width: "100vw" }}
    >
      <Navbar />
      <MotionBox
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          backgroundColor: "#141414",
          color: "white",
          width: "100%",
          gap: 4,
          padding: { xs: "16px 16px 16px 16px", sm: "64px 124px 64px 124px" },
        }}
      >
        <PropertyCategory />
        <CategoriesList />
      </MotionBox>
      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default PropertieCategories;
