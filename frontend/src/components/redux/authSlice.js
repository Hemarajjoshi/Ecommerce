import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: localStorage.getItem("token") || null,
  isLoggedIn: localStorage.getItem("token") ? true : false,
  user: null,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ phone_number, password }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/login/",
        { phone_number:phone_number, password }
      );
      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Login failed" };
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register/",
        userData
      );
      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Registration failed" };
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async () => {
  localStorage.removeItem("token");
  return { message: "Logged out successfully" };
});

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/users/${userId}/delete/`
      );
      return response.data;
    } catch (error) {
      return error.response?.data || { error: "Account deletion failed" };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.tokens.access;
        localStorage.setItem("token", action.payload.tokens.access);
        state.user = action.payload.user;
      
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;

      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.token = action.payload.tokens.access;
        state.user = action.payload.user;
        localStorage.setItem("token", action.payload.tokens.access);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.token = null;
        state.user = null;
        localStorage.removeItem("token");
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
