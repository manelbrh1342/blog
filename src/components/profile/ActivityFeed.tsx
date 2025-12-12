import React, { useEffect, useState } from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

export default function ActivityFeed() {
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const { fetchArticles } = await import('../../features/Article/ArticleApi');
        const articles = await fetchArticles({ status: 'published' });
        
        const acts = articles.slice(0, 10).map((post) => ({
          id: post.id,
          user: post.author_name || `User ${post.author_id || 'Unknown'}`,
          userAvatar: post.author_avatar || `https://i.pravatar.cc/150?img=${post.author_id || 1}`,
          action: "published a new article",
          title: post.title,
          time: post.date,
          image: post.featured_image || post.image,
          excerpt: post.excerpt || post.content.substring(0, 100) + '...',
          likes: 0,
          comments: 0,
          shares: 0,
          slug: post.slug
        }));
        setActivities(acts);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  return (
    <main className="flex-1 p-8 text-center">
      <h1 className="text-4xl font-extrabold text-[#004DA6] mb-12">Activity Feed</h1>

      {/* Activity Items */}
      <div className="space-y-6 max-w-4xl mx-auto">
        {activities.map((activity) => (
          <div key={activity.id} className="border-b border-gray-100 pb-6 last:border-0">
            {/* Activity Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <img
                  src={activity.userAvatar}
                  alt={activity.user}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="text-gray-900">
                    <span className="font-semibold">{activity.user}</span>{' '}
                    <span className="text-gray-600">{activity.action}</span>
                    {activity.title && (
                      <>
                        {' '}
                        <span className="font-semibold text-blue-600">"{activity.title}"</span>
                      </>
                    )}
                  </p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>

            {/* Activity Content */}
            {activity.image && (
              <div className="ml-15 mt-3">
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-64 object-cover"
                  />
                  {activity.excerpt && (
                    <div className="p-4">
                      <p className="text-gray-700 text-sm">{activity.excerpt}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activity.comment && (
              <div className="ml-15 mt-3 bg-gray-50 rounded-xl p-4">
                <p className="text-gray-700 text-sm italic">"{activity.comment}"</p>
              </div>
            )}

            {/* Engagement Stats */}
            {(activity.likes || activity.comments || activity.shares) && (
              <div className="ml-15 mt-4 flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>{activity.likes}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>{activity.comments}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Share2 className="w-4 h-4" />
                  <span>{activity.shares}</span>
                </div>
              </div>
            )}

            {/* Action Buttons for new articles */}
            {activity.image && (
              <div className="ml-15 mt-4 flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
                  <Heart className="w-4 h-4" />
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  <MessageCircle className="w-4 h-4" />
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="mt-8 text-center">
        <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
          Load More Activities
        </button>
      </div>
    </main>
  );
}
