import React from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Star } from 'lucide-react';

interface Notification {
    id: number;
    type: 'like' | 'comment' | 'follow' | 'favorite' | 'system';
    user?: string;
    userAvatar?: string;
    content: string;
    time: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    {
        id: 1,
        type: 'like',
        user: 'Sarah Jenkins',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
        content: 'liked your article "The Future of Web Development"',
        time: '2 minutes ago',
        read: false
    },
    {
        id: 2,
        type: 'comment',
        user: 'Mike Ross',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mike',
        content: 'commented on "Getting Started with React 19": "Great article! thanks for sharing."',
        time: '1 hour ago',
        read: false
    },
    {
        id: 3,
        type: 'follow',
        user: 'Jessica Pearson',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica',
        content: 'started following you',
        time: '3 hours ago',
        read: true
    },
    {
        id: 4,
        type: 'favorite',
        user: 'Harvey Specter',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Harvey',
        content: 'added your event "Tech Conference 2025" to favorites',
        time: '5 hours ago',
        read: true
    },
    {
        id: 5,
        type: 'system',
        content: 'Your weekly stats are ready! Check out how your articles performed this week.',
        time: '1 day ago',
        read: true
    }
];

import AuthNav from '../components/AuthNavigation';
import Footer from '../components/landing/Footer';

export default function NotificationsPage() {
    const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);

    const getIcon = (type: string) => {
        switch (type) {
            case 'like': return <Heart className="w-5 h-5 text-red-500 fill-current" />;
            case 'comment': return <MessageCircle className="w-5 h-5 text-blue-500 fill-current" />;
            case 'follow': return <UserPlus className="w-5 h-5 text-green-500" />;
            case 'favorite': return <Star className="w-5 h-5 text-yellow-500 fill-current" />;
            default: return <Bell className="w-5 h-5 text-gray-500" />;
        }
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id: number) => {
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const handleFollowBack = (id: number) => {
        // Mock follow back
        // alert(`Followed back! (ID: ${id})`); // User requested removed alerts but this logic would be API call usually
        // For UI feedback, maybe just remove the button or change text
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, content: n.content + " (Followed Back)" } : n));
    };

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans flex flex-col">
            <AuthNav />

            <div className="flex-1 pt-8 pb-12">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                                Notifications
                                <span className="bg-[#004DA6] text-white text-sm font-semibold px-2.5 py-0.5 rounded-full">
                                    {notifications.filter(n => !n.read).length} New
                                </span>
                            </h1>
                            <p className="text-gray-500 mt-2">Stay updated with your community activities</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={markAllAsRead} className="bg-[#004DA6] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#003d82] transition-colors shadow-md shadow-blue-200">
                                Mark all as read
                            </button>
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden min-h-[500px] w-full">
                        <div className="divide-y divide-gray-100">
                            {notifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`p-6 transition-all duration-200 hover:bg-gray-50 group ${!notification.read ? 'bg-blue-50/40' : 'bg-white'}`}
                                >
                                    <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5">
                                        {/* Icon or Avatar */}
                                        <div className="flex-shrink-0 relative">
                                            {notification.userAvatar ? (
                                                <>
                                                    <img
                                                        src={notification.userAvatar}
                                                        alt={notification.user}
                                                        className="w-14 h-14 rounded-full border-2 border-white shadow-md object-cover"
                                                    />
                                                    <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-sm border border-gray-100">
                                                        {getIcon(notification.type)}
                                                    </div>
                                                </>
                                            ) : (
                                                <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center border border-indigo-100">
                                                    {getIcon(notification.type)}
                                                </div>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 py-1">
                                            <div className="flex justify-between items-start">
                                                <p className="text-gray-900 text-[15px] leading-relaxed pr-8">
                                                    {notification.user && (
                                                        <span className="font-bold text-gray-900 hover:text-[#004DA6] cursor-pointer transition-colors mr-1">
                                                            {notification.user}
                                                        </span>
                                                    )}
                                                    <span className={`${!notification.read ? 'text-gray-800' : 'text-gray-600'}`}>
                                                        {notification.content}
                                                    </span>
                                                </p>
                                                <span className="text-xs text-gray-400 font-medium whitespace-nowrap ml-2">
                                                    {notification.time}
                                                </span>
                                            </div>

                                            {/* Action Buttons (Appears on Hover) */}
                                            <div className="mt-2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                {notification.type === 'follow' && (
                                                    <button onClick={() => handleFollowBack(notification.id)} className="text-xs font-semibold text-[#004DA6] hover:underline">Follow Back</button>
                                                )}
                                                {(notification.type === 'comment' || notification.type === 'like') && (
                                                    <button className="text-xs font-semibold text-gray-500 hover:text-gray-800">Reply</button>
                                                )}
                                                <button onClick={() => deleteNotification(notification.id)} className="text-xs font-semibold text-gray-400 hover:text-red-500">Delete</button>
                                            </div>
                                        </div>

                                        {/* Unread indicator */}
                                        {!notification.read && (
                                            <div className="flex-shrink-0 self-center">
                                                <div className="w-3 h-3 bg-[#004DA6] rounded-full ring-4 ring-blue-50"></div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Empty State */}
                        {notifications.length === 0 && (
                            <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center">
                                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                    <Bell className="w-8 h-8 text-gray-300" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">No new notifications</h3>
                                <p className="text-sm mt-1 max-w-sm mx-auto">We'll let you know when there's an update in your network.</p>
                            </div>
                        )}

                        {/* Footer Link */}
                        <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 text-center">
                            <button className="text-sm text-gray-600 font-medium hover:text-[#004DA6] transition-colors">
                                View earlier notifications
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
