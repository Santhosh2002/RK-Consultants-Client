import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch listings from API
export const fetchListings = createAsyncThunk(
  "listings/fetchListings",
  async (_, { rejectWithValue }) => {
    try {
      const url = "/api/listing/all";
      const token = localStorage.getItem("authToken");
      const response = await axios.get(url, {
        headers: { Authorization: token },
      });
      return response.data.listings;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create a new Listing
export const createListing = createAsyncThunk(
  "Listings/createListing",
  async (ListingData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/listing/create", ListingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update a Listing
export const updateListing = createAsyncThunk(
  "Listings/updateListing",
  async ({ id, ListingData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/listing/${id}`, ListingData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async thunk to update a Listing
export const deleteListing = createAsyncThunk(
  "Listings/deleteListing",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/listing/delete/${id}`);
      return response.data.listing;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const listingsSlice = createSlice({
  name: "listings",
  initialState: {
    listings: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.listings = action.payload;
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteListing.fulfilled, (state, action) => {
        state.listings = state.listings.filter(
          (listing) => listing._id !== action.payload._id
        );
      })
      .addCase(deleteListing.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selectors to get state values
export const getListings = (state) => state.listings.listings;
export const getListingsLoader = (state) => state.listings.loading;
export const getListingsError = (state) => state.listings.error;

export default listingsSlice.reducer;
