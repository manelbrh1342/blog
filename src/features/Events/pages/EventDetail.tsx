import React, { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import { useParams, Link } from 'react-router-dom';

interface Comment {
  id: number;
  author: string;
  content: string;
  date: string;
}

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
  comments: Comment[];
}

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [commentAuthor, setCommentAuthor] = useState<string>('');
  const [commentContent, setCommentContent] = useState<string>('');

  /* Logic implementation matching EventCard but for detail view */
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    // Mock data
    const mockEvent: Event = {
      id: 1,
      title: "Technological Innovation Conference",
      content: "Discover the latest technological innovations that are revolutionizing our daily lives. Experts will share their visions on the future of digital, artificial intelligence, and emerging technologies. A unique opportunity to network with industry leaders.",
      author: "Tech Vision",
      category: "Technological Innovation",
      date: "NOVEMBER 20, 2024",
      likes: 23,
      favorites: 5,
      views: 18,
      image: "event1.jpg",
      comments: [
        {
          id: 1,
          author: "Karim",
          content: "Perfect!",
          date: "10/13/2025 5:27 PM"
        },
        {
          id: 2,
          author: "fatema",
          content: "cool",
          date: "11/09/2025 11:20 AM"
        }
      ]
    };

    setEvent(mockEvent);
    setLoading(false);
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (event) setEvent({ ...event, likes: event.likes + (isLiked ? -1 : 1) });
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    if (event) setEvent({ ...event, favorites: event.favorites + (isFavorited ? -1 : 1) });
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

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    console.log('Nouveau commentaire:', commentAuthor, commentContent);
    setCommentAuthor('');
    setCommentContent('');
  };

  if (loading) return <div className="loading">Loading event...</div>;
  if (!event) return <div className="error">Event not found</div>;

  return (
    <div className="container">
      <article className="event-detail">
        <div className="event-header">
          <div className="event-category">{event.category}</div>
          <h2>{event.title}</h2>
          <div className="event-meta">
            <span className="event-date">{event.date}</span>
            <span className="event-author">By {event.author}</span>
            <div className="event-stats">
              <span className="event-likes">{event.likes} ❤️</span>
              <span className="event-favorites">{event.favorites} ⭐</span>
              <span className="event-views">{event.views} 👁️</span>
              <span className="event-comments">{event.comments.length} 💬</span>
            </div>
          </div>
        </div>

        <div className="event-image-large">
          {event.image ? (
            <img src={`/images/${event.image}`} alt={event.title} />
          ) : (
            <div className="no-image">
              <span>📷</span>
              <small>No image</small>
            </div>
          )}
        </div>

        <div className="event-content">
          <p>{event.content}</p>
        </div>

        <div className="event-actions">
          <button
            onClick={handleLike}
            className={`btn-like ${isLiked ? 'opacity-100' : 'opacity-80'}`}
            style={{ backgroundColor: isLiked ? '#E6A8D7' : '' }}
          >
            👍 {isLiked ? 'Liked' : 'Like this event'}
          </button>
          <button
            onClick={handleFavorite}
            className={`btn-favorite ${isFavorited ? 'opacity-100' : 'opacity-80'}`}
          >
            ⭐ {isFavorited ? 'Added to favorites' : 'Add to favorites'}
          </button>

          <Link to={`/edit-event/${event.id}`}
            className="btn-edit"
            style={{ background: '#E6A8D7', color: 'white' }}
          >
            ✏️ Edit this event
          </Link>
          <Link to="/" className="btn-back">↩️ Back to home</Link>

          {/* Social media share */}
          <div className="social-share">
            <span>Share:</span>
            <button onClick={() => handleShare('twitter')} className="btn-twitter cursor-pointer">🐦 Twitter</button>
            <button onClick={() => handleShare('facebook')} className="btn-facebook cursor-pointer">📘 Facebook</button>
            <button onClick={() => handleShare('linkedin')} className="btn-linkedin cursor-pointer">💼 LinkedIn</button>
          </div>

          {/* Delete button */}
          <form className="delete-form">
            <button type="submit" className="btn-delete">
              🗑️ DELETE THIS EVENT
            </button>
          </form>
        </div>

        {/* Comments section */}
        <section className="comments-section">
          <h3>Comments ({event.comments.length})</h3>

          {/* Add comment form */}
          <form onSubmit={handleAddComment} className="comment-form">
            <div className="form-group">
              <label htmlFor="comment_author">Your name:</label>
              <input
                type="text"
                id="comment_author"
                value={commentAuthor}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setCommentAuthor(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="comment_content">Your comment:</label>
              <textarea
                id="comment_content"
                value={commentContent}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setCommentContent(e.target.value)}
                rows={4}
                required
                placeholder="Share your thoughts about this event..."
              />
            </div>
            <button type="submit" className="btn-submit">Post comment</button>
          </form>

          {/* Liste des commentaires */}
          <div className="comments-list">
            {event.comments.length > 0 ? (
              event.comments.map(comment => (
                <div key={comment.id} className="comment">
                  <div className="comment-header">
                    <strong>{comment.author}</strong>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <div className="comment-content">
                    {comment.content}
                  </div>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </section>
      </article>
    </div>
  );
};

export default EventDetail;