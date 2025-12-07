import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const res = await http.get("/api/auth/user");
    return res.data;
  }
);
export const register = async (data) => {
  const res = await http.post("api/auth/register", data);
  return res.data;
};
export const login = async (data) => {
  const res = await http.post("/api/auth/login", data);
  return res.data;
};
export const logout = async () => {
  await http.post("/api/auth/logout");
};
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (data) => {
    const res = await http.post("/api/auth/forgot-password", data);
    return res;
  }
);
