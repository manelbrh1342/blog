import React, { useState, useEffect } from 'react';
import EventCard from '../components/EventCard';
import { events as mockEvents, type Event } from '../data/events';
import { useAuth } from '../../../hooks/useAuth';

type SortOption = 'newest' | 'popular' | 'favorites' | 'views';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Load from localStorage or use initial mock data
    const savedEvents = localStorage.getItem('all_events');
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      setEvents(mockEvents);
      localStorage.setItem('all_events', JSON.stringify(mockEvents));
    }
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
      <div className="max-w-7xl mx-auto">
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

      {/* Call to Action Section - Only show if not authenticated */}
      {!isAuthenticated && !authLoading && (
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
      )}
    </div>
  );
};

export default Events;