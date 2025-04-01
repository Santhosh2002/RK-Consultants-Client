import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid2, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "../../StyledComponents/ImageUploadComponent";
import VideoUploadComponent from "../../StyledComponents/VideoUploadComponent";

const UpdateListingPopup = ({ isOpen, onClose, onSubmit, listingData, id }) => {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    phone: "",
    email: "",
    images: [],
    newImages: [],
    video: [],
    virtualTour: [],
    brochure: [],
    propertyType: "",
    transactionType: "",
    furnishingStatus: "",
    status: "",
    parking: "",
    landmark: "",
    nearby: [],
    amenities: [],
    elevator: false,
    bhk: "",
    carpetArea: "",
    builtUpArea: "",
    price: "",
    facing: "",
    bedrooms: "",
    bathrooms: "",
    balcony: "",
    floor: "",
    totalFloors: "",
    location: {
      street: "",
      city: "",
      state: "",
      country: "",
      latitude: "",
      longitude: "",
    },
  });

  useEffect(() => {
    if (listingData) {
      const variant = listingData.variants?.[0] || {};
      setFormData((prev) => ({
        ...prev,
        ...listingData,
        phone: listingData.contact?.phone || "",
        email: listingData.contact?.email || "",
        video: listingData.video || [],
        virtualTour: listingData.virtualTour || [],
        brochure: listingData.brochure || [],
        nearby: listingData.nearby || [],
        amenities: listingData.amenities || [],
        location: listingData.location || {},
        bhk: variant.bhk || "",
        carpetArea: variant.carpetArea || "",
        builtUpArea: variant.builtUpArea || "",
        price: variant.price || listingData.price || "",
        facing: variant.facing || "",
        bedrooms: variant.bedrooms || "",
        bathrooms: variant.bathrooms || "",
        balcony: variant.balcony || "",
        floor: variant.floor || "",
        totalFloors: variant.totalFloors || "",
      }));
    }
  }, [listingData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("location.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [field]: value },
      }));
    } else if (
      ["nearby", "amenities", "video", "virtualTour", "brochure"].includes(name)
    ) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(",").map((s) => s.trim()),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (newImages) => {
    setFormData((prev) => ({ ...prev, newImages }));
  };

  const handleVideoUpload = (newVideos) => {
    setFormData((prev) => ({ ...prev, video: newVideos }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { newImages, ...rest } = formData;
    const finalData = {
      ...rest,
      contact: { phone: rest.phone, email: rest.email },
      variants: [
        {
          bhk: rest.bhk,
          carpetArea: rest.carpetArea,
          builtUpArea: rest.builtUpArea,
          price: rest.price,
          facing: rest.facing,
          bedrooms: rest.bedrooms,
          bathrooms: rest.bathrooms,
          balcony: rest.balcony,
          floor: rest.floor,
          totalFloors: rest.totalFloors,
        },
      ],
    };
    delete finalData.phone;
    delete finalData.email;
    await onSubmit({ ...finalData, newImages }, id);
  };

  if (!isOpen) return null;

  return (
    <Box className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-60">
      <Box
        sx={{
          width: "90%",
          maxWidth: 1000,
          bgcolor: "#1c1c1c",
          p: 4,
          borderRadius: 2,
          overflowY: "auto",
          maxHeight: "90vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="h5" color="white">
            Update Listing
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <Grid2 container spacing={2}>
            {["title", "slug", "phone", "email", "description", "landmark"].map(
              (field) => (
                <Grid2 item size={{ xs: 12, sm: 6 }} key={field}>
                  <StyledTextField
                    name={field}
                    label={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={formData[field]}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid2>
              )
            )}

            {["nearby", "amenities", "video", "virtualTour", "brochure"].map(
              (field) => (
                <Grid2 item size={{ xs: 12 }} key={field}>
                  <StyledTextField
                    name={field}
                    label={`Comma separated ${field}`}
                    value={formData[field].join(", ")}
                    onChange={handleChange}
                    fullWidth
                  />
                </Grid2>
              )
            )}

            {[
              "propertyType",
              "transactionType",
              "furnishingStatus",
              "status",
              "parking",
            ].map((field) => (
              <Grid2 item size={{ xs: 12, sm: 6 }} key={field}>
                <StyledTextField
                  name={field}
                  label={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid2>
            ))}

            {[
              "bhk",
              "carpetArea",
              "builtUpArea",
              "price",
              "facing",
              "bedrooms",
              "bathrooms",
              "balcony",
              "floor",
              "totalFloors",
            ].map((field) => (
              <Grid2 item size={{ xs: 12, sm: 6 }} key={field}>
                <StyledTextField
                  name={field}
                  label={field}
                  value={formData[field]}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid2>
            ))}

            {[
              "street",
              "city",
              "state",
              "country",
              "latitude",
              "longitude",
            ].map((field) => (
              <Grid2 item size={{ xs: 12, sm: 6 }} key={field}>
                <StyledTextField
                  name={`location.${field}`}
                  label={`Location ${field}`}
                  value={formData.location?.[field] || ""}
                  onChange={handleChange}
                  fullWidth
                />
              </Grid2>
            ))}

            <Grid2 item size={{ xs: 12 }}>
              <ImageUploadComponent
                onUpload={handleImageUpload}
                existingImages={formData.images}
              />
            </Grid2>
            <Grid2 item size={{ xs: 12 }}>
              <VideoUploadComponent
                onUpload={handleVideoUpload}
                existingVideos={formData.video}
              />
            </Grid2>

            <Grid2
              item
              size={{ xs: 12 }}
              display="flex"
              justifyContent="flex-end"
            >
              <Button type="submit" variant="contained" color="primary">
                Update
              </Button>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Box>
  );
};

export default UpdateListingPopup;
