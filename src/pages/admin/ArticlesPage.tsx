import { useState } from 'react';
import { Search, Filter, Eye, Edit, Trash2, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ArticlesPage() {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([
        { id: 1, title: 'The Future of AI', author: 'Alice Johnson', category: 'Technology', status: 'Published', date: '2023-11-20' },
        { id: 2, title: 'Web Development Trends 2024', author: 'Bob Smith', category: 'Development', status: 'Draft', date: '2023-11-22' },
        { id: 3, title: 'Understanding React Hooks', author: 'Charlie Brown', category: 'Programming', status: 'Published', date: '2023-11-25' },
        { id: 4, title: 'CSS Grid vs Flexbox', author: 'Diana Prince', category: 'Design', status: 'Review', date: '2023-11-28' },
        { id: 5, title: 'Node.js Performance Tips', author: 'Evan Wright', category: 'Backend', status: 'Published', date: '2023-12-01' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            setArticles(articles.filter(article => article.id !== id));
        }
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = filterStatus === 'All' || article.status === filterStatus;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="space-y-6 relative">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Articles Management</h2>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-4 py-2 bg-[#004DA6] text-white rounded-lg hover:bg-[#003D82] transition-colors"
                >
                    Create Article
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
                <div className="relative w-64">
                    <input
                        type="text"
                        placeholder="Search articles..."
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
                            {['All', 'Published', 'Draft', 'Review'].map((status) => (
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
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Title</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Author</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {filteredArticles.map((article) => (
                            <tr key={article.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <p className="text-sm font-medium text-gray-900">{article.title}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{article.author}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">
                                        {article.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${article.status === 'Published' ? 'bg-green-100 text-green-700' :
                                        article.status === 'Draft' ? 'bg-gray-100 text-gray-700' :
                                            'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {article.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-gray-600">{article.date}</span>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-2">
                                        <button
                                            onClick={() => navigate(`/article/${article.id}`)}
                                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                            title="View Article"
                                        >
                                            <Eye className="w-4 h-4" />
                                        </button>
                                        <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(article.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
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

            {/* Create Article Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Create New Article</h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004DA6]/20"
                                    placeholder="Enter article title"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004DA6]/20">
                                        <option>Technology</option>
                                        <option>Development</option>
                                        <option>Design</option>
                                        <option>Business</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                                    <select className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004DA6]/20">
                                        <option>Draft</option>
                                        <option>Published</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                                <textarea
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004DA6]/20 h-32 resize-none"
                                    placeholder="Write your article content..."
                                ></textarea>
                            </div>
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end space-x-3">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    alert('Article created successfully!');
                                    setIsModalOpen(false);
                                }}
                                className="px-6 py-2 bg-[#004DA6] text-white rounded-lg hover:bg-[#003D82] transition-colors"
                            >
                                Create Article
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
