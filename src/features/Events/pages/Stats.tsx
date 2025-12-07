import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { TrendingUp, Eye, Heart, MessageCircle } from 'lucide-react';

interface CategoryStat {
  name: string;
  current: number;
  total: number;
  remaining: number;
  color: string;
}

interface Stats {
  total_events: number;
  total_likes: number;
  total_views: number;
  total_comments: number;
}

const Stats: React.FC = () => {
  const [stats, setStats] = useState<Stats>({
    total_events: 0,
    total_likes: 0,
    total_views: 0,
    total_comments: 0
  });

  const [categoryStats, setCategoryStats] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mock data
    const mockStats: Stats = {
      total_events: 17,
      total_likes: 1456,
      total_views: 4823,
      total_comments: 128
    };

    const mockCategoryStats: CategoryStat[] = [
      {
        name: 'Food & Dining',
        current: 250,
        total: 800,
        remaining: 250,
        color: 'bg-orange-500'
      },
      {
        name: 'Auto & Transport',
        current: 250,
        total: 300,
        remaining: 60,
        color: 'bg-indigo-500'
      },
      {
        name: 'Shopping',
        current: 150,
        total: 400,
        remaining: 250,
        color: 'bg-teal-500'
      },
      {
        name: 'Sport',
        current: 200,
        total: 400,
        remaining: 40,
        color: 'bg-cyan-500'
      },
      {
        name: 'Presents',
        current: 180,
        total: 300,
        remaining: 120,
        color: 'bg-yellow-400'
      },
      {
        name: 'Technology',
        current: 320,
        total: 500,
        remaining: 180,
        color: 'bg-blue-500'
      },
      {
        name: 'Health & Wellness',
        current: 150,
        total: 350,
        remaining: 200,
        color: 'bg-green-500'
      },
      {
        name: 'Entertainment',
        current: 280,
        total: 450,
        remaining: 170,
        color: 'bg-purple-500'
      }
    ];

    setStats(mockStats);
    setCategoryStats(mockCategoryStats);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4F46E5]"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-16">
        <div className="max-w-7xl mx-auto">
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Statistics Dashboard</h1>
            <p className="text-gray-600">Track your blog performance and category spending</p>
          </div>

          {/* Overall Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_events}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_views.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Total Likes</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_likes.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">Comments</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total_comments}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Category Statistics with Progress Bars */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Category Statistics</h2>
              <Link to="/events" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                View all events →
              </Link>
            </div>

            <div className="space-y-6">
              {categoryStats.map((category, index) => {
                const percentage = (category.current / category.total) * 100;

                return (
                  <div key={index} className="group">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold text-gray-900">{category.name}</h3>
                      <Link
                        to="/events"
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        View transactions
                      </Link>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                      <div
                        className={`absolute top-0 left-0 h-full ${category.color} rounded-full transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">
                        ${category.current} of ${category.total}
                      </span>
                      <span className="text-gray-900 font-medium">
                        $ {category.remaining} Left
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Track Your Progress</h3>
                <p className="text-gray-600 text-sm">
                  Monitor your blog's performance across different categories. Click on "View transactions" to see detailed event information for each category.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;