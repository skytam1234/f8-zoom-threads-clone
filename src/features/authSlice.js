import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUser } from "@/services/auth/authService";

const initialState = {
  currentUser: null,
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
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.currentUser = action.payload;
      })
      .addCase(getCurrentUser.rejected, (state) => {
        state.currentUser = null;
      });
  },
});
