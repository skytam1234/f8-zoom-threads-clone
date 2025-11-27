import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async () => {
    const res = await http.get("/api/auth/user");
    return res.data;
  }
);
