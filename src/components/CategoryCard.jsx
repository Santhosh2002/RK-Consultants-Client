import React from "react";
import { Box, Typography } from "@mui/material";

const CategoryCard = ({ image, title, size, type, isSelected, onClick }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#222",
        border: isSelected ? "2px solid #6A5ACD" : "1px solid #333",
        transition: "border 0.2s ease-in-out",
        borderRadius: "12px",
        padding: "12px",
        width: "300px",
        gap: "16px",
        color: "#fff",
        cursor: "pointer", // ✅ Indicates it's clickable
        "&:hover": {
          borderColor: "#6A5ACD", // Optional hover highlight
        },
      }}
      onClick={onClick}
    >
      <img
        src={image}
        alt={title}
        onError={(e) => {
          e.target.onerror = null; // prevent infinite loop
          e.target.src = "https://images.app.goo.gl/HwM8Dbj97dyh4kYx6"; // your fallback path
        }}
        style={{ width: "80px", borderRadius: "8px" }}
      />
      <Box>
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: "#999" }}>
          {size}{" "}
        </Typography>
        <Typography variant="body2" sx={{ color: "#999" }}>
          {type}
        </Typography>
      </Box>
    </Box>
  );
};

export default CategoryCard;
