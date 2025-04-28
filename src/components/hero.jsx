import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import { fetchStats } from "../store/statsSlice";

const HeroSection = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState([
    { title: "Happy Customer", value: 0, apiKey: "happyClients", divisor: 1, suffix: "" },
    { title: "Properties For Clients", value: 0, apiKey: "projects", divisor: 1, suffix: "K" },
    { title: "Years of Experience", value: 0, apiKey: "daysOfWork", divisor: 365, suffix: "" },
  ]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchStats());
        console.log("Full payload:", response.payload);
  
        if (response.meta.requestStatus === "fulfilled") {
          const statsData = response.payload; // <--- Fix is here
  
          setStats((prevStats) =>
            prevStats.map((stat) => ({
              ...stat,
              value: Math.floor((statsData?.[stat.apiKey] || 0) / stat.divisor),
            }))
          );
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      }
    };
  
    fetchData();
  }, [dispatch]);
  
  

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: "stretch",
        justifyContent: "space-between",
        backgroundColor: "#0d0d0d",
        color: "white",
        padding: "0px",
      }}
    >
      {/* Left Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          flex: 1,
          padding: "60px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h1" fontSize={60} fontWeight={500} gutterBottom>
            Discover Your Dream Property with RK
          </Typography>
          <Typography variant="body1" sx={{ color: "#b0b0b0" }}>
            Your journey to finding the perfect property begins here. Explore
            our listings to find the home that matches your dreams.
          </Typography>
        </motion.div>

        {/* Buttons */}
        <motion.div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "16px",
            padding: "40px 0",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            href="/contact"
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "white",
              backgroundColor: "#1A1A1A",
              border: "1px solid #262626",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.2)",
                color: "#FFFFFF",
              },
            }}
          >
            Learn More
          </Button>
          <Button
            href="/properties"
            variant="contained"
            sx={{
              display: { xs: "none", md: "flex" },
              color: "white",
              backgroundColor: "#703BF7",
            }}
          >
            Browse Properties
          </Button>
        </motion.div>

        {/* Stats Section */}
        <Grid2
          container
          spacing={3}
          sx={{ width: "100%" }}
          direction={{ xs: "column", sm: "row" }}
        >
          {stats.map((stat, index) => (
            <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ flex: 1 }}>
              <Box
                sx={{
                  background: "#1A1A1A",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "left",
                  border: "1px solid #262626",
                  width: "100%", // <--- important to prevent overflow
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4">
                  {stat.value}
                  {stat.suffix}
                  +
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", whiteSpace: "wrap" }}
                >
                  {stat.title}
                </Typography>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Right Image */}
      <Box sx={{ display: "flex", flex: 1 }}>
        <motion.img
          src="/Icons/Container.svg"
          alt="Modern Building"
          style={{
            alignItems:'center',
            height:"100%",
            width:"100%",
            objectFit: "cover",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </Box>
    </Box>
  );
};

export default HeroSection;
