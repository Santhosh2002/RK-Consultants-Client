import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Avatar,
} from "@mui/material";
import {
  ArrowBackIos,
  ArrowForwardIos,
  Star,
  StarHalf,
  StarBorder,
} from "@mui/icons-material";

import {
  selectTestimonials,
  selectTestimonialsLoading,
  fetchTestimonials,
} from "../store/testimonialsSlice";

// const testimonials = [
//   {
//     id: 1,
//     name: "Wade Warren",
//     location: "USA, California",
//     rating: 5,
//     message:
//       "Our experience with RK Realtors was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended! RK Realtors & Consultants has truly exceeded our expectations with their incredible service.",
//     avatar: "https://randomuser.me/api/portraits/men/32.jpg",
//     title: "Exceptional Service!",
//   },
//   {
//     id: 2,
//     name: "Emelie Thomson",
//     location: "USA, Florida",
//     rating: 5,
//     message:
//       "RK Realtors & Consultants provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results. The team was professional, friendly, and incredibly efficient!",
//     avatar: "https://randomuser.me/api/portraits/women/44.jpg",
//     title: "Efficient and Reliable",
//   },
//   {
//     id: 3,
//     name: "John Mans",
//     location: "USA, Nevada",
//     rating: 5,
//     message:
//       "The RK Realtors & Consultants team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support! RK Realtors & Consultants made our home-buying experience smooth and stress-free.",
//     avatar: "https://randomuser.me/api/portraits/men/45.jpg",
//     title: "Trusted Advisors",
//   },
// ];

const OurClients = () => {
  const dispatch = useDispatch();
  const testimonials = useSelector(selectTestimonials);
  const loader = useSelector(selectTestimonialsLoading);
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const testimonialsPerPage = 3;
  const indexOfLast = currentPage * testimonialsPerPage;
  const indexOfFirst = indexOfLast - testimonialsPerPage;
  const currentTestimonials = testimonials.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);

  useEffect(() => {
    dispatch(fetchTestimonials());
  }, [dispatch]);

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
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
            alignItems: {xs:"center", sm:"flex-start"},
            textAlign: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <img
            src="/Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto" }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold", fontSize: { xs: 32, sm: 48 } }}>
            What Our Clients Say
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              // alignItems: { xs: "flex-start", sm: "flex-start" },
              width: "100%",
              gap: { xs: 2, sm: 4 },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                textAlign: { xs: "center", sm: "left" },
                width: { xs: "100%", sm: "70%" },
                color: "#999999",
              }}
            >
              Read the success stories and heartfelt testimonials from our valued clients.
              Discover why they chose RK Realtors & Consultants for their real estate needs.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                whiteSpace: "nowrap",
                color: "white",
                border: "1px solid #999999",
                alignSelf: { xs: "center", sm: "center" },
              }}
            >
              View All Testimonials
            </Button>
          </Box>
        </Box>

        {/* Testimonials Grid2 */}
        <Grid2 container spacing={4}>
          {currentTestimonials.map((testimonial) => (
            <Grid2 item size={{ xs: 12, md: 4, sm: 6 }} key={testimonial.id}>
              <Card
                sx={{
                  borderRadius: "10px",
                  border: "1px solid #444",
                  backgroundColor: "#111",
                  color: "#fff",
                  padding: "24px",
                  height: "300px",
                  overflow: "hidden",
                }}
              >
                {/* Star Ratings */}
                <Box sx={{ display: "flex", gap: 0.5, mb: 2 }}>
                  {[...Array(5)].map((_, i) => {
                    const diff = testimonial.rating - i;
                    if (diff >= 1)
                      return <Star key={i} sx={{ color: "#FFD700" }} />;
                    if (diff >= 0.5)
                      return <StarHalf key={i} sx={{ color: "#FFD700" }} />;
                    return <StarBorder key={i} sx={{ color: "#FFD700" }} />;
                  })}
                </Box>
                {/* Testimonial Content */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {testimonial?.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="grey.400"
                  sx={{
                    height: expanded[testimonial.id] ? "auto" : "60px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {testimonial.message}
                </Typography>
                {testimonial.message.length > 150 && (
                  <Button
                    size="small"
                    onClick={() => toggleExpand(testimonial.id)}
                    sx={{ color: "#6A5ACD", textTransform: "none" }}
                  >
                    {expanded[testimonial.id] ? "Show Less" : "Read More"}
                  </Button>
                )}
                {/* User Profile */}
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}
                >
                  <Avatar
                    src="https://randomuser.me/api/portraits/men/32.jpg" //{testimonial?.author?.avatarUrl}
                    alt={testimonial?.author?.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {testimonial?.author?.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {testimonial?.author?.location?.state},{" "}
                      {testimonial?.author?.location?.country}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid2>
          ))}
        </Grid2>

        {/* Pagination Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            borderTop: "1px solid #262626",
          }}
        >
          <Typography variant="body2" sx={{ color: "#888", pt: 2 }}>
            {String(currentPage).padStart(2, "0")} of{" "}
            {String(totalPages).padStart(2, "0")}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <IconButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              variant="contained"
              size="large"
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50px",
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <IconButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              size="large"
              variant="contained"
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50px",
              }}
            >
              <ArrowForwardIos />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default OurClients;
