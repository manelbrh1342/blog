import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AuthNav from '../../../components/AuthNavigation';
import EventCard from '../components/EventCard';
import { User, MapPin, Calendar, Mail, Link as LinkIcon, ArrowLeft } from 'lucide-react';
import { events as allEvents, type Event } from '../data/events';

interface Author {
    id: string;
    name: string;
    role: string;
    bio: string;
    location: string;
    joinDate: string;
    email: string;
    website?: string;
    avatar?: string;
    stats: {
        eventsCount: number;
        articlesCount: number;
        followers: number;
        following: number;
    };
}

const AuthorProfile: React.FC = () => {
    const { authorId } = useParams<{ authorId: string }>();
    const navigate = useNavigate();
    const [author, setAuthor] = useState<Author | null>(null);
    const [authorEvents, setAuthorEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [activeTab, setActiveTab] = useState<'events' | 'articles'>('events');

    useEffect(() => {
        // Simulate fetching author data
        setLoading(true);
        setTimeout(() => {
            // Mock author data - in a real app this would come from an API based on authorId
            const mockAuthor: Author = {
                id: authorId || '1',
                name: "Tech Vision", // Matching the author name in events
                role: "Event Organizer & Tech Enthusiast",
                bio: "Passionate about technology and innovation. Organizing events to connect minds and share knowledge about the future of AI, Web3, and Digital Transformation.",
                location: "Paris, France",
                joinDate: "September 2023",
                email: "contact@techvision.com",
                website: "https://techvision.com",
                stats: {
                    eventsCount: 12,
                    articlesCount: 5,
                    followers: 1250,
                    following: 45
                }
            };

            setAuthor(mockAuthor);

            // Filter events for this author (using string matching for demo)
            const events = allEvents.filter(e => e.author === mockAuthor.name);
            setAuthorEvents(events);

            setLoading(false);
        }, 800);
    }, [authorId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F2F4F8] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004DA6]"></div>
            </div>
        );
    }

    if (!author) return <div>Author not found</div>;

    return (
        <div className="min-h-screen bg-[#F2F4F8] font-sans">
            <AuthNav />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-[#004DA6] transition-colors mb-6"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar - Author Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 sticky top-24">
                            <div className="flex flex-col items-center text-center">
                                <div className="w-32 h-32 bg-gradient-to-br from-[#004DA6] to-[#003D85] rounded-full flex items-center justify-center text-white text-4xl font-bold mb-4 shadow-lg">
                                    {author.avatar ? (
                                        <img src={author.avatar} alt={author.name} className="w-full h-full rounded-full object-cover" />
                                    ) : (
                                        author.name.charAt(0)
                                    )}
                                </div>
                                <h1 className="text-2xl font-bold text-gray-900">{author.name}</h1>
                                <p className="text-[#004DA6] font-medium mt-1">{author.role}</p>

                                <div className="flex gap-4 mt-6 w-full justify-center border-b border-gray-100 pb-6">
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{author.stats.followers}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Followers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{author.stats.following}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Following</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-gray-900">{author.stats.eventsCount}</div>
                                        <div className="text-xs text-gray-500 uppercase tracking-wide">Events</div>
                                    </div>
                                </div>

                                <div className="w-full py-6 space-y-4 text-left">
                                    <div className="flex items-start gap-3 text-gray-600">
                                        <User className="w-5 h-5 mt-0.5 text-gray-400 shrink-0" />
                                        <p className="text-sm">{author.bio}</p>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <MapPin className="w-5 h-5 text-gray-400 shrink-0" />
                                        <span className="text-sm">{author.location}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Calendar className="w-5 h-5 text-gray-400 shrink-0" />
                                        <span className="text-sm">Joined {author.joinDate}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600">
                                        <Mail className="w-5 h-5 text-gray-400 shrink-0" />
                                        <a href={`mailto:${author.email}`} className="text-sm hover:text-[#004DA6] transition-colors">{author.email}</a>
                                    </div>
                                    {author.website && (
                                        <div className="flex items-center gap-3 text-gray-600">
                                            <LinkIcon className="w-5 h-5 text-gray-400 shrink-0" />
                                            <a href={author.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:text-[#004DA6] transition-colors">{author.website}</a>
                                        </div>
                                    )}
                                </div>

                                <button className="w-full bg-[#004DA6] text-white py-2.5 rounded-lg font-semibold hover:bg-[#003D85] transition-all shadow-sm">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content - Tabs & Lists */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
                            <div className="flex border-b border-gray-100">
                                <button
                                    onClick={() => setActiveTab('events')}
                                    className={`flex-1 py-4 text-sm font-medium text-center transition-colors relative ${activeTab === 'events' ? 'text-[#004DA6]' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Events ({authorEvents.length})
                                    {activeTab === 'events' && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#004DA6]"></div>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('articles')}
                                    className={`flex-1 py-4 text-sm font-medium text-center transition-colors relative ${activeTab === 'articles' ? 'text-[#004DA6]' : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Articles ({author.stats.articlesCount})
                                    {activeTab === 'articles' && (
                                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#004DA6]"></div>
                                    )}
                                </button>
                            </div>
                        </div>

                        {activeTab === 'events' && (
                            <div className="space-y-6">
                                {authorEvents.length > 0 ? (
                                    authorEvents.map(event => (
                                        <EventCard key={event.id} event={event} variant="horizontal" />
                                    ))
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                                        <p className="text-gray-500">No events found for this author.</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'articles' && (
                            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 shadow-sm">
                                <p className="text-gray-500">No articles published yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorProfile;
