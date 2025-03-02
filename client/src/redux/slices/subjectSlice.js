import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { ENDPOINTS } from "../../api/endpoints";
import { handleError } from "../../utils/errorHandler"; // handling the errors

// Fetch Subjects
export const fetchSubjects = createAsyncThunk(
  "subjects/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(ENDPOINTS.SUBJECTS);
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch Modules by Subject ID
export const fetchModules = createAsyncThunk(
  "modules/fetch",
  async (subjectId, { rejectWithValue }) => {
    try {
      const response = await axios.get(ENDPOINTS.MODULES(subjectId));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Fetch Videos by Module ID
export const fetchVideos = createAsyncThunk(
  "videos/fetch",
  async (moduleId, { rejectWithValue }) => {
    try {
      const response = await axios.get(ENDPOINTS.VIDEOS(moduleId));
      return response.data;
    } catch (error) {
      return rejectWithValue(handleError(error));
    }
  }
);

// Create Slice
const subjectsSlice = createSlice({
  name: "subjects",
  initialState: {
    subjects: [],
    modules: [],
    videos: [],
    loading: false,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      // Fetch Subjects
      .addCase(fetchSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.subjects = action.payload;
      })
      .addCase(fetchSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Modules
      .addCase(fetchModules.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchModules.fulfilled, (state, action) => {
        state.loading = false;
        state.modules = action.payload;
      })
      .addCase(fetchModules.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch Videos
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.loading = false;
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default subjectsSlice.reducer;
