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
import GoogleIcon from "@mui/icons-material/Google";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  loginUser,
  selectAuthLoading,
  selectAuthError,
} from "../../store/authSlice";

const AdminLoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loading = useSelector(selectAuthLoading);
  const error = useSelector(selectAuthError);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) return;

    const result = await dispatch(loginUser({ username, password }));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/admin/dashboard");
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
            Welcome back!
          </Typography>

          <Typography variant="h5" fontWeight={600} gutterBottom>
            Admin Login
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            Please login to continue to your account.
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

            <Box display="flex" alignItems="center" mb={2}>
              <input type="checkbox" id="remember" style={{ marginRight: 8 }} />
              <label htmlFor="remember" style={{ fontSize: 14 }}>
                Keep me logged in
              </label>
            </Box>

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
                "Sign in"
              )}
            </Button>
          </form>

          {/* <Divider sx={{ my: 2 }}>or</Divider>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<GoogleIcon />}
            sx={{ mb: 2 }}
          >
            Sign in with Google
          </Button> */}

          <Typography variant="body2" sx={{ textAlign: "center" }}>
            Need an account?{" "}
            <a href={`/admin/signup`} style={{ color: "#2563eb" }}>
              Create one
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

export default AdminLoginPage;
