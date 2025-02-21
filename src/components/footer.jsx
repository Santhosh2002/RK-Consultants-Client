import React from "react";
import { Container, Box, Typography, TextField, Button, Grid2, IconButton } from "@mui/material";
import { Facebook, LinkedIn, Twitter, YouTube, Email, LocationOn, Phone } from "@mui/icons-material";

const FooterComponent = ({ address, phone, logo, insta, fb, linkedin, email }) => {
  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff" }}>
      <Container maxWidth="lg" sx={{padding:"48px 0"}}>
        <Grid2 container spacing={4} alignItems="flex-start" justifyContent={"space-between"}>
          <Grid2 item size={{xs:12, md:3}}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap:'32px' }}>
              <img src="Icons/RK_Logo_White_No_Slogan.svg" alt="Logo" className="max-h-40 w-56 object-cover scale-105 mt-2" />
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
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={6}>
            {/* <Grid2 container spacing={4}>
              <Grid2 item xs={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Home</Typography>
                <Typography variant="body2">Hero Section</Typography>
                <Typography variant="body2">Features</Typography>
                <Typography variant="body2">Properties</Typography>
                <Typography variant="body2">Testimonials</Typography>
                <Typography variant="body2">FAQ’s</Typography>
              </Grid2>
              <Grid2 item xs={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>About Us</Typography>
                <Typography variant="body2">Our Story</Typography>
                <Typography variant="body2">Our Works</Typography>
                <Typography variant="body2">How It Works</Typography>
                <Typography variant="body2">Our Team</Typography>
                <Typography variant="body2">Our Clients</Typography>
              </Grid2>
              <Grid2 item xs={4}>
                <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>Services</Typography>
                <Typography variant="body2">Valuation Mastery</Typography>
                <Typography variant="body2">Strategic Marketing</Typography>
                <Typography variant="body2">Negotiation Wizardry</Typography>
                <Typography variant="body2">Closing Success</Typography>
                <Typography variant="body2">Property Management</Typography>
              </Grid2>
            </Grid2> */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
              <LocationOn sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2" noWrap>{address}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Phone sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2" noWrap>{phone}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Email sx={{ fontSize: 20, mr: 1 }} />
              <Typography variant="body2" noWrap>{email}</Typography>
            </Box>
          </Grid2>
          <Grid2 item xs={12} md={3}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30164.075405149306!2d72.84568488833001!3d19.08529497365678!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c6e7802383%3A0x99bd638ce39dd513!2sR.K%20REALTORS%20%26%20CONSULTANTS!5e0!3m2!1sen!2sin!4v1735987985835!5m2!1sen!2sin"  
                width="100%" 
                height="150" 
                style={{ border: "0", borderRadius: "8px" }}
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
              {/* <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <LocationOn sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" noWrap>{address}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Phone sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" noWrap>{phone}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Email sx={{ fontSize: 20, mr: 1 }} />
                <Typography variant="body2" noWrap>{email}</Typography>
              </Box> */}
            </Box>
          </Grid2>
        </Grid2>
      </Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid #262626", padding:"8px 64px", backgroundColor:"#1A1A1A"}}>
        <Typography variant="body2" sx={{ color: "#999999" }}>©2024 RK Realtors and Consultants. All Rights Reserved.</Typography>
        <Typography variant="body2" sx={{ color: "#999999" }}>Managed by G & G Developers</Typography>
        <Box>
          <IconButton sx={{ color: "#fff" }} href={fb}><Facebook /></IconButton>
          <IconButton sx={{ color: "#fff" }} href={linkedin}><LinkedIn /></IconButton>
          <IconButton sx={{ color: "#fff" }} href={insta}><Twitter /></IconButton>
          <IconButton sx={{ color: "#fff" }} href="https://www.youtube.com/@RKRealtorsConsultants"><YouTube /></IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default FooterComponent;
