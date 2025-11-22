import React, { useState } from 'react';
import {  ChevronDown, Trash2 } from 'lucide-react';

export default function UsersContent() {
  const [activeTab, setActiveTab] = useState('Articles');

  const articles = [
    { name: 'Bold text column', publishDate: '27/11/2025', views: '100k', likes: '28k', collaborators: 'No collaborators', collaboratorCount: 0 },
    { name: 'Bold text column', publishDate: '11/10/2025', views: '219k', likes: '11k', collaborators: 'No collaborators', collaboratorCount: 0 },
    { name: 'Bold text column', publishDate: '20/09/2025', views: '59k', likes: '29k', collaborators: 'No collaborators', collaboratorCount: 0 },
    { name: 'Bold text column', publishDate: '18/09/2025', views: '1M', likes: '698k', collaborators: '+2 more', collaboratorCount: 4 },
    { name: 'Bold text column', publishDate: '31/08/2025', views: '560k', likes: '48k', collaborators: '', collaboratorCount: 2 },
    { name: 'Bold text column', publishDate: '20/08/2025', views: '20k', likes: '9k', collaborators: '+1 more', collaboratorCount: 3 },
    { name: 'Bold text column', publishDate: '18/08/2025', views: '1.7M', likes: '800k', collaborators: '', collaboratorCount: 2 },
    { name: 'Bold text column', publishDate: '08/08/2025', views: '309k', likes: '39k', collaborators: '', collaboratorCount: 2 },
    { name: 'Bold text column', publishDate: '23/07/2025', views: '487k', likes: '86k', collaborators: 'No collaborators', collaboratorCount: 0 },
    { name: 'Bold text column', publishDate: '10/07/2025', views: '73k', likes: '10k', collaborators: 'No collaborators', collaboratorCount: 0 },
  ];

  const renderCollaborators = (count: number, hasMore: boolean) => {
    if (count === 0) return null;
    
    const avatars = [];
    const displayCount = hasMore ? count - 1 : count;
    
    for (let i = 0; i < Math.min(displayCount, 2); i++) {
      avatars.push(
        <img
          key={i}
          src={`https://i.pravatar.cc/150?img=${20 + i}`}
          alt="Collaborator"
          className="w-7 h-7 rounded-full border-2 border-white -ml-2 first:ml-0"
        />
      );
    }
    
    return avatars;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-3xl font-bold text-blue-600 mb-6">User's Content</h1>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <button
              onClick={() => setActiveTab('Articles')}
              className={`px-4 py-2 font-medium ${
                activeTab === 'Articles'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Articles
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Article Name</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Publish Date</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Views</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Likes</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Collaborators</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center space-x-1">
                      <span>Delete</span>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4 font-semibold text-gray-900">{article.name}</td>
                    <td className="py-4 px-4 text-gray-700">{article.publishDate}</td>
                    <td className="py-4 px-4 text-gray-700">{article.views}</td>
                    <td className="py-4 px-4 text-gray-700">{article.likes}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        {article.collaboratorCount > 0 ? (
                          <div className="flex items-center">
                            <div className="flex">
                              {renderCollaborators(article.collaboratorCount, article.collaborators.includes('more'))}
                            </div>
                            {article.collaborators && article.collaborators.includes('more') && (
                              <span className="ml-2 text-sm text-gray-600">{article.collaborators}</span>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-500">{article.collaborators}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium">
                        <span>Delete</span>
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}