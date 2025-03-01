import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid2,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  styled,
  ToggleButton,
  Stack,
} from "@mui/material";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "EAST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "NORTH TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "EAST TYPE-2",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "WEST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "EAST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "NORTH TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "EAST TYPE-2",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "WEST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "EAST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "NORTH TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "EAST TYPE-2",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "2500 sq.ft",
    type: "WEST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "EAST TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "NORTH TYPE-1",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "EAST TYPE-2",
    image: "/property-catagory-1.png",
  },
  {
    title: "3 BHK",
    size: "1980 sq.ft",
    type: "WEST TYPE-1",
    image: "/property-catagory-1.png",
  },
];
const CategoriesList = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "start",
        flexDirection: "column",
        borderRadius: "12px",
        border: "1px solid grey",
        padding: "30px 36px 30px 36px",
        width: "100%",
        gap: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Browse from here
        </Typography>
      </Box>
      {[...new Set(categories.map((item) => item.size))].map((size) => (
        <Box
          key={size}
          sx={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: 2,
              margin: "20px 0 20px 0",
            }}
          >
            <Typography variant="h6" fontWeight={600} color="#fff">
              3 BHK
            </Typography>
            <Typography variant="body1" sx={{ color: "#999" }}>
              ({size})
            </Typography>
            <Box sx={{ flexGrow: 1 }}>
              <Divider sx={{ backgroundColor: "#444" }} />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {categories
              .filter((item) => item.size === size)
              .map((item, index) => (
                <CategoryCard key={index} {...item} />
              ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CategoriesList;
