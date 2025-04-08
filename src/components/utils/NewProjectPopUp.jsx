// ✅ Refactored NewProjectPopUp using MUI + StyledTextField
import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Modal, Grid2 } from "@mui/material";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "../../StyledComponents/ImageUploadComponent";
import VideoUploadComponent from "../../StyledComponents/VideoUploadComponent";
import VariantForm from "../../StyledComponents/AddVariantComponent";

const propertyTypes = [
  "Residential",
  "Commercial",
  "MAHA RERA",
  "Land",
  "Shop",
  "Other",
];
const transactionTypes = ["Lease", "Sale", "Both", "Other"];
const furnishingStatuses = ["Unfurnished", "Semi-Furnished", "Fully-Furnished"];
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

function NewProjectPopUp({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    contact: { phone: "", email: "" },
    images: [],
    video: [],
    virtualTour: "",
    brochure: "",
    visible: true,
    propertyType: "Residential",
    transactionType: "Sale",
    furnishingStatus: "Unfurnished",
    status: "Available",
    ownership: "Freehold",
    landmark: "",
    nearby: [],
    amenities: [],
    parking: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
    },
    approval: "Approved",
    variants: [
      {
        bhk: "",
        carpetArea: "",
        builtUpArea: "",
        facing: "",
        price: "",
        currency: "INR",
        bedrooms: 0,
        bathrooms: 0,
        images: [],
        video: [],
        balcony: 0,
        floor: "",
        totalFloors: "",
        availability: true,
      },
    ],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (!name) return;

    const keys = name.split(".");

    setFormData((prev) => {
      const updated = { ...prev };
      let nested = updated;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!nested[keys[i]]) nested[keys[i]] = {};
        nested = nested[keys[i]];
      }

      const finalKey = keys[keys.length - 1];
      nested[finalKey] = type === "checkbox" ? checked : value;

      return updated;
    });
  };
  const handleSubmit = () => {
    const finalPayload = {
      ...formData,
      images: formData.images.map((file) => file.name),
      video: formData.video.map((file) => file.name),
      variants: formData.variants.map((variant) => ({
        ...variant,
        images: Array.isArray(variant.images)
          ? variant.images.map((file) => file.name)
          : [],
        video: Array.isArray(variant.video)
          ? variant.video.map((file) => file.name)
          : [],
      })),
    };

    console.log("📦 Final Form Data:", finalPayload);
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      sx={{
        maxWidth: "50%",
        margin: "auto",
        overflowY: "auto",
        scrollbarWidth: "none",
        maxHeight: "90vh",
        backgroundColor: "#141414",
      }}
    >
      <Box
        component="form"
        sx={{
          borderRadius: "8px",
          padding: { xs: 3, md: 5 },
          border: "5px solid #262626",

          width: "100%",
        }}
      >
        <Grid2 container spacing={2}>
          <Grid2
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            size={{ xs: 12, sm: 12 }}
          >
            <Typography>Title</Typography>
            <StyledTextField
              name="formData.title"
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
              required
            />
          </Grid2>
          {/* <Grid2
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
            </Grid2> */}
          <Grid2
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            size={{ xs: 12, sm: 6 }}
          >
            <Typography>Email</Typography>
            <StyledTextField
              name="contact.email"
              value={formData.contact.email}
              placeholder="Enter your email"
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    email: e.target.value,
                  },
                }));
              }}
            />
          </Grid2>
          <Grid2
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            size={{ xs: 12, sm: 6 }}
          >
            <Typography>Phone</Typography>
            <StyledTextField
              name="contact.phone"
              placeholder="Enter your phone number"
              value={formData.contact.phone}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  contact: {
                    ...prev.contact,
                    phone: e.target.value,
                  },
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  propertyType: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  transactionType: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  furnishingStatus: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  status: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  landmark: e.target.value,
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  nearby: e.target.value.split(",").map((x) => x.trim()),
                }));
              }}
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
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  amenities: e.target.value.split(",").map((x) => x.trim()),
                }));
              }}
            />
          </Grid2>
          <ImageUploadComponent
            images={formData.images}
            setImages={(files) =>
              setFormData((prev) => ({ ...prev, images: files }))
            }
          />
          <VideoUploadComponent
            videos={formData.video}
            setVideos={(files) =>
              setFormData((prev) => ({ ...prev, video: files }))
            }
          />
          <Grid2
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            size={{ xs: 12, sm: 6 }}
          >
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
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  elevator: e.target.value === "Yes",
                }))
              }
              options={elevatorAvailable.map((option) => ({
                value: option,
                label: option,
              }))}
            />
          </Grid2>
          <Grid2
            sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            item
            size={{ xs: 12, sm: 12 }}
          >
            <Typography>Location</Typography>
            <Grid2 direction={"row"} container spacing={2}>
              <Grid2
                // sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="street"
                  placeholder="Street"
                  value={formData.location.street}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        street: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid2>
              <Grid2
                // sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="city"
                  placeholder="City"
                  value={formData.location.city}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: { ...prev.location, city: e.target.value },
                    }));
                  }}
                />
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="state"
                  placeholder="State"
                  value={formData.location.state}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: { ...prev.location, state: e.target.value },
                    }));
                  }}
                />
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="country"
                  placeholder="Country"
                  value={formData.location.country}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        country: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="latitude"
                  placeholder="Latitude"
                  value={formData.location.latitude}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      location: {
                        ...prev.location,
                        latitude: e.target.value,
                      },
                    }));
                  }}
                />
              </Grid2>
              <Grid2
                sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
                item
                size={{ xs: 12, sm: 4 }}
              >
                <StyledTextField
                  name="location.longitude"
                  placeholder="Longitude"
                  value={formData.location.longitude}
                  onChange={handleChange}
                />
              </Grid2>
            </Grid2>
          </Grid2>
          <VariantForm
            variants={formData.variants}
            setVariants={(variantsUpdater) =>
              setFormData((prev) => {
                const updatedVariants =
                  typeof variantsUpdater === "function"
                    ? variantsUpdater(prev.variants)
                    : variantsUpdater;

                return {
                  ...prev,
                  variants: updatedVariants,
                };
              })
            }
          />

          <Grid2
            item
            size={{ xs: 12 }}
            mt={"8px"}
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="contained"
              sx={{ backgroundColor: "#7C4DFF", color: "white" }}
              onClick={handleSubmit}
              // disabled={!isFormValid()}
            >
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </Box>
    </Modal>
  );
}

export default NewProjectPopUp;
