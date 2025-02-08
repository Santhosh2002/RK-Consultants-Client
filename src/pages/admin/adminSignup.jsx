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
import { styled } from "@mui/system";

const Background = styled(Box)({
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundImage: "url(/slider-img-02.jpg)",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const StyledCard = styled(Card)({
  padding: "2rem",
  borderRadius: "10px",
  boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  maxWidth: "400px",
  width: "100%",
  textAlign: "center",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
});

function AdminSignupPage() {
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
    <Background>
      <Container>
        <StyledCard>
          <Box mb={2}>
            <img src="/new_logo_bg.png" alt="Logo" style={{ height: "80px" }} />
          </Box>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
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
              sx={{ mt: 2, py: 1.5 }}
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
        </StyledCard>
      </Container>
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={4000}
        onClose={() => {}}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    </Background>
  );
}

export default AdminSignupPage;
