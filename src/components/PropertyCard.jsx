import { useState } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, Grid2 } from "@mui/material";

const PropertyCard = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid2 item size={{xs:12, sm:6, md:4}} key={item.id}>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #444",
          backgroundColor: "#111",
          color: "#fff",
          boxShadow: 4,
          padding: 2,
          transition: "all 0.3s ease-in-out"
        }}
      >
        <CardMedia
          component="img"
          image={item.image}
          alt={item.title}
          sx={{
            width: "100%",
            height: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="h6" fontWeight="bold">
              {item.title}
            </Typography>
            <Typography variant="body2" color="grey.400">
              {expanded ? item.description : `${item.description.slice(0, 100)}... `}
              <Typography
                component="span"
                sx={{ color: "#6A5ACD", cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? " View Less" : " Read More"}
              </Typography>
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
              {item.details.map((detail, index) => (
                <Chip
                  key={index}
                  label={detail}
                  sx={{
                    backgroundColor: "#222",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "12px",
                  }}
                />
              ))}
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
                <Typography variant="body2" sx={{ color: "#9999", fontSize: "14px" }}>
                  Price
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: "bold", fontSize: "18px" }}>
                  ₹{item.price}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  textTransform: "none",
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
