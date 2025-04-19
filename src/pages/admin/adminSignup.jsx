import { useState } from "react";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useMediaQuery,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/authSlice";

const AdminSignupPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !role || !password || !confirmPassword) return;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const result = await dispatch(registerUser({ username, role, password }));
    if (result.meta.requestStatus === "fulfilled") {
      alert("Account created! Please login.");
      navigate(`/admin/login`);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#000000",
      }}
    >
      {/* Left Panel */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          flexDirection: "column",
          p: 4,
          backgroundColor: "#000",
        }}
      >
        <Box mb={20}>
          <img
            src="/Icons/RK_Logo_White_No_Slogan.svg"
            alt="Logo"
            style={{ height: "40px" }}
          />
        </Box>
        <Box sx={{ width: "100%", maxWidth: 400 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
            Get started
          </Typography>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Admin Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Join us to access your dashboard and more!
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              type="text"
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                  },
                },
              }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <TextField
              label="Role"
              type="text"
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                  },
                },
              }}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />

            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                  },
                },
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              size="large"
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#ccc" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#555",
                  },
                  "&:hover fieldset": {
                    borderColor: "#888",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#2563eb",
                  },
                },
              }}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ backgroundColor: "#2563eb", color: "#fff", mb: 2 }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          {/* <Divider sx={{ my: 2 }}>or</Divider>

          <Button variant="outlined" fullWidth startIcon={<GoogleIcon />}>
            Sign up with Google
          </Button> */}

          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            Already have an account?{" "}
            <a href={`/admin/login`} style={{ color: "#2563eb" }}>
              Sign in
            </a>
          </Typography>
        </Box>
      </Box>

      {/* Right Panel */}
      <Box
        sx={{
          flex: 1,
          height: { xs: "250px", md: "100vh" },
          backgroundImage: "url(/slider-img-02.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderTopRightRadius: { xs: 0, md: "16px" },
          borderBottomRightRadius: { xs: 0, md: "16px" },
        }}
      />

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
