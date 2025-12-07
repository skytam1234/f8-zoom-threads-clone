import { createSlice } from "@reduxjs/toolkit";
import { getListPost } from "@/services/posts/postService";
import { act } from "react";

const initialState = {
  list: [],
  loading: false,
  error: null,
  pagination: { last_page: 0 },
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getListPost.pending, (state, action) => {
        console.log("1", action.payload);
        state.loading = true;
        state.error = null;
      })
      .addCase(getListPost.fulfilled, (state, action) => {
        console.log("2", action.payload);
        state.pagination = action.payload.pagination;
        state.list = [...state.list, ...action.payload.data];
        state.error = null;
        state.loading = false;
      })
      .addCase(getListPost.rejected, (state, action) => {
        console.log("3", action.payload);
        state.loading = false;
        state.error =
          action.payload ||
          action.error?.message ||
          "Có lỗi xảy ra khi tải bài viết";
      });
  },
});
export const { setListPost } = postSlice.actions;
