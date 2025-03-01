import React from "react";
import { Box, Typography } from "@mui/material";

const CategoryCard = ({ image, title, size, type }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#222",
        borderRadius: "12px",
        padding: "12px",
        width: "300px",
        gap: "16px",
        color: "#fff",
      }}
    >
      <img
        src={image}
        alt={title}
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
