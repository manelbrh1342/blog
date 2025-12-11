import { useState } from 'react';
import { Users, FileText, MessageSquare, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const stats = [
        { label: 'Total Users', value: '1,234', icon: Users, change: '+12%', color: 'blue' },
        { label: 'Total Articles', value: '156', icon: FileText, change: '+5%', color: 'green' },
        { label: 'Total Comments', value: '892', icon: MessageSquare, change: '+23%', color: 'purple' },
        { label: 'Engagement', value: '85%', icon: TrendingUp, change: '+8%', color: 'orange' },
    ];

    const recentActivity = [
        { id: 1, user: 'Alice Johnson', action: 'commented on', target: 'The Future of AI', time: '2 mins ago' },
        { id: 2, user: 'Bob Smith', action: 'published', target: 'Web Development Trends', time: '1 hour ago' },
        { id: 3, user: 'Charlie Brown', action: 'registered', target: '', time: '3 hours ago' },
        { id: 4, user: 'Diana Prince', action: 'liked', target: 'React vs Vue', time: '5 hours ago' },
    ];

    const [filter, setFilter] = useState('all');
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredActivity = recentActivity.filter(activity => {
        if (filter === 'all') return true;
        if (filter === 'comments') return activity.action.includes('comment');
        if (filter === 'publications') return activity.action.includes('publish');
        if (filter === 'registrations') return activity.action.includes('register');
        if (filter === 'likes') return activity.action.includes('like');
        return true;
    });

    const totalPages = Math.ceil(filteredActivity.length / itemsPerPage);
    const paginatedActivity = filteredActivity.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`p-3 rounded-lg bg-${stat.color}-50 text-${stat.color}-600`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="text-sm font-medium text-green-600 bg-green-50 px-2.5 py-0.5 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                    </div>
                ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h2 className="text-lg font-bold text-gray-900" style={{ fontFamily: "'Cormorant Infant', serif" }}>Recent Activity</h2>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'all' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('publications')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'publications' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Publications
                        </button>
                        <button
                            onClick={() => setFilter('comments')}
                            className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${filter === 'comments' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                        >
                            Comments
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    {paginatedActivity.length > 0 ? (
                        paginatedActivity.map((activity) => (
                            <div key={activity.id} className="flex items-center space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium shrink-0">
                                    {activity.user.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-900 truncate">
                                        <span className="font-semibold text-gray-800 hover:text-blue-600 cursor-pointer">{activity.user}</span>
                                        <span className="text-gray-500 mx-1">{activity.action}</span>
                                        <span className="font-medium text-gray-800">{activity.target}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-0.5">{activity.time}</p>
                                </div>
                                <div className="shrink-0">
                                    <span className={`inline-block w-2 h-2 rounded-full ${activity.action.includes('publish') ? 'bg-green-500' :
                                        activity.action.includes('comment') ? 'bg-blue-500' :
                                            activity.action.includes('like') ? 'bg-red-500' : 'bg-gray-300'
                                        }`}></span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500">No activity found.</div>
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-8 pt-4 border-t border-gray-100">
                        <button
                            onClick={() => setPage((p: number) => Math.max(1, p - 1))}
                            disabled={page === 1}
                            className="px-3 py-1 text-sm rounded-md border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Previous
                        </button>
                        <span className="text-sm text-gray-600">
                            Page {page} of {totalPages}
                        </span>
                        <button
                            onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                            className="px-3 py-1 text-sm rounded-md border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
