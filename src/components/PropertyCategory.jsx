import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  styled,
  ToggleButton,
  Stack,
} from "@mui/material";
import ToggleButtonGroup, {
  toggleButtonGroupClasses,
} from "@mui/material/ToggleButtonGroup";

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
  backgroundColor: "#1A1A1A",
  display: "flex",
  gap: "4px",
  padding: "4px",
  borderRadius: "8px",
  "& .MuiToggleButton-root": {
    minWidth: "80px", // Ensures uniform button size
    flex: 1,
    textTransform: "none",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    border: "none", // Remove any default border
    borderRadius: "8px", // Smooth corners
  },
});
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Bed } from "@mui/icons-material";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BalconyIcon from "@mui/icons-material/Balcony";
import GridOnIcon from "@mui/icons-material/GridOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const property = {
  title: "Seaside Serenity Villa",
  location: "Malibu, California",
  image: "/property-catagory-1.png",
  size: "1980 sq.ft.",
  type: "East | Type-2",
  features: [
    {
      icon: <KingBedIcon fontSize="8px" color="#999" />,
      label: "Bedrooms",
      value: "04",
    },
    {
      icon: <BathtubIcon fontSize="8px" color="#999" />,
      label: "Bathrooms",
      value: "03",
    },
    {
      icon: <SquareFootIcon fontSize="8px" color="#999" />,
      label: "Rera Carpet Area",
      value: "1242 sq.ft.",
    },
    {
      icon: <BalconyIcon fontSize="8px" color="#999" />,
      label: "Balcony Area",
      value: "138 sq.ft.",
    },
    {
      icon: <GridOnIcon fontSize="8px" color="#999" />,
      label: "Common Area",
      value: "464 sq.ft.",
    },
    {
      icon: <AccountBalanceIcon fontSize="8px" color="#999" />,
      label: "External Wall’s Area",
      value: "138 sq.ft.",
    },
  ],
};

const PropertyCategory = () => {
  const [alignment, setAlignment] = useState("East");

  const handleToggle = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
    }
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "center",
          gap: "16px",
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={46} fontWeight={600}>
          {property.title}
        </Typography>
        <Chip
          icon={
            <LocationOnIcon sx={{ color: "#A187F0", fontSize: "medium" }} />
          }
          label={property.location}
          variant="outlined"
          sx={{ color: "white", borderRadius: "8px" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          background: "#1A1A1A",
          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "0 16px 0 16px",
            gap: "8px",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Unit Plan
          </Typography>
          <Chip
            icon={<Bed sx={{ color: "#A187F0" }} />}
            label="3BHK"
            variant="outlined"
            sx={{ background: "#262626", color: "white", borderRadius: "8px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: "0 16px 0 16px",
            gap: "32px",
            width: "100%",
          }}
        >
          {/* Left Section - Image */}
          <Box
            component="img"
            src={property.image}
            alt="property"
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
              width: "40%",
            }}
          />

          {/* Right Section - Details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "50%",
              gap: "16px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: "16px",
              }}
            >
              <Typography
                variant="h4"
                fontWeight={600}
                fontSize={42}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {property.size}{" "}
                <Typography variant="h4" sx={{ color: "#999" }}>
                  ({property.type})
                </Typography>
              </Typography>
              <Typography variant="h5" sx={{ color: "#999" }}>
                Homes designed for better living
              </Typography>

              <Grid2 container spacing={2} alignItems={"center"}>
                <Grid2
                  item
                  size={{
                    xs: 6,
                  }}
                >
                  <StyledToggleButtonGroup
                    value={alignment}
                    exclusive
                    onChange={handleToggle}
                  >
                    <ToggleButton
                      value="East"
                      sx={{
                        backgroundColor: alignment === "East" ? "#000" : "#333", // Selected: Black, Unselected: Gray
                        color: "white",
                        border:
                          alignment === "West"
                            ? "1px solid white !important"
                            : "none", // Ensure white border appears
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor:
                            alignment === "East" ? "#111" : "#444", // Slight hover effect
                        },
                        maxWidth: "120px",
                      }}
                    >
                      EAST
                    </ToggleButton>
                    <ToggleButton
                      value="West"
                      sx={{
                        backgroundColor: alignment === "West" ? "#000" : "#333", // Selected: Black, Unselected: Gray
                        color: "white",
                        border:
                          alignment === "West"
                            ? "1px solid white !important"
                            : "none", // Ensure white border appears
                        padding: "10px 20px",
                        borderRadius: "8px",
                        "&:hover": {
                          backgroundColor:
                            alignment === "West" ? "#111" : "#444",
                        },
                        maxWidth: "120px",
                      }}
                    >
                      WEST
                    </ToggleButton>
                  </StyledToggleButtonGroup>
                </Grid2>
                <Grid2
                  item
                  size={{
                    xs: 6,
                  }}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      color: "white",
                      border: "1px solid #999",
                      padding: "15px 10px",
                      minHeight: "45px",
                      borderRadius: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                    onClick={handleClick}
                    endIcon={
                      <ArrowForwardIosIcon
                        fontSize="small"
                        sx={{
                          transition: "transform 0.2s ease",
                          transform: open ? "rotate(90deg)" : "rotate(0deg)", // Rotates when open
                        }}
                      />
                    }
                  >
                    Type 2
                  </Button>

                  {/* Dropdown Menu */}
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>Option 1</MenuItem>
                    <MenuItem onClick={handleClose}>Option 2</MenuItem>
                    <MenuItem onClick={handleClose}>Option 3</MenuItem>
                  </Menu>
                </Grid2>
              </Grid2>

              <Divider sx={{ borderColor: "#262626" }} />

              <Grid2 container spacing={4}>
                {property.features.map((feature, index) => (
                  <Grid2
                    item
                    size={{
                      xs: 6,
                    }}
                    key={index}
                  >
                    <Stack direction={"row"} spacing={1} alignItems={"center"}>
                      {feature.icon && <>{feature.icon}</>}
                      <Typography variant="body1" sx={{ color: "#999" }}>
                        {feature.label}
                      </Typography>
                    </Stack>
                    <Typography variant="h6" fontWeight={600}>
                      {feature.value}
                    </Typography>
                  </Grid2>
                ))}
              </Grid2>
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6A5ACD",
                color: "#fff",
                textTransform: "none",
                color: "white",
                padding: "20px 20px",
                minHeight: "50px",
                borderRadius: "8px",
                width: "fit-content",
                justifyContent: "start",
              }}
              endIcon={<ArrowForwardIosIcon fontSize="small" />}
            >
              View More Details
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default PropertyCategory;
