import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListPost = createAsyncThunk(
    "post/getListPost",
    async ({ limit = 20, page = 1 }) => {
        const path =
            "posts/feed?limit=" + limit + "&page=" + page + "&type=for_you";
        const res = await http.get(encodeURI(path));
        return res;
    }
);
export const postThread = async (data) => {
    const res = await http.post("posts", data);
    return res.data;
};
