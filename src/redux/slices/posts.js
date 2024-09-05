import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  console.log("Fetched posts:", data);
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchComments = createAsyncThunk(
  "posts/fetchComments",
  async () => {
    const { data } = await axios.get("/comments");
    return data;
  }
);

export const fetchRemovePost = createAsyncThunk(
  "posts/fetchRemovePost",
  async (id) => {
    await axios.delete(`/posts/${id}`);
  }
);

export const fetchSortByNewest = createAsyncThunk(
  "posts/fetchSortByNewest",
  async () => {
    await axios.get(`/posts`);
  }
);

export const fetchSortByPopularity = createAsyncThunk(
  "posts/fetchSortByPopularity",
  async () => {
    await axios.get(`/posts`);
  }
);

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
  comments: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение статьи
    [fetchPosts.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
      console.log("Updated posts state:", state.items);
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // Получение тегов
    [fetchTags.pending]: (state) => {
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = "error";
    },
    // Удаление статьи
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
    // Сорт по новизне
    [fetchSortByNewest.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchSortByNewest.fulfilled]: (state) => {
      state.posts.items = state.posts.items.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      state.posts.status = "loaded";
    },
    [fetchSortByNewest.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    // Сорт по популярности
    [fetchSortByPopularity.pending]: (state) => {
      state.posts.status = "loading";
    },
    [fetchSortByPopularity.fulfilled]: (state) => {
      state.posts.items = state.posts.items.sort(
        (a, b) => b.viewsCount - a.viewsCount
      );
      state.posts.status = "loaded";
    },
    [fetchSortByPopularity.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = "error";
    },
    //Получение comments
    [fetchComments.pending]: (state) => {
      state.comments.status = "loading";
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = "loaded";
    },
    [fetchComments.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = "error";
    },
  },
});

export const postsReducer = postsSlice.reducer;
