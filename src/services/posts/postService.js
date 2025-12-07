import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListPost = createAsyncThunk(
  "post/getListPost",
  async ({ limit = 20, page = 1 }) => {
    const path = "/api/posts/feed?limit=" + limit + "&page=" + page;
    console.log(encodeURI(path));
    const res = await http.get(encodeURI(path));
    console.log(res);
    return res;
  }
);
export const postThread = async (data) => {
  const res = await http.post("/api/posts", data);
  return res.data;
};
