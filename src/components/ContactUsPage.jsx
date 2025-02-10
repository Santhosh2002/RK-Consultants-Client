import React from "react";
import { Container, Box, Typography, TextField, Button, Grid2, IconButton } from "@mui/material";
import { Facebook, LinkedIn, Twitter, YouTube } from "@mui/icons-material";

const ContactUs = () => {
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6, borderTop: "1px solid #999999" }}>
      <Container maxWidth="lg">
        <Grid2 container spacing={4}>
          <Grid2 item size={{xs:12, md:4}}>
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>Estatein</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, backgroundColor: "#222", p: 1, borderRadius: "8px" }}>
              <TextField
                variant="standard"
                placeholder="Enter Your Email"
                InputProps={{ disableUnderline: true, style: { color: "#fff" } }}
                sx={{ flex: 1 }}
              />
              <Button variant="contained" sx={{ backgroundColor: "#6A5ACD", color: "#fff", borderRadius: "8px" }}>
                ➜
              </Button>
            </Box>
          </Grid2>
          <Grid2 item size={{xs:12, md:4}}>
            <Grid2 container spacing={4}>
              <Grid2 item size={{xs:12, md:4}}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Home</Typography>
                <Typography variant="body2">Hero Section</Typography>
                <Typography variant="body2">Features</Typography>
                <Typography variant="body2">Properties</Typography>
                <Typography variant="body2">Testimonials</Typography>
                <Typography variant="body2">FAQ’s</Typography>
              </Grid2>
              <Grid2 item size={{xs:12, md:4}}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>About Us</Typography>
                <Typography variant="body2">Our Story</Typography>
                <Typography variant="body2">Our Works</Typography>
                <Typography variant="body2">How It Works</Typography>
                <Typography variant="body2">Our Team</Typography>
                <Typography variant="body2">Our Clients</Typography>
              </Grid2>
              <Grid2 item size={{xs:12, md:4}}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Services</Typography>
                <Typography variant="body2">Valuation Mastery</Typography>
                <Typography variant="body2">Strategic Marketing</Typography>
                <Typography variant="body2">Negotiation Wizardry</Typography>
                <Typography variant="body2">Closing Success</Typography>
                <Typography variant="body2">Property Management</Typography>
              </Grid2>
              <Grid2 item size={{xs:12, md:4}}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Contact Us</Typography>
                <Typography variant="body2">Contact Form</Typography>
                <Typography variant="body2">Our Offices</Typography>
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 6, borderTop: "1px solid #999999", pt: 3 }}>
          <Typography variant="body2" sx={{ color: "#999999" }}>©2023 Estatein. All Rights Reserved.</Typography>
          <Typography variant="body2" sx={{ color: "#999999" }}>Terms & Conditions</Typography>
          <Box>
            <IconButton sx={{ color: "#fff" }}><Facebook /></IconButton>
            <IconButton sx={{ color: "#fff" }}><LinkedIn /></IconButton>
            <IconButton sx={{ color: "#fff" }}><Twitter /></IconButton>
            <IconButton sx={{ color: "#fff" }}><YouTube /></IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
