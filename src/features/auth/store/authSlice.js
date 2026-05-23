import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginRequest } from "../services/authApi";

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {

    try {

      const response = await loginRequest(credentials);

      return response;

    } catch (error) {

      return thunkAPI.rejectWithValue(error.response?.data);

    }
  }
);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    access: localStorage.getItem("access") || null,
    refresh: localStorage.getItem("refresh") || null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },

  reducers: {

    logout: (state) => {

      state.access = null;
      state.refresh = null;
      state.isAuthenticated = false;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
    },
  },

  extraReducers: (builder) => {

    builder

      .addCase(loginAsync.pending, (state) => {

        state.loading = true;
        state.error = null;
      })

      .addCase(loginAsync.fulfilled, (state, action) => {

        state.loading = false;

        state.access = action.payload.access;
        state.refresh = action.payload.refresh;

        state.isAuthenticated = true;

        localStorage.setItem("access", action.payload.access);

        localStorage.setItem("refresh", action.payload.refresh);
      })

      .addCase(loginAsync.rejected, (state, action) => {

        state.loading = false;

        state.error = action.payload || "Error login";
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;