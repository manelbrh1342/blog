import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogPost {
  id: number;
  slug: string;
  image: string;
  title: string;
  date: string;
  excerpt: string;
  author: string;
  authorImg: string;
}

export default function PopularPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { fetchArticles } = await import('../../features/Article/ArticleApi');
        const articles = await fetchArticles({ status: 'published' });
        
        const mappedPosts = articles.slice(0, 6).map((post) => ({
          id: post.id,
          slug: post.slug,
          image: post.featured_image || post.image || "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=300&fit=crop",
          title: post.title,
          date: post.date,
          excerpt: post.excerpt || post.content.substring(0, 100) + '...',
          author: post.author_name || "Unknown Author",
          authorImg: post.author_avatar || "https://i.pravatar.cc/150?img=1"
        }));

        setPosts(mappedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 flex justify-center">
        <p>Loading popular posts...</p>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-primary">Popular Blog Posts</h2>
        <p className="text-gray-600 font-secondary">The most popular blog posts this month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link to={`/article/${post.slug}`} key={post.id} className="block group cursor-pointer">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 font-primary group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-xs mb-2 font-secondary">{post.date}</p>
                <p className="text-gray-600 text-sm mb-4 font-secondary">{post.excerpt}</p>
                <div className="flex items-center space-x-3">
                  <img
                    src={post.authorImg}
                    alt={post.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm text-gray-700 font-secondary">{post.author}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
