import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import {
  setNavBarButton,
  getNavBarButton,
} from "../store/generalSettingsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Properties", path: "/properties" },
  { label: "Services", path: "/services" },
  { label: "Contact Us", path: "/contact" },
];

const getPageFromPath = (pathname) => {
  if (pathname === "/listyourproperty") return null; // No tab selected on this page
  const matchedItem = navItems.find((item) => item.path === pathname);
  return matchedItem ? matchedItem.label : "Home"; // Default to "Home"
};

const Navbar = ({ logo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const selectedButton = useSelector(getNavBarButton);

  // Sync navbar state with URL on page load and route changes
  useEffect(() => {
    const currentPage = getPageFromPath(location.pathname);
    dispatch(setNavBarButton(currentPage));
  }, [location.pathname, dispatch]);

  const handleNavigation = (path, label) => {
    dispatch(setNavBarButton(label)); // Update Redux state
    navigate(path); // Navigate without reloading
  };

  return (
    <AppBar
      position="relative"
      sx={{ backgroundColor: "#1A1A1A", boxShadow: "none", width: "100%" }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 32px",
        }}
      >
        {/* Logo */}
        <Box>
          <img
            src="icons/RK_Logo_White_No_Slogan.svg"
            alt="Logo"
            style={{ width: "auto", height: "30px" }}
          />
        </Box>

        {/* Desktop Navigation */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            alignItems: "center",
          }}
        >
          {navItems.map((item) => (
            <Button
              key={item.label}
              onClick={() => handleNavigation(item.path, item.label)}
              variant={item.label === selectedButton ? "contained" : "text"}
              sx={{
                color: "white",
                textTransform: "none",
                backgroundColor:
                  item.label === selectedButton ? "#141414" : "transparent",
                borderRadius: "8px",
                border:
                  item.label === selectedButton ? "2px solid #262626" : "none",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>

        {/* "List your Property" button should NOT affect navbar selection */}
        <Button
          onClick={() => handleNavigation("/listyourproperty", null)}
          variant="contained"
          sx={{
            display: { xs: "none", md: "flex" },
            color: "white",
            backgroundColor: "#141414",
            border: "1px solid #262626",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "#FFFFFF",
            },
          }}
        >
          List your Property
        </Button>

        {/* Mobile Menu Icon */}
        <IconButton
          onClick={() => setIsDrawerOpen(true)}
          sx={{ color: "white", display: { md: "none" } }}
        >
          <MenuIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </Toolbar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box sx={{ width: 280 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", p: 2 }}>
            <IconButton onClick={() => setIsDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List>
            {navItems.map((item) => (
              <ListItem
                key={item.label}
                onClick={() => {
                  handleNavigation(item.path, item.label);
                  setIsDrawerOpen(false);
                }}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    item.label === selectedButton ? "#262626" : "transparent",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{ textAlign: "center", color: "white" }}
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
