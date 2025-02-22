import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch stats from API
export const fetchStats = createAsyncThunk(
  "stats/fetchStats",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/stats");
      return response.data.stats;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update stats
export const updateStats = createAsyncThunk(
  "stats/updateStats",
  async ({ id, key, value }, { rejectWithValue }) => {
    try {
      await axios.put(`/api/stats/${id}`, { [key]: value });
      return { key, value };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const statsSlice = createSlice({
  name: "stats",
  initialState: {
    stats: {},
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateStats.fulfilled, (state, action) => {
        state.stats[action.payload.key] = action.payload.value;
      })
      .addCase(updateStats.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});
export const getStats = (state) => state.stats.stats;
export const getStatsLoader = (state) => state.stats.loading;
export const getStatsError = (state) => state.stats.error;
export default statsSlice.reducer;
