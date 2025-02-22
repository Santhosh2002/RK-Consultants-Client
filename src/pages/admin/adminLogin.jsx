import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
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
import { styled } from "@mui/system";
import { useTheme } from "@mui/material/styles";

const AdminLoginPage = () => {
  const theme = useTheme(); // Access the theme
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return;
    dispatch(loginUser({ username, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/admin/dashboard");
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
            Admin Login
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
                "Login"
              )}
            </Button>
          </form>
          <Box mt={2}>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/admin/signup")}
              >
                Sign Up
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

export default AdminLoginPage;
