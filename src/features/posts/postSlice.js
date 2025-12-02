import { createSlice } from "@reduxjs/toolkit";
import { getListPost } from "@/services/posts/postService";

const initialState = {
    list: [],
};
export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListPost.fulfilled, (state, action) => {
                state.list = action.payload;
            })
            .addCase(getListPost.rejected, (state, action) => {
                console.log("Loi");
            });
    },
});
