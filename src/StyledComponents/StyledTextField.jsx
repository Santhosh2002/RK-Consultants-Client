import {
  TextField,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useRef, forwardRef } from "react";

const StyledTextField = forwardRef(
  (
    {
      placeholder,
      required,
      multiline,
      minRows,
      options,
      select,
      type,
      multiple,
      onChange,
      name,
      value,
      ...props
    },
    ref
  ) => {
    const [previews, setPreviews] = useState([]);
    const inputRef = useRef(null);

    const isFile = type === "file";
    const isImage = name?.toLowerCase().includes("image");
    const isVideo = name?.toLowerCase().includes("video");

    const acceptType = isImage ? "image/*" : isVideo ? "video/*" : undefined;

    const handleFileChange = (e) => {
      const newFiles = Array.from(e.target.files);
      const newFileURLs = newFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));

      const combined = [...previews, ...newFileURLs];

      const uniqueCombined = Array.from(
        new Map(combined.map((f) => [f.file.name, f])).values()
      );

      setPreviews(uniqueCombined);
      onChange && onChange(uniqueCombined.map((f) => f.file));
    };

    const handleDelete = (index) => {
      const updated = [...previews];
      updated.splice(index, 1);
      setPreviews(updated);
      onChange && onChange(updated.map((f) => f.file));

      if (updated.length === 0 && inputRef.current) {
        inputRef.current.value = "";
      }
    };

    return (
      <Box>
        <TextField
          fullWidth
          variant="outlined"
          placeholder={placeholder}
          required={required}
          multiline={multiline}
          minRows={minRows}
          select={select}
          type={type}
          inputRef={ref || inputRef} // <-- ✅ now supporting external ref!
          inputProps={
            isFile
              ? {
                  multiple,
                  accept: acceptType,
                }
              : {}
          }
          value={value}
          onChange={isFile ? handleFileChange : onChange}
          InputLabelProps={{ style: { color: "#999999" } }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#1A1A1A",
              "& fieldset": { borderColor: "#262626" },
              "&:hover fieldset": { borderColor: "#262626" },
              "& .MuiInputBase-input": { color: "#ffffff" },
            },
          }}
          {...props}
        >
          {select &&
            options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
        </TextField>

        {isFile && previews.length > 0 && (
          <Box display="flex" flexWrap="wrap" mt={1} gap={1}>
            {previews.map((item, index) => {
              const fileType = item.file.type;

              return (
                <Box key={index} position="relative">
                  {fileType.startsWith("image") ? (
                    <img
                      src={item.url}
                      alt="preview"
                      width={80}
                      height={80}
                      style={{ objectFit: "cover", borderRadius: 4 }}
                    />
                  ) : fileType.startsWith("video") ? (
                    <video
                      width={100}
                      height={80}
                      controls
                      style={{ borderRadius: 4 }}
                    >
                      <source src={item.url} type={fileType} />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <Typography variant="body2">Unsupported</Typography>
                  )}

                  <IconButton
                    size="small"
                    onClick={() => handleDelete(index)}
                    sx={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      backgroundColor: "#fff",
                    }}
                  >
                    <DeleteIcon fontSize="small" color="error" />
                  </IconButton>
                </Box>
              );
            })}
          </Box>
        )}
      </Box>
    );
  }
);

export default StyledTextField;
