import React from "react";

interface ArticleCardProps {
  title: string;
  image: string;
  author: string;
  date: string;
  content: string;
  avatar: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  image,
  author,
  date,
  content,
  avatar,
}) => (
  <div className="bg-white rounded-xl mt-10 w-65 md:w-100">
    <img src={image} alt={title} className="w-full object-cover rounded-lg" />
    <div className="p-5">
      <h2 className="text-xl font-bold mb-2 text-left">{title}</h2>
      <p className="text-gray-400 text-left">{date}</p>
      <p className="text-left mb-2">{content}</p>
      <div className="flex items-center gap-3 text-sm mt-5">
        <img src={avatar} alt={author} className="w-8 h-8 rounded-full" />
        <span className="text-black-600">{author}</span>
      </div>
    </div>
  </div>
);

export default ArticleCard;
