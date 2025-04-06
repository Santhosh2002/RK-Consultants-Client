import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, keyframes } from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { fetchClients, getClients } from "../store/clientSlice";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(127, 98, 241, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(127, 98, 241, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(127, 98, 241, 0);
  }
`;


const ServicesSection = () => {
  const dispatch = useDispatch();
  const clients = useSelector(getClients);
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchClients());
      } catch (err) {
        console.error("Failed to fetch clients:", err);
      }
    };
    fetchData();
  }, [dispatch]);
  
  useEffect(()=>{
    console.log(clients);
  },[clients]);

  const getServices = async () => {
    setIsLoading(true);
    const base = import.meta.env.VITE_BASE_URL;
    const url = `${base}/api/service`;
    try {
      const response = await axios.get(url);
      setServices(response.data.services);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0d",
        color: "white",
        padding: "20px",
        textAlign: "center",
        border: "5px solid #262626",
        boxShadow: "inset 0px 0px 20px #262626",
        overflow: "hidden",
        width: "100%",
        position: "relative",
      }}
    >
      <motion.div
        style={{ display: "flex", gap: "20px", whiteSpace: "nowrap" }}
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {[...clients, ...clients].map((client, index) => {
          const showLogo = client.companyLogo && client.companyLogo.trim() !== "";
          const companyInitial = client.companyName?.charAt(0).toUpperCase() || "?";

          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "relative",
                background: "#1A1A1A",
                padding: "20px",
                borderRadius: "12px",
                textAlign: "center",
                border: "1px solid #262626",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                cursor: "pointer",
                gap: "16px",
                minWidth: "300px",
              }}
            >
              <ArrowOutwardIcon
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  fontSize: 20,
                  color: "#4D4D4D",
                }}
              />
              <Box
                sx={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  backgroundColor: showLogo ? "transparent" : "#4D4D4D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                {showLogo ? (
                  <img
                    src={client.companyLogo}
                    alt={client.companyName}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      backgroundColor: "#1e1e1e",
                      border: "1px solid #7f62f1",
                      boxShadow: "0 0 10px #7f62f166, 0 0 20px #7f62f133",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      fontWeight: "600",
                      color: "#b490ff", // matching icon fill
                      position: "relative",
                      animation: `${pulse} 2s infinite ease-in-out`,
                    }}
                  >
                    {companyInitial}
                  </Box>

                )}
              </Box>
              <Typography variant="body2">{client.companyName}</Typography>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default ServicesSection;
