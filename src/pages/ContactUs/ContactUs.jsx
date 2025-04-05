import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";

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
import { Email, Phone, LocationOn, Language, Facebook, Instagram, YouTube } from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import StyledTextField from "../../StyledComponents/StyledTextField";
import {submitContactInquiry, getContactsLoader} from "../../store/contactSlice";
import { getGeneralSettings } from '../../store/generalSettingsSlice';

const MotionBox = motion(Box);

const ContactUs = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getContactsLoader);
  const settings = useSelector(getGeneralSettings);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const services = [
    {
      src: "/Icons/Location-Icon.svg",
      title: "B-102 Sen Nagar Santacruz East , Mumbai - 400055",
      mapUrl: "https://www.google.com/maps?q=B-102+Sen+Nagar+Santacruz+East,+Mumbai+-+400055",
    },
    { src: "/Icons/Phone-Icon.svg", title: "+91 7715021942", phoneUrl: "tel:+917715021942" },
    { src: "/Icons/Email-Icon.svg", title: "nfo@rkrealco.com", emailUrl: "mailto:nfo@rkrealco.com", },
    { 
      src: "/Icons/Social-Icon.svg", 
      title: "Social Media", 
      defaultUrl: settings?.instagram,
      socialLinks: {
        instagram: settings?.instagram,
        facebook: settings?.facebook,
        youtube: "https://www.youtube.com/@RKRealtorsConsultants",
      }, },
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    inquiryType: "Buying",
    heardFrom: "Social Media",
    message: "",
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitContactInquiry(formData))
      .then((response)=>{
        if(response.error){
          console.error("Error submitting inquiry:", response.error.message);
        }else{
          console.log("Inquiry submitted successfully:", response.payload);
          // Reset form data after successful submission
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            inquiryType: "Buying",
            heardFrom: "Social Media",
            message: "",
          });
          setShowForm(false);
          setShowSuccessMessage(true);
          setTimeout(()=>{
            setShowForm(true);
            setShowSuccessMessage(false);
          }, 60000);
        }
      })
  };
  

  
  return (
    <Box id="contact" sx={{ backgroundColor: "#191919", width: "100vw" }}>
      <Helmet>
        <title>Contact Us - RK Realtors & Consultants</title>
        <meta
          name="description"
          content="Reach out to RK Realtors & Consultants for inquiries, property consultations, or investment opportunities. We're here to help."
        />
        <meta
          name="description"
          content="Reach out to RK Realtors & Consultants for inquiries, property consultations, or investment opportunities. We're here to help."
        />
      </Helmet>
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
                onClick={() => {
                  if (service.mapUrl) {
                    window.open(service.mapUrl, "_blank", "noopener,noreferrer");
                  } else if (service.emailUrl) {
                    window.open(service.emailUrl);
                  } else if (service.defaultUrl) {
                    window.open(service.defaultUrl, "_blank", "noopener,noreferrer");
                  } else if (service.phoneUrl) {
                    window.location.href = service.phoneUrl;
                  }
                }}
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
                  minHeight:"170px",
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
                <Typography variant="body2">
                  {service.title}
                </Typography>
                {/* Render Social Icons if it's Social Media card */}
                {/* {service.socialLinks && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 2,
                      mt: 1,
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                    onClick={(e) => e.stopPropagation()} // Prevent parent click
                  >
                    <Instagram
                      sx={{ color: "#E1306C", cursor: "pointer" }}
                      onClick={() => window.open(service.socialLinks.instagram, "_blank")}
                    />
                    <Facebook
                      sx={{ color: "#1877F2", cursor: "pointer" }}
                      onClick={() => window.open(service.socialLinks.facebook, "_blank")}
                    />
                    <YouTube
                      sx={{ color: "#FF0000", cursor: "pointer" }}
                      onClick={() => window.open(service.socialLinks.youtube, "_blank")}
                    />
                  </Box>
                )} */}
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
            src="/Icons/abstract-Design.svg"
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
        {!showForm && showSuccessMessage && (
          <Box
            sx={{
              textAlign: "center",
              border: "5px solid #262626",
              borderRadius: "12px",
              padding: "40px",
              backgroundColor: "#1A1A1A",
              color: "#7C4DFF",
            }}
          >
            <Typography variant="h4" gutterBottom>
              Thank You!
            </Typography>
            <Typography variant="body1">
              We’ve received your message and will contact you shortly.
            </Typography>
          </Box>
        )}
        {loading && !showSuccessMessage && (
          <Box
            sx={{
              textAlign: "center",
              border: "5px solid #262626",
              borderRadius: "12px",
              padding: "40px",
              backgroundColor: "#1A1A1A",
              color: "#ffffff",
            }}
          >
            <Typography variant="body1">Submitting your inquiry...</Typography>
          </Box>
        )}
        {/* Contact Form */}
        {showForm && !loading && (
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
                <StyledTextField
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e)=>{
                    setFormData((prev) => ({ ...prev, firstName: e.target.value }));
                  }}
                  placeholder="Enter First Name"
                />

              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">Last Name</Typography>
                <StyledTextField
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e)=>{
                    setFormData((prev) => ({ ...prev, lastName: e.target.value }));
                  }}
                  placeholder="Enter Last Name"
                />

              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">Email</Typography>
                <StyledTextField
                  name="email"
                  value={formData.email}
                  onChange={(e)=>{
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                  }}
                  placeholder="Enter email"
                />

              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">Phone</Typography>
                <StyledTextField
                  name="phone"
                  value={formData.phone}
                  onChange={(e)=>{
                    setFormData((prev) => ({ ...prev, phone: e.target.value }));
                  }}
                  placeholder="Enter phone number"
                />
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">Inquiry Type</Typography>
                <StyledTextField
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={(e)=>{
                    setFormData((prev)=>({...prev, inquiryType: e.target.value}))
                  }}
                  select
                  options={[
                    { value: "Buying", label: "Buying" },
                    { value: "Selling", label: "Selling" },
                    { value: "Investment", label: "Investment" },
                  ]}
                  placeholder="Select Inquiry Type"
                />
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 4 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">
                  How did you hear about us?
                </Typography>
                <StyledTextField
                  name="heardFrom"
                  value={formData.heardFrom}
                  onChange={(e)=>{
                    setFormData((prev)=>({...prev, heardFrom: e.target.value}))
                  }}
                  select
                  options={[
                    { value: "Social Media", label: "Social Media" },
                    { value: "Friend", label: "Friend" },
                    { value: "Website", label: "Website" },
                  ]}
                  placeholder="Select Option"
                />
              </Grid2>
              <Grid2
                item
                size={{ xs: 12, sm: 12 }}
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <Typography variant="body1">Message</Typography>
                <StyledTextField
                  name="message"
                  value={formData.message}
                  onChange={(e)=>{
                    setFormData((prev)=>({...prev, message: e.target.value}))
                  }}
                  placeholder="Enter your message here..."
                  multiline={true}
                  rows={4}
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
                    onClick={handleSubmit}
                  >
                    Send Your Message
                  </Button>
                </Grid2>
              </Grid2>
            </Grid2>
          </Box>
        )}
      </Box>

      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default ContactUs;
