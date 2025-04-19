import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Card,
  Grid2,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Star,
  StarHalf,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTestimonials,
  selectTestimonials,
} from "../../../store/testimonialsSlice";
// ‑‑ If you fetch from Redux, replace the local constant + useSelector useEffect ––.
const TESTIMONIALS_DATA = [
  {
    _id: "68037f311f3ac7fc1ec6bfeb",
    rating: 5,
    title: "Exceptional Service!",
    message: "Our experience with Estatein was outstanding...",
    author: {
      name: "Wade Warren",
      avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
      location: { country: "USA", state: "California" },
    },
  },
  {
    _id: "68037f651f3ac7fc1ec6bfed",
    rating: 5,
    title: "Nice Team!",
    message: "Our experience with RK Team was outstanding...",
    author: {
      name: "Santhosh G",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
      location: { country: "USA", state: "California" },
    },
  },
  {
    _id: "68037fea1f3ac7fc1ec6bff0",
    rating: 4,
    title: "Easy and Smooth Process!",
    message:
      "My Business was formed without too much of process, they made it easier",
    author: {
      name: "Gaurav V",
      avatarUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
      location: { country: "India", state: "Telangana" },
    },
  },
  {
    _id: "6803805d1f3ac7fc1ec6bff2",
    rating: 4.5,
    title: "Great Work!",
    message:
      "I listed my property with RK and they made the great sales within no time",
    author: {
      name: "Ravi Chug",
      avatarUrl: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
      location: { country: "India", state: "Gujarat" },
    },
  },
  {
    _id: "680380c51f3ac7fc1ec6bff5",
    rating: 4.5,
    title: "Easy Accounting",
    message: "They settled my accounts and made accounting hassle‑free",
    author: {
      name: "Rahul Gupta",
      avatarUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
      location: { country: "India", state: "Mumbai" },
    },
  },
];

const renderStars = (rating) => {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <>
      {[...Array(full)].map((_, i) => (
        <Star key={`full-${i}`} sx={{ color: "#FFD700" }} />
      ))}
      {half && <StarHalf sx={{ color: "#FFD700" }} />}
    </>
  );
};

function TestimonialsComponent() {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonials);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const toggleExpand = (id) => setExpanded((p) => ({ ...p, [id]: !p[id] }));

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <Container maxWidth="xl">
        {/* Heading */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Admin Panel: Testimonials
          </Typography>
        </Box>

        {/* Testimonials grid (three cards per row on desktop) */}
        <Grid2 container spacing={4}>
          {testimonials?.map((t) => (
            <Grid2 key={t?._id} size={{ xs: 12, sm: 4, md: 3 }} item>
              <Card
                sx={{
                  p: 3,
                  height: 350,
                  bgcolor: "#111",
                  border: "1px solid #444",
                  color: "#fff",
                  overflow: "hidden",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    mb: 2,
                  }}
                >
                  {/* Rating */}
                  <Box sx={{ display: "flex", mb: 1 }}>
                    {renderStars(t?.rating)}
                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{
                      /* keep normal wrapping */
                      whiteSpace: "normal",
                      textWrap: "nowrap",
                      scrollbarWidth: "none",
                      /* 1 line of h6 ≈ 1.25 em; adjust if you changed font‑size */
                      maxHeight: "1.3em",
                      lineHeight: 1.3,
                      overflowY: "hidden",
                      /* optional – hides horizontal scrollbar if a long word appears */
                      overflowX: "auto",
                    }}
                  >
                    {t?.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "grey.400",
                      height: expanded[t?._id] ? "auto" : 60,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {t?.message}
                  </Typography>

                  {t?.message.length > 150 && (
                    <Button
                      size="small"
                      sx={{ color: "#6A5ACD", textTransform: "none" }}
                      onClick={() => toggleExpand(t?._id)}
                    >
                      {expanded[t?._id] ? "Show Less" : "Read More"}
                    </Button>
                  )}

                  {/* Author */}
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mt: 2,
                      gap: 2,
                    }}
                  >
                    <Avatar
                      src={t?.author.avatarUrl}
                      alt={t?.author.name}
                      sx={{ width: 40, height: 40 }}
                    />
                    <Box>
                      <Typography variant="body1" fontWeight="bold">
                        {t?.author.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "grey.500" }}>
                        {t?.author.location.country}, {t?.author.location.state}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 2,
                    marginBottom: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#6A5ACD",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#D32F2F",
                      color: "#fff",
                      textTransform: "none",
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {/* Simplified pagination stub – hook this up later if needed */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 6,
            pt: 3,
            borderTop: "1px solid #262626",
          }}
        >
          <Typography variant="body2" sx={{ color: "#888" }}>
            01 of 10
          </Typography>
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default TestimonialsComponent;
