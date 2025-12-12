import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { type Article, fetchArticleBySlug, fetchRelatedArticles } from "../features/Article/ArticleApi";
import { setCurrentArticle, setRelatedArticles } from "../features/Article/ArticleSlice";
import AuthNav from "../components/AuthNavigation";
import Comments from "../features/Article/components/Comments";
import ArticleCard from "../features/Article/components/ArticleCard";
import Footer from "../components/landing/Footer";
import { Link } from "react-router-dom";

const ArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const [currentArticle, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelated] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        setLoading(true);
        setError(null);
        const article = await fetchArticleBySlug(slug);
        setArticle(article);
        dispatch(setCurrentArticle(article));

        // Fetch related articles by category
        if (article.category_id) {
          const related = await fetchRelatedArticles(article.category_id);
          const filtered = related.filter(a => a.id !== article.id).slice(0, 3);
          setRelated(filtered);
          dispatch(setRelatedArticles(filtered));
        }
      } catch (err) {
        console.error("Failed to fetch article", err);
        setError(err instanceof Error ? err.message : "Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug, dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading article...</div>
      </div>
    );
  }

  if (error || !currentArticle) {
    return (
      <div className="flex flex-col justify-center items-center h-64">
        <div className="text-xl text-red-600">{error || "Article not found"}</div>
        <Link to="/home" className="mt-4 text-blue-600 hover:underline">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AuthNav />

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 flex-grow">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div>
              <img
                src={currentArticle.image || currentArticle.featured_image || "https://picsum.photos/800/400"}
                alt={currentArticle.title}
                className="w-full h-[400px] object-cover rounded-2xl mb-6"
              />
              <h1 className="font-bold text-3xl text-left mb-2 font-primary">
                {currentArticle.title}
              </h1>
              <p className="text-gray-400 text-left text-sm mb-6">{currentArticle.date}</p>

              {currentArticle.excerpt && (
                <p className="text-gray-600 text-lg mb-6 italic">{currentArticle.excerpt}</p>
              )}

              <div className="prose max-w-none text-left text-gray-700 leading-relaxed whitespace-pre-line font-secondary">
                {currentArticle.content}
              </div>
            </div>

            <Comments articleId={currentArticle.id} />
          </div>

          {/* Sidebar - Right Column */}
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <h2 className="text-[#004aad] font-primary font-bold text-3xl">Related Articles</h2>
            </div>

            <div className="flex flex-col gap-6">
              {relatedArticles.length > 0 ? (
                relatedArticles.map((article: Article) => (
                  <Link key={article.id} to={`/article/${article.slug}`}>
                    <ArticleCard
                      title={article.title}
                      image={article.image || article.featured_image || ''}
                      author={article.author_name || 'Unknown'}
                      date={article.date}
                      content={article.excerpt || article.content.substring(0, 100) + '...'}
                      avatar={article.author_avatar || 'https://i.pravatar.cc/150?u=1'}
                    />
                  </Link>
                ))
              ) : (
                <div className="text-gray-500">No related articles found</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
