import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  FormControlLabel,
  Button,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { Email, Phone, LocationOn, Language } from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";

const MotionBox = motion(Box);

const ContactUs = () => {
  const services = [
    {
      src: "Icons/Location-Icon.svg",
      title: "B-102 Sen Nagar Santacruz East , Mumbai - 400055",
    },
    { src: "Icons/Phone-Icon.svg", title: "+91 7715021942" },
    { src: "Icons/Email-Icon.svg", title: "nfo@rkrealco.com" },
    { src: "Icons/Social-Icon.svg", title: "Social Media" },
  ];
  return (
    <Box id="contact" sx={{ backgroundColor: "#191919", width: "100vw" }}>
      <Navbar />
      <MotionBox
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        sx={{
          background: "linear-gradient(53deg, #262626 0%, #141414 53%)",
          color: "white",
          display: "flex",
          flexDirection: "column",
          py: 8,
          px: { xs: 2, md: 5, lg: 10 },
          textAlign: "start",
          gap: "24px",
        }}
      >
        <Typography variant="h3" fontSize={48}>
          Get in Touch with RK Realtors & Consultants
        </Typography>
        <Typography variant="body2" color="#999999" width={"90%"}>
          Welcome to RK's Contact Us page. We’re here to assist you with any
          inquiries, requests, or feedback you may have. Whether you’re looking
          to buy or sell a property, explore investment opportunities, or simply
          want to connect, we’re just a message away.
        </Typography>
      </MotionBox>

      <Box
        sx={{
          backgroundColor: "#141414",
          color: "white",
          padding: "16px",
          textAlign: "center",
          border: "5px solid #262626",
        }}
      >
        <Grid2 container spacing={3} justifyContent="center">
          {services.map((service, index) => (
            <Grid2 item size={{ xs: 6, sm: 6, md: 3 }} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                style={{
                  position: "relative", // Ensure the arrow icon is positioned correctly
                  background: "#1A1A1A",
                  padding: "20px",
                  borderRadius: "12px",
                  textAlign: "center",
                  border: "1px solid #262626",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: "16px",
                }}
              >
                {/* Arrow Icon positioned at top-right */}
                <ArrowOutwardIcon
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    fontSize: 20,
                    color: "#4D4D4D", // Match theme color
                  }}
                />

                {/* Display service image */}
                <Box sx={{ marginBottom: "10px" }}>
                  <img
                    src={service.src}
                    alt={service.title}
                    style={{ width: "60px", height: "60px" }}
                  />
                </Box>
                <Typography variant="body2">{service.title}</Typography>
              </motion.div>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          backgroundColor: "#141414",
          p: { xs: 2, md: 5, lg: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <img
            src="Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3">Let's Connect</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "left", width: "90%", color: "#999999" }}
            >
              We're excited to connect with you and learn more about your real
              estate goals. Use the form below to get in touch with RK Realtors
              & Consultants. Whether you're a prospective client, partner, or
              simply curious about our services, we're here to answer your
              questions and provide the assistance you need.
            </Typography>
          </Box>
        </Box>
        {/* Contact Form */}
        <Box
          component="form"
          sx={{
            borderRadius: "8px",
            padding: { xs: 3, md: 5 },
            width: "100%",
            border: "5px solid #262626",
          }}
        >
          <Grid2 container spacing={2}>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">First Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter First Name"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Last Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter Last Name"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Email</Typography>
              <TextField
                fullWidth
                placeholder="Enter Email"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Phone</Typography>
              <TextField
                fullWidth
                placeholder="Enter Phone Number"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Inquiry Type</Typography>
              <TextField
                fullWidth
                select
                placeholder="Select Inquiry Type"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input::placeholder": { color: "#666666" },
                  },
                }}
              >
                <MenuItem value={"buying"}>Buying</MenuItem>
                <MenuItem value={"selling"}>Selling</MenuItem>
                <MenuItem value={"investment"}>Investment</MenuItem>
              </TextField>
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">
                How did you hear about us?
              </Typography>
              <TextField
                fullWidth
                select
                placeholder="Select"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              >
                <MenuItem value={"social media"}>Social Media</MenuItem>
                <MenuItem value={"friend"}>Friend</MenuItem>
                <MenuItem value={"website"}>Website</MenuItem>
              </TextField>
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 12 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Message</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your message here.."
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              container
              width="100%"
              size={{ xs: 12, md: 12, sm: 12 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid2 item>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#262626",
                        "&.Mui-checked": { color: "#7C4DFF" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="#999999">
                      I agree with{" "}
                      <a href="#" style={{ color: "#999999" }}>
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" style={{ color: "#999999" }}>
                        Privacy Policy
                      </a>
                    </Typography>
                  }
                />
              </Grid2>
              <Grid2 item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#7C4DFF", color: "white", px: 4 }}
                >
                  Send Your Message
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default ContactUs;
