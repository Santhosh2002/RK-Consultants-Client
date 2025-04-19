import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch testimonials from API
export const fetchTestimonials = createAsyncThunk(
  "testimonials/fetchTestimonials",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/testimonial");
      return response.data.testimonials;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
// export const createService = createAsyncThunk(
//   "testimonials/createService",
//   async (serviceData, { rejectWithValue }) => {
//     try {
//       const formData = new FormData();

//       // Append service fields
//       Object.keys(serviceData).forEach((key) => {
//         if (key === "images") {
//           serviceData.images.forEach((file) => {
//             formData.append("images", file);
//           });
//         } else if (key === "subServices") {
//           formData.append(key, JSON.stringify(serviceData[key]));
//         } else {
//           formData.append(key, serviceData[key]);
//         }
//       });

//       const response = await axios.post("/api/service/create", formData);

//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || "An error occurred");
//     }
//   }
// );

// Delete a service
// export const deleteService = createAsyncThunk(
//   "testimonials/deleteService",
//   async (id, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("authToken");
//       await axios.delete(`/api/service/delete/${id}`, {
//         headers: { Authorization: `${token}` },
//       });
//       return id;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState: {
    testimonials: [],
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
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
      // .addCase(deleteService.fulfilled, (state, action) => {
      //   state.testimonials = state.testimonials.filter(
      //     (service) => service._id !== action.payload
      //   );
      // })
      // .addCase(deleteService.rejected, (state, action) => {
      //   state.error = action.payload;
      // })

      // .addCase(createService.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(createService.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.testimonials.push(action.payload);
      // })
      // .addCase(createService.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

// Selectors to get state values
export const getTestimonials = (state) => state.testimonials.testimonials;
export const getTestimonialLoader = (state) => state.testimonials.loading;
export const getTestimonialError = (state) => state.testimonials.error;

export default testimonialSlice.reducer;
