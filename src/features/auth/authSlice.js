import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, getCurrentUser } from "@/services/auth/authService";

const initialState = {
  currentUser: null,
  fetching: true,
  forgotPass: {
    loading: false,
    success: false,
    error: null,
    message: "",
  },
};
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.fetching = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
        state.fetching = false;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.currentUser = null;
        state.fetching = false;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPass.loading = true;
        state.forgotPass.success = false;
        state.forgotPass.error = null;
        state.forgotPass.message = "";
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPass.loading = false;
        state.forgotPass.success = true;
        state.forgotPass.error = false;
        state.forgotPass.message = action.payload.message;
      })
      .addCase(forgotPassword.rejected, (state) => {
        state.forgotPass.loading = false;
        state.forgotPass.success = false;
        state.forgotPass.error = true;
        state.forgotPass.message = "The selected email is invalid.";
      });
  },
});
