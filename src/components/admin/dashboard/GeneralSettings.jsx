import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Container,
  Grid2,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    logo: null,
    title: "",
    about: "",
    contact: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    terms: "",
    privacy: "",
    shippingPolicy: "",
    refundPolicy: "",
  });

  const [previewLogo, setPreviewLogo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const base = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    axios
      .get(`${base}/api/general`)
      .then((response) => {
        setSettings(response.data.general);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Error fetching settings");
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSettings({ ...settings, logo: file });
    setPreviewLogo(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    const token = localStorage.getItem("authToken");

    try {
      await axios.post(`${base}/api/general/${settings._id}`, settings, {
        headers: { Authorization: `${token}` },
      });
      toast.success("Settings updated successfully!");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error updating settings");
    }
    setIsUpdating(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        py: 6,
        borderRadius: "16px",
      }}
    >
      <ToastContainer />
      <Container
        maxWidth="lg"
        sx={{ borderRadius: "16px", padding: "20px", backgroundColor: "#222" }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: "bold", marginBottom: "20px" }}
        >
          General Settings
        </Typography>
        {loading ? (
          <Typography>Loading settings...</Typography>
        ) : (
          <>
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <Grid2 container spacing={3}>
                  <Grid2 item xs={12}>
                    <Card
                      sx={{
                        backgroundColor: "#333",
                        borderRadius: "16px",
                        padding: 3,
                      }}
                    >
                      <CardContent>
                        <Typography variant="h6">Logo</Typography>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {previewLogo && (
                          <img
                            src={previewLogo}
                            alt="Logo Preview"
                            style={{
                              marginTop: "10px",
                              borderRadius: "8px",
                              width: "100px",
                            }}
                          />
                        )}
                      </CardContent>
                    </Card>
                  </Grid2>
                  {Object.entries(settings).map(([key, value]) =>
                    key !== "_id" && key !== "logo" ? (
                      <Grid2 item size={{ xs: 12, sm: 6 }} key={key}>
                        <TextField
                          fullWidth
                          label={key.replace(/([A-Z])/g, " $1").trim()}
                          name={key}
                          value={value}
                          onChange={handleChange}
                          multiline={
                            key.includes("Policy") ||
                            key === "terms" ||
                            key === "privacy"
                          }
                          rows={
                            key.includes("Policy") ||
                            key === "terms" ||
                            key === "privacy"
                              ? 4
                              : 1
                          }
                          sx={{ backgroundColor: "#333", borderRadius: "8px" }}
                          InputProps={{ style: { color: "#fff" } }}
                        />
                      </Grid2>
                    ) : null
                  )}
                </Grid2>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#6A5ACD",
                    color: "#fff",
                    textTransform: "none",
                    marginTop: 3,
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                >
                  {isUpdating ? "Updating..." : "Save Changes"}
                </Button>
              </form>
            ) : (
              <>
                <Grid2 container spacing={3}>
                  {Object.entries(settings).map(([key, value]) =>
                    key !== "_id" && key !== "logo" ? (
                      <Grid2 item size={{ xs: 12, sm: 6 }} key={key}>
                        <Card
                          sx={{
                            backgroundColor: "#333",
                            borderRadius: "16px",
                            padding: 3,
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </Typography>
                            <Typography variant="body1" sx={{ color: "#ccc" }}>
                              {value}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid2>
                    ) : null
                  )}
                </Grid2>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#6A5ACD",
                    color: "#fff",
                    textTransform: "none",
                    marginTop: 3,
                    padding: "10px 20px",
                    borderRadius: "8px",
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit Settings
                </Button>
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
};

export default GeneralSettings;
