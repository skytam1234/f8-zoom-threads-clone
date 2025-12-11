import { createSlice } from "@reduxjs/toolkit";
import { getListPost } from "@/services/posts/postService";

const initialState = {
    list: [],
    loading: false,
    error: null,
    pagination: { last_page: 0 },
};
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        resetFeed: (state) => {
            state.list = [];
            state.pagination = initialState.pagination;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getListPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getListPost.fulfilled, (state, action) => {
                state.pagination = action.payload.pagination;
                state.list = [...state.list, ...action.payload.data];
                state.error = null;
                state.loading = false;
                console.log(state.list);
            })
            .addCase(getListPost.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ||
                    action.error?.message ||
                    "Có lỗi xảy ra khi tải bài viết";
            });
    },
});
export const { setListPost } = postSlice.actions;
