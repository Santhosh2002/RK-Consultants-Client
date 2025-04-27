import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch visitors from API
export const fetchVisitors = createAsyncThunk(
  "visitors/fetchVisitors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/visitor/visitors");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createVisitors = createAsyncThunk(
  "visitors/createVisitors",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/visitor/add");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const visitorsSlice = createSlice({
  name: "visitors",
  initialState: {
    visitors: [],
    totalVisitors: 0,
    peakHour: "",
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisitors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVisitors.fulfilled, (state, action) => {
        state.loading = false;
        state.visitors = action.payload.visitors;
        state.totalVisitors = action.payload.total;

        // Process peak hour calculation
        const hourCounts = {};
        action.payload.visitors.forEach((visitor) => {
          const hour = new Date(visitor.createdAt).getHours();
          hourCounts[hour] = (hourCounts[hour] || 0) + 1;
        });

        const peak = Object.entries(hourCounts).reduce(
          (max, current) => (current[1] > max[1] ? current : max),
          [0, 0]
        );
        state.peakHour = `${peak[0]}:00 - ${peak[0]}:59`;
      })
      .addCase(fetchVisitors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors to get state values
export const getVisitors = (state) => state.visitors.visitors;
export const getTotalVisitors = (state) => state.visitors.totalVisitors;
export const getPeakHour = (state) => state.visitors.peakHour;
export const getVisitorsLoader = (state) => state.visitors.loading;
export const getVisitorsError = (state) => state.visitors.error;

export default visitorsSlice.reducer;
