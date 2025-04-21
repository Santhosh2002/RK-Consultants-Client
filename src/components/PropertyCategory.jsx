import React, { useEffect, useState } from "react";
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
    borderRadius: "8px", // Smooth corners
  },
});
import { motion } from "framer-motion";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CategoryCard from "./CategoryCard";

import HomeWorkIcon from "@mui/icons-material/HomeWork";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Bed } from "@mui/icons-material";
import KingBedIcon from "@mui/icons-material/KingBed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import BalconyIcon from "@mui/icons-material/Balcony";
import GridOnIcon from "@mui/icons-material/GridOn";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useSelector } from "react-redux";
import { getselectedProject } from "../store/projectsSlice";
import { useNavigate } from "react-router-dom";

const PropertyCategory = () => {
  const property = useSelector(getselectedProject);
  const navigate = useNavigate();
  const [alignment, setAlignment] = useState(
    property?.variants?.[0]?.facing || "East"
  );
  const [selectedVariant, setSelectedVariant] = useState(
    property?.variants?.[0] || null
  );
  useEffect(() => {
    if (property) {
      setSelectedVariant(property?.variants?.[0]);
    }
  }, [property]);
  const handleToggle = (event, newAlignment) => {
    if (newAlignment !== null) {
      const variant =
        property?.variants?.find((v) => v.facing === newAlignment) ||
        property?.variants?.[0];
      setSelectedVariant(variant);
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const activeVariant = selectedVariant;

  const handleClose = () => {
    setAnchorEl(null);
  };
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

  const groupedVariants =
    property?.variants?.reduce((acc, variant) => {
      const key = `${variant.bhk}_${variant.carpetArea}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push({
        title: variant.bhk,
        size: variant.carpetArea,
        type: `${variant.facing} | ${variant.floor}`,
        image:
          variant.images?.[0] || "https://images.app.goo.gl/LgFWYsKUC67km9XR9",
        variant,
      });
      return acc;
    }, {}) || {};
  
    const bhkOptions = Array.from(new Set(property?.variants?.map((v) => v.bhk)));

    const getYoutubeEmbedUrl = (url) => {
      const regExp =
        /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
      const match = url.match(regExp);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    };
    

  return (
    <>
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
          mb: 3,
        }}
      >
        <Typography variant="h3" fontSize={{ xs: 32, md: 46 }} fontWeight={600}>
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
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: {
            xs: "start", // start alignment on small screens
            md: "start", // center alignment on medium and above
          },
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
            label={selectedVariant?.bhk}
            variant="outlined"
            sx={{ background: "#262626", color: "white", borderRadius: "8px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: {
              xs: "column", // ⬅ Stack vertically on small screens
              md: "row",
            },
            padding: "0 16px 0 16px",
            gap: "32px",
            width: "100%",
          }}
        >
          {/* Left Section - Image */}
          <Box
            component="img"
            src={selectedVariant?.images?.[0]}
            alt="property"
            sx={{
              borderRadius: "10px",
              objectFit: "cover",
              width: {
                xs: "100%",
                md: "40%",
              },
            }}
          />

          {/* Right Section - Details */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: {
                xs: "100%",
                md: "50%",
              },
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
                fontSize={{ xs: 28, md: 42 }}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                {activeVariant?.builtUpArea}{" "}
                <Typography variant="h4" sx={{ color: "#999" }}>
                  ({activeVariant?.facing})
                </Typography>
              </Typography>
              <Typography variant="h5" sx={{ color: "#999" }}>
                {property?.description}
              </Typography>

              <Grid2 container spacing={2} alignItems={"center"}>
                <Grid2
                  item
                  size={{
                    xs: 6,
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "#333",
                      padding: "10px 20px",
                      borderRadius: "8px",
                      maxWidth: "180px",
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                      fontSize: "14px",
                    }}
                  >
                    {selectedVariant?.facing || "N/A"}
                  </Box>
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
                          transform: open ? "rotate(90deg)" : "rotate(0deg)",
                        }}
                      />
                    }
                  >
                    {selectedVariant?.bhk}
                  </Button>

                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {bhkOptions.map((bhk) => (
                      <MenuItem
                        key={bhk}
                        onClick={() => {
                          const variantForBHK = property.variants.find(
                            (v) => v.bhk === bhk
                          );
                          if (variantForBHK) {
                            setSelectedVariant(variantForBHK);
                          }
                          handleClose();
                        }}
                      >
                        {bhk}
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid2>
              </Grid2>

              <Divider sx={{ borderColor: "#262626" }} />

              <Grid2 container spacing={4}>
                {features.map((feature, index) => (
                  <Grid2
                    item
                    size={{
                      xs: 6,
                    }}
                    key={index}
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      {feature.icon}
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
                padding: "20px 20px",
                minHeight: "50px",
                borderRadius: "8px",
                width: "fit-content",
                justifyContent: "start",
              }}
              onClick={() => {
                navigate(`/properties/${property?.slug}/${selectedVariant?._id}`);
              }}
              endIcon={<ArrowForwardIosIcon fontSize="small" />}
            >
              View More Details
            </Button>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          flexDirection: "column",
          borderRadius: "12px",
          border: "1px solid grey",
          padding: "30px 36px 30px 36px",
          width: "100%",
          gap: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Typography variant="h5" fontWeight={600}>
            Browse from here
          </Typography>
        </Box>

        {Object.entries(groupedVariants).map(([key, items]) => {
          const [bhk, size] = key.split("_");
          return (
            <Box
              key={key}
              sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  gap: 2,
                  margin: "20px 0 20px 0",
                }}
              >
                <Typography variant="h6" fontWeight={600} color="#fff">
                  {bhk}
                </Typography>
                <Typography variant="body1" sx={{ color: "#999" }}>
                  ({size})
                </Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <Divider sx={{ backgroundColor: "#444" }} />
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                }}
              >
                {items.map((item, index) => (
                  <CategoryCard
                    key={index}
                    title={item.title}
                    size={item.size}
                    type={item.type}
                    image={item.image}
                    isSelected={item.variant._id === selectedVariant?._id}
                    onClick={() => setSelectedVariant(item.variant)} // ✅ Your click handler here
                  />
                ))}
              </Box>
            </Box>
          );
        })}
        {(property?.brochure?.length > 0 || property?.video?.length > 0) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                md: "row",
              },
              gap: 4,
              mt: 5,
              width: "100%",
            }}
          >
            {/* Brochure Preview */}
            {property.brochure?.[0] && (
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Project Brochure
                </Typography>
                <iframe
                  src={property.brochure?.[0]}
                  width="100%"
                  height="500px"
                  style={{ border: "1px solid #444", borderRadius: "8px" }}
                  title="Brochure Preview"
                ></iframe>
              </Box>
            )}

            {/* YouTube Video Preview */}
            {property.video?.[0] && (
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Project Walkthrough
                </Typography>
                <iframe
                  width="100%"
                  height="500px"
                  style={{ border: "none", borderRadius: "8px" }}
                  src={getYoutubeEmbedUrl(property.video?.[0])}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </Box>
            )}
          </Box>
        )}

      </Box>
    </>
  );
};

export default PropertyCategory;
