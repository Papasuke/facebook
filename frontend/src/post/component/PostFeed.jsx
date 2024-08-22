// src/components/Post.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as LoveIcon } from 'assets/icons/love.svg';
import { ReactComponent as HahaIcon } from 'assets/icons/happy.svg';
import { ReactComponent as AngryIcon } from 'assets/icons/angry.svg';

const Post = ({ post, onUpdatePost }) => {
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');
    const [reaction, setReaction] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(post.content);

    const handleReaction = async (newReaction) => {
        try {
            await axios.post(`http://localhost:5000/posts/${post._id}/reactions`, { reactionType: newReaction });
            setReaction(newReaction);
        } catch (error) {
            console.error('Failed to add reaction', error);
        }
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = async () => {
        if (newComment.trim()) {
            try {
                const response = await axios.post(`http://localhost:5000/comments/${post._id}`, {
                    content: newComment,
                    author: 'Anonymous'
                });
                setComments([...comments, response.data]);
                setNewComment('');
            } catch (error) {
                console.error('Failed to add comment', error);
            }
        }
    };

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/posts/${post._id}`, {
                newContent: editContent
            });
            onUpdatePost(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Failed to edit post', error);
        }
    };

    return (
        <div className="post">
            <h3>{post.author.username}</h3>
            {isEditing ? (
                <div>
                    <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                </div>
            ) : (
                <p>{post.content}</p>
            )}
            <div className="reactions">
                <button onClick={() => handleReaction('like')}>
                    <LikeIcon fill={reaction === 'like' ? 'blue' : 'gray'} />
                    Like
                </button>
                <button onClick={() => handleReaction('love')}>
                    <LoveIcon fill={reaction === 'love' ? 'red' : 'gray'} />
                    Love
                </button>
                <button onClick={() => handleReaction('haha')}>
                    <HahaIcon fill={reaction === 'haha' ? 'yellow' : 'gray'} />
                    Haha
                </button>
                <button onClick={() => handleReaction('angry')}>
                    <AngryIcon fill={reaction === 'angry' ? 'orange' : 'gray'} />
                    Angry
                </button>
            </div>
            <div className="comments">
                <h4>Comments</h4>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <p><strong>{comment.author}</strong> {comment.content}</p>
                    </div>
                ))}
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <div className="history">
                <h4>Edit History</h4>
                {post.editTimestamps && post.editTimestamps.length > 0 ? (
                    <ul>
                        {post.editTimestamps.map((timestamp, index) => (
                            <li key={index}>
                                <p>{post.editContents[index]} (Edited on: {new Date(timestamp).toLocaleString()})</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No edit history available.</p>
                )}
            </div>
            {!isEditing && <button onClick={handleEditClick}>Edit Post</button>}
        </div>
    );
};

export default Post;
