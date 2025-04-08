import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for uploading files
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // adjust path

export const uploadFile = createAsyncThunk(
  "files/uploadFiles",
  async (files, { rejectWithValue }) => {
    if (!Array.isArray(files) || files.length === 0) {
      return rejectWithValue("No files provided");
    }

    try {
      const uploadPromises = files.map((file) => {
        const fileRef = ref(storage, `RK Consultants/${file.name}`);
        return uploadBytesResumable(fileRef, file).then((snapshot) =>
          getDownloadURL(snapshot.ref)
        );
      });

      const urls = await Promise.all(uploadPromises);
      console.log("✅ All files uploaded:", urls);
      return urls; // ⬅️ array of download URLs
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const fileUploadSlice = createSlice({
  name: "files",
  initialState: {
    uploadedFileUrl: [],
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
        state.uploadedFileUrls = action.payload; // ⬅️ store the array of URLs
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
