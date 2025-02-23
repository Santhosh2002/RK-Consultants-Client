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
      const formData = new FormData();

      // Append service fields
      Object.keys(serviceData).forEach((key) => {
        if (key === "images") {
          serviceData.images.forEach((file) => {
            formData.append("images", file);
          });
        } else if (key === "subServices") {
          formData.append(key, JSON.stringify(serviceData[key]));
        } else {
          formData.append(key, serviceData[key]);
        }
      });

      const response = await axios.post("/api/service/create", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

// Delete a service
export const deleteService = createAsyncThunk(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(`/api/service/delete/${id}`, {
        headers: { Authorization: `${token}` },
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
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
      });
  },
});

// Selectors to get state values
export const getServices = (state) => state.services.services;
export const getServicesLoader = (state) => state.services.loading;
export const getServicesError = (state) => state.services.error;

export default servicesSlice.reducer;
