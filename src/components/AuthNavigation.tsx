

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Bell } from 'lucide-react';


export default function AuthNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const [searchQuery, setSearchQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <nav className="bg-white shadow-sm relative z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/home')}>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-[#004DA6] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg md:text-xl" style={{ fontFamily: "'Cormorant Infant', serif" }}>B</span>
                        </div>
                        <span className="text-xl md:text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Blog collaboratif</span>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => navigate('/home')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/home') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Home</button>
                        <button onClick={() => navigate('/category')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/category') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Category</button>
                        <button onClick={() => navigate('/events')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/events') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Events</button>
                        <button onClick={() => navigate('/profile')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/profile') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Profile</button>
                    </div>

                    {/* Search Bar & Notifications (Desktop) */}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-64 pl-4 pr-12 py-2.5 bg-[#004DA6]/5 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#004DA6]/50"
                                style={{ fontFamily: "'Poppins', sans-serif" }}
                            />
                            <button
                                onClick={handleSearch}
                                className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#004DA6] p-2 rounded-full hover:bg-[#004DA6]/90 transition-colors"
                            >
                                <Search className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        <button
                            onClick={() => navigate('/notifications')}
                            className={`p-2 rounded-full transition-colors relative ${isActive('/notifications') ? 'text-[#004DA6] bg-[#004DA6]/10' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <button
                            onClick={() => navigate('/notifications')}
                            className={`p-2 rounded-full transition-colors relative mr-2 ${isActive('/notifications') ? 'text-[#004DA6] bg-[#004DA6]/10' : 'text-gray-600 hover:bg-gray-100'}`}
                        >
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        >
                            {isMenuOpen ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg px-4 py-6 space-y-4">
                    {/* Mobile Search */}
                    <div className="relative mb-6">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    handleSearch();
                                    setIsMenuOpen(false);
                                }
                            }}
                            className="w-full pl-4 pr-12 py-3 bg-[#004DA6]/5 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#004DA6]/50"
                            style={{ fontFamily: "'Poppins', sans-serif" }}
                        />
                        <button
                            onClick={() => {
                                handleSearch();
                                setIsMenuOpen(false);
                            }}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#004DA6] p-2 rounded-lg hover:bg-[#004DA6]/90 transition-colors"
                        >
                            <Search className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <button onClick={() => { navigate('/home'); setIsMenuOpen(false); }} className={`px-4 py-3 rounded-lg font-medium text-left ${isActive('/home') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-50'}`}>Home</button>
                        <button onClick={() => { navigate('/category'); setIsMenuOpen(false); }} className={`px-4 py-3 rounded-lg font-medium text-left ${isActive('/category') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-50'}`}>Category</button>
                        <button onClick={() => { navigate('/events'); setIsMenuOpen(false); }} className={`px-4 py-3 rounded-lg font-medium text-left ${isActive('/events') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-50'}`}>Events</button>
                        <button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} className={`px-4 py-3 rounded-lg font-medium text-left ${isActive('/profile') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-50'}`}>Profile</button>
                    </div>
                </div>
            )}
        </nav>
    );
}
