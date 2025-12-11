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

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchCommentsByPostId, addComment as addCommentApi } from './CommentApi';

interface CommentState {
  comments: any[];
  loading: boolean;
  adding: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  loading: false,
  adding: false,
  error: null,
};

// Async Thunks
export const fetchComments = createAsyncThunk(
  'comment/fetchComments',
  async (postId: number, { rejectWithValue }) => {
    try {
      const data = await fetchCommentsByPostId(postId);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch comments');
    }
  }
);

export const createComment = createAsyncThunk(
  'comment/createComment',
  async (commentData: { post_id: number; content: string; user_id: number; parent_id?: number | null }, { rejectWithValue }) => {
    try {
      const data = await addCommentApi(commentData);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to add comment');
    }
  }
);

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    // Standard reducers if needed
  },
  extraReducers: (builder) => {
    // Fetch Comments
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Add Comment
    builder
      .addCase(createComment.pending, (state) => {
        state.adding = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<any>) => {
        state.adding = false;
        // Optimistically add the new comment to the list or re-fetch
        // For now, let's append it
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload as string;
      });
  },
});

export default commentSlice.reducer;
