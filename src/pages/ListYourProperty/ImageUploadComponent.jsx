import React, { useState } from "react";
import { Typography, Button, Box, IconButton, Paper, Grid2 } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const MAX_FILE_SIZE_MB = 5;

const ImageUploadComponent = () => {
  const [formData, setFormData] = useState({ images: [] });
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (files) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter(file => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
      return true;
    });

    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...validFiles],
    }));
  };

  const onInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null; // allow re-select of same file
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  };

  return (
    <Grid2 sx={{ display: "flex", flexDirection: "column", gap: "8px" }} item size={{ xs: 12, sm: 6 }}>
      <Grid2 sx={{ display: "flex", flexDirection: "row", gap: "8px", justifyContent:"space-between" }} item size={{ xs: 12, sm: 12 }}>
      <Typography>Images</Typography>

      {/* File input */}
      <input
        id="images"
        type="file"
        accept="image/*"
        multiple
        onChange={onInputChange}
        style={{ display: "none" }}
      />

      {/* Upload Button */}
      <label htmlFor="images">
        <Button
          variant="outlined"
          size="small"
          component="span"
          sx={{ color: "#7C4DFF" }}
        >
          Upload Images
        </Button>
      </label>
      </Grid2>
      {/* Drag & Drop area */}
      {/* <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 2,
          borderStyle: dragActive ? 'dashed' : 'solid',
          backgroundColor: dragActive ? '#f3e5f5' : 'inherit',
          textAlign: "center",
          cursor: "pointer",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Typography variant="body2">Or drag & drop images here</Typography>
      </Paper> */}

      {/* Image thumbnails with delete icon */}
      {formData.images.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {formData.images.map((file, index) => (
            <Box
              key={`${file.name}-${index}`}
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 1,
                border: "1px solid #ccc",
              }}
            >
              <img
                src={URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                onClick={() => handleRemoveImage(index)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                <DeleteIcon fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Grid2>
  );
};

export default ImageUploadComponent;
