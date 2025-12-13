import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getCurrentUser = createAsyncThunk(
    "auth/getCurrentUser",
    async () => {
        const res = await http.get("auth/user");
        return res.data;
    }
);
export const register = async (data) => {
    const res = await http.post("auth/register", data);
    return res.data;
};
export const validateEmail = async (data) => {
    await http.post("auth/validate/email", data);
};
export const validateUsername = async (data) => {
    await http.post("auth/validate/username", data);
};
export const login = async (data) => {
    const res = await http.post("auth/login", data);
    return res.data;
};
export const logout = async () => {
    await http.post("auth/logout", {}, {
        _skipRefresh: true, // Bỏ qua refresh token cho logout
    });
};

export const forgotPassword = createAsyncThunk(
    "auth/forgotPassword",
    async (data) => {
        const res = await http.post("auth/forgot-password", data);
        return res;
    }
);
