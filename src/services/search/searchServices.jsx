import http from "@/utils/http";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const search = createAsyncThunk(
  "search/search",
  async ({ query, page = 1, perPageTopics = 10, perPageUsers = 10 }) => {
    const response = await http.get(`search`, {
      params: {
        q: query,
        page,
        per_page_topics: perPageTopics,
        per_page_users: perPageUsers,
      },
    });
    return response.data;
  }
);
export const getUserSuggestions = createAsyncThunk(
  "search/getUserSuggestions",
  async ({ page = 1, perPage = 10 }) => {
    const response = await http.get(`users/suggestions`, {
      params: { page, per_page: perPage },
    });
    return response;
  }
);

export const searchTopics = async (query) => {
  const response = await http.get(`topics/search`, {
    params: { q: query },
  });
  return response.data;
};

export const followUser = async (userId) => {
  const response = await http.post(`users/${userId}/follow`);
  return response.data;
};

export const unfollowUser = async (userId) => {
  const response = await http.post(`users/${userId}/follow`, {
    _method: "DELETE",
  });
  return response.data;
};
