import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  Card,
  CircularProgress,
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
  deleteTestimonial,
  fetchTestimonials,
  createTestimonial,
  updateTestimonial,
  selectTestimonials,
  selectTestimonialsLoading,
} from "../../../store/testimonialsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TestimonialPopup from "../../utils/TestimonialsPopup";
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
  const loading = useSelector(selectTestimonialsLoading);

  const [expanded, setExpanded] = useState({});
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteTestimonial(id)).unwrap();
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      toast.error("Failed to delete testimonial");
    }
  };

  const toggleExpand = (id) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleFormSubmit = async (data) => {
    try {
      if (selectedTestimonial) {
        await dispatch(
          updateTestimonial({
            id: selectedTestimonial._id,
            testimonialData: data,
          })
        ).unwrap();
        toast.success("Testimonial updated successfully");
      } else {
        await dispatch(createTestimonial(data)).unwrap();
        toast.success("Testimonial created successfully");
      }
      setOpenPopup(false);
      setSelectedTestimonial(null);
    } catch (error) {
      toast.error("Failed to save testimonial");
    }
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <ToastContainer />
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
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5ACD",
              color: "#fff",
              textTransform: "none",
            }}
            onClick={() => {
              setSelectedTestimonial(null); // <-- 🛠 reset FIRST
              setTimeout(() => {
                setOpenPopup(true); // <-- 🛠 open AFTER resetting selectedTestimonial
              }, 0);
            }}
          >
            Add Testimonial
          </Button>
        </Box>

        {/* Testimonials grid */}
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid2 container spacing={4}>
            {testimonials?.map((t) => (
              <Grid2 key={t._id} size={{ xs: 12, sm: 4, md: 3 }} item>
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
                        whiteSpace: "normal",
                        textWrap: "nowrap",
                        scrollbarWidth: "none",
                        maxHeight: "1.3em",
                        lineHeight: 1.3,
                        overflowY: "hidden",
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
                        onClick={() => toggleExpand(t._id)}
                      >
                        {expanded[t._id] ? "Show Less" : "Read More"}
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
                          {t?.author.location.country},{" "}
                          {t?.author.location.state}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>

                  {/* Actions */}
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
                      onClick={() => {
                        setSelectedTestimonial(t);
                        setOpenPopup(true);
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ textTransform: "none" }}
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}

        {/* Pagination Stub */}
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

        {/* Popup */}
        <TestimonialPopup
          isOpen={openPopup}
          onClose={() => {
            setOpenPopup(false);
            setSelectedTestimonial(null);
          }}
          existingTestimonial={selectedTestimonial}
          onSubmit={handleFormSubmit}
        />
      </Container>
    </Box>
  );
}

export default TestimonialsComponent;
