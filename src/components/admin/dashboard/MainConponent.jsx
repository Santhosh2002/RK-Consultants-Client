import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
  Tooltip,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import BarChartIcon from "@mui/icons-material/BarChart";
import BuildIcon from "@mui/icons-material/Build";
import WorkIcon from "@mui/icons-material/Work";
import ListIcon from "@mui/icons-material/List";
import SettingsIcon from "@mui/icons-material/Settings";
import StatsComponent from "./StatsComponent";
import ServicesComponent from "./ServicesComponent";
import AdminProjectsComponent from "./ProjectComponent";
import GeneralSettings from "./GeneralSettings";
import ListingComponent from "./ListingComponent";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import RKLogo from "./RkLogo";
import { useSelector } from "react-redux";
import { getProfile } from "../../../store/authSlice";

function MainComponent() {
  const [userName, setUserName] = useState("");
  const [selectedPage, setSelectedPage] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const profile = useSelector(getProfile);

  const renderContent = () => {
    switch (selectedPage) {
      case 0:
        return <StatsComponent />;
      case 1:
        return <ServicesComponent />;
      case 2:
        return <AdminProjectsComponent />;
      case 3:
        return <ListingComponent />;
      default:
        return <GeneralSettings />;
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundColor: "#141414",
        color: "#fff",
      }}
    >
      <Sidebar
        isOpen={isSidebarOpen}
        setSelectedPage={setSelectedPage}
        selectedPage={selectedPage}
        setIsSidebarOpen={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          transition: "margin 0.3s",
          marginLeft: isSidebarOpen ? "300px" : "80px",
        }}
      >
        <Nav
          profile={profile}
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />
        <Box sx={{ marginTop: "70px" }}>{renderContent()}</Box>
      </Box>
    </Box>
  );
}

export default MainComponent;

// Sidebar Component
const Sidebar = ({
  isOpen,
  setSelectedPage,
  selectedPage,
  setIsSidebarOpen,
}) => {
  const navigate = useNavigate();
  const menuItems = [
    { text: "Stats", icon: <BarChartIcon /> },
    { text: "Services", icon: <BuildIcon /> },
    { text: "Projects", icon: <WorkIcon /> },
    { text: "Listings", icon: <ListIcon /> },
    { text: "General Settings", icon: <SettingsIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      open={isOpen}
      sx={{
        "& .MuiDrawer-paper": {
          width: isOpen ? 300 : 80,
          backgroundColor: "#141414",
          color: "#fff",
          overflowX: "hidden",
          transition: "width 0.3s",
          borderRight: "1px solid #333",
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #333",
          height: "70px",
          maxHeight: "70px",
        }}
      >
        {isOpen && (
          <Box sx={{ display: "flex", alignItems: "center", width: "150px" }}>
            <RKLogo />
          </Box>
        )}
        <IconButton onClick={setIsSidebarOpen} sx={{ color: "#fff" }}>
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>
      <List sx={{ padding: "0 10px 0 10px" }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.text}
            onClick={() => setSelectedPage(index)}
            sx={{
              backgroundColor: selectedPage === index ? "#333" : "transparent",
              borderRadius: "8px",
              margin: "10px 0",
              border: selectedPage === index ? "1px solid white" : "none",
              "&:hover": { backgroundColor: "#222" },
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Tooltip title={item.text} placement="right">
              <ListItemIcon
                sx={{ color: "#fff", minWidth: isOpen ? "auto" : 36 }}
              >
                {item.icon}
              </ListItemIcon>
            </Tooltip>
            {isOpen && (
              <ListItemText primary={item.text} sx={{ color: "#fff" }} />
            )}
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2, borderTop: "1px solid #333", marginTop: "auto" }}>
        {isOpen ? (
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
        ) : (
          <IconButton
            onClick={() => {
              localStorage.removeItem("authToken");
              navigate("/admin/login");
            }}
            color="error"
            variant="contained"
          >
            <Tooltip title="Logout" placement="right">
              <Logout />
            </Tooltip>
          </IconButton>
        )}
      </Box>
    </Drawer>
  );
};

// Nav Component
const Nav = ({ profile, toggleSidebar, isSidebarOpen, handleMenuClick }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#141414",
        borderBottom: "1px solid #333",
        height: "70px",
        maxHeight: "70px",
      }}
    >
      <Toolbar>
        {/* <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleSidebar}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
          RK Realtors & Consultants
        </Typography>
        <Box
          sx={{
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",

            border: "1px solid #333",
            borderRadius: "50px",
            padding: "8px",
          }}
        >
          <Avatar sx={{ bgcolor: "#4caf50" }}>
            {profile?.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography sx={{ ml: 1 }}>{profile?.username}</Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
