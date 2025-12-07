import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { events as mockEvents, type Event } from '../data/events';

type SortOption = 'newest' | 'popular' | 'favorites' | 'views';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  useEffect(() => {
    // Mock data
    setEvents(mockEvents);
    setLoading(false);
  }, []);

  // Sort events based on selected option
  const sortedEvents = [...events].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.likes - a.likes;
      case 'favorites':
        return b.favorites - a.favorites;
      case 'views':
        return b.views - a.views;
      case 'newest':
      default:
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
  });

  const handleLike = (id: number) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, likes: event.likes + 1 } : event
    ));
  };

  const handleFavorite = (id: number) => {
    setEvents(events.map(event =>
      event.id === id ? { ...event, favorites: event.favorites + 1 } : event
    ));
  };

  if (loading) return <div className="loading">Loading events...</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-16 mt-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">All Events</h2>
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm">
            <span className="text-gray-500 text-sm">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent font-semibold text-gray-700 focus:outline-none cursor-pointer"
            >
              <option value="newest">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="favorites">Favorites</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {sortedEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedEvents.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onLike={handleLike}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No events found.</p>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="bg-[#1a2332] text-white py-12">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-3">Let the world Hear you!</h2>
          <p className="text-lg mb-6">
            Join more than 4,000 <span className="underline">bloggers</span> and share your world
          </p>
          <button className="px-8 py-3 bg-white text-[#1a2332] font-semibold rounded-md hover:bg-gray-100 transition-colors">
            Get started
          </button>
        </div>
      </section>

      {/* Footer Links Section */}
      <footer className="bg-[#f5d5e8] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Categories */}
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Travel</a></li>
                <li><a href="#" className="hover:text-gray-900">Food</a></li>
                <li><a href="#" className="hover:text-gray-900">Lifestyle</a></li>
                <li><a href="#" className="hover:text-gray-900">Sports</a></li>
                <li><a href="#" className="hover:text-gray-900">Fashion</a></li>
                <li><a href="#" className="hover:text-gray-900">Business</a></li>
                <li><a href="#" className="hover:text-gray-900">Art/Life</a></li>
                <li><a href="#" className="hover:text-gray-900">Science</a></li>
                <li><a href="#" className="hover:text-gray-900">Health</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">About</a></li>
                <li><a href="#" className="hover:text-gray-900">Career</a></li>
                <li><a href="#" className="hover:text-gray-900">Mobile</a></li>
                <li><a href="#" className="hover:text-gray-900">Blog</a></li>
                <li><a href="#" className="hover:text-gray-900">How it works</a></li>
                <li><a href="#" className="hover:text-gray-900">Press</a></li>
                <li><a href="#" className="hover:text-gray-900">Partners</a></li>
                <li><a href="#" className="hover:text-gray-900">Contact</a></li>
              </ul>
            </div>

            {/* Discover */}
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Discover</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Become a blogger</a></li>
                <li><a href="#" className="hover:text-gray-900">Invite a friend</a></li>
                <li><a href="#" className="hover:text-gray-900">Stories</a></li>
                <li><a href="#" className="hover:text-gray-900">Podcast</a></li>
                <li><a href="#" className="hover:text-gray-900">Tips & Tutorials</a></li>
                <li><a href="#" className="hover:text-gray-900">Apps</a></li>
                <li><a href="#" className="hover:text-gray-900">Facebook</a></li>
                <li><a href="#" className="hover:text-gray-900">Instagram</a></li>
              </ul>
            </div>

            {/* Languages */}
            <div>
              <h3 className="font-bold text-gray-700 mb-4">Languages</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-gray-900">Indonesian</a></li>
                <li><a href="#" className="hover:text-gray-900">English</a></li>
                <li><a href="#" className="hover:text-gray-900">Spanish</a></li>
                <li><a href="#" className="hover:text-gray-900">French</a></li>
                <li><a href="#" className="hover:text-gray-900">German</a></li>
                <li><a href="#" className="hover:text-gray-900">Italian</a></li>
                <li><a href="#" className="hover:text-gray-900">Dutch</a></li>
                <li><a href="#" className="hover:text-gray-900">Portuguese</a></li>
                <li><a href="#" className="hover:text-gray-900">Japanese</a></li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-300 text-center text-sm text-gray-600">
            <p>Blogs collaborative 2025. All rights reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Events;