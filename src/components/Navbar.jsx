import React, { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton, Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const navItems = [
  { label: "Home", href: "/", isButton: true },
  { label: "About Us", href: "/about" },
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "Contact Us", href: "/contact", isButton: false },
];

const Navbar = ({ logo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="relative" sx={{ backgroundColor: "#1A1A1A", boxShadow: "none" }}>
      <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center", padding:"0 32px" }}>
        {/* Logo */}
        <Box>
          <img src="Icons/RK_Logo_White_No_Slogan.svg" alt="Logo" style={{ width: "auto", height: "30px" }} />
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button
              key={item.label}
              href={item.href}
              variant={item.isButton ? "contained" : "text"}
              sx={{
                color: "white",
                textTransform:"none",
                backgroundColor: item.isButton ? "#1A1A1A" : "transparent",
                borderRadius: "8px",
                border: item.isButton ? "1px solid rgba(255, 255, 255, 0.3)" : "none",
                '&:hover': {
                  backgroundColor: item.isButton ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  color: "#FFFFFF",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        <Button
          href="/listyourproperty"
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
          List your Property
        </Button>

        {/* Mobile Menu Icon */}
        <IconButton onClick={() => setIsDrawerOpen(true)} sx={{ color: "white", display: { md: "none" } }}>
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Toolbar>

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
                <ListItemText 
                  primary={item.label} 
                  sx={{ fontSize: "18px", fontWeight: "500", textAlign: "center" }} 
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
