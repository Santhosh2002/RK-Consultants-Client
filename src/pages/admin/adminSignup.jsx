import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/authSlice";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

const AdminSignupPage = () => {
  const theme = useTheme(); // Access the theme
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !role || !password) return;
    dispatch(registerUser({ username, role, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/admin/login");
      }
    });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "url(/slider-img-02.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container>
        <Card
          sx={{
            p: theme.spacing(4),
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[4],
            maxWidth: "400px",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Box mb={2}>
            <img src="/new_logo_bg.png" alt="Logo" style={{ height: "80px" }} />
          </Box>
          <Typography
            variant="h5"
            fontWeight={theme.typography.fontWeightBold}
            gutterBottom
          >
            Admin Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Role"
              variant="outlined"
              margin="normal"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                mt: theme.spacing(2),
                py: theme.spacing(1.5),
                borderRadius: theme.shape.borderRadius,
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
          <Box mt={2}>
            <Typography variant="body2">
              Already have an account?{" "}
              <Button
                variant="text"
                color="secondary"
                onClick={() => navigate("/admin/login")}
              >
                Login
              </Button>
            </Typography>
          </Box>
        </Card>
      </Container>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => {}}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminSignupPage;
