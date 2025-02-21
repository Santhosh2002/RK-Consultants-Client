import React, { useState } from "react";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";


const HeroSection = () => {
  const [stats, setStats] = useState([
    {title:"Happy Customer", value: 200, divisor: 1, suffix: ""},
    {title:"Properties For Clients", value: 10000, divisor: 1000, suffix:"K"},
    {title:"Years of Experience", value: 16, divisor: 1, suffix:""},
  ])
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#0d0d0d",
        color: "white",
      }}
    >
      {/* Left Content */}
      <Box sx={{display:"flex", flexDirection:"column", justifyContent:'flex-start', alignItems:'flex-start', flex:1, padding:"60px" }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Typography variant="h3" fontWeight={600} gutterBottom>
            Discover Your Dream Property with RK
          </Typography>
          <Typography variant="body1" sx={{ color: "#b0b0b0" }}>
            Your journey to finding the perfect property begins here. Explore our listings to find the home that matches your dreams.
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div style={{display:"flex", flexDirection:"row", gap:'16px', padding:"40px 0"}} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <Button
            href="/contact"
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "white",
              backgroundColor: "#1A1A1A",
              border: "1px solid rgba(255, 255, 255, 0.3)" ,
              '&:hover': {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
              },
            }}
          >
            Learn More
          </Button>
          <Button
            // href="/contact"
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "white",
              backgroundColor: "#6a39f8",
            }}
          >
            Browse Properties
          </Button>
        </motion.div>

        {/* Stats Section */}
        <Grid2 container spacing={3} sx={{ width:'100%' }}>
          {stats.map((item, index) => (
            <Grid2 item size={{ xs:12, sm:4 }} key={index} sx={{flex: 1}}>
              <Box
                sx={{
                  background: "rgba(255, 255, 255, 0.1)",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "left",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">
                  {`${item.value / item.divisor}${item.suffix}+`}
                </Typography>
                <Typography variant="body2" sx={{ color: "#b0b0b0", whiteSpace:"nowrap" }}>
                  {item.title}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Right Image */}
      <Box sx={{display:'flex', flex:1}}>
        <motion.img
          src="Icons/Container.svg"
          alt="Modern Building"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
