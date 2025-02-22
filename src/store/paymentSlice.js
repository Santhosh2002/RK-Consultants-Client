import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔹 Create Razorpay Order
export const createOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ clientId, amount, currency, services }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/payment/create-order`, {
        clientId,
        amount,
        currency,
        services,
      });
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
    console.log(paymentDetails);
    try {
      const response = await axios.post(
        `/api/payment/verify-payment`,
        paymentDetails
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// 🔹 Fetch Client Payments
export const fetchClientPayments = createAsyncThunk(
  "payment/fetchClientPayments",
  async (clientId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`api/client-payments/${clientId}`);
      return response.data;
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

      // 🔹 Fetch Client Payments
      .addCase(fetchClientPayments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchClientPayments.fulfilled, (state, action) => {
        state.loading = false;
        state.clientPayments = action.payload;
      })
      .addCase(fetchClientPayments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPaymentStatus, setClientData } = paymentSlice.actions;
export const getClientDetails = (state) => state.payment.clientDetails;
export default paymentSlice.reducer;
