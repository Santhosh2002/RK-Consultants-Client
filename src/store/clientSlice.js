import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all clients
export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/client");
      return response.data.clients;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to create a new client
export const createClient = createAsyncThunk(
  "clients/createClient",
  async (clientData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/client/createClient", clientData);
      return response.data.client;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update a client
export const updateClient = createAsyncThunk(
  "clients/updateClient",
  async ({ id, clientData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/client/${id}`, clientData);
      return response.data.client;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async thunk to update a client
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/client/delete/${id}`);
      return response.data.client;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const clientsSlice = createSlice({
  name: "clients",
  initialState: {
    clients: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClients.fulfilled, (state, action) => {
        state.loading = false;
        state.clients = action.payload;
      })
      .addCase(fetchClients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(createClient.fulfilled, (state, action) => {
        state.clients.push(action.payload);
      })
      .addCase(createClient.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(deleteClient.fulfilled, (state, action) => {
        state.clients = state.clients.filter(
          (client) => client._id !== action.payload._id
        );
      })
      .addCase(deleteClient.rejected, (state, action) => {
        state.error = action.payload;
      });
    builder
      .addCase(updateClient.fulfilled, (state, action) => {
        const index = state.clients.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.clients[index] = action.payload;
      })
      .addCase(updateClient.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selectors
export const getClients = (state) => state.clients.clients;
export const getClientsLoader = (state) => state.clients.loading;
export const getClientsError = (state) => state.clients.error;

export default clientsSlice.reducer;
