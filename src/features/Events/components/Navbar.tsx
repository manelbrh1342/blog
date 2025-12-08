import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  transparent?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ transparent = false }) => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const getLinkClass = (path: string) => {
    const active = isActive(path);
    const baseClasses = "px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200";

    // Unified Style (White Navbar logic everywhere)
    return `${baseClasses} ${active
      ? 'bg-[#E3F2FD] text-[#004DA6]'
      : 'text-[#475569] hover:text-[#004DA6] hover:bg-gray-50'
      }`;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-md py-3">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl shadow-sm transition-transform group-hover:scale-105 bg-[#004DA6] text-white">
              B
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#004DA6]">
              Blog collaboratif
            </h1>
          </Link>

          {/* Navigation Links */}
          <nav className="flex-1 flex justify-end">
            <ul className="flex items-center gap-1 list-none p-0 m-0" style={{ listStyle: 'none' }}>
              <li className="list-none"><Link to="/" className={getLinkClass('/')}>Home</Link></li>
              <li className="list-none"><Link to="/events" className={getLinkClass('/events')}>Events</Link></li>
              <li className="list-none"><Link to="/add-event" className={getLinkClass('/add-event')}>Add Event</Link></li>
              <li className="list-none"><Link to="/calendar" className={getLinkClass('/calendar')}>Calendar</Link></li>
              <li className="list-none"><Link to="/search" className={getLinkClass('/search')}>Search</Link></li>
              <li className="list-none"><Link to="/users" className={getLinkClass('/users')}>Users</Link></li>
              <li className="list-none"><Link to="/stats" className={getLinkClass('/stats')}>Stats</Link></li>
              <li className="list-none"><Link to="/author/user-1" className={getLinkClass('/author/user-1')}>My Profile</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;