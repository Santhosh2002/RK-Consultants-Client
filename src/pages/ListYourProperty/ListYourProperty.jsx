import React, { useState, useEffect } from "react";
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
import { Email, Phone, LocationOn, Language, Image } from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "./ImageUploadComponent";
import VideoUploadComponent from "./VideoUploadComponent";

const ListYourProperty = () => {
  const propertyTypes = [
    "Residential",
    "Commercial",
    "MAHA RERA",
    "Land",
    "Shop",
    "Other",
  ];
  const transactionTypes = ["Lease", "Sale", "Both", "Other"];
  const furnishingStatuses = [
    "Unfurnished",
    "Semi-Furnished",
    "Fully-Furnished",
  ];
  const statusOptions = ["Available", "Sold", "Rented", "Not Disclosed"];
  const parkingOptions = [
    "Covered Stilt",
    "Covered Garage",
    "Open Fixed",
    "Open Not Fixed",
    "Mechanical",
    "None",
  ];
  const elevatorAvailable = ["Yes", "No"];

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.google.com/recaptcha/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    phone: "",
    email: "",
    images: "",
    video: "",
    virtualTour: "",
    brochure: "",
    propertyType: "Residential",
    transactionType: "Lease",
    furnishingStatus: "Unfurnished",
    status: "Available",
    parking: "None",
    landmark: "",
    nearby: "",
    amenities: "",
    elevator: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "elevator"
          ? value === "Yes"
          : type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleRecaptcha = (token) => {
    setFormData((prevState) => ({ ...prevState, recaptchaToken: token }));
  };

  const [imageList, setimageList] = useState({
    images: [],
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setimageList((prev) => ({ ...prev, images: files }));
  };

  // const isFormValid = () => {
  //   return (
  //     formData.title.trim() !== "" &&
  //     formData.phone.trim() !== "" &&
  //     formData.email.trim() !== "" &&
  //     formData.description.trim() !== "" &&
  //     (formData.recaptchaToken || "").trim() !== "" // Ensure it's not undefined
  //   );
  // };

  return (
    <Box id="listyourproperty" sx={{ backgroundColor: "#191919" }}>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          backgroundColor: "#141414",
          px: { xs: 2, md: 5, lg: 10 },
          py: { xs: 2, md: 2, lg: 2 },
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
          <Typography variant="h3">List Your Property</Typography>
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
              Welcome to RK's List Your Property page! Whether you're a
              homeowner, investor, or developer looking to sell or lease your
              property, we're here to make the process seamless and hassle-free.
              Share your property details with us, and our team will assist you
              in finding the right buyers or tenants. From residential homes and
              commercial spaces to investment properties, we help you get the
              best deals. Fill out the form below, and let’s get started on
              showcasing your property to potential buyers and investors!
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
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Title</Typography>
              <StyledTextField
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Slug</Typography>
              <StyledTextField
                name="slug"
                placeholder="Enter property url"
                value={formData.slug}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Email</Typography>
              <StyledTextField
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Phone</Typography>
              <StyledTextField
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12 }}
            >
              <Typography>Description</Typography>
              <StyledTextField
                name="description"
                placeholder="Description"
                multiline
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Property Type</Typography>
              <StyledTextField
                select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                options={propertyTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Transaction Type</Typography>
              <StyledTextField
                select
                name="transactionType"
                value={formData.transactionType}
                onChange={handleChange}
                options={transactionTypes.map((type) => ({
                  value: type,
                  label: type,
                }))}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Furnishing Status</Typography>
              <StyledTextField
                select
                name="furnishingStatus"
                value={formData.furnishingStatus}
                onChange={handleChange}
                options={furnishingStatuses.map((status) => ({
                  value: status,
                  label: status,
                }))}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Status</Typography>
              <StyledTextField
                select
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions.map((status) => ({
                  value: status,
                  label: status,
                }))}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12 }}
            >
              <Typography>Landmark</Typography>
              <StyledTextField
                name="landmark"
                placeholder="Enter landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12 }}
            >
              <Typography>Nearby Places</Typography>
              <StyledTextField
                name="nearby"
                placeholder="Enter nearby places"
                value={formData.nearby}
                onChange={handleChange}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12 }}
            >
              <Typography>Amenities</Typography>
              <StyledTextField
                name="amenities"
                placeholder="Enter amenities"
                value={formData.amenities}
                onChange={handleChange}
              />
            </Grid2>
            <ImageUploadComponent />
            <VideoUploadComponent />
            <Grid2 sx={{display:"flex", flexDirection:"column", gap:"8px"}} item size={{xs:12, sm:6}}>
              <Typography>Parking</Typography>
              <StyledTextField
                select
                name="parking"
                value={formData.parking}
                onChange={handleChange}
                options={parkingOptions.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </Grid2>
            <Grid2
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              item
              size={{ xs: 12, sm: 6 }}
            >
              <Typography>Elevator Available</Typography>
              <StyledTextField
                select
                name="elevator"
                value={formData.elevator ? "Yes" : "No"}
                onChange={handleChange}
                options={elevatorAvailable.map((option) => ({
                  value: option,
                  label: option,
                }))}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12 }}
              mt={"8px"}
              container
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <div
                  className="g-recaptcha"
                  data-sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                  data-callback="handleRecaptcha"
                ></div>
              </Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#7C4DFF", color: "white" }}
                // disabled={!isFormValid()}
              >
                Submit
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default ListYourProperty;
