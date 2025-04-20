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
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import Navbar from "../../components/Navbar";
import PropertySpecifications from "../../components/PropertySpecifications";
import InquiryForm from "../../components/InquiryForm";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProjectBySlug } from "../../store/projectsSlice";

const MotionBox = motion(Box);

const PropertyDetails = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjectBySlug(slug));
  }, [dispatch, slug]);
  return (
    <Box
      id="property-details"
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
          padding: { xs: "16px 16px 16px 16px", sm: "44px 124px 44px 124px" },
        }}
      >
        <PropertySpecifications />
        <InquiryForm />
      </MotionBox>

      {/* <RealEstateCTA /> */}
      <FooterComponent />
    </Box>
  );
};

export default PropertyDetails;
