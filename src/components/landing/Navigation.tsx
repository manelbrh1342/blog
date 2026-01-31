
import { useNavigate, Link } from 'react-router-dom';

export default function Navigation() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <nav className="bg-gray-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-[#004aad] rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <Link to="/" className="text-2xl text-gray-800" style={{ fontFamily: "'Cormorant Infant', serif" }}>
              Blog collaboratif
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-12">
            <Link to="/home" className="text-[#004aad] font-medium" style={{ fontFamily: "'Poppins', sans-serif" }}>Home</Link>
            <Link to="/category" className="text-gray-700 hover:text-[#004aad]" style={{ fontFamily: "'Poppins', sans-serif" }}>Categories</Link>
            <Link to="/event" className="text-gray-700 hover:text-[#004aad]" style={{ fontFamily: "'Poppins', sans-serif" }}>Events</Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-3">
            <button onClick={handleSignup} className="text-[#004aad] font-medium px-6 py-2 hover:bg-blue-50 rounded-md transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Sign up
            </button>
            <button onClick={handleLogin} className="bg-[#004aad] text-white font-medium px-6 py-2 rounded-md hover:bg-[#003d82] transition-colors" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Log in
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
