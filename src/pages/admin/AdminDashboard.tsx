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
                <h2 className="text-lg font-bold text-gray-900 mb-6" style={{ fontFamily: "'Cormorant Infant', serif" }}>Recent Activity</h2>
                <div className="space-y-6">
                    {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 font-medium">
                                {activity.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-900">
                                    <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                                </p>
                                <p className="text-xs text-gray-500">{activity.time}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
