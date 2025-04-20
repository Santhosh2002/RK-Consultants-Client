import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Grid2,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const PropertyCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);
  // Safely extract the least priced variant
  const leastPriceVariant = item?.variants?.reduce(
    (min, current) => (current?.price < min?.price ? current : min),
    item?.variants?.[0]
  );
  const navigate = useNavigate();

  // Extract unique BHK details
  const uniqueBHKs = [...new Set(item?.variants?.map((v) => v?.bhk))];
  return (
    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={item?.id}>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #444",
          backgroundColor: "#111",
          color: "#fff",
          boxShadow: 4,
          padding: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          image={item?.images[0]}
          alt={item?.title}
          sx={{
            width: "100%",
            height: "200px",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item?.title}
          </Typography>

            <Box sx={{ position: "relative" }}>
              <Typography
                variant="body2"
                color="grey.400"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  minHeight: "48px", // reserve space for 2 lines always
                }}
              >
                {item?.description}
              </Typography>

              <Typography
                component="span"
                sx={{
                  color: "#6A5ACD",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "inline-block",
                  mt: 1,
                }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "View Less" : "Read More"}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              <Box
                sx={{
                  display: "flex",
                  gap: "8px",
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  scrollbarWidth: "none",
                  "&::-webkit-scrollbar": {
                    height: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#444",
                    borderRadius: "4px",
                  },
                }}
              >
                {uniqueBHKs.map((bhk, index) => (
                  <Chip
                    key={index}
                    label={`${bhk}`}
                    sx={{
                      backgroundColor: "#222",
                      color: "#fff",
                      borderRadius: "10px",
                      fontSize: "12px",
                      flexShrink: 0,
                    }}
                  />
                ))}
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 2,
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Typography
                  variant="body2"
                  sx={{ color: "#9999", fontSize: "14px" }}
                >
                  Starting From
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  ₹{leastPriceVariant?.price?.toLocaleString("en-IN")}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={() => {
                  navigate(`/properties/category/${item?.slug}`);
                }}
              >
                View Details
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default PropertyCard;
