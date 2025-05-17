import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all contacts
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/contact");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to create a new contact
export const submitContactInquiry = createAsyncThunk(
  "contacts/submitContactInquiry",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/contact", contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Unknown error occurred" }
      );
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(submitContactInquiry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitContactInquiry.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.push(action.payload);
      })
      .addCase(submitContactInquiry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const getContacts = (state) => state.contacts.contacts;
export const getContactsLoader = (state) => state.contacts.loading;
export const getContactsError = (state) => state.contacts.error;

export default contactsSlice.reducer;
