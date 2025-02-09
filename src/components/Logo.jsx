import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {/* "RK" with large serif font */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "32px", md: "48px" },
          fontFamily: `"Times New Roman", serif`,
          color: "white",
        }}
      >
        RK
      </Typography>

      {/* Bordered Text for "REALTORS CONSULTANTS" */}
      <Box
        sx={{
          borderTop: "2px solid white",
          borderBottom: "2px solid white",
          padding: "4px 12px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "10px", md: "11px" },
            fontFamily: `"Arial", sans-serif`,
            color: "white",
            fontWeight: "bold",
          }}
        >
          REALTORS
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "10px", md: "11px" },
            fontFamily: `"Arial", sans-serif`,
            color: "white",
            fontWeight: "bold",
          }}
        >
          CONSULTANTS
        </Typography>
      </Box>
    </Box>
  );
};

export default Logo;
