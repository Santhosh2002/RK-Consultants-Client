import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch services from API
export const fetchServices = createAsyncThunk(
  "services/fetchServices",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/service");
      return response.data.services;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createService = createAsyncThunk(
  "services/createService",
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/service/create", serviceData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data.service;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
// Async thunk to update a Service
export const updateService = createAsyncThunk(
  "services/updateService",
  async ({ id, ServiceData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/service/${id}`, ServiceData);
      return response.data.service;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async thunk to update a Service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/service/${id}`);
      return response.data.service;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    services: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.services = state.services.filter(
          (service) => service._id !== action.payload
        );
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(createService.pending, (state) => {
        state.loading = true;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.push(action.payload);
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateService.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const updatedService = action.payload;
        const index = state.services.findIndex(
          (service) => service._id === updatedService._id
        );
        if (index !== -1) {
          state.services[index] = updatedService; // Replace the updated service in-place
        }
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors to get state values
export const getServices = (state) => state.services.services;
export const getServicesLoader = (state) => state.services.loading;
export const getServicesError = (state) => state.services.error;

export default servicesSlice.reducer;
