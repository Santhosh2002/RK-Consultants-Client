import { useState, useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Box, Chip, Button, Grid2, Modal, Fade } from "@mui/material";
import MultiStepForm from "./MultiStepForm";

const ServiceCard = ({ service }) => {
  const [expanded, setExpanded] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const images = service.images || [];

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setFadeIn(false); // Start fade out

      setTimeout(() => {
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setFadeIn(true); // Fade in new image
      }, 300); // timing for fade effect
    }, 3000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Grid2 item size={{ xs: 12, sm: 6, md: 4 }} key={service.id}>
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
        <Box
          sx={{
            width: "100%",
            height: "200px",
            borderRadius: "10px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <Fade in={fadeIn} timeout={500}>
            <Box
              component="img"
              src={images[imageIndex]}
              alt={service.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: 0,
                left: 0,
                transition: "transform 0.5s ease-in-out",
              }}
            />
          </Fade>
        </Box>
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
                  Price Upto
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: "bold", fontSize: "18px" }}
                >
                  ₹{service?.price}
                </Typography>
              </Box>
              {/* ✅ Purchase Button - Opens Payment Form */}
              <Button
                variant="contained"
                // color="success"
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  textTransform: "none",
                }}
                onClick={() => {
                  setSelectedService(service);
                  setOpen(true);
                }}
              >
                Purchase Service
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* ✅ Payment Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
          {selectedService && (
            <MultiStepForm
              amount={0} // ✅ Pass the amount
              serviceName={selectedService.name}
              subServices={selectedService.subServices}
              serviceId={selectedService._id}
            />
          )}
        </Box>
      </Modal>
    </Grid2>
  );
};

export default ServiceCard;
