

import { useNavigate, useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';


export default function AuthNav() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
    <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
                {/* Logo */}
                <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-[#004DA6] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl" style={{ fontFamily: "'Cormorant Infant', serif" }}>B</span>
                </div>
                <span className="text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Blog collaboratif</span>
                </div>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center space-x-4">
                <button
                    onClick={() => navigate('/home')}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/home') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Home
                </button>
                <button
                    onClick={() => navigate('/category')}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/category') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Category
                </button>
                <button
                    onClick={() => navigate('/event')}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/event') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Event
                </button>
                <button
                    onClick={() => navigate('/profile')}
                    className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/profile') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`}
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    Profile
                </button>
                </div>

                {/* Search Bar */}
                <div className="flex items-center space-x-3">
                <div className="relative">
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 pl-4 pr-12 py-2.5 bg-[#004DA6]/5 rounded-full text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#004DA6]/50"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                    />
                    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#004DA6] p-2 rounded-full hover:bg-[#004DA6]/90 transition-colors">
                    <Search className="w-4 h-4 text-white" />
                    </button>
                </div>
                </div>
            </div>
            </div>
    </nav>
    );
}
