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

const MotionBox = motion(Box);

const InquiryForm = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        gap: "24px",
        backgroundColor: "#141414",
        mt: 8,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          gap: "16px",
          width: {
            xs: "100%",
            md: "50%",
          },
        }}
      >
        <img
          src="/Icons/abstract-Design.svg"
          alt="Icon"
          style={{ width: 70, height: "auto", marginRight: 10 }}
        />
        <Typography variant="h3" fontSize={42}>
          Inquire About Seaside Serenity Villa
        </Typography>
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
            Interested in this property? Fill out the form below, and our real
            estate experts will get back to you with more details, including
            scheduling a viewing and answering any questions you may have.
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
          border: "1px solid grey",
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
              sx={inputStyles}
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
              sx={inputStyles}
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
              sx={inputStyles}
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
              sx={inputStyles}
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
              sx={inputStyles}
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
            <Typography variant="body1">How did you hear about us?</Typography>
            <TextField
              fullWidth
              select
              placeholder="Select"
              variant="outlined"
              InputLabelProps={{ style: { color: "#999999" } }}
              sx={inputStyles}
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
              sx={inputStyles}
            />
          </Grid2>
          <Grid2
            container
            width="100%"
            size={{ xs: 12, md: 12, sm: 12 }}
            justifyContent= {{xs: "center", sm:"space-between"}}
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
  );
};

const inputStyles = {
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#1A1A1A",
    minHeight: "50px",
    color: "#ffffff",
    "& fieldset": { borderColor: "#262626" },
    "&:hover fieldset": { borderColor: "#7C4DFF" },
    "& .MuiInputBase-input": { color: "#ffffff" },
  },
};

const buttonStyles = {
  backgroundColor: "#7C4DFF",
  color: "white",
  padding: "10px 24px",
  textTransform: "none",
  fontSize: "16px",
};

export default InquiryForm;
