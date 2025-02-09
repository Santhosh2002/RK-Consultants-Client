import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button, Box, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { motion } from "framer-motion";
import Logo from "./Logo";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "#about" },
  { label: "Projects/Listings", href: "#projects"  }, //"/projects"
  { label: "Services", href: "#services" },
  { label: "Contact", href: "mailto:info@rkrealco.com" },
  { label: "Social", href: "https://www.youtube.com/@RKRealtorsConsultants" },
  { label: "Payments", href: "" },
];

export const HeroSection = ({ logo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = ["/slider-img-02.jpg", "/slider-img-01.jpg", "/slider-img-03.jpg", "/slider-img-04.jpg"];
  const text = [
    "Quick and hassle-free real estate solutions tailored to your needs.",
    "Your one-stop solution for all your business needs.",
    "Navigate through complex tax regulations with ease.",
    "Unlock access to the best deals in the market – List your property with us today!",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Navbar */}
      <AppBar position="fixed" sx={{ background: "rgba(0,0,0,0.85)", boxShadow: "none", paddingY: 1 }}>
        <Toolbar sx={{width:"100%", display: "flex", flexDirection:"row", justifyContent: "space-between", alignItems: "center" }}>
          {/* Left-aligned Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <img 
                src={logo} 
                alt="logo" 
                style={{
                height: "50px",  // Set proper height
                width: "auto",    // Maintain aspect ratio
                maxHeight: "60px", // Prevents oversized logo on larger screens
                objectFit: "contain" // Ensures it looks clear
                }} 
            /> */}
            <Logo />
          </Box>
          {/* Right-aligned Navigation */}
          <Box>
            <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
                {navItems.map((item) => (
                <Button
                    key={item.label}
                    href={item.href}
                    sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "18px",
                    fontWeight: "500",
                    "&:hover": { color: "#FFD700" },
                    }}
                >
                    {item.label}
                </Button>
                ))}
                <Button
                variant="contained"
                href="https://docs.google.com/forms/d/e/1FAIpQLScHPK67SznmrqYkqI6pchgyrKSvIc6hMn-mlcmpIdvJL6Q8hg/viewform?usp=sf_link"
                sx={{
                    backgroundColor: "#FFD700",
                    fontSize: "16px",
                    fontWeight: "600",
                    padding: "8px 16px",
                    textTransform: "none",
                    "&:hover": { backgroundColor: "#FFC107" },
                }}
                >
                List Your Property
                </Button>
            </Box>
            {/* Mobile Menu */}
            <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ color: "white", display: { md: "none" } }}>
                <MenuIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ width: 280 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem button key={item.label} component="a" href={item.href} onClick={() => setIsDrawerOpen(false)}>
                <ListItemText primary={item.label} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Hero Section */}
      <Box sx={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        {/* Background Image with Slow Transition */}
        <motion.img
          key={currentImageIndex}
          src={images[currentImageIndex]}
          alt="Background"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        {/* Hero Content */}
        <Box
          sx={{
            zIndex: 1,
            textAlign: "center",
            color: "white",
            background: "rgba(0,0,0,0.6)",
            padding: "40px",
            borderRadius: "10px",
            maxWidth: "600px",
          }}
        >
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-semibold leading-tight">{text[currentImageIndex]}</h1>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }} className="text-lg mt-4">
            RK Realtors & Tax Consultants provide a comprehensive solution for all your real estate and business needs.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
            <Button
              href="#services"
              sx={{
                backgroundColor: "#FFD700",
                color: "black",
                fontSize: "16px",
                fontWeight: "600",
                padding: "12px 24px",
                borderRadius: "8px",
                marginTop: "24px",
                "&:hover": { backgroundColor: "#FFC107" },
              }}
            >
              Get Started
            </Button>
          </motion.div>
        </Box>
      </Box>
    </>
  );
};
