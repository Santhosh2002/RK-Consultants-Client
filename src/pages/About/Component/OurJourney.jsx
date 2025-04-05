import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Box, Button, Typography, Grid2 } from "@mui/material";
import { motion } from "framer-motion";
import { fetchStats } from "../../../store/statsSlice";

const OurJourney = () => {
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
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column-reverse", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#141414",
        color: "white",
        padding: { xs: "0 16px", sm: "0 64px" },
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
          padding: { xs: "32px", sm: "60px" },
          gap: "80px",
        }}
      >
        <motion.div
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src="/Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" fontWeight={600} fontSize={48}>
            Our Journey
          </Typography>
          <Typography variant="body1" sx={{ color: "#999999" }}>
            Our story is one of continuous growth and evolution. We started as a
            small team with big dreams, determined to create a real estate
            platform that transcended the ordinary. Over the years, we've
            expanded our reach, forged valuable partnerships, and gained the
            trust of countless clients.
          </Typography>
        </motion.div>

        {/* Stats Section */}
        <Grid2
          container
          spacing={3}
          sx={{ width: "100%" }}
          direction={{ xs: "column", sm: "row" }}
        >
          {stats.map((stat, index) => (
            <Grid2 item size={{ xs: 12, sm: 4 }} key={index} sx={{ flex: 1 }}>
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
                {stat.value}
                {stat.suffix}
                +
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#b0b0b0", whiteSpace: "nowrap" }}
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
          src="/Icons/Home_on_hand.svg"
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
