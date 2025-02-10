import { Grid, Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "../variants";

const WhyChooseUs = ({ about }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#111",
        color: "#fff",
        py: 10,
        px: 4,
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
          maxWidth: "1200px",
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
              src="/why-choose-us-1.jpg"
              alt="office content 1"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />
            <img
              src="/why-choose-us-2.jpg"
              alt="office content 2"
              style={{
                width: "100%",
                height: "400px",
                objectFit: "cover",
                borderRadius: "12px",
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
                fontWeight: "bold",
                color: "#fff",
                marginBottom: 3,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Why Choose Us?
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#ccc",
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
