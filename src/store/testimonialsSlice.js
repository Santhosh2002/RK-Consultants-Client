import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * GET  /api/testimonial
 * Returns: { testimonials: [...] }   ← or just an array
 */
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/testimonial");
      // If your API wraps the array in a property, grab it; otherwise return the raw array.
      return response.data.testimonials ?? response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    list: [], // all testimonials
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

/* ---------- Selectors ---------- */
export const selectTestimonials = (state) => state.testimonials.list;
export const selectTestimonialsLoading = (state) => state.testimonials.loading;
export const selectTestimonialsError = (state) => state.testimonials.error;

export default testimonialsSlice.reducer;
