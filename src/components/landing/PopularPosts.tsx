import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/mockData';

export default function PopularPosts() {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-2 font-primary">Popular Blog Posts</h2>
        <p className="text-gray-600 font-secondary">The most popular blog posts this month</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Link to={`/article/${post.id}`} key={post.id} className="block group">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1 font-primary group-hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-gray-500 text-xs mb-2 font-secondary">{post.date}</p>
                <p className="text-gray-600 text-sm mb-4 font-secondary line-clamp-3">{post.excerpt}</p>
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
