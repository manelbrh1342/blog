import React, { useState, useEffect, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard from '../components/EventCard';
import AuthNav from '../../../components/AuthNavigation';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import Footer from '../../../components/landing/Footer';
import { fetchEvents, type Event } from '../EventApi';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const fetchedEvents = await fetchEvents();
        setEvents(fetchedEvents);
      } catch (err) {
        console.error('Error fetching events:', err);
        setError(err instanceof Error ? err.message : 'Failed to load events');
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  const handleLike = (id: number) => {
    // This would need to be implemented in the backend
    console.log('Like event:', id);
  };

  const handleFavorite = (id: number) => {
    // This would need to be implemented in the backend
    console.log('Favorite event:', id);
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    console.log('Search:', searchQuery);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">{error}</div>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  // Filter events by search query
  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F2F4F8] font-sans">
      <AuthNav />

      {/* Page Banner */}
      <div
        className="relative mb-8 text-center text-white bg-[#0F172A] bg-cover bg-center bg-blend-overlay py-20 px-8"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold italic mb-2">Events & Articles</h1>
            <p className="text-white/90 text-lg font-light italic max-w-lg">
              Explore upcoming events and read our latest articles.
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => navigate('/add-event')}
              className="flex items-center gap-2 bg-[#E6A8D7] hover:bg-[#d892c6] text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              <PlusCircle className="w-5 h-5" />
              Add Article
            </button>
            <button
              onClick={() => navigate('/calendar')}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 text-white px-6 py-3 rounded-full font-bold shadow-lg transition-transform transform hover:scale-105"
            >
              <CalendarIcon className="w-5 h-5" />
              Calendar
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs - Only All Events */}
        <div className="flex justify-center mb-8">
          <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-200">
            <span className="text-gray-800 font-medium">All Events</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events..."
              className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>

        {/* Events List (Horizontal) */}
        {filteredEvents.length > 0 ? (
          <div className="flex flex-col gap-6">
            {filteredEvents.map(event => (
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
            <p className="text-xl text-gray-500">
              {searchQuery ? 'No events match your search.' : 'No events found.'}
            </p>
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

      <Footer />
    </div>
  );
};

export default Home;
