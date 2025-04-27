import React, { useState, useEffect } from "react";
import { Button, Typography, Box, IconButton } from "@mui/material";
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
  defaultUrls = [],
}) {
  const dispatch = useDispatch();
  const uploadKey = `${fieldName}-${variantIndex}`; // Unique key

  const uploadedUrls = useSelector((state) => getUploadedFileUrl(state, uploadKey));
  const uploadImgLoading = useSelector((state) => isUploading(state, uploadKey));

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [fileQueue, setFileQueue] = useState([]);
  const [preloadedUrls, setPreloadedUrls] = useState(defaultUrls || []);
  const [error, setError] = useState("");

  const handleFileChange = (files) => {
    const selected = [];
    const errors = [];

    Array.from(files).forEach((file) => {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name} exceeds ${MAX_FILE_SIZE_MB}MB size limit.`);
      } else if (!accept.split(",").some((type) => file.type.includes(type.trim().replace('*', '')))) {
        errors.push(`${file.name} is not a supported format.`);
      } else {
        selected.push(file);
      }
    });

    setSelectedFiles((prev) => [...prev, ...selected]);
    setFileQueue((prev) => [...prev, ...selected]);
    setError(errors.join(" \n "));
  };

  const onInputChange = (e) => {
    handleFileChange(e.target.files);
    e.target.value = null;
  };

  const handleUploadClick = () => {
    if (fileQueue.length === 0) return;
    dispatch(resetUploadState(uploadKey));
    dispatch(uploadFile({ files: fileQueue, uploadKey }));
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
      setValue(fieldName, multiple ? [...updated, ...uploadedUrls] : updated[0] || "");
    }
  };

  useEffect(() => {
    if (uploadedUrls?.length > 0) {
      setSelectedFiles([]); // Clear selected after upload
      if (setValue) {
        setValue(fieldName, multiple ? [...preloadedUrls, ...uploadedUrls] : uploadedUrls[0]);
      }
    }
  }, [uploadedUrls]);

  useEffect(() => {
    if (defaultUrls?.length > 0) {
      setPreloadedUrls((prev) => prev.length === 0 ? defaultUrls : prev);
    }
  }, []);
  

  return (
    <Box display="flex" flexDirection="column" gap={2} width="100%">
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{width:'100%'}}>
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
            <Button variant="outlined" size="small" sx={{ color: "#7C4DFF", mr: 1 }} component="span">
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

      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}

      {/* Uploaded Files */}
      {preloadedUrls.length > 0 && (
        <Box>
          <Typography variant="subtitle2">Uploaded Files:</Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            {preloadedUrls.map((url, index) => (
              <Box key={`uploaded-${index}`} position="relative" width={100} height={100}>
                <img
                  src={url}
                  alt="uploaded"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <IconButton
                  size="small"
                  sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255,255,255,0.7)" }}
                  onClick={() => handleRemovePreloaded(index)}
                >
                  <Delete fontSize="small" color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <Box>
          <Typography variant="subtitle2">Selected Files (not uploaded):</Typography>
          <Box display="flex" flexWrap="wrap" gap={2} mt={1}>
            {selectedFiles.map((file, index) => (
              <Box key={`${file.name}-${index}`} position="relative" width={100} height={100}>
                {file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <Typography variant="caption" sx={{ p: 1, fontSize: "10px", textAlign: "center" }}>
                    {file.name}
                  </Typography>
                )}
                <IconButton
                  onClick={() => handleRemoveFile(index)}
                  size="small"
                  sx={{ position: "absolute", top: 0, right: 0, backgroundColor: "rgba(255,255,255,0.7)" }}
                >
                  <Delete fontSize="small" color="error" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
}
