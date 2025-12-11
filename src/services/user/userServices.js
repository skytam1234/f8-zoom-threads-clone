import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListFollow = createAsyncThunk(
  "user/getListFollow",
  async (id) => {
    const path = `users/${id}/followers`;
    const res = await http.get(encodeURI(path));
    return res.data;
  }
);
export const followers = async (id) => {
  const res = await http.post(`users/${id}/follow`);
  return res.data;
};
