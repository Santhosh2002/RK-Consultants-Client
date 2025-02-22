import { Box, Typography, Button, TextField, Dialog, DialogContent, IconButton } from "@mui/material";
import { X } from "lucide-react";
import React, { useState } from "react";

const Modal = ({ service, onClose }) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" }); // Reset form after submission
  };

  return (
    <Dialog open={true} onClose={onClose} fullWidth maxWidth="md">
      <DialogContent sx={{ backgroundColor: "#1A1A1A", color: "white", borderRadius: "12px", padding: "32px" }}>
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
          <Typography variant="h5" fontWeight={600}>
            {service.name}
          </Typography>
          <IconButton onClick={onClose} sx={{ color: "#A187F0" }}>
            <X />
          </IconButton>
        </Box>

        {/* Service Details */}
        <Typography variant="body1" sx={{ color: "#999999", textAlign: "justify", mb: 3 }}>
          {service.description}
        </Typography>

        {/* Sub-services */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
          Sub-services:
        </Typography>
        <Box sx={{ mb: 3, color: "#A187F0", fontSize: "14px" }}>
          {service.subServices?.length ? (
            <ul style={{ paddingLeft: "16px" }}>
              {service.subServices.map((sub, index) => (
                <li key={index}>{sub}</li>
              ))}
            </ul>
          ) : (
            <Typography>No additional sub-services listed.</Typography>
          )}
        </Box>

        {/* Contact Form */}
        <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
          Contact Us
        </Typography>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            fullWidth
            required
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#999999" } }}
            sx={{
              backgroundColor: "#2A2A2A",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#A187F0" },
                "&.Mui-focused fieldset": { borderColor: "#A187F0" },
              },
            }}
          />

          <TextField
            fullWidth
            required
            type="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#999999" } }}
            sx={{
              backgroundColor: "#2A2A2A",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#A187F0" },
                "&.Mui-focused fieldset": { borderColor: "#A187F0" },
              },
            }}
          />

          <TextField
            fullWidth
            required
            type="tel"
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            variant="outlined"
            InputLabelProps={{ style: { color: "#999999" } }}
            sx={{
              backgroundColor: "#2A2A2A",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#A187F0" },
                "&.Mui-focused fieldset": { borderColor: "#A187F0" },
              },
            }}
          />

          <TextField
            fullWidth
            required
            label="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            variant="outlined"
            multiline
            rows={3}
            InputLabelProps={{ style: { color: "#999999" } }}
            sx={{
              backgroundColor: "#2A2A2A",
              borderRadius: "8px",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#444" },
                "&:hover fieldset": { borderColor: "#A187F0" },
                "&.Mui-focused fieldset": { borderColor: "#A187F0" },
              },
            }}
          />

          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#A187F0",
              color: "#fff",
              "&:hover": { backgroundColor: "#7C5CD8" },
            }}
          >
            Submit
          </Button>
        </form>

        {/* Close Button */}
        <Button
          onClick={onClose}
          fullWidth
          sx={{
            mt: 2,
            backgroundColor: "#444",
            color: "#fff",
            "&:hover": { backgroundColor: "#666" },
          }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
