
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import AuthNav from '../components/AuthNavigation';
import Footer from '../components/landing/Footer';
import { blogPosts } from '../data/mockData';
import ArticleCard from '../features/Article/components/ArticleCard';

export default function SearchResultsPage() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const navigate = useNavigate();
    const [results, setResults] = useState<typeof blogPosts>([]);

    useEffect(() => {
        if (query) {
            const lowerQuery = query.toLowerCase();
            const filtered = blogPosts.filter(post =>
                post.title.toLowerCase().includes(lowerQuery) ||
                post.content.toLowerCase().includes(lowerQuery) ||
                post.author.toLowerCase().includes(lowerQuery) ||
                post.category?.toLowerCase().includes(lowerQuery)
            );
            setResults(filtered);
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans flex flex-col">
            <AuthNav />

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Search Results for <span className="text-[#004DA6]">"{query}"</span>
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Found {results.length} result{results.length !== 1 ? 's' : ''}
                    </p>
                </div>

                {results.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map((post) => (
                            <div key={post.id} onClick={() => navigate(`/article/${post.id}`)} className="cursor-pointer">
                                <ArticleCard
                                    title={post.title}
                                    image={post.image || ''}
                                    author={post.author}
                                    date={post.date}
                                    content={post.excerpt}
                                    avatar={post.authorImg}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                            <SearchIcon className="w-8 h-8 text-gray-300" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">No matches found</h3>
                        <p className="text-gray-500 mt-1">Try adjusting your search terms or filters.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
}

function SearchIcon({ className }: { className?: string }) {
    return (
        <svg
            className={className}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
    );
}
