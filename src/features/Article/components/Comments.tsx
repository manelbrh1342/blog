import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CommentItem from "./CommantItems";
import { addComment } from "../../Comment/CommentApi";

interface CommentsProps {
  articleId: number;
}

const Comments: React.FC<CommentsProps> = ({ articleId }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  // Charger les commentaires depuis le backend
  // Charger les commentaires depuis le backend (Dummy data for now)
  useEffect(() => {
    // Load comments from local storage
    const storedComments = JSON.parse(localStorage.getItem(`comments_${articleId}`) || '[]');
    setComments(storedComments);
  }, [articleId]);

  // Ajouter un nouveau commentaire
  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      const newCommentObj = {
        id: Date.now(),
        post_id: articleId,
        content: newComment,
        user_id: 1, // Current user
        created_at: "Just now",
        user: { name: "You", avatar: "https://i.pravatar.cc/150?img=12" }
      };

      const updatedComments = [...comments, newCommentObj];
      setComments(updatedComments);
      localStorage.setItem(`comments_${articleId}`, JSON.stringify(updatedComments));
      setNewComment("");
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
    }
  };

  return (
    <div className="flex flex-col mt-5 w-full">
      <p className="text-blue-900 font-bold text-3xl text-left">Comments</p>
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
        <div className="flex justify-end mr-3">
          <button
            className="bg-blue-900 text-white border rounded-lg w-20 h-8"
            onClick={handlePostComment}
          >
            Post
          </button>
        </div>
      </div>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <Link className="mr-auto mt-2 text-blue-900 hover:underline" to={`/comments/${articleId}`}>
        See more
      </Link>
    </div>
  );
};

export default Comments;
