import React, { useState, useEffect, type FormEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Search as SearchIcon, Filter } from 'lucide-react';

interface Event {
  id: number;
  title: string;
  content: string;
  author: string;
  category: string;
  date: string;
  likes: number;
  favorites: number;
  views: number;
  image?: string;
}

const Search: React.FC = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const category = params.get('category');

    if (q) setSearchQuery(q);
    if (category) setSelectedCategory(category);

    // Mock data fetching
    const mockEvents: Event[] = [
      {
        id: 1,
        title: "Conférence Innovation Technologique",
        content: "Découvrez les dernières innovations technologiques...",
        author: "Tech Vision",
        category: "Innovation technologique",
        date: "20 NOVEMBRE 2024",
        likes: 23,
        favorites: 5,
        views: 18,
        image: "event1.jpg"
      },
      {
        id: 2,
        title: "Atelier Développement Durable",
        content: "Comment intégrer le développement durable...",
        author: "Green Earth",
        category: "Environnement",
        date: "05 DÉCEMBRE 2024",
        likes: 45,
        favorites: 12,
        views: 32,
        image: "event2.jpg"
      },
      {
        id: 3,
        title: "Séminaire Intelligence Artificielle",
        content: "L'avenir de l'IA dans l'entreprise...",
        author: "AI Future",
        category: "Technologie",
        date: "15 DÉCEMBRE 2024",
        likes: 67,
        favorites: 20,
        views: 54,
        image: "event3.jpg"
      }
    ];

    setTimeout(() => {
      setEvents(mockEvents);
      setLoading(false);
    }, 1000);
  }, [location.search]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.set('q', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);

    // In a real app, we would navigate or fetch new data here
    console.log('Searching for:', searchQuery, 'in category:', selectedCategory);
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory ? event.category === selectedCategory : true;

    return matchesSearch && matchesCategory;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-xl text-gray-600">Recherche en cours...</div></div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#004DA6] mb-4">Recherche Avancée</h1>
            <p className="text-lg text-gray-600">
              Trouvez exactement ce que vous cherchez parmi nos événements.
            </p>
          </div>

          <div className="mb-12 bg-white p-6 rounded-2xl shadow-sm">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Mots-clés, titres, auteurs..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004DA6] focus:border-transparent outline-none transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="relative md:w-64">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#004DA6] focus:border-transparent outline-none transition-all appearance-none bg-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Toutes les catégories</option>
                  <option value="Innovation technologique">Innovation technologique</option>
                  <option value="Environnement">Environnement</option>
                  <option value="Technologie">Technologie</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-8 py-3 bg-[#004DA6] text-white font-medium rounded-xl hover:bg-[#003D85] transition-colors shadow-lg shadow-blue-900/20"
              >
                Rechercher
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {filteredEvents.length} résultat{filteredEvents.length !== 1 ? 's' : ''} trouvé{filteredEvents.length !== 1 ? 's' : ''}
            </h2>

            {filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredEvents.map(event => (
                  <div key={event.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group border border-gray-100">
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="px-3 py-1 bg-blue-50 text-[#004DA6] text-xs font-semibold rounded-full uppercase tracking-wide">
                          {event.category}
                        </span>
                        <span className="text-sm text-gray-500">{event.date}</span>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#004DA6] transition-colors">
                        <Link to={`/event/${event.id}`}>
                          {event.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
                        {event.content}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center text-sm text-gray-500">
                          <span className="font-medium text-gray-900 mr-2">Par {event.author}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            ❤️ {event.likes}
                          </span>
                          <span className="flex items-center gap-1">
                            👁️ {event.views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-500">Essayez de modifier vos termes de recherche ou vos filtres.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Search;