import React, { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Activity {
  id: number;
  user: string;
  userAvatar: string;
  action: string;
  title?: string;
  time: string;
  image?: string;
  excerpt?: string;
  comment?: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked?: boolean;
  userComments?: { text: string; user: string; time: string }[];
}

// Mapped to existing blogPosts IDs for consistency
const initialActivities: Activity[] = [
  {
    id: 1, // Matches "The Ultimate Guide to Backpacking in Bali"
    user: 'Sarah Jenkins',
    userAvatar: 'https://i.pravatar.cc/150?img=5',
    action: 'published a new article',
    title: 'The Ultimate Guide to Backpacking in Bali',
    time: '2 hours ago',
    image: '/images/IMG7.jpg',
    excerpt: 'Discover hidden waterfalls, sacred temples, and the best local eats in this comprehensive guide for solo travelers.',
    likes: 234,
    comments: 45,
    shares: 12,
    isLiked: false
  },
  {
    id: 2, // Matches "Exploring the Alps"
    user: 'Marc DuPont',
    userAvatar: 'https://i.pravatar.cc/150?img=11',
    action: 'liked your article',
    title: 'Exploring the Alps: A Hiker\'s Dream',
    time: '5 hours ago',
    likes: 892,
    comments: 167,
    shares: 43,
    isLiked: true
  },
  {
    id: 19, // Matches "Tech Trends to Watch in 2026"
    user: 'Tech Insider',
    userAvatar: 'https://i.pravatar.cc/150?img=15',
    action: 'commented on',
    title: 'Tech Trends to Watch in 2026',
    time: '8 hours ago',
    comment: 'This is exactly what I was looking for! Great insights on AI development and future predictions.',
    likes: 456,
    comments: 89,
    shares: 23,
    isLiked: false
  },
  {
    id: 7, // Matches "Sustainable Fashion"
    user: 'Chloe Kim',
    userAvatar: 'https://i.pravatar.cc/150?img=25',
    action: 'published a new article',
    title: 'Sustainable Fashion: More Than a Trend',
    time: '1 day ago',
    image: '/images/IMG12.jpg',
    excerpt: 'How the industry is shifting towards eco-friendly materials and ethical labor.',
    likes: 543,
    comments: 98,
    shares: 31,
    isLiked: false
  },
  {
    id: 10, // Matches "Urban Farming"
    user: 'Green Thumb',
    userAvatar: 'https://i.pravatar.cc/150?img=52',
    action: 'added you as a collaborator',
    title: 'Urban Farming: Growing Food in Concrete Jungles',
    time: '3 days ago',
    likes: 321,
    comments: 67,
    shares: 19,
    isLiked: false,
    userComments: []
  }
];

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [commentText, setCommentText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Load from localStorage or use initial data
    const savedActivities = localStorage.getItem('activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      setActivities(initialActivities);
      localStorage.setItem('activities', JSON.stringify(initialActivities));
    }
  }, []);

  const handleLike = (id: number) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        return {
          ...activity,
          likes: activity.isLiked ? activity.likes - 1 : activity.likes + 1,
          isLiked: !activity.isLiked
        };
      }
      return activity;
    });

    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
  };

  const handleShare = (id: number) => {
    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        return { ...activity, shares: activity.shares + 1 };
      }
      return activity;
    });
    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    alert('Content shared!');
  };

  const toggleCommentInput = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveCommentId(activeCommentId === id ? null : id);
    setCommentText(""); // Reset text when toggling
  };

  const submitComment = (id: number) => {
    if (!commentText.trim()) return;

    const updatedActivities = activities.map(activity => {
      if (activity.id === id) {
        return {
          ...activity,
          comments: activity.comments + 1,
          userComments: [...(activity.userComments || []), { text: commentText, user: "You", time: "Just now" }]
        };
      }
      return activity;
    });

    setActivities(updatedActivities);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    setCommentText("");
    setActiveCommentId(null); // Close input after submit
  };

  return (
    <section className={`font-sans ${window.location.pathname.includes('/profile') ? '' : 'p-4 md:p-8'}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Activity Feed</h2>
        <button
          onClick={() => console.log("Navigate to /feed")}
          className="text-sm text-[#004DA6] font-medium hover:underline"
        >
          View All
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => (
          <div key={activity.id} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 relative">
              <div className="flex items-center space-x-3">
                <div onClick={() => navigate(`/author/${encodeURIComponent(activity.user)}`)} className="cursor-pointer group flex items-center gap-3">
                  <img
                    src={activity.userAvatar}
                    alt={activity.user}
                    className="w-10 h-10 rounded-full border border-gray-200 group-hover:border-[#004aad] transition-colors"
                  />
                  <div>
                    <div className="text-sm text-gray-900">
                      <span className="font-semibold text-gray-900 group-hover:text-[#004aad] transition-colors">{activity.user}</span>{' '}
                      <span className="text-gray-600">{activity.action}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{activity.time}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`pl-13 ml-13 cursor-pointer`} onClick={() => navigate(`/article/${activity.id}`)}>
              {activity.title && (
                <div className="mb-3">
                  <h3 className="font-bold text-gray-800 text-lg hover:text-[#004DA6] cursor-pointer transition-colors">
                    {activity.title}
                  </h3>
                </div>
              )}

              {activity.excerpt && (
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {activity.excerpt}
                </p>
              )}

              {activity.image && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-100">
                  <img
                    src={activity.image}
                    alt="Content"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              {activity.comment && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-100 italic text-gray-700 text-sm">
                  "{activity.comment}"
                </div>
              )}

              {/* User Mock Comments if any (from our mock logic) */}
              {activity.userComments && activity.userComments.map((c, i) => (
                <div key={i} className="bg-blue-50/50 rounded-lg p-3 mb-2 text-sm">
                  <span className="font-bold text-gray-800">{c.user}: </span>
                  <span className="text-gray-700">{c.text}</span>
                </div>
              ))}
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-2">
              <div className="flex space-x-6">
                <button
                  onClick={(e) => { e.stopPropagation(); handleLike(activity.id); }}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${activity.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
                >
                  <Heart className={`w-4 h-4 ${activity.isLiked ? 'fill-current' : ''}`} />
                  <span>{activity.likes}</span>
                </button>

                <button
                  onClick={(e) => toggleCommentInput(activity.id, e)}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors ${activeCommentId === activity.id ? 'text-[#004DA6]' : 'text-gray-500 hover:text-[#004DA6]'}`}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{activity.comments}</span>
                </button>

                <button
                  onClick={(e) => { e.stopPropagation(); handleShare(activity.id); }}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-500 hover:text-[#004DA6] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{activity.shares}</span>
                </button>
              </div>
            </div>

            {/* Inline Comment Input */}
            {activeCommentId === activity.id && (
              <div className="mt-4 flex gap-2 animate-fadeIn">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && submitComment(activity.id)}
                />
                <button
                  onClick={() => submitComment(activity.id)}
                  className="px-3 py-2 bg-[#004DA6] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
