import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListPost = createAsyncThunk("post/getListPost", async () => {
    const res = await http.get("api/posts/feed");
    return res.data;
});
export const postThread = async (data) => {
    const res = await http.post("/api/posts", data);
    return res.data;
};
