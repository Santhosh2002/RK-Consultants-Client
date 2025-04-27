import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch settings from API
export const fetchGeneralSettings = createAsyncThunk(
  "settings/fetchGeneralSettings",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/api/general");
      return response.data.general;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update settings
export const updateGeneralSettings = createAsyncThunk(
  "settings/updateGeneralSettings",
  async (settings, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      var response = await axios.put(`/api/general/${settings._id}`, settings);
      return response.data.general;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const getPageFromPath = (pathname) => {
  const pageMapping = {
    "/": "Home",
    "/about": "About",
    "/services": "Services",
    "/contact": "Contact",
    "/profile": "Profile",
    "/properties": "Properties",
  };
  return pageMapping[pathname] || "Home"; // Default to Home if not found
};

const generalSettingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {},
    loading: false,
    updating: false,
    navbarButton: getPageFromPath(window.location.pathname), // Initialize from URL
    error: null,
  },
  reducers: {
    setNavBarButton: (state, action) => {
      state.navbarButton = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGeneralSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGeneralSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
      })
      .addCase(fetchGeneralSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateGeneralSettings.pending, (state) => {
        state.updating = true;
      })
      .addCase(updateGeneralSettings.fulfilled, (state, action) => {
        state.updating = false;
        state.settings = action.payload;
      })
      .addCase(updateGeneralSettings.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const getGeneralSettings = (state) => state.settings.settings;
export const getSettingsLoader = (state) => state.settings.loading;
export const getSettingsUpdater = (state) => state.settings.updating;
export const getSettingsError = (state) => state.settings.error;
export const getNavBarButton = (state) => state.settings.navbarButton;

export const { setNavBarButton } = generalSettingsSlice.actions;

export default generalSettingsSlice.reducer;
