import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Box, Drawer, List, ListItem, ListItemText, Button } from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects/Listings", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "mailto:info@rkrealco.com" },
  { label: "Social", href: "https://www.youtube.com/@RKRealtorsConsultants" },
  { label: "Payments", href: "" },
];

const Navbar = ({ logo }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#1A1A1A", boxShadow: "none", py: 1 }}>
      <Toolbar sx={{ maxWidth: "1300px", mx: "auto", display: "flex", justifyContent: "space-between" }}>
        
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="Logo" style={{ width: "140px", height: "auto", filter: "invert(1)" }} />
        </Box>

        {/* Desktop Navigation */}
        <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4, alignItems: "center" }}>
          {navItems.map((item) => (
            <Button 
              key={item.label} 
              href={item.href} 
              sx={{ 
                color: "white", 
                textTransform: "none", 
                fontSize: "18px", 
                fontWeight: "500", 
                padding: "8px 16px",
                "&:hover": { color: "#FFD700" } 
              }}
            >
              {item.label}
            </Button>
          ))}
          <Button
            variant="contained"
            href="https://docs.google.com/forms/d/e/1FAIpQLScHPK67SznmrqYkqI6pchgyrKSvIc6hMn-mlcmpIdvJL6Q8hg/viewform?usp=sf_link"
            sx={{
              backgroundColor: "green",
              fontSize: "18px",
              fontWeight: "600",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
          >
            List Your Property
          </Button>
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{ color: "white", display: { md: "none" } }}
        >
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
            <ListItem button component="a" href="https://docs.google.com/forms/d/e/1FAIpQLScHPK67SznmrqYkqI6pchgyrKSvIc6hMn-mlcmpIdvJL6Q8hg/viewform?usp=sf_link">
              <ListItemText 
                primary="List Your Property" 
                sx={{ fontSize: "18px", fontWeight: "600", textAlign: "center", color: "green" }} 
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
