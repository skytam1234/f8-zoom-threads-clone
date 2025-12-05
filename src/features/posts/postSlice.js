import { createSlice } from "@reduxjs/toolkit";
import { getListPost } from "@/services/posts/postService";

const initialState = {
    list: [],
    loading: false,
    pagination: { last_page: 0 },
};
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListPost.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getListPost.fulfilled, (state, action) => {
                state.pagination = action.payload.pagination;
                state.list = [...state.list, ...action.payload.data];
                state.loading = false;
            });
    },
});
export const { setListPost } = postSlice.actions;
