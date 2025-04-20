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
import { Search } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import PropertyListing from "../../components/PropertyListing";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects, getProjects } from "../../store/projectsSlice";
import PropertyCard from "../../components/PropertyCard";

const MotionBox = motion(Box);

const Properties = () => {
  const dispatch = useDispatch();
  var properties = useSelector(getProjects);

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);
  
  return (
    <Box id="properties" sx={{ backgroundColor: "#191919", width: "100vw" }}>
      <Navbar />
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        sx={{
          background: "linear-gradient(53deg, #262626 0%, #141414 53%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          py: 8,
          px: { xs: 2, md: 5, lg: 10 },
          textAlign: "start",
          gap: "24px",
          paddingBottom: "120px",
          borderBottom: "1px solid #262626",
        }}
      >
        <Typography variant="h3" fontSize={48}>
          Find Your Dream Property
        </Typography>
        <Typography variant="body2" color="#999999" width={"90%"}>
          Welcome to RK's, where your dream property awaits in every corner of
          our beautiful world. Explore our curated selection of properties, each
          offering a unique story and a chance to redefine your life. With
          categories to suit every dreamer, your journey.
        </Typography>
      </MotionBox>

      {/* Search Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 0,
          px: { xs: 2, sm: 4 },
          py: { xs: 4, sm: 6 },
          mt: -10, // Pull up slightly but avoid overlap
          zIndex: 2,
        }}
      >
        <FormControl sx={{ width: "100%", maxWidth: "700px", backgroundColor: "#262626", pt:1, px:1, borderRadius: "10px 10px 0 0", }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            sx={{
              padding: "16px",
              border: "1px solid #262626",
              borderRadius: "16px",
              backgroundColor: "#141414",
              color: "white",
            }}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#703BF7", color: "white" }}
                >
                  Find Property
                </Button>
              </InputAdornment>
            }
            placeholder="Search for a Property"
          />
        </FormControl>

        <Grid2
          container
          spacing={1}
          sx={{
            width: "100%",
            maxWidth: "900px",
            backgroundColor: "#262626",
            borderRadius: "10px",
            p: 1,
          }}
        >
          {["Location", "Property Type", "Pricing Range", "Property Size", "Build Year"].map((label, idx) => (
            <Grid2 item size={{xs:12, sm:6, md:2.4}} key={idx}>
              <TextField
                sx={{ backgroundColor: "#141414", color: "white" }}
                fullWidth
                variant="outlined"
                placeholder={label}
                size="small"
              />
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Grid2 container spacing={4} sx={{ px: { xs: 2, sm: 4, md: 8 }, py: 6 }}>
        {properties.map((property) => (
          <PropertyCard key={property.id} item={property} />
        ))}
      </Grid2>

      {/* <RealEstateCTA /> */}
      <FooterComponent />
    </Box>
  );
};

export default Properties;
