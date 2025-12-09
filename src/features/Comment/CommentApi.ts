import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5001/api' }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => `/comments/?post_id=${postId}`,
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: '/comments',
        method: 'POST',
        body: comment,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ id, ...comment }) => ({
        url: `/comments/${id}`,
        method: 'PUT',
        body: comment,
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
export const fetchCommentsByPostId = async (postId: number) => {
  const response = await fetch(`http://localhost:5001/api/comments/?post_id=${postId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
};

export const addComment = async (comment: any) => {
  const response = await fetch('http://localhost:5001/api/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  return response.json();
};
