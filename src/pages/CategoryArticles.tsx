import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchCategoryBySlug, fetchCategories } from "../features/Category/CategoryApi";
import { fetchArticles } from "../features/Article/ArticleApi";
import type { Article } from "../features/Article/ArticleApi";
import ArticleCard from "../features/Article/components/ArticleCard";
import AuthNav from "../components/AuthNavigation";
import Footer from "../components/landing/Footer";

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const CategoryArticles = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const [articles, setArticles] = useState<Article[]>([]);
    const [categoryName, setCategoryName] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!categorySlug) return;
            
            try {
                setLoading(true);
                setError(null);
                
                // Fetch category to get ID
                const category = await fetchCategoryBySlug(categorySlug);
                setCategoryName(category.name);
                
                // Fetch articles for this category
                const categoryArticles = await fetchArticles({ 
                    category_id: category.id,
                    status: 'published' 
                });
                
                setArticles(categoryArticles);
            } catch (err) {
                console.error("Error fetching category articles:", err);
                setError(err instanceof Error ? err.message : "Failed to load articles");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categorySlug]);

    if (!categorySlug) return <div>Invalid Category</div>;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <AuthNav />
                <div className="flex-grow flex justify-center items-center">
                    <div className="text-xl">Loading articles...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <AuthNav />
                <div className="flex-grow flex flex-col justify-center items-center">
                    <div className="text-xl text-red-600">{error}</div>
                    <Link to="/category" className="mt-4 text-blue-600 hover:underline">Back to Categories</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AuthNav />

            <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
                <div className="mb-8">
                    <Link to="/category" className="text-blue-600 hover:underline mb-2 inline-block">&larr; Back to Categories</Link>
                    <h1 className="text-4xl font-bold text-gray-900 font-primary">
                        {categoryName || capitalize(categorySlug)} Articles
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Discover articles in {categoryName || capitalize(categorySlug)}
                    </p>
                </div>

                {articles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {articles.map((article) => (
                            <Link key={article.id} to={`/article/${article.slug}`}>
                                <ArticleCard
                                    title={article.title}
                                    image={article.image || article.featured_image || ""}
                                    author={article.author_name || "Unknown"}
                                    date={article.date}
                                    content={article.excerpt || article.content.substring(0, 150) + '...'}
                                    avatar={article.author_avatar || "https://i.pravatar.cc/150?u=1"}
                                />
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <h3 className="text-xl text-gray-600">No articles found in this category.</h3>
                        <Link to="/home" className="text-blue-600 hover:underline mt-4 inline-block">Browse all articles</Link>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default CategoryArticles;
