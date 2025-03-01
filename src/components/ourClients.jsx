import React, { useState } from "react";
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
import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";

const testimonials = [
  {
    id: 1,
    name: "Wade Warren",
    location: "USA, California",
    rating: 5,
    feedback:
      "Our experience with Estatein was outstanding. Their team's dedication and professionalism made finding our dream home a breeze. Highly recommended! Estatein has truly exceeded our expectations with their incredible service.",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "Exceptional Service!",
  },
  {
    id: 2,
    name: "Emelie Thomson",
    location: "USA, Florida",
    rating: 5,
    feedback:
      "Estatein provided us with top-notch service. They helped us sell our property quickly and at a great price. We couldn't be happier with the results. The team was professional, friendly, and incredibly efficient!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    title: "Efficient and Reliable",
  },
  {
    id: 3,
    name: "John Mans",
    location: "USA, Nevada",
    rating: 5,
    feedback:
      "The Estatein team guided us through the entire buying process. Their knowledge and commitment to our needs were impressive. Thank you for your support! Estatein made our home-buying experience smooth and stress-free.",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    title: "Trusted Advisors",
  },
];

const OurClients = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
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
            src="Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
            What Our Clients Say
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
              Read the success stories and heartfelt testimonials from our
              valued clients. Discover why they chose Estatein for their real
              estate needs.
            </Typography>
            <Button
              variant="outlined"
              sx={{
                whiteSpace: "nowrap",
                color: "white",
                border: "1px solid #999999",
              }}
            >
              View All Testimonials
            </Button>
          </Box>
        </Box>
        {/* Testimonials Grid2 */}
        <Grid2 container spacing={4}>
          {testimonials.map((testimonial) => (
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
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} sx={{ color: "#FFD700" }} />
                  ))}
                </Box>
                {/* Testimonial Content */}
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {testimonial.title}
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
                  {testimonial.feedback}
                </Typography>
                {testimonial.feedback.length > 150 && (
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
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    sx={{ width: 40, height: 40 }}
                  />
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                      {testimonial.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "grey.500" }}>
                      {testimonial.location}
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
            01 of 10
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
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
};

export default OurClients;
