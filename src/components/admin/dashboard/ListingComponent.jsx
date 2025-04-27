import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewListingPopup from "../../utils/NewListingPopUp";
import {
  fetchListings,
  getListings,
  getListingsLoader,
  getListingsError,
  deleteListing,
  createListing,
  updateListing,
  approveListing,
} from "../../../store/listingsSlice";
import ListingCard from "./ListingCard";
import {
  Container,
  Grid2,
  Box,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

function ListingComponent() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const loading = useSelector(getListingsLoader);
  const error = useSelector(getListingsError);

  const [isNewPopupOpen, setIsNewPopupOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch: ${error}`);
    }
  }, [error]);

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteListing(id)).unwrap();
      toast.success("Listing deleted successfully");
    } catch (error) {
      toast.error("Failed to delete listing");
      console.error("Error deleting listing:", error);
    }
  };
  const handleApprove = async (id) => {
    dispatch(approveListing(id))
      .unwrap()
      .then(() => {
        toast.success("Listing approved successfully");
      })
      .catch((error) => {
        toast.error("Failed to approve listing");
        console.error("Error approving listing:", error);
      });
  };
  // Handle form submission for both creating and updating listings
  const handleSubmit = async (formData, editingId = null) => {
    try {
      if (editingId) {
        await dispatch(
          updateListing({ id: editingId, ListingData: formData })
        ).unwrap();
        toast.success("Listing updated successfully");
      } else {
        await dispatch(createListing(formData)).unwrap();
        toast.success("Listing created successfully");
      }
      dispatch(fetchListings()); // Refresh listings after create/update
    } catch (error) {
      toast.error("Failed to save listing");
      console.error("Error submitting listing:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#111", color: "#fff", py: 6 }}>
      <ToastContainer />
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: `calc(100vh - 170px)`,
        }}
      >
        <Box display={"flex"} flexDirection="column" gap={4}>
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
              onClick={() => {
                setSelectedListing(null);
                setIsNewPopupOpen(true);
              }}
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
                  key={listing?._id}
                  item={listing}
                  onClick={() => {
                    setSelectedListing(listing);
                    setIsNewPopupOpen(true);
                  }}
                  approveAction={handleApprove}
                  deleteAction={handleDelete}
                />
              ))}
            </Grid2>
          )}
        </Box>

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

      {/* ⬇ Popup handled dynamically: new or update */}
      <NewListingPopup
        isOpen={isNewPopupOpen}
        onClose={() => setIsNewPopupOpen(false)}
        onSubmit={(formData) => handleSubmit(formData, selectedListing?._id)}
        editingData={selectedListing}
      />
    </Box>
  );
}

export default ListingComponent;
