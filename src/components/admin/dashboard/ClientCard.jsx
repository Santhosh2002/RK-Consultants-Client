import { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  Button,
  Grid2,
  Link,
} from "@mui/material";

const ClientCard = ({ client }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Grid2 item size={{ xs: 12, sm: 4, md: 3 }} key={client?._id}>
      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #444",
          backgroundColor: "#111",
          color: "#fff",
          boxShadow: 4,
          padding: 2,
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          image={
            client?.companyLogo ||
            "https://th.bing.com/th/id/OIP.i1tbVDllj1O_HfWT3fngOAHaE8?rs=1&pid=ImgDetMain"
          }
          alt={client?.name}
          sx={{
            width: "100%",
            height: "200px",
            maxHeight: "200px",
            objectFit: "cover",
            borderRadius: "10px",
          }}
        />
        <CardContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <Typography variant="h6" fontWeight="bold">
              {client?.name}
            </Typography>
            <Typography variant="body2" color="grey.400">
              {client?.companyName} - {client?.industry}
            </Typography>

            <Box sx={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
              <Chip
                label={client?.status}
                sx={{
                  backgroundColor:
                    client?.status === "Active" ? "#2e7d32" : "#d32f2f",
                  color: "#fff",
                  borderRadius: "8px",
                }}
              />
              <Chip
                label={client?.clientType}
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  borderRadius: "8px",
                }}
              />
            </Box>

            <Box sx={{ position: "relative" }}>
              <Typography
                variant="body2"
                sx={{
                  display: "-webkit-box",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: expanded ? "none" : 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {client?.location.city}, {client?.location.state},{" "}
                {client?.location.country}
              </Typography>

              <Typography
                component="span"
                sx={{
                  color: "#6A5ACD",
                  cursor: "pointer",
                  fontSize: "14px",
                  display: "inline-block",
                  mt: 1,
                }}
                onClick={() => setExpanded(!expanded)}
              >
                {expanded ? "View Less" : "Read More"}
              </Typography>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "4px",
                mt: 1,
              }}
            >
              <Typography variant="body2">📧 {client?.email}</Typography>
              <Typography variant="body2">📞 {client?.phone}</Typography>
              <Link href={client?.website} target="_blank" color="#6A5ACD">
                Visit Website
              </Link>
            </Box>
            {/* 
            <Box sx={{ display: "flex", gap: "8px", mt: 1 }}>
              {client?.socialLinks?.linkedin && (
                <Link
                  href={client.socialLinks.linkedin}
                  target="_blank"
                  color="#0A66C2"
                >
                  LinkedIn
                </Link>
              )}
              {client?.socialLinks?.twitter && (
                <Link
                  href={client.socialLinks.twitter}
                  target="_blank"
                  color="#1DA1F2"
                >
                  Twitter
                </Link>
              )}
              {client?.socialLinks?.facebook && (
                <Link
                  href={client.socialLinks.facebook}
                  target="_blank"
                  color="#4267B2"
                >
                  Facebook
                </Link>
              )}
            </Box> */}

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#6A5ACD",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Update
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#D32F2F",
                  color: "#fff",
                  textTransform: "none",
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Grid2>
  );
};

export default ClientCard;
