import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Grid2,
  Divider,
  Stack,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LanguageIcon from "@mui/icons-material/Language";
import MessageIcon from "@mui/icons-material/Message";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const UserContactCard = ({ user }) => {
  return (
    <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={user._id}>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #444",
          backgroundColor: "#1c1c1c",
          color: "#fff",
          boxShadow: 4,
          padding: 2,
          transition: "all 0.3s ease-in-out",
          minHeight: "320px",
        }}
      >
        <CardContent>
          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{ marginBottom: "10px" }}
          >
            {user.firstName} {user.lastName}
          </Typography>

          <Stack
            spacing={1}
            divider={<Divider flexItem sx={{ borderColor: "#333" }} />}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <EmailIcon fontSize="small" />
              <Typography variant="body2">{user.email}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <PhoneIcon fontSize="small" />
              <Typography variant="body2">{user.phone}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <ShoppingCartIcon fontSize="small" />
              <Typography variant="body2">{user.inquiryType}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LanguageIcon fontSize="small" />
              <Typography variant="body2">{user.heardFrom}</Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
              <MessageIcon fontSize="small" />
              <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                {user.message}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CalendarMonthIcon fontSize="small" />
              <Typography variant="body2">
                {new Date(user.createdAt).toLocaleString()}
              </Typography>
            </Box>
          </Stack>

          <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
            <Chip
              label="Contacted"
              sx={{ bgcolor: "#6A5ACD", color: "white", borderRadius: 1 }}
            />
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default UserContactCard;
