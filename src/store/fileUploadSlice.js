/* ------------------------------------------------------------------ */
/* imports                                                            */
/* ------------------------------------------------------------------ */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebaseConfig"; // <- adjust path if needed

/* ------------------------------------------------------------------ */
/* Async thunk – payload: { files, uploadKey }                        */
/* ------------------------------------------------------------------ */
export const uploadFile = createAsyncThunk(
  "files/uploadFiles",
  async ({ files, uploadKey }, { rejectWithValue }) => {
    if (!Array.isArray(files) || files.length === 0) {
      return rejectWithValue("No files provided");
    }

    try {
      const uploadPromises = files.map((file) => {
        const fileRef = ref(storage, `RK Consultants/${file.name}`);
        return uploadBytesResumable(fileRef, file).then((snap) =>
          getDownloadURL(snap.ref)
        );
      });

      const urls = await Promise.all(uploadPromises); // array of download URLs
      console.log(`✅ [${uploadKey}] files uploaded:`, urls);
      return { uploadKey, urls };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/* ------------------------------------------------------------------ */
/* Slice                                                              */
/* ------------------------------------------------------------------ */
const initialState = {
  uploads: {},
};

const fileUploadSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    /** Reset one scope (field) or everything if no key supplied */
    resetUploadState: (state, { payload }) => {
      if (payload) {
        delete state.uploads[payload];
      } else {
        state.uploads = {};
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state, { meta }) => {
        const key = meta.arg.uploadKey;
        state.uploads[key] = { urls: [], uploading: true, error: null };
      })
      .addCase(uploadFile.fulfilled, (state, { payload }) => {
        const { uploadKey, urls } = payload;
        state.uploads[uploadKey] = { urls, uploading: false, error: null };
      })
      .addCase(uploadFile.rejected, (state, { payload, meta }) => {
        const key = meta.arg.uploadKey;
        state.uploads[key] = { urls: [], uploading: false, error: payload };
      });
  },
});

/* ------------------------------------------------------------------ */
/* Selectors (pass the same uploadKey you used for dispatch)          */
/* ------------------------------------------------------------------ */
export const getUploadedFileUrl = (state, key) =>
  state.files?.uploads?.[key]?.urls ?? [];

export const isUploading = (state, key) =>
  state.files?.uploads?.[key]?.uploading ?? false;

export const getUploadError = (state, key) =>
  state.files?.uploads?.[key]?.error ?? null;

/* ------------------------------------------------------------------ */
/* Exports                                                            */
/* ------------------------------------------------------------------ */
export const { resetUploadState } = fileUploadSlice.actions;
export default fileUploadSlice.reducer;
