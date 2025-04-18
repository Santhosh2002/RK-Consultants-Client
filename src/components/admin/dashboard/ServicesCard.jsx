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
  Modal,
  Paper,
} from "@mui/material";

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);

  return (
    <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={service.id}>
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
          src={service?.images?.[0]}
          alt={service.name}
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
              {service.name}
            </Typography>
            <Typography variant="body2" color="grey.400">
              {expanded
                ? service.description
                : `${service.description.slice(0, 100)}... `}
              <Typography
                component="span"
                sx={{ color: "#6A5ACD", cursor: "pointer" }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? " View Less" : " Read More"}
              </Typography>
            </Typography>
            {/* <Box sx={{ display: "flex", flexDirection: "row", gap: "8px" }}>
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
            </Box> */}
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
                  Price
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  ₹{service?.price}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 2,
            }}
          >
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6A5ACD",
                color: "#fff",
                textTransform: "none",
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#D32F2F",
                color: "#fff",
                textTransform: "none",
              }}
            >
              Delete
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default ServiceCard;
