const BASE_URL = "http://192.168.1.4:5000/api/comments";

/**
 * Fetch comments for a specific post
 */
export const fetchCommentsByPostId = async (postId: number) => {
  const response = await fetch(`${BASE_URL}/?post_id=${postId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json(); // returns the array exactly like your backend sends
};

/**
 * Add a new comment
 */
export const addComment = async (commentData: {
  post_id: number;
  content: string;
  user_id: number;
  parent_id?: number | null;
}) => {
  const response = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(commentData),
  });

  if (!response.ok) {
    throw new Error("Failed to add comment");
  }

  return response.json(); // returns the newly created comment
};
