import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export default function SimpleHeader() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <nav className="bg-gray-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">B</span>
                        </div>
                        <Link to="/" className="text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>
                            Blog collaboratif
                        </Link>
                    </div>
                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        <Link to="/signup" className="text-blue-600 font-medium px-6 py-2 hover:bg-blue-50 rounded-md transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Sign up
                        </Link>
                        <Link to="/login" className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                            Log in
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 focus:outline-none">
                            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white shadow-lg border-t border-gray-100 py-6 px-6 flex flex-col space-y-4 animate-fade-in-down z-50">
                    <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-center text-blue-600 font-medium py-3 rounded-lg hover:bg-blue-50 border border-blue-100" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Sign up
                    </Link>
                    <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-center bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
                        Log in
                    </Link>
                </div>
            )}
        </nav>
    );
}
