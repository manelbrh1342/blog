import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import ArticleCard from "../features/Article/components/ArticleCard";
import AuthNav from "../components/AuthNavigation";
import Footer from "../components/landing/Footer";

// Helper to capitalize first letter
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const CategoryArticles = () => {
    const { categorySlug } = useParams<{ categorySlug: string }>();
    const { articles } = useSelector((state: RootState) => state.article);
    const [filteredArticles, setFilteredArticles] = useState(articles);

    useEffect(() => {
        if (categorySlug) {
            // Filter by category. 
            // Note: This relies on article.category string matching the slug or logic.
            // If your article categories are "Travel & Adventure" vs slug "travel",
            // you might need smarter matching. For now, simple includes/match.
            const slugLower = categorySlug.toLowerCase();

            const filtered = articles.filter((article) => {
                const catLower = (article.category || "").toLowerCase();
                return catLower.includes(slugLower);
            });

            setFilteredArticles(filtered);
        } else {
            setFilteredArticles(articles);
        }
    }, [categorySlug, articles]);

    if (!categorySlug) return <div>Invalid Category</div>;

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <AuthNav />

            <main className="flex-grow max-w-7xl mx-auto px-6 lg:px-8 py-12 w-full">
                <div className="mb-8">
                    <Link to="/category" className="text-blue-600 hover:underline mb-2 inline-block">&larr; Back to Categories</Link>
                    <h1 className="text-4xl font-bold text-gray-900 font-primary">
                        {capitalize(categorySlug)} Articles
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Discover articles in {capitalize(categorySlug)}
                    </p>
                </div>

                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredArticles.map((article) => (
                            <ArticleCard
                                key={article.id}
                                title={article.title}
                                image={article.image || ""}
                                author={article.author_name || "Unknown"}
                                date={article.date}
                                content={article.content}
                                avatar={article.author_avatar || ""}
                            />
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
