import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProjectBySlug = createAsyncThunk(
  "project/fetchBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/project/slug/${slug}`);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async thunk to search projects with filters (or wildcard)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const {
        keyword = "*",
        location,
        propertyType,
        minPrice,
        maxPrice,
        page = 1,
        limit = 12,
      } = filters;

      const params = new URLSearchParams();

      params.append("keyword", keyword);
      if (location) params.append("location", location);
      if (propertyType) params.append("propertyType", propertyType);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      params.append("page", page);
      params.append("limit", limit);

      const response = await axios.get(
        `/api/project/search?${params.toString()}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to create a new Project
export const createProject = createAsyncThunk(
  "Projects/createProject",
  async (ProjectData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/project/create", ProjectData);
      return response.data.Project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk to update a Project
export const updateProject = createAsyncThunk(
  "Projects/updateProject",
  async ({ id, ProjectData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/project/${id}`, ProjectData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
// Async thunk to update a Project
export const deleteProject = createAsyncThunk(
  "Projects/deleteProject",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/project/${id}`);
      return response.data.project;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    selectedProject: null,
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(fetchProjectBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(fetchProjectBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(
          (project) => project._id !== action.payload._id
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Selectors
export const getProjects = (state) => state.projects.projects;
export const getProjectsLoader = (state) => state.projects.loading;
export const getProjectsError = (state) => state.projects.error;
export const getselectedProject = (state) => state.projects.selectedProject;

export const getProjectsPagination = (state) => ({
  page: state.projects.page,
  totalPages: state.projects.totalPages,
  totalResults: state.projects.totalResults,
});

export default projectsSlice.reducer;
