import { getListFollow } from "@/services/user/userServices";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListFollow.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(getListFollow.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error?.message ||
          "Có lỗi xảy ra khi tải bài viết";
      });
  },
});
