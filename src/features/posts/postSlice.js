import { createSlice } from "@reduxjs/toolkit";
import { getListPost } from "@/services/posts/postService";

const initialState = {
  list: [],
  loading: false,
  error: null,
  pagination: { last_page: 0 },
};
export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetFeed: (state) => {
      state.list = [];
      state.pagination = initialState.pagination;
    },
    addPostToFeed: (state, action) => {
      state.list.unshift(action.payload);
    },
    removePostFromFeed: (state, action) => {
      const postId = action.payload;
      state.list = state.list.filter((post) => post.id !== postId);
    },
    removePostsByUserId: (state, action) => {
      const userId = action.payload;
      state.list = state.list.filter((post) => post.user?.id !== userId);
    },
    updatePostContent: (state, action) => {
      const updatedPost = action.payload;
      state.list = state.list.map((post) => {
        if (post.id === updatedPost.id) {
          return { ...post, ...updatedPost };
        }
        return post;
      });
    },
    updateLike: (state, action) => {
      const { postId, likes_count } = action.payload;
      state.list = state.list.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes_count,
          };
        }
        return post;
      });
    },

    updatePostReplies: (state, action) => {
      const { postId, replies_count } = action.payload;
      state.list = state.list.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies_count,
          };
        }
        return post;
      });
    },
    updatePostReposts: (state, action) => {
      const { postId, reposts_and_quotes_count, is_reposted_by_auth } =
        action.payload;
      state.list = state.list.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            is_reposted_by_auth,
            reposts_and_quotes_count,
          };
        }
        return post;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getListPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getListPost.fulfilled, (state, action) => {
        state.pagination = action.payload.pagination;
        state.list = [...state.list, ...action.payload.data];
        state.error = null;
        state.loading = false;
        console.log(state.list);
      })
      .addCase(getListPost.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          action.error?.message ||
          "Có lỗi xảy ra khi tải bài viết";
      });
  },
});
export const {
  resetFeed,
  updatePostReplies,
  updatePostReposts,
  updateLike,
  addPostToFeed,
} = postSlice.actions;
