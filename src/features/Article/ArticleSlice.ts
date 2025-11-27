// blog-frontend/src/features/Article/ArticleSlice.ts

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Article } from "./ArticleApi";

interface ArticleState {
  articles: Article[];
  currentArticle: Article | null;
  relatedArticles: Article[];
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: ArticleState = {
  articles: [],
  currentArticle: null,
  relatedArticles: [],
  loading: false,
  error: null,
  successMessage: null,
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    fetchStart(state) {
      state.loading = true;
      state.error = null;
      state.successMessage = null;
    },

    fetchSuccess(state) {
      state.loading = false;
      state.error = null;
    },

    fetchFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    setArticles(state, action: PayloadAction<Article[]>) {
      state.articles = action.payload;
    },

    setCurrentArticle(state, action: PayloadAction<Article | null>) {
      state.currentArticle = action.payload;
    },

    setRelatedArticles(state, action: PayloadAction<Article[]>) {
      state.relatedArticles = action.payload;
    },

    setSuccessMessage(state, action: PayloadAction<string | null>) {
      state.successMessage = action.payload;
    },
  },
});

export const {
  fetchStart,
  fetchSuccess,
  fetchFailure,
  setArticles,
  setCurrentArticle,
  setRelatedArticles,
  setSuccessMessage,
} = articleSlice.actions;

export default articleSlice.reducer;
