import React from "react";
import { motion } from "framer-motion";
import {
  Box,
  Typography,
  Grid2,
  TextField,
  FormControlLabel,
  Button,
  MenuItem,
  Checkbox,
} from "@mui/material";
import { Email, Phone, LocationOn, Language } from "@mui/icons-material";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import Navbar from "../../components/Navbar";
import RealEstateCTA from "../../components/RealEstateCTA";
import FooterComponent from "../../components/footer";

const ListYourProperty = () => {
  return (
    <Box id="listyourproperty" sx={{ backgroundColor: "#191919" }}>
      <Navbar />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          backgroundColor: "#141414",
          px: { xs: 2, md: 5, lg: 10 },
          py: { xs: 2, md: 2, lg: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
          }}
        >
          <img
            src="Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3">List Your Property</Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body2"
              sx={{ textAlign: "left", width: "90%", color: "#999999" }}
            >
              Welcome to RK's List Your Property page! Whether you're a
              homeowner, investor, or developer looking to sell or lease your
              property, we're here to make the process seamless and hassle-free.
              Share your property details with us, and our team will assist you
              in finding the right buyers or tenants. From residential homes and
              commercial spaces to investment properties, we help you get the
              best deals. Fill out the form below, and let’s get started on
              showcasing your property to potential buyers and investors!
            </Typography>
          </Box>
        </Box>
        {/* Contact Form */}
        <Box
          component="form"
          sx={{
            borderRadius: "8px",
            padding: { xs: 3, md: 5 },
            width: "100%",
            border: "5px solid #262626",
          }}
        >
          <Grid2 container spacing={2}>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">First Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter First Name"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Last Name</Typography>
              <TextField
                fullWidth
                placeholder="Enter Last Name"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Email</Typography>
              <TextField
                fullWidth
                placeholder="Enter Email"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Phone</Typography>
              <TextField
                fullWidth
                placeholder="Enter Phone Number"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Inquiry Type</Typography>
              <TextField
                fullWidth
                select
                placeholder="Select Inquiry Type"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input::placeholder": { color: "#666666" },
                  },
                }}
              >
                <MenuItem value={"buying"}>Buying</MenuItem>
                <MenuItem value={"selling"}>Selling</MenuItem>
                <MenuItem value={"investment"}>Investment</MenuItem>
              </TextField>
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 4 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">
                How did you hear about us?
              </Typography>
              <TextField
                fullWidth
                select
                placeholder="Select"
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              >
                <MenuItem value={"social media"}>Social Media</MenuItem>
                <MenuItem value={"friend"}>Friend</MenuItem>
                <MenuItem value={"website"}>Website</MenuItem>
              </TextField>
            </Grid2>
            <Grid2
              item
              size={{ xs: 12, sm: 12 }}
              sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <Typography variant="body1">Message</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                placeholder="Enter your message here.."
                variant="outlined"
                InputLabelProps={{ style: { color: "#999999" } }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#1A1A1A",
                    "& fieldset": { borderColor: "#262626" },
                    "&:hover fieldset": { borderColor: "#262626" },
                    "& .MuiInputBase-input": { color: "#666666" },
                  },
                }}
              />
            </Grid2>
            <Grid2
              container
              width="100%"
              size={{ xs: 12, md: 12, sm: 12 }}
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid2 item>
                <FormControlLabel
                  control={
                    <Checkbox
                      sx={{
                        color: "#262626",
                        "&.Mui-checked": { color: "#7C4DFF" },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2" color="#999999">
                      I agree with{" "}
                      <a href="#" style={{ color: "#999999" }}>
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a href="#" style={{ color: "#999999" }}>
                        Privacy Policy
                      </a>
                    </Typography>
                  }
                />
              </Grid2>
              <Grid2 item>
                <Button
                  variant="contained"
                  sx={{ backgroundColor: "#7C4DFF", color: "white", px: 4 }}
                >
                  Send Your Message
                </Button>
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
      </Box>

      <RealEstateCTA />
      <FooterComponent />
    </Box>
  );
};

export default ListYourProperty;
