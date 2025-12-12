import {
    getListFollowers,
    getListFollowing,
} from "@/services/user/userServices";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    followings: [],
    followers: [],
};
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getListFollowing.fulfilled, (state, action) => {
                state.followings = action.payload;
            })
            .addCase(getListFollowers.fulfilled, (state, action) => {
                state.followers = action.payload;
            });
    },
});
