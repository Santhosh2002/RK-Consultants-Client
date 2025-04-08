import React, { useState } from "react";
import { Button, Typography, IconButton, Grid2, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import StyledTextField from "./StyledTextField";
import ImageUploadComponent from "./ImageUploadComponent";
import VideoUploadComponent from "./VideoUploadComponent";

const emptyVariant = {
  bhk: "",
  floor: "",
  totalFloors: "",
  balcony: "",

  carpetArea: "",
  builtUpArea: "",
  price: "",
  currency: "",
  bedrooms: "",
  bathrooms: "",
  facing: "",
  availability: "",
  images: [],
  video: [],
};

const VariantForm = ({ variants, setVariants }) => {
  const handleAddVariant = () => {
    const last = variants[variants.length - 1];
    const isLastFilled = last
      ? Object.values(last).every((val) => val !== "")
      : true;
    if (isLastFilled) {
      setVariants([...variants, { ...emptyVariant }]);
    } else {
      alert(
        "Please fill the previous variant completely before adding a new one."
      );
    }
  };

  const handleChange = (index, field, value) => {
    setVariants((prevVariants) => {
      const updated = prevVariants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      );
      return updated;
    });
  };

  const handleRemove = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const getGridSize = (field) => {
    switch (field) {
      case "price":
      case "carpetArea":
      case "builtUpArea":
      case "currency":
        return 6;
      case "bhk":
      case "floor":
      case "totalFloors":
      case "balcony":
        return 3;
      case "facing":
      case "availability":
        return 4;
      case "images":
      case "video":
        return 12;
      default:
        return 4;
    }
  };

  return (
    <Grid2 container direction="column" spacing={2}>
      <Grid2
        container
        direction="row"
        spacing={2}
        justifyContent="space-between"
      >
        <Typography variant="h6">Variants</Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ color: "#7C4DFF" }}
          onClick={handleAddVariant}
        >
          Add Variant
        </Button>
      </Grid2>

      {variants?.map((variant, index) => (
        <Grid2
          container
          key={index}
          spacing={2}
          sx={{
            border: "1px solid #ddd",
            borderRadius: 2,
            p: 2,
            position: "relative",
            mt: 2,
          }}
        >
          <IconButton
            onClick={() => handleRemove(index)}
            sx={{
              position: "absolute",
              top: -15,
              right: -15,
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "white",
              },
            }}
            color="error"
          >
            <DeleteIcon />
          </IconButton>

          {Object.keys(emptyVariant).map((field) => (
            <Grid2 item size={{ xs: 12, sm: getGridSize(field) }} key={field}>
              {field === "images" ? (
                <Box>
                  <ImageUploadComponent
                    variantIndex={index}
                    onImagesUploaded={(uploadedUrls) => {
                      const updatedImages = [
                        ...(variants[index]?.images || []),
                        ...uploadedUrls,
                      ];
                      handleChange(index, "images", updatedImages);
                    }}
                  />
                </Box>
              ) : field === "video" ? (
                <Box>
                  <VideoUploadComponent />
                </Box>
              ) : (
                <Box>
                  <Typography variant="subtitle2" mb={1}>
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </Typography>
                  <StyledTextField
                    name={`variant.${field}`}
                    placeholder={`Enter ${field}`}
                    value={variant[field]}
                    onChange={(e) => handleChange(index, field, e.target.value)}
                  />
                </Box>
              )}
            </Grid2>
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default VariantForm;
