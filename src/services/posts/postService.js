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

//Cần id của bài post
export const getPostSingle = async (id) => {
    const res = await http.get("posts/" + id);
    return res.data;
};
export const getReply = async (id) => {
    const res = await http.get("posts/" + id + "/replies");
    return res.data;
};
export const getUserReposts = async (id) => {
    const res = await http.get(`users/${id}/reposts`);
    return res.data;
};
export const getPendingReposts = async (id) => {
    const res = await http.get(`posts/${id}/pending-replies`);
    return res.data;
};
