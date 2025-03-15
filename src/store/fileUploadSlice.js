import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for uploading files
export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async (file, { rejectWithValue }) => {
    if (!file) return rejectWithValue("No file provided");

    const formData = new FormData();
    formData.append("file", file, `RK Consultants/${file.name}`);
    const uploadUrl = `${
      process.env.REACT_APP_UPLOAD_URL
    }?name=${encodeURIComponent(`RK Consultants/${file.name}`)}`;

    try {
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (
        !response.data ||
        !response.data.bucket ||
        !response.data.name ||
        !response.data.downloadTokens
      ) {
        throw new Error("Invalid upload response");
      }

      // Construct the download URL
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${
        response.data.bucket
      }/o/${encodeURIComponent(response.data.name)}?alt=media&token=${
        response.data.downloadTokens
      }`;

      return downloadURL;
    } catch (error) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const fileUploadSlice = createSlice({
  name: "files",
  initialState: {
    uploadedFileUrl: null,
    uploading: false,
    error: null,
  },
  reducers: {
    resetUploadState: (state) => {
      state.uploadedFileUrl = null;
      state.uploading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.uploading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.uploading = false;
        state.uploadedFileUrl = action.payload; // Assuming the API returns the URL of the uploaded file
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.uploading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const getUploadedFileUrl = (state) => state.files.uploadedFileUrl;
export const isUploading = (state) => state.files.uploading;
export const getUploadError = (state) => state.files.error;

export const { resetUploadState } = fileUploadSlice.actions;

export default fileUploadSlice.reducer;
