import React, { useState } from "react";
import { Box, Button, Typography, Grid2, Divider } from "@mui/material";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import SchoolIcon from "@mui/icons-material/School";
import GroupsIcon from "@mui/icons-material/Groups";
import VerifiedIcon from "@mui/icons-material/Verified";

const OurValues = () => {
  const [stats, setStats] = useState([
    { title: "Happy Customer", value: 200, divisor: 1, suffix: "" },
    {
      title: "Properties For Clients",
      value: 10000,
      divisor: 1000,
      suffix: "K",
    },
    { title: "Years of Experience", value: 16, divisor: 1, suffix: "" },
  ]);
  const values = [
    {
      icon: <StarIcon />,
      title: "Trust",
      description:
        "Trust is the cornerstone of every successful real estate transaction.",
    },
    {
      icon: <SchoolIcon />,
      title: "Excellence",
      description:
        "We set the bar high for ourselves. From the properties we list to the services we provide.",
    },
    {
      icon: <GroupsIcon />,
      title: "Client-Centric",
      description:
        "Your dreams and needs are at the center of our universe. We listen, understand.",
    },
    {
      icon: <VerifiedIcon />,
      title: "Our Commitment",
      description:
        "We are dedicated to providing you with the highest level of service, professionalism, and support.",
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#141414",
        color: "white",
        width: "100%",
        padding: { xs: "16px", sm: "64px" },
      }}
    >
      {/* Left Content */}
      <motion.div
        style={{
          width: "40%",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          padding: "60px",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/icons/abstract-Design.svg"
          alt="Icon"
          style={{ width: 70, height: "auto", marginRight: 10 }}
        />
        <Typography variant="h3" fontWeight={600} fontSize={48}>
          Our Values
        </Typography>
        <Typography variant="body1" sx={{ color: "#999999" }}>
          Our story is one of continuous growth and evolution. We started as a
          small team with big dreams, determined to create a real estate
          platform that transcended the ordinary.
        </Typography>
      </motion.div>

      {/* Right Section (Values Box) */}
      {/* <Box sx={{display:"flex", flexDirection:'column', padding:"30px", justifyContent:'space-between', alignItems:"center"}}>
        <Box>

        </Box>
        <Divider sx={{color:"#262626"}} />
        <Box></Box>
      </Box> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          flex: 1,
          padding: "40px",
          borderRadius: "12px",
          background: "#141414",
          border: "5px solid #262626",
          boxShadow: "0px 0px 30px #262626",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
          width: "60%",
        }}
      >
        {values.map((item, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              padding: "25px",
              position: "relative",
              gap: "16px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <Box
                sx={{
                  width: "50px",
                  height: "50px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #A187F0",
                  borderRadius: "50%",
                  color: "#A187F0",
                }}
              >
                {item.icon}
              </Box>
              <Typography variant="h6" fontWeight={600}>
                {item.title}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: "#999999" }}>
              {item.description}
            </Typography>

            {/* Add Dividers */}
            {index % 2 === 0 && (
              <Divider
                sx={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "80%",
                  borderColor: "#262626",
                }}
                orientation="vertical"
              />
            )}
            {index < values.length - 3 ? (
              <Divider
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "200%",
                  borderColor: "#262626",
                }}
              />
            ) : null}
          </Box>
        ))}
      </motion.div>
    </Box>
  );
};

export default OurValues;
