import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { mockComments } from '../../data/mock';

export const commentApi = createApi({
  reducerPath: 'commentApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    getComments: builder.query({
      queryFn: async (postId) => {
        const comments = mockComments.filter(c => c.post_id === Number(postId));
        return { data: comments };
      },
    }),
    addComment: builder.mutation({
      queryFn: async (comment) => {
        const newComment = { ...comment, id: Math.random() };
        mockComments.push(newComment);
        return { data: newComment };
      },
    }),
    updateComment: builder.mutation({
      queryFn: async ({ id, ...comment }) => {
        return { data: { id, ...comment } };
      },
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
  const comments = mockComments.filter(c => c.post_id === Number(postId));
  return Promise.resolve(comments);
};

export const addComment = async (comment: any) => {
  const newComment = { ...comment, id: Math.floor(Math.random() * 10000) };
  // In a real static app we can't persist, but for session it works
  return Promise.resolve(newComment);
};
