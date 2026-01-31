import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Heart, Share2, CornerUpLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { type Article } from "../features/Article/ArticleApi";
import { setCurrentArticle, setRelatedArticles } from "../features/Article/ArticleSlice";
import AuthNav from "../components/AuthNavigation";
import Comments from "../features/Article/components/Comments";
import ArticleCard from "../features/Article/components/ArticleCard";
import Footer from "../components/landing/Footer";
import { blogPosts } from "../data/mockData";

const ArticlePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { currentArticle, relatedArticles } = useSelector(
    (state: RootState) => state.article
  );

  useEffect(() => {
    const articleId = Number(id);
    let foundArticle: any = blogPosts.find(p => p.id === articleId);

    if (!foundArticle) {
      // Check localStorage for user-created posts
      const userPosts = JSON.parse(localStorage.getItem('userPosts') || '[]');
      foundArticle = userPosts.find((p: any) => p.id === articleId);
    }

    if (foundArticle) {
      const fullArticle: Article = {
        id: foundArticle.id,
        title: foundArticle.title,
        content: foundArticle.content || foundArticle.excerpt || "No content available.",
        author_name: foundArticle.author,
        author_avatar: foundArticle.authorImg || "https://i.pravatar.cc/150?img=12",
        date: foundArticle.date,
        category: foundArticle.category || "General",
        image: foundArticle.image
      };

      // If we have collaborators (custom field), we can fake append them to content or title for now, 
      // or just assume Redux/Slice might not handle them directly without update.
      // But we will stick to standard Article type for now.

      dispatch(setCurrentArticle(fullArticle));
    } else {
      // Error fallback
      // ... existing fallback logic
      const dummyArticle: Article = {
        id: 0,
        title: "Article Not Found",
        content: "We couldn't find the article you're looking for.",
        author_name: "System",
        author_avatar: "",
        date: "",
        category: "Error",
        image: "https://via.placeholder.com/800x400?text=Not+Found"
      };
      dispatch(setCurrentArticle(dummyArticle));
    }

    // Set related articles
    const related = blogPosts.filter(p => p.id !== articleId).slice(0, 3).map(p => ({
      id: p.id,
      title: p.title,
      content: p.excerpt,
      author_name: p.author,
      author_avatar: p.authorImg,
      date: p.date,
      category: p.category || "Related",
      image: p.image
    }));
    dispatch(setRelatedArticles(related));

  }, [dispatch, id]);

  // Local state for interactions
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentArticle) {
      // Reset for demo purposes when article changes
      setLikes(Math.floor(Math.random() * 100));
      setIsLiked(false);
    }
  }, [currentArticle]);

  const handleLike = () => {
    if (isLiked) {
      setLikes(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikes(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  if (!currentArticle) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      <AuthNav />

      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link to="/home" className="inline-flex items-center text-gray-500 hover:text-[#004aad] mb-8 transition-colors">
          <CornerUpLeft className="w-5 h-5 mr-2" /> Back to Feed
        </Link>

        {/* Hero Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="mb-6 flex gap-3">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold tracking-wide">
              {currentArticle.category}
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-primary leading-tight">
            {currentArticle.title}
          </h1>

          <div className="flex items-center justify-between border-b border-gray-100 pb-8">
            <div className="flex items-center gap-4">
              <img
                src={currentArticle.author_avatar || ''}
                alt={currentArticle.author_name || 'Author'}
                className="w-12 h-12 rounded-full border-2 border-white shadow-sm"
              />
              <div>
                <p className="font-bold text-gray-900">{currentArticle.author_name}</p>
                <p className="text-sm text-gray-500">{currentArticle.date} · 5 min read</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={(e) => { e.preventDefault(); handleShare(); }}
                className="p-2.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm cursor-pointer z-10"
                title="Share"
                type="button"
              >
                <Share2 className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.preventDefault(); handleLike(); }}
                className={`p-2.5 rounded-full bg-white border border-gray-200 transition-all shadow-sm flex items-center gap-2 cursor-pointer z-10 ${isLiked ? 'text-red-500 border-red-200 bg-red-50' : 'text-gray-500 hover:text-red-500 hover:border-red-200'}`}
                title="Like"
                type="button"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                {likes > 0 && <span className="text-xs font-semibold">{likes}</span>}
              </button>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {currentArticle.image && (
          <div className="max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-sm">
            <img
              src={currentArticle.image}
              alt={currentArticle.title}
              className="w-full h-[300px] md:h-[500px] object-cover"
            />
          </div>
        )}

        {/* Content & Sidebar Layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Article Content */}
          <article className="lg:col-span-8">
            <div
              className="prose prose-lg prose-blue max-w-none 
                    prose-p:text-gray-700 prose-p:leading-8 prose-headings:font-primary prose-headings:font-bold
                    prose-a:text-[#004aad] prose-img:rounded-xl prose-quotes:border-l-4 prose-quotes:border-blue-500"
              dangerouslySetInnerHTML={{
                __html: currentArticle.content.replace(/\n/g, '<br/>')
              }}
            ></div>

            {/* Discussion Section */}
            <div className="mt-16 pt-10 border-t border-gray-100">
              <h3 className="text-2xl font-bold font-primary mb-8">Discussion</h3>
              <Comments articleId={currentArticle.id} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-xl mb-6 font-primary">Related Articles</h3>
              <div className="space-y-6">
                {relatedArticles.map(article => (
                  <div key={article.id} className="group cursor-pointer">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={article.image || ''}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h4 className="font-bold text-gray-900 group-hover:text-[#004aad] transition-colors line-clamp-2 mb-1">
                      {article.title}
                    </h4>
                    <p className="text-xs text-gray-500">{article.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ArticlePage;
