import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Create Razorpay Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async (order, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/payment/create-order`, order);
      return response.data.order; // Return the order object
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔹 Verify Razorpay Payment
export const verifyPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/payment/verify`, paymentDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔹 Fetch All Payments
export const fetchAllPayments = createAsyncThunk(
  "payment/fetchAllPayments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/payment`);
      return response.data.payments;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
// 🔹 Fetch Payment by ID
export const fetchPaymentById = createAsyncThunk(
  "payment/fetchPaymentById",
  async (paymentId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/payment/${paymentId}`);
      return response.data.payment;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔹 Payment Slice
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    order: null,
    loading: false,
    error: null,
    paymentStatus: null,
    clientPayments: [],
    clientDetails: null,
    payments: [],
    selectedPayment: null,
  },
  reducers: {
    setClientData: (state, action) => {
      state.clientDetails = action.payload;
    },
    resetPaymentStatus: (state) => {
      state.paymentStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Verify Payment
      .addCase(verifyPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentStatus = action.payload.message;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch All Payments
      .addCase(fetchAllPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload;
      })
      .addCase(fetchAllPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Fetch Payment by ID
      .addCase(fetchPaymentById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPaymentById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPayment = action.payload;
      })
      .addCase(fetchPaymentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // 🔹 Fetch Payment by ID
      .addCase(createClient.pending, (state) => {
        state.loading = true;
      })
      .addCase(createClient.fulfilled, (state, action) => {
        state.loading = false;
        state.clientDetails = action.payload;
      })
      .addCase(createClient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentStatus, setClientData } = paymentSlice.actions;
export const getClientDetails = (state) => state.payment.clientDetails;
export default paymentSlice.reducer;
