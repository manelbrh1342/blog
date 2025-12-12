
import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import AuthNav from '../../../components/AuthNavigation';
import { Heart, Star, Eye, MessageCircle, Share2, Trash2, Edit, CornerUpLeft } from 'lucide-react';
import { fetchEventById, deleteEvent, type Event } from '../EventApi';
import { fetchCommentsByPostId, addComment, type Comment } from '../../Comment/CommentApi';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../store';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  const [event, setEvent] = useState<Event | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [commentContent, setCommentContent] = useState<string>('');

  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    const loadEvent = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        setError(null);
        const eventData = await fetchEventById(parseInt(id));
        setEvent(eventData);
        
        // Load comments for this event
        try {
          const eventComments = await fetchCommentsByPostId(parseInt(id));
          setComments(eventComments);
        } catch (err) {
          console.error('Error loading comments:', err);
        }
      } catch (err) {
        console.error('Error loading event:', err);
        setError(err instanceof Error ? err.message : 'Failed to load event');
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    // TODO: Implement like API call
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    // TODO: Implement favorite API call
  };

  const handleDelete = async () => {
    if (!event || !window.confirm('Are you sure you want to delete this event?')) return;
    
    try {
      await deleteEvent(event.id);
      navigate('/event');
    } catch (err) {
      console.error('Error deleting event:', err);
      alert('Failed to delete event');
    }
  };

  const handleShare = (platform: string) => {
    if (!event) return;
    const shareUrl = window.location.href;
    const text = event.title;
    let finalUrl = '';

    switch (platform) {
      case 'facebook':
        finalUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        finalUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        finalUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
    }

    if (finalUrl) window.open(finalUrl, '_blank', 'noopener,noreferrer');
  };

  const handleAddComment = async (e: FormEvent) => {
    e.preventDefault();
    if (!event || !commentContent.trim() || !user) {
      alert('Please login to comment');
      return;
    }

    try {
      await addComment({
        post_id: event.id,
        user_id: user.id || 1,
        content: commentContent,
      });
      
      // Reload comments
      const updatedComments = await fetchCommentsByPostId(event.id);
      setComments(updatedComments);
      setCommentContent('');
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
      }).toUpperCase();
    } catch {
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading event...</div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error || 'Event not found'}</div>
        <Link to="/event" className="mt-4 text-blue-600 hover:underline">Back to Events</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F4F8]">
      <AuthNav />

      <div className="max-w-4xl mx-auto px-4 py-8">
        <article className="bg-white rounded-2xl shadow-sm p-6 md:p-10 mb-8">
          <div className="mb-8 pb-6 border-b border-gray-100">
            {event.location && (
              <div className="text-sm font-bold text-[#4682dc] uppercase tracking-wider mb-3">{event.location}</div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{event.title}</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm text-gray-500">
              <span className="font-semibold">{formatDate(event.date)}</span>
              {event.location && (
                <>
                  <span className="hidden md:inline">•</span>
                  <span className="font-medium text-gray-700">{event.location}</span>
                </>
              )}

              <div className="flex items-center gap-4 mt-2 md:mt-0 md:ml-auto">
                <span className="flex items-center gap-1 text-green-500"><MessageCircle className="w-4 h-4" /> {comments.length}</span>
              </div>
            </div>
          </div>

          <div className="mb-8 rounded-2xl overflow-hidden h-64 md:h-[400px] relative bg-gray-100">
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <span className="text-4xl mb-2">📅</span>
              <small>Event Image</small>
            </div>
          </div>

          <div className="prose max-w-none text-gray-600 leading-relaxed text-lg mb-8">
            <p>{event.description || event.title}</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mt-8 pt-8 border-t border-gray-100">
            <button
              onClick={handleLike}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${isLiked ? 'bg-[#E6A8D7] text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
              {isLiked ? 'Liked' : 'Like'}
            </button>
            <button
              onClick={handleFavorite}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${isFavorited ? 'bg-yellow-400 text-white shadow-md' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              <Star className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
              {isFavorited ? 'Saved' : 'Favorite'}
            </button>

            <Link to={`/edit-event/${event.id}`}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-[#E6A8D7] hover:opacity-90 transition-all shadow-sm"
            >
              <Edit className="w-5 h-5" /> Edit
            </Link>
            <Link to="/" className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white bg-blue-400 hover:bg-blue-500 transition-all shadow-sm">
              <CornerUpLeft className="w-5 h-5" /> Back
            </Link>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl flex flex-wrap items-center gap-3">
            <span className="font-semibold text-gray-700">Share:</span>
            <button onClick={() => handleShare('twitter')} className="px-4 py-2 bg-[#1DA1F2] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Share2 className="w-3 h-3" /> Twitter
            </button>
            <button onClick={() => handleShare('facebook')} className="px-4 py-2 bg-[#1877F2] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Share2 className="w-3 h-3" /> Facebook
            </button>
            <button onClick={() => handleShare('linkedin')} className="px-4 py-2 bg-[#0A66C2] text-white rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2">
              <Share2 className="w-3 h-3" /> LinkedIn
            </button>

            <button 
              onClick={handleDelete}
              className="ml-auto text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors" 
              title="Delete Event"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>

          {/* Comments section */}
          <section className="mt-12 pt-8 border-t border-gray-100">
            <h3 className="text-2xl font-bold text-[#4682dc] mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6" /> Comments ({comments.length})
            </h3>

            {/* Add comment form */}
            {user && (
              <form onSubmit={handleAddComment} className="bg-gray-50 p-6 rounded-2xl mb-8 border border-gray-100">
                <div className="mb-4">
                  <label htmlFor="comment_content" className="block text-sm font-medium text-gray-700 mb-2">Your comment:</label>
                  <textarea
                    id="comment_content"
                    value={commentContent}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentContent(e.target.value)}
                    rows={3}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-y"
                    placeholder="Share your thoughts about this event..."
                  />
                </div>
                <button type="submit" className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-[#4682dc] to-[#1174c5] text-white font-semibold rounded-lg hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                  Post comment
                </button>
              </form>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.length > 0 ? (
                comments.map(comment => (
                  <div key={comment.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-[#4682dc] font-bold text-lg">User {comment.user_id}</strong>
                      {comment.created_at && (
                        <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                          {new Date(comment.created_at).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{comment.content}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-2xl italic">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </section>
        </article>
      </div>
    </div>
  );
};

export default EventDetail;