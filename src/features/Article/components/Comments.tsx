import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import CommentItem from "./CommantItems";
import { fetchCommentsByPostId, addComment, type Comment } from "../../Comment/CommentApi";

interface CommentsProps {
  articleId: number;
}

const Comments: React.FC<CommentsProps> = ({ articleId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const loadComments = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedComments = await fetchCommentsByPostId(articleId);
        setComments(fetchedComments);
      } catch (err) {
        console.error("Error loading comments:", err);
        setError("Failed to load comments");
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [articleId]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;
    if (!user) {
      setError("Please login to comment");
      return;
    }

    try {
      setError(null);
      const commentData = { 
        post_id: articleId, 
        content: newComment, 
        user_id: user.id || 1 
      };
      const result = await addComment(commentData);
      
      // Reload comments to get the new one with all data
      const updatedComments = await fetchCommentsByPostId(articleId);
      setComments(updatedComments);
      setNewComment("");
    } catch (err) {
      console.error("Error adding comment:", err);
      setError(err instanceof Error ? err.message : "Failed to add comment");
    }
  };

  return (
    <div className="flex flex-col mt-5 w-100 md:w-150">
      <p className="text-blue-900 font-bold text-3xl text-left">Comments</p>
      
      {user && (
        <div className="flex flex-col bg-white rounded-xl mt-6 h-40">
          <p className="text-sm m-3 text-left">Add New Comment</p>
          <textarea
            id="commentsection"
            className="border border-blue-900 rounded-lg p-3 focus:outline-none focus:ring-blue-400 m-3"
            rows={5}
            placeholder="Say something about this blog"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          {error && (
            <p className="text-red-600 text-sm mx-3">{error}</p>
          )}
          <div className="flex justify-end mr-3">
            <button
              className="bg-blue-900 text-white border rounded-lg w-20 h-8 hover:bg-blue-800"
              onClick={handlePostComment}
            >
              Post
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <p className="text-gray-500 mt-4">Loading comments...</p>
      ) : error && !user ? (
        <p className="text-gray-500 mt-4">{error}</p>
      ) : comments.length > 0 ? (
        <>
          {comments.slice(0, 5).map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
          {comments.length > 5 && (
            <Link className="mr-auto mt-2 text-blue-900 hover:underline" to={`/comments/${articleId}`}>
              See more ({comments.length - 5} more)
            </Link>
          )}
        </>
      ) : (
        <p className="text-gray-500 mt-4">No comments yet. Be the first to comment!</p>
      )}
    </div>
  );
};

export default Comments;
