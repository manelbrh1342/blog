

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, Menu, X, Bell } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';


export default function AuthNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const { notifications } = useNotification();

    const isActive = (path: string) => location.pathname === path;

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm relative z-50">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-[#004DA6] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl" style={{ fontFamily: "'Cormorant Infant', serif" }}>B</span>
                        </div>
                        <span className="text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Blog collaboratif</span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        <button onClick={() => navigate('/home')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/home') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Home</button>
                        <button onClick={() => navigate('/category')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/category') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Category</button>
                        <button onClick={() => navigate('/event')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/event') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Event</button>
                        <button onClick={() => navigate('/profile')} className={`px-5 py-2 rounded-full font-medium transition-colors ${isActive('/profile') ? 'bg-[#004DA6]/10 text-[#004DA6]' : 'text-gray-700 hover:bg-gray-100'}`} style={{ fontFamily: "'Poppins', sans-serif" }}>Profile</button>
                    </div>

                    {/* Search Bar & Mobile Toggle */}
                    <div className="flex items-center space-x-3">
                        {/* Notification Bell */}
                        <div className="relative cursor-pointer">
                            <Bell className="w-6 h-6 text-gray-700 hover:text-blue-600 transition-colors" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                                    {notifications.length}
                                </span>
                            )}
                        </div>

                        <div className="hidden md:block relative">
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

                        {/* Mobile Menu Button */}
                        <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4 animate-fade-in-down">
                    <button onClick={() => { navigate('/home'); setIsMenuOpen(false); }} className="text-left py-2 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700">Home</button>
                    <button onClick={() => { navigate('/category'); setIsMenuOpen(false); }} className="text-left py-2 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700">Category</button>
                    <button onClick={() => { navigate('/event'); setIsMenuOpen(false); }} className="text-left py-2 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700">Event</button>
                    <button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} className="text-left py-2 px-4 rounded-lg hover:bg-gray-50 font-medium text-gray-700">Profile</button>
                </div>
            )}
        </nav>
    );
}
