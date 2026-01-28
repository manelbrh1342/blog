import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Mail, FileText, Heart, Eye } from 'lucide-react';

interface User {
  id: number;
  username: string;
  email: string;
}

interface UserStats {
  [key: string]: {
    events: number;
    likes: number;
    views: number;
  };
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [userStats, setUserStats] = useState<UserStats>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Mock data
    const mockUsers: User[] = [
      { id: 1, username: "Tech Vision", email: "contact@techvision.com" },
      { id: 2, username: "Green Earth", email: "info@greenearth.org" },
      { id: 3, username: "AI Future", email: "hello@aifuture.io" },
      { id: 4, username: "Marie Curie", email: "marie@science.edu" },
      { id: 5, username: "John Doe", email: "john.doe@example.com" }
    ];

    const mockStats: UserStats = {
      "Tech Vision": { events: 12, likes: 340, views: 1200 },
      "Green Earth": { events: 8, likes: 210, views: 850 },
      "AI Future": { events: 15, likes: 560, views: 2300 },
      "Marie Curie": { events: 5, likes: 180, views: 600 },
      "John Doe": { events: 2, likes: 45, views: 150 }
    };

    setTimeout(() => {
      setUsers(mockUsers);
      setUserStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Loading users...</div></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#004DA6] mb-4">Community</h1>
            <p className="text-lg italic text-gray-600">
              Discover the active members of our community and their contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map(user => (
              <div key={user.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group">
                <div className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-[#004DA6] to-[#003D85] rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                  </div>

                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{user.username}</h3>
                    <div className="flex items-center justify-center text-gray-500 text-sm">
                      <Mail className="w-4 h-4 mr-2" />
                      {user.email}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <FileText className="w-4 h-4 text-blue-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">{userStats[user.username]?.events || 0}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Events</div>
                    </div>
                    <div className="text-center border-l border-r border-gray-100">
                      <div className="flex items-center justify-center mb-1">
                        <Heart className="w-4 h-4 text-red-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">{userStats[user.username]?.likes || 0}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Likes</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-1">
                        <Eye className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="text-xl font-bold text-gray-900">{userStats[user.username]?.views || 0}</div>
                      <div className="text-xs text-gray-500 uppercase tracking-wide">Views</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Users;