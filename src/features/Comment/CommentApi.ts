// blog-frontend/src/features/Comment/CommentApi.ts

/**
 * This file contains the API calls related to the Comments feature.
 * It is responsible for interacting with backend services or endpoints
 * to perform CRUD operations related to comments on articles or posts.
 * 
 * Example API functions might include:
 * - fetchCommentsByArticleId
 * - addComment
 * - updateComment
 * - deleteComment
 * 
 * This abstraction helps separate API logic from UI and state management layers.
 * Implement actual API calls using axios, fetch, or any HTTP client of your choice.
 */

/**
 * Note: In browser environment, process.env is not accessible without bundler config.
 * To avoid TypeScript error, define the base URL explicitly or via environment variables handled by build tools.
 * For example, you may use Vite's import.meta.env or similar depending on your setup.
 */
const COMMENTS_API_BASE_URL = "http://localhost:4000/api/comments";

// Placeholder for Comment API functions
export const fetchCommentsByArticleId = async (articleId: string) => {
  // Example fetch using the base API URL
  // TODO: Replace with real implementation
  const response = await fetch(`${COMMENTS_API_BASE_URL}/article/${articleId}`);
  if (!response.ok) {
    throw new Error('Failed to fetch comments');
  }
  return response.json();
}

export const addComment = async (commentData: any) => {
  const response = await fetch(`${COMMENTS_API_BASE_URL}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(commentData),
  });
  if (!response.ok) {
    throw new Error('Failed to add comment');
  }
  return response.json();
}

export const updateComment = async (commentId: string, updatedData: any) => {
  const response = await fetch(`${COMMENTS_API_BASE_URL}/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) {
    throw new Error('Failed to update comment');
  }
  return response.json();
}

export const deleteComment = async (commentId: string) => {
  const response = await fetch(`${COMMENTS_API_BASE_URL}/${commentId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete comment');
  }
  return response.json();
}
