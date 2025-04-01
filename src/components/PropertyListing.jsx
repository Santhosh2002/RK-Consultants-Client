import React from "react";
import {
  Container,
  Grid2,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
  IconButton,
  Chip,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Star } from "@mui/icons-material";
import PropertyCard from "./PropertyCard";
import { useSelector } from "react-redux";
import { getProjects } from "../store/projectsSlice";

const PropertyListing = () => {
  var properties = useSelector(getProjects);

  return (
    <Box sx={{ backgroundColor: "#141414", color: "#fff", py: 6 }}>
      <Container
        maxWidth="lg"
        sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <img
            src="/Icons/abstract-Design.svg"
            alt="Icon"
            style={{ width: 70, height: "auto", marginRight: 10 }}
          />
          <Typography variant="h3" sx={{ fontWeight: "bold" }} fontSize={48}>
            Featured Properties
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography
              variant="body1"
              sx={{ textAlign: "left", width: "70%", color: "#999999" }}
            >
              Explore our handpicked selection of featured properties. Each
              listing offers a glimpse into exceptional homes and investments
              available through RK Realtors & Consultants. Click "View Property
              Details" for more information.
            </Typography>
            <Button
              href="/properties"
              variant="outlined"
              sx={{
                whiteSpace: "nowrap",
                color: "white",
                border: "1px solid #999999",
              }}
            >
              View All Properties
            </Button>
          </Box>
        </Box>
        <Grid2 container spacing={4}>
          {properties.map((property) => (
            <PropertyCard key={property.id} item={property} />
            // <Grid2 item size={{ xs: 12, md: 4, sm: 6 }} key={property.id}>
            //   <Card
            //     sx={{
            //       borderRadius: 3,
            //       border: "1px solid #444",
            //       backgroundColor: "#111",
            //       color: "#fff",
            //       boxShadow: 4,
            //       padding: 2,
            //     }}
            //   >
            //     <CardMedia
            //       component="img"
            //       image={property.image}
            //       alt={property.title}
            //       sx={{
            //         width: "100%",
            //         height: "200px",
            //         objectFit: "cover",
            //         borderRadius: "10px",
            //       }}
            //     />
            //     <CardContent>
            //       <Box
            //         sx={{
            //           display: "flex",
            //           flexDirection: "column",
            //           gap: "8px",
            //         }}
            //       >
            //         <Typography variant="h6" fontWeight="bold">
            //           {property.title}
            //         </Typography>
            //         <Typography variant="body2" color="grey.400">
            //           {property.description}{" "}
            //           <Typography component="span" sx={{ color: "#6A5ACD" }}>
            //             Read More
            //           </Typography>
            //         </Typography>
            //         <Box
            //           sx={{ display: "flex", flexDirection: "row", gap: "8px" }}
            //         >
            //           {property.details.map((detail, index) => (
            //             <Chip
            //               key={index}
            //               label={detail}
            //               sx={{
            //                 backgroundColor: "#222",
            //                 color: "#fff",
            //                 borderRadius: "10px",
            //                 fontSize: "12px",
            //               }}
            //             />
            //           ))}
            //         </Box>
            //         <Box
            //           sx={{
            //             display: "flex",
            //             flexDirection: "row",
            //             justifyContent: "space-between",
            //             alignItems: "center",
            //           }}
            //         >
            //           <Box sx={{ display: "flex", flexDirection: "column" }}>
            //             <Typography
            //               variant="body2"
            //               sx={{ color: "#9999", fontSize: "14px" }}
            //             >
            //               Price
            //             </Typography>
            //             <Typography
            //               variant="subtitle1"
            //               sx={{ fontWeight: "bold", fontSize: "18px" }}
            //             >
            //               {property.price}
            //             </Typography>
            //           </Box>
            //           <Button
            //             variant="contained"
            //             sx={{
            //               backgroundColor: "#6A5ACD",
            //               color: "#fff",
            //               textTransform: "none",
            //             }}
            //           >
            //             View Property Details
            //           </Button>
            //         </Box>
            //       </Box>
            //     </CardContent>
            //   </Card>
            // </Grid2>
          ))}
        </Grid2>
        {/* Pagination Controls */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 5,
            borderTop: "1px solid #262626",
          }}
        >
          <Typography variant="body2" sx={{ color: "#888", pt: 2 }}>
            01 of 10
          </Typography>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowBackIos fontSize="small" />
            </IconButton>
            <IconButton
              sx={{
                color: "#fff",
                border: "1px solid #999",
                borderRadius: "50%",
                width: 40,
                height: 40,
              }}
            >
              <ArrowForwardIos fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PropertyListing;
