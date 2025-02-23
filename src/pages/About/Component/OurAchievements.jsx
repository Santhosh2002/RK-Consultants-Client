import React, { useState } from "react";
import { Container, Grid2, Card, CardContent, Typography, Box, Button, IconButton, Avatar } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";

const testimonials = [
  {
    id: 1,
    explanation: "With over 3 years in the industry, we've amassed a wealth of knowledge and experience, becoming a go-to resource for all things real estate.",
    title: "3+ Years of Excellence",
  },
  {
    id: 2,
    explanation: "Our greatest achievement is the satisfaction of our clients. Their success stories fuel our passion for what we do.",
    title: "Happy Clients",
  },
  {
    id: 3,
    explanation: "We've earned the respect of our peers and industry leaders, with accolades and awards that reflect our commitment to excellence.",
    title: "Industry Recognition",
  },
];

const OurAchievements = () => {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded((prevState) => ({ ...prevState, [id]: !prevState[id] }));
  };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", gap:"16px", ml:6, backgroundColor: "#141414", color: "#fff", padding:{xs:"0 16px", sm:"0 64px"}}}>
      <Box sx={{ display: "flex", flexDirection:"column", alignItems: "flex-start", gap:'16px', marginBottom: '40px' }}>
        <img
          src="/Icons/abstract-Design.svg"
          alt="Icon"
          style={{ width: 70, height: "auto", marginRight: 10 }}
        />
        <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
          Our Achievements
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "left", width:"90%", color:"#999999" }}>
          Our story is one of continuous growth and evolution. We started as a small team with big dreams, determined to create a real estate platform that transcended the ordinary.
        </Typography>
      </Box>
      {/* Testimonials Grid2 */}
      <Grid2 container spacing={4}>
        {testimonials.map((testimonial) => (
          <Grid2 item size={{ xs: 12, md: 4, sm: 6 }} key={testimonial.id}>
            <Card sx={{display:'flex', flexDirection:'column', borderRadius: "10px", border: "5px solid #262626", backgroundColor: "#141414", color: "#fff", padding: "24px", overflow: "hidden", gap:"16px" }}>
              {/* Testimonial Content */}
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {testimonial.title}
              </Typography>
              <Typography variant="body2" color="#999999" sx={{ height: "80px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {testimonial.explanation}
              </Typography>
            </Card>
          </Grid2>
        ))}
      </Grid2>

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 5, borderTop: "1px solid #262626" }}> 
        <Typography variant="body2" sx={{ color: "#888", pt: 2 }}>01 of 10</Typography>
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <IconButton sx={{ color: "#fff", border: "1px solid #999", borderRadius: "50%", width: 40, height: 40 }}>
            <ArrowBackIos fontSize="small" />
          </IconButton>
          <IconButton sx={{ color: "#fff", border: "1px solid #999", borderRadius: "50%", width: 40, height: 40 }}>
            <ArrowForwardIos fontSize="small" />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default OurAchievements;
