import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
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
import { useParams } from "react-router-dom";

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
import {
  ArrowBack,
  ArrowBackIosNew,
  ArrowForward,
  Bed,
} from "@mui/icons-material";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BalconyIcon from "@mui/icons-material/Balcony";
import GridOnIcon from "@mui/icons-material/GridOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import BoltIcon from "@mui/icons-material/Bolt";
import { getselectedProject } from "../store/projectsSlice";

const Dot = styled("div")(({ theme, active }) => ({
  height: "8px",
  width: "16px",
  borderRadius: "4px",
  backgroundColor: active ? "#A187F0" : "#5f6368", // Active color can be customized
  transition: "all 0.3s ease",
}));

const PropertySpecifications = () => {
  const { variantId } = useParams();
  const property = useSelector(getselectedProject);
  const selectedVariant = property?.variants?.find(v => v._id === variantId);
  const activeVariant = selectedVariant || property?.variants?.[0] || null;
  const [alignment, setAlignment] = useState("East");

  useEffect(()=>{
    console.log("Property", property);
  },[property]);

  const features = [
    {
      icon: <KingBedIcon />,
      label: "Bedrooms",
      value: activeVariant?.bedrooms,
    },
    {
      icon: <BathtubIcon />,
      label: "Bathrooms",
      value: activeVariant?.bathrooms,
    },
    {
      icon: <SquareFootIcon />,
      label: "Carpet Area",
      value: activeVariant?.carpetArea,
    },
    {
      icon: <BalconyIcon />,
      label: "Balcony",
      value: activeVariant?.balcony,
    },
    {
      icon: <GridOnIcon />,
      label: "Built-up Area",
      value: activeVariant?.builtUpArea,
    },
    {
      icon: <AccountBalanceIcon />,
      label: "Floor",
      value: activeVariant?.floor,
    },
  ];
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
  const [activeIndex, setActiveIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
  };

  const nextImage = () => {
    if (activeIndex < property?.images?.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const prevImage = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };
  let total = property?.images?.length;
  const maxVisibleDots = 6;
  let start = activeIndex - Math.floor(maxVisibleDots / 2);
  start = Math.max(start, 0);
  start = Math.min(start, total - maxVisibleDots);

  const end = Math.min(start + maxVisibleDots, total);

  const scrollContainerRef = useRef(null);
  const activeThumbnailRef = useRef([]);
  useEffect(() => {
    if (activeThumbnailRef.current[activeIndex]) {
      activeThumbnailRef.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activeIndex]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            md: "row",
          },
          width: "100%",
          alignItems: {
            xs: "flex-start", // start alignment on small screens
            md: "center", // center alignment on medium and above
          },
          gap: "16px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // ⬅ Stack vertically on small screens
              md: "row",
            },
            alignItems: {
              xs: "flex-start", // start alignment on small screens
              md: "center", // center alignment on medium and above
            },
            width: "100%",
            gap: "16px",
          }}
        >
          <Typography
            variant="h3"
            fontSize={{ xs: 32, md: 46 }}
            fontWeight={600}
          >
            {property?.title}
          </Typography>

          <Chip
            icon={
              <LocationOnIcon sx={{ color: "#A187F0", fontSize: "medium" }} />
            }
            label={`${property?.location?.city}, ${property?.location?.state}`}
            variant="outlined"
            sx={{ color: "white", borderRadius: "8px" }}
          />
          <Chip
            icon={<Bed sx={{ color: "#A187F0" }} />}
            label={activeVariant?.bhk}
            variant="outlined"
            sx={{ color: "white", borderRadius: "8px" }}
          />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="body2" sx={{ color: "#999" }}>
            Price
          </Typography>
          <Typography variant="h6" fontSize={24} fontWeight={600}>
            ₹{activeVariant?.price}
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          background: "#1A1A1A",
          alignItems: "center",

          borderRadius: "12px",
          padding: "20px",
          width: "100%",
          gap: "20px",
        }}
      >
        <Box
          ref={scrollContainerRef}
          sx={{
            display: "flex",
            flexDirection: "row",
            overflowX: "scroll",
            width: "100%",
            scrollbarWidth: "none",
            padding: "10px",
            borderRadius: "12px",
            gap: "10px",
            backgroundColor: "#141414",
          }}
        >
          {activeVariant?.images?.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Thumbnail ${index}`}
              ref={(el) => (activeThumbnailRef.current[index] = el)}
              sx={{
                borderRadius: "10px",
                height: "80px",
                cursor: "pointer",
                minWidth: "124px",
                maxWidth: "124px",
                flexGrow: 1,
                opacity: index === activeIndex ? 1 : 0.5,
                border: index === activeIndex ? "2px solid #A187F0" : "none",
              }}
              onClick={() => handleThumbnailClick(index)}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            padding: "20px",
            width: "100%",
            gap: "20px",
          }}
        >
          <Box
            component="img"
            src={property?.images?.[activeIndex]}
            alt="Selected Property"
            sx={{
              borderRadius: "10px",
              width: {
                xs: "100%",
                md: "50%",
              },
              maxHeight: "550px",
            }}
          />
          {activeIndex !== property?.images?.length - 1 && (
            <Box
              component="img"
              src={property?.images?.[activeIndex + 1]}
              alt="Selected Property"
              sx={{
                borderRadius: "10px",
                width: {
                  xs: "100%",
                  md: "50%",
                },
                maxHeight: "550px",
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            backgroundColor: "#141414",
            padding: "8px",
            borderRadius: "50px",
          }}
        >
          <IconButton
            onClick={prevImage}
            disabled={activeIndex === 0}
            color="#ffffff"
            size="large"
            sx={{
              borderRadius: "50px",
              border: "1px solid #ffffff",
              opacity: activeIndex === 0 ? 0.5 : 1,
            }}
            variant="contained"
          >
            <ArrowBack
              sx={{
                color: "#ffffff",
              }}
            />
          </IconButton>
          <Box sx={{ display: "flex", gap: "4px", alignItems: "center" }}>
            {Array.from({ length: total })
              .slice(start, end)
              .map((_, index) => (
                <Dot
                  key={start + index}
                  active={start + index === activeIndex}
                />
              ))}
          </Box>
          <IconButton
            onClick={nextImage}
            disabled={activeIndex === property?.images?.length - 1}
            variant="contained"
            size="large"
            sx={{
              borderRadius: "50px",
              border: "1px solid #ffffff",
              opacity: activeIndex === property?.images?.length - 1 ? 0.5 : 1,
            }}
            color="#ffffff"
          >
            <ArrowForward
              sx={{
                color: "#ffffff",
              }}
            />
          </IconButton>
        </Box>
      </Box>
      <Typography
        variant="h5"
        fontWeight={600}
        sx={{ mb: 2, color: "#fff" }}
      >
        Project Details
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 4,
          width: "100%",
        }}
      >
        {/* Left Section - Description & Specs */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            borderRadius: "12px",
            padding: { xs: 2, sm: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#fff">
            Description
          </Typography>

          <Typography variant="body2" color="#aaa" sx={{ lineHeight: 1.7 }}>
            {property?.description}
          </Typography>

          <Box
            sx={{
              borderTop: "1px solid #333",
              pt: 2,
              mt: 1,
            }}
          >
            <Grid2
              container
              spacing={2}
              sx={{
                color: "#ccc",
              }}
            >
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>Property Type:</strong> {property?.propertyType}
                </Typography>
              </Grid2>
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>Available Flats Size:</strong> {activeVariant?.bhk}
                </Typography>
              </Grid2>
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>RERA Carpet Area:</strong> {activeVariant?.carpetArea}
                </Typography>
              </Grid2>
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>Base Rate:</strong> ₹
                  {activeVariant?.carpetArea
                    ? Math.floor(activeVariant?.price / parseInt(activeVariant?.carpetArea))
                    : "N/A"}{" "}
                  per sq ft
                </Typography>
              </Grid2>
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>Parking:</strong> For SUV: ₹___ &nbsp; Normal: ₹___
                </Typography>
              </Grid2>
              <Grid2 size={{xs:12, sm:6}}>
                <Typography variant="body2">
                  <strong>Finance Approved by:</strong> {property?.approval} Bank
                </Typography>
              </Grid2>
              <Grid2 xs={12}>
                <Typography variant="body2">
                  <strong>Location:</strong> {property?.location?.street}, {property?.location?.city}
                </Typography>
              </Grid2>
            </Grid2>
          </Box>
        </Box>

        {/* Right Section - Amenities */}
        <Box
          sx={{
            flex: 1,
            backgroundColor: "#1A1A1A",
            border: "1px solid #2A2A2A",
            borderRadius: "12px",
            padding: 3,
          }}
        >
          <Typography variant="h6" fontWeight={600} color="#fff" mb={2}>
            Key Features and Amenities
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {property?.amenities?.map((amenity, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  backgroundColor: "#141414",
                  padding: "10px 12px",
                  borderRadius: "8px",
                  color: "#ccc",
                }}
              >
                <BoltIcon sx={{ color: "#A187F0", fontSize: 20 }} />
                <Typography variant="body2">{amenity}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          mt: 5,
          backgroundColor: "#1A1A1A",
          border: "1px solid #2A2A2A",
          borderRadius: "12px",
          padding: { xs: 3, md: 4 },
          width: "100%",
          color: "#E0E0E0",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography sx={{ mt: 2 }}><strong>Sample Flat Video:</strong></Typography>
        {activeVariant?.video ? (
          <Box sx={{ mt: 1, borderRadius: "8px", overflow: "hidden", border: "1px solid #333" }}>
            <iframe
              width="100%"
              height="400"
              src={`https://www.youtube.com/embed/${activeVariant?.video?.split("v=")[1]}`}
              title="Sample Flat Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
              allowFullScreen
            ></iframe>
          </Box>
        ) : (
          <Typography sx={{ color: "#aaa", mt: 1 }}>No sample video available</Typography>
        )}
      </Box>
    </>
  );
};

export default PropertySpecifications;
