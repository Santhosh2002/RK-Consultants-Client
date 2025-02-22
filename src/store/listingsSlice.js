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
      });
  },
});

// Selectors to get state values
export const getListings = (state) => state.listings.listings;
export const getListingsLoader = (state) => state.listings.loading;
export const getListingsError = (state) => state.listings.error;

export default listingsSlice.reducer;
