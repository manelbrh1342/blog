import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getApiUrl, getAuthToken } from '../../config/api';

const baseQuery = fetchBaseQuery({
  baseUrl: getApiUrl('COMMENTS', ''),
  prepareHeaders: (headers) => {
    const token = getAuthToken();
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery,
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/?post_id=${postId}`,
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: '/',
        method: 'POST',
        body: comment,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: '/',
        method: 'PUT',
        body: { id, ...comment },
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
} = commentApi;

// Plain functions for use in slices or other places
import { fetchWithAuth } from '../../config/api';

export interface Comment {
  id?: number;
  post_id: number;
  user_id: number;
  content: string;
  parent_id?: number;
  created_at?: string;
  updated_at?: string;
}

export const fetchCommentsByPostId = async (postId: number): Promise<Comment[]> => {
  const url = getApiUrl('COMMENTS', `/?post_id=${postId}`);
  const response = await fetchWithAuth(url);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const addComment = async (comment: Omit<Comment, 'id'>): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('COMMENTS', '/');
  const response = await fetchWithAuth(url, {
    method: 'POST',
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to add comment');
  }
  return response.json();
};

export const updateComment = async (comment: Comment): Promise<{ message: string; id: number }> => {
  const url = getApiUrl('COMMENTS', '/');
  const response = await fetchWithAuth(url, {
    method: 'PUT',
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update comment');
  }
  return response.json();
};
