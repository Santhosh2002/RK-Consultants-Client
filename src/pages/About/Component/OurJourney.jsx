import React, { useState } from "react";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";


const OurJourney = () => {
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
        backgroundColor: "#141414",
        color: "white",
        padding:"8px 100px 0 40px"
      }}
    >
      {/* Left Content */}
      <Box sx={{display:"flex", flexDirection:"column", justifyContent:'flex-start', alignItems:'flex-start', flex:1, padding:"60px", gap:"80px" }}>
        <motion.div style={{display:"flex", flexDirection:"column", gap:'16px'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <img
            src="/Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" fontWeight={600}>
            Our Journey
          </Typography>
          <Typography variant="body1" sx={{ color: "#999999" }}>
            Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary. Over the years, we've expanded our reach, forged valuable partnerships, and gained the trust of countless clients.
          </Typography>
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
          src="Icons/Home_on_hand.svg"
          alt="Modern Building"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </Box>
    </Box>
  );
};

export default OurJourney;
