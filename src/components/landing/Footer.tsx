import React from 'react';
import { Link } from 'react-router-dom';

const footerLinks = [
  {
    title: "Categories",
    links: [
      { name: "Travel", path: "/category/travel" },
      { name: "Food", path: "/category/food" },
      { name: "Technology", path: "/category/technology" },
      { name: "Health", path: "/category/health" },
      { name: "Sports", path: "/category/sports" }
    ]
  },
  {
    title: "Company",
    links: [
      { name: "About Us", path: "/about" },
      { name: "Contact", path: "/contact" },
      { name: "Privacy Policy", path: "/privacy" },
      { name: "Terms of Service", path: "/terms" }
    ]
  },
  {
    title: "Discover",
    links: [
      { name: "All Events", path: "/events" },
      { name: "Latest Articles", path: "/home" },
      { name: "Search", path: "/search" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-4 font-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <Link to={link.path} className="text-gray-400 hover:text-white text-sm font-secondary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg hover:bg-blue-500 transition-colors">
              <span className="text-white font-bold text-lg font-secondary">B</span>
            </div>
            <span className="text-white font-semibold font-primary text-lg ml-2">Blogscollaborative</span>
          </div>
          <p className="text-gray-500 text-sm font-secondary">
            © 2025 Blogscollaborative. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
