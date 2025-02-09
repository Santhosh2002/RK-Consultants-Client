import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const WhyChooseUs = ({ about }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#E0EDE5",
        minHeight: "100vh", // Ensures full screen height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      id="about"
    >
      <Grid
        container
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: "1200px", // Restrict max width for a clean design
          mx: "auto",
          px: { xs: 2, md: 6 },
          alignItems: "center",
        }}
      >
        {/* Images Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={fadeIn("right", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.01 }}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="office content 1"
              style={{
                width: "100%",
                height: "450px", // Adjust height for consistency
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
            <img
              src="https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1506&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="office content 2"
              style={{
                width: "100%",
                height: "450px", // Keep same height for balance
                objectFit: "cover",
                borderRadius: "10px",
                marginTop: "16px",
              }}
            />
          </motion.div>
        </Grid>

        {/* Text Section */}
        <Grid item xs={12} md={6}>
          <motion.div
            variants={fadeIn("left", 0.1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0 }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "600",
                color: "black",
                marginBottom: 2,
                textAlign: { xs: "center", md: "left" }, // Center text on small screens
              }}
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "black",
                fontSize: "18px",
                fontWeight: "400",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              {about}
            </Typography>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhyChooseUs;
