import React, { useState } from "react";
import { Button, Typography, IconButton, Grid2, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledTextField from "../../StyledComponents/StyledTextField";
import ImageUploadComponent from "./ImageUploadComponent";
import VideoUploadComponent from "./VideoUploadComponent";

const emptyVariant = {
  bhk: "",
  carpetArea: "",
  builtUpArea: "",
  facing: "",
  price: "",
  currency: "",
  bedrooms: "",
  bathrooms: "",
  balcony: "",
  floor: "",
  totalFloors: "",
  availability: "",
  images: "",
  video: "",
};

const VariantForm = ({ variants, setVariants }) => {

  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    const isLastFilled = last ? Object.values(last).every((val) => val !== "") : true;
    if (isLastFilled) {
      setVariants([...variants, { ...emptyVariant }]);
    } else {
      alert("Please fill the previous variant completely before adding a new one.");
    }
  };

  const handleChange = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  const handleRemove = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2 container direction="row" spacing={2} justifyContent="space-between">
        <Typography variant="h6">Variants</Typography>
        <Button variant="outlined" size="small" sx={{ color: "#7C4DFF" }} onClick={handleAddVariant}>
          Add Variant
        </Button>
      </Grid2>

      {variants.map((variant, index) => (
        <Grid2
          container
          key={index}
          spacing={2}
          sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2, position: "relative", mt: 2 }}
        >
          <IconButton
            onClick={() => handleRemove(index)}
            sx={{ position: "absolute", top: -15, right: -15 }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>
          {Object.keys(emptyVariant).map((field) => (
            <Grid2 size={{xs:12, sm:4}} key={field}>
              {field === "images" ? (
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center", justifyContent:"space-between" }}>
                {/* // <ImageUploadComponent /> */}
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Images
                  </Typography>
                  <StyledTextField
                    type="file"
                    multiple
                    name="variant.images"
                    placeholder="Upload Images"
                    onChange={(files) => handleChange(index, "images", files)}
                  />
                </Box>
              ) : field === "video" ? (
                // <VideoUploadComponent />
                <Box sx={{ display: "flex", flexDirection: "row", gap: 1, alignItems: "center", justifyContent:"space-between" }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Video
                  </Typography>
                  <StyledTextField
                    type="file"
                    multiple
                    name="variant.video"
                    placeholder="Upload Videos"
                    onChange={(files) => handleChange(index, "video", files)}
                  />
                </Box>
              ) : (
                <StyledTextField
                  name={`variant.${field}`}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={variant[field]}
                  onChange={(e) => handleChange(index, field, e.target.value)}
                />
              )}
            </Grid2>

          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default VariantForm;
