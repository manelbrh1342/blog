import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthNav from '../components/AuthNavigation';
import Footer from '../components/landing/Footer';
import ArticleCard from '../features/Article/components/ArticleCard';
import { blogPosts } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';

const CategoryArticlesPage: React.FC = () => {
    const { category } = useParams<{ category: string }>();
    const navigate = useNavigate();
    const [articles, setArticles] = useState(blogPosts);
    const [loading, setLoading] = useState(true);

    // Helper to format category title
    const categoryTitle = category
        ? category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')
        : 'All Articles';

    useEffect(() => {
        setLoading(true);
        if (category) {
            // Simple case-insensitive match
            // Also map some slugs to existing mock categories if needed
            const filtered = blogPosts.filter(post => {
                const postCat = post.category.toLowerCase();
                const paramCat = category.toLowerCase();

                if (postCat === paramCat) return true;
                if (paramCat === 'development' && (postCat === 'coding' || postCat === 'backend' || postCat === 'technology')) return true;
                if (paramCat === 'ai' && postCat === 'technology') return true;

                return false;
            });
            setArticles(filtered);
        } else {
            setArticles(blogPosts);
        }
        setLoading(false);
    }, [category]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AuthNav />

            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <button
                    onClick={() => navigate('/category')}
                    className="flex items-center text-gray-600 hover:text-[#004DA6] mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back to Categories
                </button>

                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 font-primary">{categoryTitle}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Explore our latest articles and insights in {categoryTitle}.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004DA6]"></div>
                    </div>
                ) : articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <div key={article.id} onClick={() => navigate(`/article/${article.id}`)} className="cursor-pointer group">
                                <ArticleCard
                                    title={article.title}
                                    image={article.image || ''}
                                    author={article.author}
                                    date={article.date}
                                    content={article.excerpt || article.content.substring(0, 100)}
                                    avatar={article.authorImg || ''}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No articles found</h3>
                        <p className="text-gray-500 mb-6">
                            We haven't published any articles in this category yet. Check back soon!
                        </p>
                        <button
                            onClick={() => navigate('/home')}
                            className="px-6 py-2 bg-[#004DA6] text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Return Home
                        </button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoryArticlesPage;
