import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Mail, Calendar } from 'lucide-react';
import AuthNav from '../../../components/AuthNavigation';
import Footer from '../../../components/landing/Footer';
import ArticleCard from '../../Article/components/ArticleCard';
import { blogPosts } from '../../../data/mockData';

const AuthorProfile: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const navigate = useNavigate();
    const [authorName, setAuthorName] = useState('');
    const [authorPosts, setAuthorPosts] = useState<typeof blogPosts>([]);
    const [authorStats, setAuthorStats] = useState({
        posts: 0,
        views: 0,
        likes: 0
    });

    useEffect(() => {
        // In a real app, authorId would be an ID. Here we treat it as a Name slug or Name.
        // Let's decode it safely.
        const name = decodeURIComponent(authorId || '');
        setAuthorName(name);

        // Filter posts by this author
        const posts = blogPosts.filter(
            post => post.author.toLowerCase() === name.toLowerCase()
        );
        setAuthorPosts(posts);

        // Mock stats
        setAuthorStats({
            posts: posts.length,
            views: posts.length * 1245, // Fake random numbers
            likes: posts.length * 56
        });

    }, [authorId]);

    // Find a mock avatar if available from the first post, or generate one
    const authorAvatar = authorPosts.length > 0
        ? authorPosts[0].authorImg
        : `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorId}`;

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans flex flex-col">
            <AuthNav />

            <div className="flex-grow pt-8 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-[#004aad] mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                {/* Profile Header Card */}
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
                    <div className="h-48 bg-gradient-to-r from-[#004aad] to-[#0066cc]"></div>
                    <div className="px-8 pb-8">
                        <div className="relative flex flex-col md:flex-row items-center md:items-end -mt-16 mb-6">
                            <img
                                src={authorAvatar}
                                alt={authorName}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white object-cover"
                            />
                            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 font-primary">{authorName}</h1>
                                <p className="text-gray-500 font-medium">Content Creator & Tech Enthusiast</p>
                            </div>
                            <div className="mt-6 md:mt-0 flex gap-3">
                                <button className="px-6 py-2 bg-[#004aad] text-white rounded-xl font-medium shadow-lg hover:bg-[#003d82] transition-all">
                                    Follow
                                </button>
                                <button className="px-6 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all">
                                    Message
                                </button>
                            </div>
                        </div>

                        {/* Bio & Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-gray-100 pt-8">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-lg font-bold text-gray-900">About</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Passionate about sharing knowledge and insights on technology, lifestyle, and innovation.
                                    I love exploring new trends and translating complex topics into engaging stories.
                                </p>
                                <div className="flex flex-wrap gap-4 text-sm text-gray-500 pt-2">
                                    <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1.5" />
                                        <span>San Francisco, CA</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="w-4 h-4 mr-1.5" />
                                        <span>Contact me</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1.5" />
                                        <span>Joined January 2024</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-around bg-gray-50 rounded-2xl p-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#004aad]">{authorStats.posts}</div>
                                    <div className="text-sm text-gray-500 font-medium">Articles</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#004aad]">{authorStats.likes}</div>
                                    <div className="text-sm text-gray-500 font-medium">Likes</div>
                                </div>
                                <div className="w-px h-10 bg-gray-200"></div>
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-[#004aad]">{Math.floor(authorStats.views / 1000)}k</div>
                                    <div className="text-sm text-gray-500 font-medium">Views</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Section */}
                <h2 className="text-2xl font-bold text-gray-900 mb-6 font-primary">Published Articles</h2>

                {authorPosts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {authorPosts.map(post => (
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
                    <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-gray-400 mb-2">No articles found</div>
                        <p className="text-gray-500">This author hasn't published any content yet.</p>
                    </div>
                )}

            </div>

            <Footer />
        </div>
    );
};

export default AuthorProfile;
