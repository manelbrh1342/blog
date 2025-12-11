import React from 'react';
import { Heart, MessageCircle, Share2, Bookmark, MoreHorizontal } from 'lucide-react';

export default function ActivityFeed() {
  const activities = [
    {
      id: 1,
      user: 'Cameron Williamson',
      userAvatar: 'https://i.pravatar.cc/150?img=12',
      action: 'published a new article',
      title: 'The Art of Minimalist Living: Finding Joy in Less',
      time: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=400&fit=crop',
      excerpt: 'Discover how embracing minimalism can transform your life and bring you closer to what truly matters...',
      likes: 234,
      comments: 45,
      shares: 12
    },
    {
      id: 2,
      user: 'Esther Howard',
      userAvatar: 'https://i.pravatar.cc/150?img=25',
      action: 'liked your article',
      title: 'Italy: Where Every Street Feels Like a Story',
      time: '5 hours ago',
      likes: 892,
      comments: 167,
      shares: 43
    },
    {
      id: 3,
      user: 'Wade Warren',
      userAvatar: 'https://i.pravatar.cc/150?img=15',
      action: 'commented on',
      title: 'Tech Trends 2025: What to Expect',
      time: '8 hours ago',
      comment: 'This is exactly what I was looking for! Great insights on AI development and future predictions.',
      likes: 456,
      comments: 89,
      shares: 23
    },
    {
      id: 4,
      user: 'Jenny Wilson',
      userAvatar: 'https://i.pravatar.cc/150?img=32',
      action: 'shared your article',
      title: 'The Ultimate Guide to Remote Work Productivity',
      time: '1 day ago',
      likes: 678,
      comments: 134,
      shares: 67
    },
    {
      id: 5,
      user: 'Robert Fox',
      userAvatar: 'https://i.pravatar.cc/150?img=18',
      action: 'published a new article',
      title: 'Sustainable Fashion: Making Conscious Choices',
      time: '1 day ago',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
      excerpt: 'Learn how to build a sustainable wardrobe that reflects your values while staying stylish and timeless...',
      likes: 543,
      comments: 98,
      shares: 31
    },
    {
      id: 6,
      user: 'Kristin Watson',
      userAvatar: 'https://i.pravatar.cc/150?img=28',
      action: 'started following you',
      time: '2 days ago'
    },
    {
      id: 7,
      user: 'Jacob Jones',
      userAvatar: 'https://i.pravatar.cc/150?img=22',
      action: 'added you as a collaborator',
      title: 'Building Better Communities Through Design',
      time: '3 days ago',
      likes: 321,
      comments: 67,
      shares: 19
    }
  ];

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
