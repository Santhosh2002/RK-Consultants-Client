import React from "react";
import { motion } from "framer-motion";
import { Box, Typography, TextField, Button, MenuItem, InputAdornment, Grid2, OutlinedInput, FormControl } from "@mui/material";
import { Search } from "@mui/icons-material";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import PropertyListing from "../../components/PropertyListing";

const MotionBox = motion(Box);

const Properties = () => {
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
          paddingBottom:"120px",
          borderBottom:"1px solid #262626"
        }}
      >
        <Typography variant="h3" fontSize={48}>
          Find Your Dream Property
        </Typography>
        <Typography variant="body2" color="#999999" width={"90%"}>
          Welcome to RK's, where your dream property awaits in every corner of our beautiful world. Explore our curated selection of properties, each offering a unique story and a chance to redefine your life. With categories to suit every dreamer, your journey.
        </Typography>
      </MotionBox>

      {/* Search Section */}
      <Box
        sx={{
          position:'absolute',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          top:"320px",
          width:'100%'
        }}
      >
        <FormControl sx={{ width: '60%' }} variant="outlined">
          <OutlinedInput
            id="outlined-adornment-search"
            sx={{ padding: "16px", border: "5px solid #262626", borderBottom:"0px", borderRadius: "16px 16px 0 0", backgroundColor:"#141414" }}
            endAdornment={
              <InputAdornment position="end">
                <Button variant="contained" sx={{ backgroundColor: "#703BF7", color:"white" }}>
                  Find Property
                </Button>
              </InputAdornment>
            }
            placeholder="Search for a Property"
          />
        </FormControl>

        <Grid2 container spacing={1} sx={{ width: "80%", backgroundColor: "#262626", borderRadius: "10px", padding: 1 }}>
          <Grid2 item size={{xs:12, sm:2.4}}>
            <TextField sx={{backgroundColor:"#141414", color:"white"}} fullWidth variant="outlined" placeholder="Location">
            </TextField>
          </Grid2>
          <Grid2 item size={{xs:12, sm:2.4}}>
            <TextField sx={{backgroundColor:"#141414", color:"white"}} fullWidth variant="outlined" placeholder="Property Type">
              {/* <MenuItem value="apartment">Apartment</MenuItem>
              <MenuItem value="villa">Villa</MenuItem> */}
            </TextField>
          </Grid2>
          <Grid2 item size={{xs:12, sm:2.4}}>
            <TextField sx={{backgroundColor:"#141414", color:"white"}}  fullWidth variant="outlined" placeholder="Pricing Range">
            </TextField>
          </Grid2>
          <Grid2 item size={{xs:12, sm:2.4}}>
            <TextField sx={{backgroundColor:"#141414", color:"white"}} fullWidth variant="outlined" placeholder="Property Size">
            </TextField>
          </Grid2>
          <Grid2 item size={{xs:12, sm:2.4}}>
            <TextField sx={{backgroundColor:"#141414", color:"white"}} fullWidth variant="outlined" placeholder="Build Year">
            </TextField>
          </Grid2>
        </Grid2>
      </Box>
      <Box sx={{paddingTop:"90px", backgroundColor:"#141414"}}>
        <PropertyListing />
      </Box>
      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default Properties;
