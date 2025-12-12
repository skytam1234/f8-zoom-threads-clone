import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListFollowing = createAsyncThunk(
    "user/getListFollowing",
    async (id) => {
        const path = `users/${id}/followings`;
        const res = await http.get(encodeURI(path));
        return res.data;
    }
);
export const getListFollowers = createAsyncThunk(
    "user/getListFollowers",
    async (id) => {
        const path = `users/${id}/followers`;
        const res = await http.get(encodeURI(path));
        return res.data;
    }
);
export const followerUser = async (id) => {
    const res = await http.post(`users/${id}/follow`);
    return res.data;
};
export const unFollowerUser = async (id) => {
    const res = await http.del(`users/${id}/follow`);
    return res.data;
};
