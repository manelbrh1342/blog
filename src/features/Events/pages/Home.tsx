import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import EventCard from '../components/EventCard';
import Navbar from '../components/Navbar';
import { Search, ArrowRight } from 'lucide-react';

import { events as mockEvents, type Event } from '../data/events';

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Mock data waiting for API
  useEffect(() => {
    setEvents(mockEvents);
    setLoading(false);
  }, []);

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

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery, selectedCategory);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans">
      <Navbar transparent />

      {/* Page Banner */}
      <div className="page-banner" style={{ backgroundImage: "url('/images/banner-events-v2.jpg')" }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="italic font-bold">All Events</h1>
          <p className="text-white/90 text-xl font-light italic mt-4">
            Discover our upcoming events and don't miss the chance to join us!
          </p>
          <div className="text-white/80 breadcrumbs mt-6">
            Home <span className="mx-2">&gt;&gt;</span> Events
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs - Only All Events */}
        <div className="filter-tabs">
          <div className="filter-tab active">
            All Events
          </div>
        </div>

        {/* Events List (Horizontal) */}
        {events.length > 0 ? (
          <div className="flex flex-col gap-6">
            {events.map(event => (
              <EventCard
                key={event.id}
                event={event}
                onLike={handleLike}
                onFavorite={handleFavorite}
                variant="horizontal"
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

export default Home;
