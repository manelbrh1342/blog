import React from 'react';

const footerLinks = [
  { title: "Categories", links: ["Travel", "Food", "Lifestyle", "Sports", "Fashion", "Business", "Art/Life", "Science", "Health"] },
  { title: "Company", links: ["About", "Career", "Mobile", "Blog", "How it works", "Press", "Partners", "Contact"] },
  { title: "Discover", links: ["Become a blogger", "Invite a friend", "Stories", "Podcast", "Tips & Tutorials", "Apps", "Facebook", "Instagram"] },
  { title: "Language", links: ["Indonesian", "English", "Spanish", "French", "German", "Italian", "Dutch", "Portuguese", "Japanese"] }
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-12 border-t border-slate-800">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-white font-semibold mb-4 font-primary">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a href="#" className="text-gray-400 hover:text-white text-sm font-secondary">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xs font-secondary">B</span>
            </div>
            <span className="text-white font-semibold font-primary">Blogscollaborative</span>
          </div>
          <p className="text-gray-400 text-sm font-secondary">
            Blogs collaborative 2025. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
