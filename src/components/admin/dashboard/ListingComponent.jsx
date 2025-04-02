import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import {
  fetchListings,
  getListings,
  getListingsLoader,
  getListingsError,
} from "../../../store/listingsSlice";
import ListingCard from "./ListingCard";

function ListingComponent() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const loading = useSelector(getListingsLoader);
  const error = useSelector(getListingsError);

  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch: ${error}`);
    }
  }, [error]);

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
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <Grid2 container spacing={4}>
            {listings.map((listing) => (
              <ListingCard
                key={listing.id}
                item={listing}
                onClick={() => {
                  setSelectedListing(listing);
                  setIsUpdatePopupOpen(true);
                }}
              />
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
