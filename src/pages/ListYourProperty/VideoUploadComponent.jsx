import React, { useState } from "react";
import { Typography, Button, Box, IconButton, Paper, Grid2 } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const MAX_VIDEO_SIZE_MB = 50;

const VideoUploadComponent = ({ videos, setVideos }) => {

  const handleFileChange = (files) => {
    const selectedFiles = Array.from(files);
    const validFiles = selectedFiles.filter(file => {
      if (!file.type.startsWith("video/")) return false;
      if (file.size > MAX_VIDEO_SIZE_MB * 1024 * 1024) return false;
      return true;
    });

    setVideos([...videos, ...validFiles]);
  };

  const handleRemoveVideo = (indexToRemove) => {
    setVideos(videos.filter((_, index) => index !== indexToRemove));
  };
  const [dragActive, setDragActive] = useState(false);

  const onInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null;
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
      <Typography>Videos</Typography>

      <input
        id="videos"
        type="file"
        accept="video/*"
        multiple
        onChange={onInputChange}
        style={{ display: "none" }}
      />
      <label htmlFor="videos">
        <Button
          variant="outlined"
          component="span"
          size="small"
          sx={{ color: "#7C4DFF" }}
        >
          Upload Videos
        </Button>
      </label>
      </Grid2>

      {/* Drag & Drop */}
      {/* <Paper
        variant="outlined"
        sx={{
          mt: 2,
          p: 2,
          borderStyle: dragActive ? 'dashed' : 'solid',
          backgroundColor: dragActive ? '#ffccbc' : 'inherit',
          textAlign: "center",
          cursor: "pointer",
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Typography variant="body2">Or drag & drop videos here</Typography>
      </Paper> */}

      {/* Video list */}
      {videos.length > 0 && (
        <Box sx={{ mt: 2, display: "flex", flexDirection: "column", gap: 2 }}>
          {videos.map((file, index) => (
            <Box
              key={`${file.name}-${index}`}
              sx={{
                position: "relative",
                width: 200,
                height: 120,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 1,
                border: "1px solid #333",
              }}
            >
              <video
                src={URL.createObjectURL(file)}
                controls
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  backgroundColor: "#000",
                }}
              />
              <IconButton
                onClick={() => handleRemoveVideo(index)}
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

export default VideoUploadComponent;
