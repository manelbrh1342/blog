import React from "react";
import avatarDefault from "../../../assets/avatar.jpg";

interface Comment {
  id: number;
  content: string;
  author_name?: string;
  author_avatar?: string;
  date?: string;
}

interface CommentItemProps {
  comment: Comment;
}

const CommentItem: React.FC<CommentItemProps> = ({ comment }) => (
  <div className="flex flex-col bg-white rounded-xl mt-6 p-6">
    <div className="flex justify-between">
      <div className="flex items-center gap-3 text-sm ">
        <img
          src={comment.author_avatar || avatarDefault}
          alt={comment.author_name || "author"}
          className="w-8 h-8 rounded-full"
        />
        <span className="text-black-400">
          {comment.author_name || "Anonymous"}
        </span>
      </div>
      <p className="text-blue-900">{comment.date || "Unknown date"}</p>
    </div>
    <p className="text-left text-sm">{comment.content}</p>
  </div>
);

export default CommentItem;
