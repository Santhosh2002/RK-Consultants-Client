import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/* Fetch all testimonials */
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/testimonial");
      return response.data.testimonials;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* Create a new testimonial */
export const createTestimonial = createAsyncThunk(
  "testimonials/create",
  async (testimonialData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "/api/testimonial/create",
        testimonialData
      );
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* Update existing testimonial */
export const updateTestimonial = createAsyncThunk(
  "testimonials/update",
  async ({ id, testimonialData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `/api/testimonial/${id}`,
        testimonialData
      );
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

/* Delete testimonial */
export const deleteTestimonial = createAsyncThunk(
  "testimonials/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/testimonial/${id}`);
      return response.data.testimonial;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const testimonialsSlice = createSlice({
  name: "testimonials",
  initialState: {
    list: [],
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
      })
      .addCase(createTestimonial.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateTestimonial.fulfilled, (state, action) => {
        const index = state.list.findIndex((t) => t._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteTestimonial.fulfilled, (state, action) => {
        state.list = state.list.filter((t) => t._id !== action.payload._id);
      });
  },
});

/* Selectors */
export const selectTestimonials = (state) => state.testimonials.list;
export const selectTestimonialsLoading = (state) => state.testimonials.loading;
export const selectTestimonialsError = (state) => state.testimonials.error;

export default testimonialsSlice.reducer;
