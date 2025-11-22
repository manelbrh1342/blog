import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/home');
  };

  return (
      <nav className="bg-gray-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">B</span>
              </div>
              <span className="text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>Blog collaboratif</span>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-12">
              <a href="#" className="text-blue-600 font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600" style={{ fontFamily: "'Poppins', sans-serif" }}>Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600" style={{ fontFamily: "'Poppins', sans-serif" }}>Events</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <button className="text-blue-600 font-medium px-6 py-2 hover:bg-blue-50 rounded-md transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Sign up
              </button>
              <button onClick={handleLogin} className="bg-blue-600 text-white font-medium px-6 py-2 rounded-md hover:bg-blue-700 transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Log in
              </button>
            </div>
          </div>
        </div>
      </nav>
  );
}
