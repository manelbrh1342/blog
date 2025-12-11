import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../features/Article/components/Header";
import Footer from "../components/landing/Footer";
import CommentItem from "../features/Article/components/CommantItems";
// import { addComment } from "../features/Comment/CommentApi";

const CommentsPage: React.FC = () => {
    const { articleId } = useParams<{ articleId?: string }>();
    const [comments, setComments] = useState<any[]>([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        // Dummy data for testing
        const dummyComments = [
            {
                id: 1,
                user_id: 2,
                content: "Great article! Very informative.",
                created_at: "2023-10-26T10:00:00Z",
                user: { name: "Alice", avatar: "https://i.pravatar.cc/150?u=alice" }
            },
            {
                id: 2,
                user_id: 3,
                content: "I agree, AI is the future.",
                created_at: "2023-10-26T11:30:00Z",
                user: { name: "Charlie", avatar: "https://i.pravatar.cc/150?u=charlie" }
            },
            {
                id: 3,
                user_id: 4,
                content: "Interesting perspective on the Middle East policy.",
                created_at: "2023-11-18T09:15:00Z",
                user: { name: "David", avatar: "https://i.pravatar.cc/150?u=david" }
            },
            {
                id: 4,
                user_id: 5,
                content: "Can you elaborate more on the economic impact?",
                created_at: "2023-11-18T14:20:00Z",
                user: { name: "Eve", avatar: "https://i.pravatar.cc/150?u=eve" }
            }
        ];
        setComments(dummyComments);
    }, [articleId]);

    const handlePostComment = async () => {
        if (!newComment.trim()) return;

        try {
            // Mock adding comment
            const newCommentObj = {
                id: comments.length + 1,
                user_id: 1,
                content: newComment,
                created_at: new Date().toISOString(),
                user: { name: "You", avatar: "https://i.pravatar.cc/150?u=you" }
            };
            setComments((prev) => [...prev, newCommentObj]);
            setNewComment("");
        } catch (err) {
            console.error("Erreur lors de l'ajout du commentaire:", err);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
                <Header />

                <div className="mt-12 max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <Link to={`/article/${articleId}`} className="text-blue-900 hover:underline">
                            &larr; Back to Article
                        </Link>
                        <h1 className="text-[#004aad] font-primary font-bold text-4xl">Comments</h1>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                        <h2 className="text-xl font-bold mb-4">Add a Comment</h2>
                        <textarea
                            className="w-full border border-gray-200 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                            placeholder="Share your thoughts..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-[#004aad] text-white font-medium px-8 py-2 rounded-lg hover:bg-blue-800 transition-colors"
                                onClick={handlePostComment}
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {comments.map((comment) => (
                            <CommentItem key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default CommentsPage;
