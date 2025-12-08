import { useState } from 'react';
import { Search, Filter, Check, X, Trash2 } from 'lucide-react';

export default function CommentsPage() {
    const [comments, setComments] = useState([
        { id: 1, author: 'John Doe', content: 'Great article! Very informative.', article: 'The Future of AI', date: '2023-12-02', status: 'Approved' },
        { id: 2, author: 'Jane Smith', content: 'I disagree with point #3.', article: 'Web Development Trends', date: '2023-12-01', status: 'Pending' },
        { id: 3, author: 'Mike Ross', content: 'Spam comment here.', article: 'React Hooks', date: '2023-11-30', status: 'Spam' },
        { id: 4, author: 'Sarah Lee', content: 'Thanks for sharing!', article: 'CSS Grid', date: '2023-11-29', status: 'Approved' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            setComments(comments.filter(comment => comment.id !== id));
        }
    };

    const handleStatusChange = (id: number, newStatus: string) => {
        setComments(comments.map(comment =>
            comment.id === id ? { ...comment, status: newStatus } : comment
        ));
    };

    const filteredComments = comments.filter(comment => {
        const matchesSearch = comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            comment.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || comment.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Comments Management</h2>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search comments..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004DA6]/20"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                </div>

                <div className="relative">
                    <button
                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600"
                    >
                        <Filter className="w-4 h-4" />
                        <span>Filter: {filterStatus}</span>
                    </button>

                    {showFilterMenu && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10">
                            {['All', 'Approved', 'Pending', 'Spam'].map((status) => (
                                <button
                                    key={status}
                                    onClick={() => {
                                        setFilterStatus(status);
                                        setShowFilterMenu(false);
                                    }}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    {status}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Comment</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Article</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredComments.map((comment) => (
                            <tr key={comment.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-medium text-gray-900">{comment.author}</span>
                                </td>
                                <td className="px-6 py-4 max-w-xs">
                                    <p className="text-sm text-gray-600 truncate">{comment.content}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-blue-600 hover:underline cursor-pointer">{comment.article}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${comment.status === 'Approved' ? 'bg-green-100 text-green-700' :
                                            comment.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                        }`}>
                                        {comment.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{comment.date}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => handleStatusChange(comment.id, 'Approved')}
                                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                                            title="Approve"
                                        >
                                            <Check className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(comment.id, 'Spam')}
                                            className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                                            title="Mark as Spam"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(comment.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
