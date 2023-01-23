/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HttpRequest } from "../utils/axiosInstance";

const initialState = {
   user: null,
   accessToken: null,
   refreshToken: null,
   isLoading: false,
   isSuccess: false,
   error: null,
};

export const loginUser = createAsyncThunk("user/LoginUser", async (user, thunkAPI) => {
   try {
      const response = await HttpRequest.post("/login", {
         email: user.email,
         password: user.password,
      });
      return response.data;
   } catch (error) {
      thunkAPI.dispatch(setError(error));
   }
});

export const getMe = createAsyncThunk("user/getMe", async (token, thunkAPI) => {
   try {
      const res = await HttpRequest.get("/users", {
         headers: {
            authorization: `Bearer ${token}`,
         },
      });

      return res.data;
   } catch (error) {
      thunkAPI.dispatch(setError(error));
   }
});

export const refreshAccessToken = createAsyncThunk("user/refreshToken", async (user, thunkAPI) => {
   try {
      const res = await HttpRequest.get("/token");
      return res.data;
   } catch (error) {
      thunkAPI.dispatch(setError(error));
   }
});

export const LogOut = createAsyncThunk("user/LogOut", async (_, thunkAPI) => {
   await HttpRequest.delete("/logout");
});

export const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      reset: () => initialState,
      setError: (state, action) => {
         state.error = action.payload;
      },
      setAccessToken: (state, action) => {
         state.isLoading = true;
         state.accessToken = action.payload;
      },
   },
   extraReducers: (builder) => {
      // Login User
      builder.addCase(loginUser.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(loginUser.fulfilled, (state, action) => {
         state.user = action.payload.user;
         state.isLoading = false;
         state.isSuccess = true;
         state.accessToken = action.payload.accessToken;
         state.refreshToken = action.payload.accessToken;
      });
      builder.addCase(loginUser.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });
      // Get Me
      builder.addCase(getMe.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(getMe.fulfilled, (state, action) => {
         state.isLoading = false;
         state.isSuccess = true;
         state.user = action.payload;
      });
      builder.addCase(getMe.rejected, (state, action) => {
         state.error = action.payload;
         state.isLoading = false;
      });
      // Refresh Token
      builder.addCase(refreshAccessToken.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
         state.accessToken = action.payload?.accessToken;
         state.isLoading = false;
         state.isSuccess = true;
      });
      // Logoout
      builder.addCase(LogOut.pending, (state) => {
         state.isLoading = true;
      });
      builder.addCase(LogOut.fulfilled, (state, action) => {
         state.isLoading = false;
         state.user = null;
         state.accessToken = null;
         state.refreshToken = null;
      });
   },
});

export const { reset, setError, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
