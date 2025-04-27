import React, { useState, useEffect } from "react";
import { Button, Typography, Box, IconButton, Grid2 } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  uploadFile,
  getUploadedFileUrl,
  resetUploadState,
  isUploading,
} from "../store/fileUploadSlice";

const MAX_FILE_SIZE_MB = 10;

export default function FileUploadField({
  control,
  setValue,
  fieldName,
  label = "Files",
  accept = "image/*",
  multiple = true,
  variantIndex = "",
  defaultUrls = [], // ✅ added defaultUrls support
}) {
  const dispatch = useDispatch();
  const uploadedUrls = useSelector(getUploadedFileUrl);
  const uploadImgLoading = useSelector(isUploading);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileQueue, setFileQueue] = useState([]);
  const [preloadedUrls, setPreloadedUrls] = useState(defaultUrls || []); // ✅ preloaded urls

  const handleFileChange = (files) => {
    const selected = Array.from(files).filter((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) return false;
      return true;
    });

    setSelectedFiles((prev) => [...prev, ...selected]);
    setFileQueue((prev) => [...prev, ...selected]);
  };

  const onInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null;
  };

  const handleUploadClick = () => {
    if (fileQueue.length === 0) return;
    dispatch(resetUploadState());
    dispatch(uploadFile(fileQueue));
    setFileQueue([]);
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prev) => prev.filter((_, idx) => idx !== indexToRemove));
    setFileQueue((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleRemovePreloaded = (indexToRemove) => {
    const updated = preloadedUrls.filter((_, idx) => idx !== indexToRemove);
    setPreloadedUrls(updated);

    if (setValue) {
      if (multiple) {
        setValue(fieldName, [...updated, ...uploadedUrls]);
      } else {
        setValue(fieldName, updated.length > 0 ? updated[0] : "");
      }
    }
  };

  useEffect(() => {
    if (uploadedUrls?.length > 0 && setValue) {
      if (multiple) {
        setValue(fieldName, [...preloadedUrls, ...uploadedUrls]);
      } else {
        setValue(fieldName, uploadedUrls[0]);
      }
    }
  }, [uploadedUrls, preloadedUrls, setValue, fieldName, multiple]);

  useEffect(() => {
    // Whenever defaultUrls changes externally (when editing)
    if (defaultUrls?.length > 0) {
      setPreloadedUrls(defaultUrls);
    }
  }, [defaultUrls]);

  return (
    <Grid2
      item
      size={{ xs: 12 }}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>{label}</Typography>

        <Box>
          <input
            id={`upload-${fieldName}-${variantIndex}`}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={onInputChange}
            style={{ display: "none" }}
          />
          <label htmlFor={`upload-${fieldName}-${variantIndex}`}>
            <Button
              variant="outlined"
              size="small"
              sx={{ color: "#7C4DFF", mr: 1 }}
              component="span"
            >
              Choose {multiple ? "Files" : "File"}
            </Button>
          </label>

          <Button
            variant="contained"
            size="small"
            sx={{ backgroundColor: "#7C4DFF", color: "white" }}
            onClick={handleUploadClick}
            disabled={uploadImgLoading || fileQueue.length === 0}
          >
            {uploadImgLoading ? "Uploading..." : "Upload"}
          </Button>
        </Box>
      </Box>

      {/* Preloaded images */}
      {preloadedUrls.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {preloadedUrls.map((url, index) => (
            <Box
              key={`preloaded-${index}`}
              sx={{
                position: "relative",
                width: 100,
                height: 100,
                borderRadius: 2,
                overflow: "hidden",
                boxShadow: 1,
                border: "1px solid #ccc",
                backgroundColor: "#eee",
              }}
            >
              <img
                src={url}
                alt="preloaded"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <IconButton
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
                onClick={() => handleRemovePreloaded(index)}
              >
                <Delete fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      {/* Newly selected local files */}
      {selectedFiles.length > 0 && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {selectedFiles.map((file, index) => (
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
                backgroundColor: "#eee",
              }}
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <Typography
                  variant="caption"
                  sx={{
                    p: 1,
                    fontSize: "10px",
                    textAlign: "center",
                    overflowWrap: "break-word",
                  }}
                >
                  {file.name}
                </Typography>
              )}
              <IconButton
                onClick={() => handleRemoveFile(index)}
                size="small"
                sx={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  backgroundColor: "rgba(255,255,255,0.7)",
                }}
              >
                <Delete fontSize="small" color="error" />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </Grid2>
  );
}
