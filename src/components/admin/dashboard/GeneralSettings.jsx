import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGeneralSettings,
  updateGeneralSettings,
  getGeneralSettings,
  getSettingsLoader,
  getSettingsUpdater,
} from "../../../store/generalSettingsSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Grid2,
  Typography,
  Box,
  TextField,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { Edit, Save, Cancel } from "@mui/icons-material";

// Function to capitalize only the first letter of each title
const capitalizeTitle = (title) =>
  title.charAt(0).toUpperCase() + title.slice(1);

const GeneralSettings = () => {
  const dispatch = useDispatch();
  const settings = useSelector(getGeneralSettings);
  const loading = useSelector(getSettingsLoader);
  const updating = useSelector(getSettingsUpdater);

  const [formValues, setFormValues] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [previewLogo, setPreviewLogo] = useState(null);
  const [expandedFields, setExpandedFields] = useState({});

  useEffect(() => {
    dispatch(fetchGeneralSettings());
  }, [dispatch]);

  useEffect(() => {
    if (settings) {
      setFormValues(settings);
    }
  }, [settings]);

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormValues({ ...formValues, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateGeneralSettings(formValues))
      .unwrap()
      .then(() => {
        toast.success("Settings updated successfully!");
        setIsEditing(false);
      })
      .catch(() => toast.error("Error updating settings"));
  };

  const toggleExpand = (key) => {
    setExpandedFields((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        py: 6,
        minHeight: "100vh",
        width: "100%",
      }}
    >
      <ToastContainer />
      <Container maxWidth="xl">
        <Box
          sx={{
            backgroundColor: "#222",
            padding: "24px",
            borderRadius: "12px",
          }}
        >
          {/* Header Section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Avatar
                src={previewLogo || settings.logo}
                alt="Logo"
                sx={{ width: 80, height: 80, border: "2px solid #6A5ACD" }}
              />
              <Box>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  General Settings
                </Typography>
                {isEditing && (
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                )}
              </Box>
            </Box>

            {!isEditing ? (
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={() => setIsEditing(true)}
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Edit
              </Button>
            ) : (
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<Save />}
                  onClick={handleSubmit}
                  sx={{ backgroundColor: "#6A5ACD", color: "#fff" }}
                  disabled={updating}
                >
                  {updating ? "Saving..." : "Save Changes"}
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Cancel />}
                  onClick={() => setIsEditing(false)}
                  sx={{ backgroundColor: "#D32F2F", color: "#fff" }}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>

          {/* Form Section */}
          <Grid2 container spacing={3}>
            {/* Small Fields (3 columns) */}
            {["title", "contact", "email", "phone"].map(
              (key) =>
                formValues[key] !== undefined && (
                  <Grid2 item size={{ xs: 12, sm: 3 }} key={key}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ffffff", marginBottom: "6px" }}
                    >
                      {capitalizeTitle(key.replace(/([A-Z])/g, " $1").trim())}
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        name={key}
                        value={formValues[key]}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: "#333",
                          borderRadius: "8px",
                          color: "#fff",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none", // Removes the black border
                            },
                            "&:hover fieldset": {
                              border: "none", // Ensures no border appears on hover
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #6A5ACD", // Optional: Add focus border color
                            },
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {formValues[key] || "—"}
                      </Typography>
                    )}
                  </Grid2>
                )
            )}
            {/* Social Links (6 columns) */}
            {["address", "facebook", "instagram", "linkedin"].map(
              (key) =>
                formValues[key] !== undefined && (
                  <Grid2 item size={{ xs: 12, sm: 6 }} key={key}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ffffff", marginBottom: "6px" }}
                    >
                      {capitalizeTitle(key.replace(/([A-Z])/g, " $1").trim())}
                    </Typography>
                    {isEditing ? (
                      <TextField
                        fullWidth
                        name={key}
                        value={formValues[key]}
                        onChange={handleChange}
                        sx={{
                          backgroundColor: "#333",
                          borderRadius: "8px",
                          color: "#fff",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none", // Removes the black border
                            },
                            "&:hover fieldset": {
                              border: "none", // Ensures no border appears on hover
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #6A5ACD", // Optional: Add focus border color
                            },
                          },
                        }}
                      />
                    ) : (
                      <Typography variant="body1" sx={{ color: "#fff" }}>
                        {formValues[key] || "—"}
                      </Typography>
                    )}
                  </Grid2>
                )
            )}
            {/* Large Fields (12 columns) */}
            {[
              "about",
              "terms",
              "privacy",
              "refundPolicy",
              "shippingPolicy",
            ].map(
              (key) =>
                formValues[key] !== undefined && (
                  <Grid2 item size={{ xs: 12 }} key={key}>
                    <Typography
                      variant="h6"
                      sx={{ color: "#ffffff", marginBottom: "6px" }}
                    >
                      {capitalizeTitle(key.replace(/([A-Z])/g, " $1").trim())}
                    </Typography>

                    {/* View Mode - Show Typography with truncation */}
                    {!isEditing ? (
                      <>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "#fff",
                            wordWrap: "break-word", // Ensures text doesn't overflow
                            overflowWrap: "break-word", // Handles large words correctly
                            whiteSpace: "normal", // Prevents text from expanding beyond container
                            maxWidth: "100%", // Ensures text stays within grid limits
                          }}
                        >
                          {formValues[key] || "—"}
                        </Typography>
                        {formValues[key] && formValues[key].length > 100 && (
                          <Button
                            sx={{ color: "#ffffff", textTransform: "none" }}
                            onClick={() => toggleExpand(key)}
                          >
                            {expandedFields[key] ? "Show Less" : "Show More"}
                          </Button>
                        )}
                      </>
                    ) : (
                      // Edit Mode - Show TextField
                      <TextField
                        fullWidth
                        name={key}
                        value={formValues[key]}
                        onChange={handleChange}
                        multiline
                        rows={8}
                        sx={{
                          backgroundColor: "#333",
                          borderRadius: "8px",
                          color: "#fff",
                          "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                              border: "none", // Removes the black border
                            },
                            "&:hover fieldset": {
                              border: "none", // Ensures no border appears on hover
                            },
                            "&.Mui-focused fieldset": {
                              border: "1px solid #6A5ACD", // Optional: Add focus border color
                            },
                          },
                        }}
                      />
                    )}
                  </Grid2>
                )
            )}
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};

export default GeneralSettings;
