import React, { useEffect } from "react";
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
import InquiryForm from "../../components/InquiryForm";
import { useDispatch } from "react-redux";
import { fetchProjectBySlug } from "../../store/projectsSlice";
import { useParams } from "react-router-dom";

const MotionBox = motion(Box);

const PropertieCategories = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectBySlug(slug));
  }, [dispatch]);

  return (
    <Box
      id="property-catagories"
      // sx={{ backgroundColor: "#191919", width: "100vw" }}
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
          padding: "clamp(16px, 5vw, 124px)",
          // padding: {
          //   xs: "16px", 
          //   md: "clamp(24px, 5vw, 124px)",
          // },          
        }}
      >
        <PropertyCategory />
        <InquiryForm />
      </MotionBox>

      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default PropertieCategories;
