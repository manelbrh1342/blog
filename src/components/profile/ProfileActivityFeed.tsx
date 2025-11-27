import React from 'react';
import { Heart, Bookmark, MessageCircle } from 'lucide-react';

export default function ProfileActivityFeed() {
  const likedArticles = [
    { id: 1, title: 'Understanding React Hooks', time: '3 hours ago', likes: 120 },
    { id: 2, title: 'Deep Dive into Node.js Streams', time: '1 day ago', likes: 85 },
  ];

  const savedArticles = [
    { id: 1, title: 'Latest CSS Grid Tricks', time: '2 days ago' },
    { id: 2, title: 'How to Build Scalable APIs', time: '5 days ago' }
  ];

  const userComments = [
    { id: 1, articleTitle: 'JavaScript Async Patterns', comment: 'Very helpful explanation!', time: '4 hours ago' },
    { id: 2, articleTitle: 'GraphQL vs REST', comment: 'Great comparison!', time: '2 days ago' },
  ];

  return (
    <main className="flex-1 p-8">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#004DA6] mb-8 text-center">Your Profile Activity</h2>

        {/* Liked Articles */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center space-x-3 text-gray-900">
            <Heart className="w-6 h-6 text-red-600" />
            <span>Liked Articles</span>
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {likedArticles.map(article => (
              <li key={article.id} className="hover:text-blue-600 cursor-pointer">
                {article.title} <span className="text-sm text-gray-500">({article.time})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Saved Articles */}
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center space-x-3 text-gray-900">
            <Bookmark className="w-6 h-6 text-yellow-600" />
            <span>Saved Articles</span>
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            {savedArticles.map(article => (
              <li key={article.id} className="hover:text-blue-600 cursor-pointer">
                {article.title} <span className="text-sm text-gray-500">({article.time})</span>
              </li>
            ))}
          </ul>
        </section>

        {/* User Comments */}
        <section>
          <h3 className="text-2xl font-semibold mb-4 flex items-center justify-center space-x-3 text-gray-900">
            <MessageCircle className="w-6 h-6 text-green-600" />
            <span>Your Comments</span>
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-4">
            {userComments.map(comment => (
              <li key={comment.id} className="hover:text-blue-600 cursor-pointer">
                On <strong>{comment.articleTitle}</strong>: "{comment.comment}" <span className="text-sm text-gray-500">({comment.time})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
