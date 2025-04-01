import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContactCard from "./UserContactCard";
import {
  Container,
  Grid2,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import {
  fetchContacts,
  getContacts,
  getContactsLoader,
  getContactsError,
} from "../../../store/contactSlice";

function ContactUsComponent() {
  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);
  const loading = useSelector(getContactsLoader);
  const error = useSelector(getContactsError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch contacts: ${error}`);
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
            Admin Panel: Contacts
          </Typography>
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
        ) : contacts.length > 0 ? (
          <Grid2 container spacing={4}>
            {contacts.map((contact) => (
              <UserContactCard key={contact._id} user={contact} />
            ))}
          </Grid2>
        ) : (
          <Typography>No contact inquiries found.</Typography>
        )}
      </Container>
    </Box>
  );
}

export default ContactUsComponent;
