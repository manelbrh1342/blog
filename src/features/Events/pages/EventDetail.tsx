import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Heart, Star, Share2, Calendar, User, Eye, Trash2 } from 'lucide-react';
import { events as mockEvents, type Event } from '../data/events';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');

  useEffect(() => {
    const fetchEvent = () => {
      const eventId = Number(id);
      const storedEvents = JSON.parse(localStorage.getItem('all_events') || '[]');

      // Find in storage or fallback to mocks
      let foundEvent = storedEvents.find((e: any) => e.id === eventId);

      if (!foundEvent) {
        foundEvent = mockEvents.find(e => e.id === eventId);
      }

      if (foundEvent) {
        setEvent(foundEvent);
      }
      setLoading(false);
    };

    fetchEvent();
  }, [id]);

  const updateEventInStorage = (updatedEvent: Event) => {
    const storedEvents = JSON.parse(localStorage.getItem('all_events') || '[]');
    const updatedEvents = storedEvents.map((e: any) => e.id === updatedEvent.id ? updatedEvent : e);

    // If it was a mock event not in storage yet (unlikely if we init properly, but possible)
    if (!storedEvents.find((e: any) => e.id === updatedEvent.id)) {
      updatedEvents.push(updatedEvent);
    }

    localStorage.setItem('all_events', JSON.stringify(updatedEvents));
    setEvent(updatedEvent);
  };

  const handleLike = () => {
    if (event) {
      const updated = { ...event, likes: event.likes + 1 };
      updateEventInStorage(updated);
    }
  };

  const handleFavorite = () => {
    if (event) {
      const updated = { ...event, favorites: event.favorites + 1 };
      updateEventInStorage(updated);
    }
  };

  // Fix: Explicitly type parameter 'e' and avoid 'confirm' usage issues (or allow browser confirm)
  const handleDelete = (e: FormEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this event?')) { // use window.confirm
      const storedEvents = JSON.parse(localStorage.getItem('all_events') || '[]');
      const filtered = storedEvents.filter((e: any) => e.id !== event?.id); // Keep 'any' for mock storage flexibility or define strict type
      localStorage.setItem('all_events', JSON.stringify(filtered));
      navigate('/events');
    }
  };

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const newComment = {
      id: Date.now(),
      author: commentAuthor,
      content: commentContent,
      date: new Date().toLocaleString()
    };

    const updated = {
      ...event,
      comments: [...(event.comments || []), newComment]
    };

    updateEventInStorage(updated);
    setCommentAuthor('');
    setCommentContent('');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004DA6]"></div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Event not found</h2>
      <Link to="/events" className="text-[#004DA6] hover:underline flex items-center">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Events
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F2F4F8] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button onClick={() => navigate('/events')} className="mb-6 flex items-center text-gray-600 hover:text-[#004DA6] transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to All Events
        </button>

        <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          {/* Header / Hero */}
          <div className="relative h-[400px] w-full bg-gray-200">
            {event.image ? (
              <img
                src={event.image.startsWith('data:') || event.image.startsWith('http') ? event.image : `/images/${event.image}`}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-50 text-gray-400">
                <Calendar className="w-20 h-20 mb-4 opacity-20" />
                <span className="text-lg">No Event Image</span>
              </div>
            )}
            <div className="absolute top-6 left-6">
              <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[#004DA6] font-semibold text-sm shadow-sm">
                {event.category}
              </span>
            </div>
          </div>

          {/* Content Container */}
          <div className="px-8 py-10">
            {/* Meta Header */}
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight font-primary">
                  {event.title}
                </h1>
                <div className="flex flex-wrap items-center gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#004DA6]" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#004DA6]" />
                    <span>By <span className="font-semibold text-gray-900">{event.author}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-gray-400" />
                    <span>{event.views} views</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <button onClick={handleLike} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 transition-colors font-medium">
                  <Heart className="w-4 h-4" />
                  <span>{event.likes} Likes</span>
                </button>
                <button onClick={handleFavorite} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-yellow-50 text-yellow-600 hover:bg-yellow-100 transition-colors font-medium">
                  <Star className="w-4 h-4" />
                  <span>{event.favorites} Favs</span>
                </button>

                <div className="w-px h-10 bg-gray-200 mx-2 hidden md:block"></div>

                <Link to={`/edit-event/${event.id}`} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium">
                  Edit
                </Link>
                <button onClick={handleDelete} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors font-medium">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg prose-blue max-w-none text-gray-700 leading-relaxed font-secondary">
              {event.content.split('\n').map((paragraph, idx) => (
                <p key={idx} className="mb-4">{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Footer / Comments */}
          <div className="bg-gray-50 px-8 py-10 border-t border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <MessageCircle className="w-6 h-6 text-[#004DA6]" />
              <h3 className="text-2xl font-bold text-gray-900">Comments ({event.comments?.length || 0})</h3>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Comment</label>
                  <textarea
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    required
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004DA6]/20 focus:border-[#004DA6] outline-none transition-all"
                    placeholder="Share your thoughts..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                  <input
                    type="text"
                    value={commentAuthor}
                    onChange={(e) => setCommentAuthor(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#004DA6]/20 focus:border-[#004DA6] outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="flex items-end">
                  <button type="submit" className="w-full py-3 bg-[#004DA6] text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-6">
              {event.comments && event.comments.length > 0 ? (
                event.comments.map((comment: any, index: number) => (
                  <div key={index} className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-[#004DA6] font-bold flex-shrink-0">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="bg-white p-4 rounded-xl rounded-tl-none border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-bold text-gray-900">{comment.author}</span>
                          <span className="text-xs text-gray-400">{comment.date}</span>
                        </div>
                        <p className="text-gray-700 text-sm">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No comments yet. Be the first to join the discussion!
                </div>
              )}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default EventDetail;