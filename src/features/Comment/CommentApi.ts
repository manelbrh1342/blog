export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
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
=======
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
