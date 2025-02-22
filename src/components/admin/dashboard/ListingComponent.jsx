import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewListingPopup from "../../utils/NewListingPopUp";
import UpdateListingPopup from "../../utils/UpdateListingPopUp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
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
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function ListingComponent() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    getAllListings();
  }, []);

  const getAllListings = async () => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_BASE_URL}/api/listing/all`;
      const token = localStorage.getItem("authToken");
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      setListings(response.data.listings);
    } catch (error) {
      toast.error(`Failed to fetch listings: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <ToastContainer />
      <Container maxWidth="xl">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Admin Panel: Listings
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsNewPopupOpen(true)}
            sx={{
              backgroundColor: "#6A5ACD",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Add New Listing
          </Button>
        </Box>
        {loading ? (
          <Typography variant="h6" textAlign="center" color="gray">
            Loading Listings...
          </Typography>
        ) : (
          <Grid2 container spacing={4}>
            {listings.map((listing) => (
              <Grid2
                item
                size={{
                  xs: 12,
                  sm: 6,
                  md: 4,
                  lg: 3,
                }}
                key={listing._id}
              >
                <Card
                  sx={{
                    borderRadius: 3,
                    border: "1px solid #444",
                    backgroundColor: "#222",
                    color: "#fff",
                    boxShadow: 4,
                    padding: 2,
                  }}
                >
                  {listing.images && listing.images.length > 0 ? (
                    <Swiper
                      navigation
                      modules={[Navigation]}
                      className="w-full h-48 rounded-md"
                    >
                      {listing.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <CardMedia
                            component="img"
                            image={image}
                            alt={listing.title}
                            sx={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "10px",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <CardMedia
                      component="div"
                      sx={{
                        width: "100%",
                        height: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#333",
                        color: "#aaa",
                        borderRadius: "10px",
                      }}
                    >
                      No Image Available
                    </CardMedia>
                  )}
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {listing.title}
                    </Typography>
                    <Typography variant="body2" color="grey.400">
                      {listing.description.length > 50
                        ? `${listing.description.substring(0, 50)}...`
                        : listing.description}
                    </Typography>
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
                        onClick={() => {
                          setSelectedListing(listing);
                          setIsUpdatePopupOpen(true);
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
                  </CardContent>
                </Card>
              </Grid2>
            ))}
          </Grid2>
        )}
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
      <NewListingPopup
        isOpen={isNewPopupOpen}
        onClose={() => setIsNewPopupOpen(false)}
        onSubmit={() => {}}
      />
      <UpdateListingPopup
        isOpen={isUpdatePopupOpen}
        onClose={() => setIsUpdatePopupOpen(false)}
        onSubmit={() => {}}
        listingData={selectedListing}
        id={selectedListing?._id}
      />
    </Box>
  );
}

export default ListingComponent;
