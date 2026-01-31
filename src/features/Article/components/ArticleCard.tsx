import { useNavigate } from 'react-router-dom';

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
}) => {
  const navigate = useNavigate();

  const handleAuthorClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/author/${encodeURIComponent(author)}`);
  };

  return (
    <div className="bg-white rounded-xl mt-10 w-full overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-t-lg hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5">
        <h2 className="text-xl font-bold mb-2 text-left text-gray-900 line-clamp-2 hover:text-[#004aad] transition-colors">{title}</h2>
        <p className="text-gray-400 text-sm mb-3 text-left">{date}</p>
        <p className="text-gray-600 text-left mb-4 line-clamp-3 text-sm">{content}</p>

        <div
          onClick={handleAuthorClick}
          className="flex items-center gap-3 mt-4 cursor-pointer group w-fit"
        >
          <img src={avatar} alt={author} className="w-8 h-8 rounded-full border border-gray-100 group-hover:border-[#004aad] transition-colors" />
          <span className="text-sm font-medium text-gray-700 group-hover:text-[#004aad] transition-colors">{author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
