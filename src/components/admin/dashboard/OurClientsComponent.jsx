import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ClientCard from "./ClientCard";
import {
  Container,
  Grid2,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import {
  fetchClients,
  getClients,
  getClientsLoader,
  getClientsError,
} from "../../../store/clientSlice";

function OurClientsComponent() {
  const dispatch = useDispatch();
  const clients = useSelector(getClients);
  const loading = useSelector(getClientsLoader);
  const error = useSelector(getClientsError);

  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch clients: ${error}`);
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
            Admin Panel: Clients
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#6A5ACD",
              color: "#fff",
              textTransform: "none",
            }}
          >
            Add New Client
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
            {clients.map((client) => (
              <ClientCard key={client._id} client={client} />
            ))}
          </Grid2>
        )}
      </Container>
    </Box>
  );
}

export default OurClientsComponent;
