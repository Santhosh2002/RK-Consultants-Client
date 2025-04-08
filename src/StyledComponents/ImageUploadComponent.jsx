import React, { useState } from "react";
import { Typography, Button, Box, IconButton, Grid2 } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  uploadFile,
  getUploadedFileUrl,
  resetUploadState,
} from "../store/fileUploadSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const MAX_FILE_SIZE_MB = 5;

const ImageUploadComponent = ({ variantIndex, onImagesUploaded }) => {
  const [images, setImages] = useState([]);
  const [fileQueue, setFileQueue] = useState([]);
  const dispatch = useDispatch();
  const uploadedUrls = useSelector(getUploadedFileUrl);

  const handleFileChange = (files) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter((file) => {
      if (!file.type.startsWith("image/")) return false;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
      return true;
    });

    setImages((prev) => [...prev, ...validFiles]);
    setFileQueue((prev) => [...prev, ...validFiles]);
  };

  const onInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null;
  };

  const handleUploadClick = () => {
    if (fileQueue.length === 0) return;
    dispatch(resetUploadState()); // optional, clean previous
    dispatch(uploadFile(fileQueue));
    setFileQueue([]);
  };

  const handleRemoveImage = (indexToRemove) => {
    setImages((prev) => prev.filter((_, index) => index !== indexToRemove));
    setFileQueue((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  useEffect(() => {
    if (uploadedUrls?.length > 0) {
      onImagesUploaded(uploadedUrls);
    }
  }, [uploadedUrls]);

  return (
    <Grid2
      sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
      item
      size={{ xs: 12, sm: 6 }}
    >
      <Grid2
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "8px",
          justifyContent: "space-between",
          alignItems: "center",
        }}
        item
        size={{ xs: 12, sm: 12 }}
      >
        <Typography>Images</Typography>

        <div>
          <input
            id={`images-${variantIndex}`}
            type="file"
            accept="image/*"
            multiple
            onChange={onInputChange}
            style={{ display: "none" }}
          />
          <label htmlFor={`images-${variantIndex}`}>
            <Button
              variant="outlined"
              size="small"
              component="span"
              sx={{ color: "#7C4DFF", mr: 1 }}
            >
              Choose Images
            </Button>
          </label>

          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#7C4DFF", color: "white" }}
            onClick={handleUploadClick}
            disabled={fileQueue.length === 0}
          >
            Upload
          </Button>
        </div>
      </Grid2>

      {/* Image preview */}
      {images.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexWrap: "wrap", gap: 2 }}>
          {images.map((file, index) => (
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
