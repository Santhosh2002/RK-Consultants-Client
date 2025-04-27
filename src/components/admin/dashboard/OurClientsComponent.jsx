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
  deleteClient,
} from "../../../store/clientSlice";

import ClientPopup from "../../utils/ClientPopup";

function OurClientsComponent() {
  const dispatch = useDispatch();
  const clients = useSelector(getClients);
  const loading = useSelector(getClientsLoader);
  const error = useSelector(getClientsError);
  const [isNewPopupOpen, setNewPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setUpdatePopupOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  useEffect(() => {
    dispatch(fetchClients());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(`Failed to fetch clients: ${error}`);
    }
  }, [error]);
  const handleDelete = async (id) => {
    try {
      await dispatch(deleteClient(id)).then((res) => {
        if (res.error) {
          toast.error("Failed to delete client");
        } else {
          toast.success("Client deleted successfully");
        }
      });
    } catch (error) {
      console.error("Error deleting service:", error);
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
          minHeight: `calc(100vh - 170px)`,
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
              Admin Panel: Clients
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#6A5ACD",
                color: "#fff",
                textTransform: "none",
              }}
              onClick={() => setNewPopupOpen(true)} // << add this
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
                <ClientCard
                  key={client._id}
                  client={client}
                  deleteAction={handleDelete}
                  updateAction={() => {
                    setSelectedClient(client);
                    setUpdatePopupOpen(true);
                  }}
                />
              ))}
            </Grid2>
          )}
        </Box>
      </Container>
      <ClientPopup
        isOpen={isNewPopupOpen}
        onClose={() => setNewPopupOpen(false)}
      />

      <ClientPopup
        isOpen={isUpdatePopupOpen}
        onClose={() => {
          setUpdatePopupOpen(false);
          setSelectedClient(null);
        }}
        existingClient={selectedClient}
      />
    </Box>
  );
}

export default OurClientsComponent;
