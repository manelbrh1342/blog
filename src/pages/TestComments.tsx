import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComments, createComment } from '../features/Comment/CommentSlice';
import type { RootState, AppDispatch } from '../store';

const TestComments = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { comments, loading, adding, error } = useSelector((state: RootState) => state.comment);

    const [postId, setPostId] = useState<number>(1);
    const [newComment, setNewComment] = useState({
        content: '',
        user_id: 1, // Default user ID for testing
    });

    const handleFetch = () => {
        dispatch(fetchComments(postId));
    };

    const handleAddComment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.content.trim()) return;

        dispatch(createComment({
            post_id: postId,
            content: newComment.content,
            user_id: newComment.user_id,
        }));
        setNewComment({ ...newComment, content: '' });
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1>Test Comments Feature</h1>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h2>Fetch Comments</h2>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <label>
                        Post ID:
                        <input
                            type="number"
                            value={postId}
                            onChange={(e) => setPostId(Number(e.target.value))}
                            style={{ marginLeft: '10px', padding: '5px' }}
                        />
                    </label>
                    <button onClick={handleFetch} disabled={loading} style={{ padding: '5px 10px' }}>
                        {loading ? 'Loading...' : 'Fetch Comments'}
                    </button>
                </div>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>

            <div style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h2>Add Comment</h2>
                <form onSubmit={handleAddComment} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <label>
                        User ID:
                        <input
                            type="number"
                            value={newComment.user_id}
                            onChange={(e) => setNewComment({ ...newComment, user_id: Number(e.target.value) })}
                            style={{ padding: '5px' }}
                        />
                    </label>
                    <label>
                        Content:
                        <textarea
                            value={newComment.content}
                            onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                            style={{ padding: '5px', minHeight: '60px' }}
                            placeholder="Write a comment..."
                        />
                    </label>
                    <button type="submit" disabled={adding} style={{ padding: '8px', alignSelf: 'flex-start' }}>
                        {adding ? 'Adding...' : 'Add Comment'}
                    </button>
                </form>
            </div>

            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
                <h2>Comments List ({comments.length})</h2>
                {comments.length === 0 ? (
                    <p>No comments found.</p>
                ) : (
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {comments.map((comment: any) => (
                            <li key={comment.id || Math.random()} style={{ borderBottom: '1px solid #eee', padding: '10px 0' }}>
                                <p><strong>User {comment.user_id}</strong> says:</p>
                                <p>{comment.content}</p>
                                <small style={{ color: '#666' }}>ID: {comment.id} | Parent: {comment.parent_id || 'None'}</small>
                                <details>
                                    <summary>Debug JSON</summary>
                                    <pre style={{ fontSize: '10px', background: '#f5f5f5', padding: '5px' }}>
                                        {JSON.stringify(comment, null, 2)}
                                    </pre>
                                </details>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default TestComments;
