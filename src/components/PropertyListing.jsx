import React, {useEffect, useState, useRef} from "react";
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";
import PropertyCard from "./PropertyCard";
import { useSelector } from "react-redux";
import { getProjects } from "../store/projectsSlice";

const PropertyListing = () => {
  var properties = useSelector(getProjects);
  const scrollRef = useRef(null);
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default for desktop

  // Update visible count based on screen width
  useEffect(() => {
    const updateVisibleCount = () => {
      const width = window.innerWidth;
      if (width < 600) setVisibleCount(1);       // mobile
      else if (width < 960) setVisibleCount(2);  // tablet
      else setVisibleCount(3);                   // desktop
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);


  const scrollLeft = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
      scrollRef.current.scrollBy({
        left: -scrollRef.current.clientWidth / visibleCount,
        behavior: 'smooth',
      });
    }
  };
  
  const scrollRight = () => {
    if (startIndex + visibleCount < properties.length) {
      setStartIndex((prev) => prev + 1);
      scrollRef.current.scrollBy({
        left: scrollRef.current.clientWidth / visibleCount,
        behavior: 'smooth',
      });
    }
  };
  

  return (
    <Box sx={{ backgroundColor: "#141414", color: "#fff", py: 6 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <img
            src="/Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
            Featured Properties
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "left", width: "70%", color: "#999999" }}
            >
              Explore our handpicked selection of featured properties. Each
              listing offers a glimpse into exceptional homes and investments
              available through RK Realtors & Consultants. Click "View Property
              Details" for more information.
            </Typography>
            <Button
              href="/properties"
              variant="outlined"
              sx={{
                whiteSpace: "nowrap",
                color: "white",
                border: "1px solid #999999",
              }}
            >
              View All Properties
            </Button>
          </Box>
        </Box>
        <Box
          ref={scrollRef}
          sx={{
            display: {
              xs: 'block', // column view on mobile
              sm: 'flex',  // row view on tablet and above
            },
            overflowX: {
              xs: 'visible', // no horizontal scroll on mobile
              sm: 'auto',    // scrollable on desktop
            },
            scrollBehavior: 'smooth',
            gap: 3,
            pb: 2,

            // Hide scrollbar
            scrollbarWidth: 'none', // Firefox
            '&::-webkit-scrollbar': {
              display: 'none', // Chrome/Safari
            },
          }}
        >
          {properties.map((property, index) => (
            <Box
              key={property.id}
              sx={{
                flex: {
                  sm: "0 0 calc((100% - 2 * 24px) / 3)", // 3 per row with spacing
                },
                width: {
                  xs: "100%", // full width on mobile
                },
                boxSizing: "border-box",
                mb: { xs: 2, sm: 0 }, // spacing between vertical cards on mobile
              }}
            >
              <PropertyCard item={property} />
            </Box>
          ))}
        </Box>

        {/* Pagination Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            borderTop: "1px solid #262626",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Typography variant="body2" sx={{ color: "#888", pt: 2 }}>
            Showing properties {startIndex + 1} – {Math.min(startIndex + visibleCount, properties.length)} of {properties.length}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <IconButton onClick={scrollLeft} disabled={startIndex === 0} 
            sx={{
              border: "1px solid #999",
              borderRadius: "50%",
              width: 40,
              height: 40,
              backgroundColor: "transparent",
              '& .MuiSvgIcon-root': {
                color: "#fff", // 👈 makes arrow white
              },
              '&.Mui-disabled': {
                opacity: 0.4, // optional: control disabled style
              },
            }}>
              <ArrowBackIos color="#fff" fontSize="small" />
            </IconButton>
            <IconButton
              onClick={scrollRight}
              color="#fff"
              disabled={startIndex + visibleCount >= properties.length}
              sx={{
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
                backgroundColor: "transparent",
                '& .MuiSvgIcon-root': {
                  color: "#fff", // 👈 makes arrow white
                },
                '&.Mui-disabled': {
                  opacity: 0.4, // optional: control disabled style
                },
              }}>
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>

      </Container>
    </Box>
  );
};

export default PropertyListing;
