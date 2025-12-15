import { getUserSuggestions, search } from "@/services/search/searchServices";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  loading: false,
  pagination: { last_page: 0 },
};
export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];

      state.pagination = initialState.pagination;
    },

    updateFollowUser: (state, action) => {
      const updateduser = action.payload;
      state.users = state.users.map((user) => {
        if (user.id === updateduser.id) {
          return { ...user, ...updateduser };
        }
        return user;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(search.pending, (state) => {
        state.loading = true;
      })
      .addCase(search.fulfilled, (state, action) => {
        state.pagination = action.payload.pagination;
        console.log(state.users);
        state.users = [...state.users, ...action.payload.users];

        state.loading = false;
        console.log(state.users);
      })
      .addCase(search.rejected, (state) => {
        state.loading = false;
      })

      .addCase(getUserSuggestions.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getUserSuggestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserSuggestions.fulfilled, (state, action) => {
        state.pagination = action.payload.pagination;

        state.users = [...state.users, ...action.payload.data];
        state.loading = false;
      });
      
  },
});
export const { resetUsers, updateFollowUser } = searchSlice.actions;
