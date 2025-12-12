import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, Star, Edit, Trash2, Share2 } from 'lucide-react';
import type { Event } from '../EventApi';

// Extended interface for display purposes
interface DisplayEvent extends Event {
  author?: string;
  authorId?: string;
  category?: string;
  likes?: number;
  favorites?: number;
  views?: number;
  image?: string;
}

interface EventCardProps {
  event: DisplayEvent;
  onLike?: (id: number) => void;
  onFavorite?: (id: number) => void;
  variant?: 'vertical' | 'horizontal';
}

const EventCard: React.FC<EventCardProps> = ({ event, onLike, onFavorite, variant = 'vertical' }) => {
  // Format date for display
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

  const displayDate = event.date ? formatDate(event.date) : 'Date TBD';
  const displayContent = event.description || event.title;
  const displayAuthor = event.author || `Organizer ${event.organizer_id || 'Unknown'}`;
  const displayAuthorId = event.authorId || `organizer-${event.organizer_id || 'unknown'}`;
  const displayLikes = event.likes || 0;
  const displayFavorites = event.favorites || 0;
  const displayViews = event.views || 0;
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (onLike) onLike(event.id);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (onFavorite) onFavorite(event.id);
  };

  const handleShare = (platform: string) => {
    const shareUrl = `${window.location.origin}/events/${event.id}`;
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

    if (finalUrl) {
      // Try to open in new window
      const newWindow = window.open(finalUrl, '_blank', 'noopener,noreferrer');

      // If popup was blocked, navigate directly
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        window.location.href = finalUrl;
      }
    }
    setShowShareMenu(false);
  };

  // Horizontal layout for Home page
  if (variant === 'horizontal') {
    return (
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-row gap-6 p-6">
        {/* Image Section - Smaller for horizontal */}
        <div className="relative w-64 h-48 flex-shrink-0 overflow-hidden rounded-xl">
          {event.image ? (
            <img
              src={`/images/${event.image}`}
              alt={event.title}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
              <span className="text-4xl">📷</span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#E6A8D7] transition-colors flex-1">
                <Link to={`/events/${event.id}`}>
                  {event.title}
                </Link>
              </h3>
              {/* Action Buttons */}
              <div className="flex gap-2 ml-4">
                <Link
                  to={`/edit-event/${event.id}`}
                  className="p-2 bg-gray-100 text-[#E6A8D7] rounded-full hover:bg-[#E6A8D7] hover:text-white transition-colors shadow-sm"
                  title="Modifier"
                >
                  <Edit className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  className="p-2 bg-gray-100 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                  title="Supprimer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="text-xs font-medium text-gray-400 mb-3 uppercase tracking-wider">
              {displayDate}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
              {displayContent}
            </p>
          </div>

          {/* Footer with Author and Stats */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <Link to={`/author/${displayAuthorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6A8D7] to-[#D882C2] flex items-center justify-center text-white font-bold shadow-md">
                {displayAuthor.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-900">{displayAuthor}</span>
                <span className="text-xs text-gray-500">Organizer</span>
              </div>
            </Link>

            {/* Interactive Stats */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                  }`}
                title="Like"
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{displayLikes + (isLiked ? 1 : 0)}</span>
              </button>

              <button
                onClick={handleFavorite}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer ${isFavorited ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'
                  }`}
                title="Favorites"
              >
                <Star className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{displayFavorites + (isFavorited ? 1 : 0)}</span>
              </button>

              <div className="flex items-center gap-1.5 text-gray-600">
                <Eye className="w-5 h-5" />
                <span className="text-sm font-medium">{displayViews}</span>
              </div>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="p-2 bg-gray-100 text-[#E6A8D7] rounded-full hover:bg-[#E6A8D7] hover:text-white transition-colors shadow-sm"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                {showShareMenu && (
                  <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-xl border border-gray-300 py-2 z-50 min-w-[160px]">
                    <button
                      type="button"
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#1877F2] transition-colors font-medium"
                    >
                      📘 Facebook
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#1DA1F2] transition-colors font-medium"
                    >
                      🐦 Twitter
                    </button>
                    <button
                      type="button"
                      onClick={() => handleShare('linkedin')}
                      className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#0A66C2] transition-colors font-medium"
                    >
                      💼 LinkedIn
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Vertical layout (default)
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative h-64 overflow-hidden">
        {event.image ? (
          <img
            src={`/images/${event.image}`}
            alt={event.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
            <span className="text-4xl">📷</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Action Buttons (Hidden by default, visible on hover) */}
        {/* Action Buttons (Always visible or visible on card hover without opacity transition delay) */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Link
            to={`/edit-event/${event.id}`}
            className="p-2 bg-white/90 text-[#E6A8D7] rounded-full hover:bg-[#E6A8D7] hover:text-white transition-colors shadow-sm"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </Link>
          <button
            type="button"
            className="p-2 bg-white/90 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-colors shadow-sm"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#E6A8D7] transition-colors">
          <Link to={`/events/${event.id}`}>
            {event.title}
          </Link>
        </h3>

        <div className="text-xs font-medium text-gray-400 mb-4 uppercase tracking-wider">
          {displayDate}
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
          {displayContent}
        </p>

        {/* Footer with Author and Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
          <Link to={`/author/${displayAuthorId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E6A8D7] to-[#D882C2] flex items-center justify-center text-white font-bold shadow-md">
              {displayAuthor.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-900">{displayAuthor}</span>
              <span className="text-xs text-gray-500">Organizer</span>
            </div>
          </Link>

          {/* Interactive Stats */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
                }`}
              title="Like"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{displayLikes + (isLiked ? 1 : 0)}</span>
            </button>

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-1 transition-colors cursor-pointer ${isFavorited ? 'text-yellow-500' : 'text-gray-700 hover:text-yellow-500'
                }`}
              title="Favorites"
            >
              <Star className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
              <span className="text-xs font-medium">{displayFavorites + (isFavorited ? 1 : 0)}</span>
            </button>

            <div className="flex items-center gap-1 text-gray-600">
              <Eye className="w-4 h-4" />
              <span className="text-xs font-medium">{displayViews}</span>
            </div>

            {/* Share Button */}
            <div className="relative">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="p-2 bg-white/90 text-[#E6A8D7] rounded-full hover:bg-[#E6A8D7] hover:text-white transition-colors shadow-sm"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
              {showShareMenu && (
                <div className="absolute right-0 bottom-full mb-2 bg-white rounded-lg shadow-xl border border-gray-300 py-2 z-50 min-w-[160px]">
                  <button
                    type="button"
                    onClick={() => handleShare('facebook')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#1877F2] transition-colors font-medium"
                  >
                    📘 Facebook
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('twitter')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#1DA1F2] transition-colors font-medium"
                  >
                    🐦 Twitter
                  </button>
                  <button
                    type="button"
                    onClick={() => handleShare('linkedin')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-800 hover:bg-blue-50 hover:text-[#0A66C2] transition-colors font-medium"
                  >
                    💼 LinkedIn
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;