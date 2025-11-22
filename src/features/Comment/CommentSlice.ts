// blog-frontend/src/features/Comment/CommentSlice.ts

/**
 * This file contains Redux slice related to Comments feature.
 * It manages comments state such as list of comments for articles,
 * loading state, errors, and other comment-related UI state.
 * 
 * Redux Toolkit createSlice is used to generate action creators and reducers.
 * Thunks or async actions can be added here or in separate files to handle API calls.
 * 
 * This slice connects the UI to the Comment API functions and manages comment data globally.
 */

import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CommentState {
  comments: any[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    fetchCommentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCommentsSuccess(state, action: PayloadAction<any[]>) {
      state.comments = action.payload;
      state.loading = false;
      state.error = null;
    },
    fetchCommentsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    // Additional reducers for add, update, delete comments can be added here
  },
});

export const {
  fetchCommentsStart,
  fetchCommentsSuccess,
  fetchCommentsFailure,
} = commentSlice.actions;

export default commentSlice.reducer;
