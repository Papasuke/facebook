
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ReactComponent as LikeIcon } from 'assets/icons/like.svg';
import { ReactComponent as LoveIcon } from 'assets/icons/love.svg';
import { ReactComponent as HahaIcon } from 'assets/icons/happy.svg';
import { ReactComponent as AngryIcon } from 'assets/icons/angry.svg';

const PostFeed = ({ post, onUpdatePost }) => {
    const [comments, setComments] = useState(post.comments || []);
    const [newComment, setNewComment] = useState('');
    const [reaction, setReaction] = useState(post.reaction || null);
    const [isEditingPost, setIsEditingPost] = useState(false);
    const [editPostContent, setEditPostContent] = useState(post.content);
    const [editCommentId, setEditCommentId] = useState(null);
    const [editCommentContent, setEditCommentContent] = useState('');

    useEffect(() => {
        setEditPostContent(post.content);
        setReaction(post.reaction);
    }, [post]);

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

    const handleEditPostClick = () => {
        setIsEditingPost(true);
    };

    const handleSavePostEdit = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/posts/${post._id}`, {
                newContent: editPostContent
            });
            onUpdatePost(response.data);
            setIsEditingPost(false);
        } catch (error) {
            console.error('Failed to edit post', error);
        }
    };

    const handleEditCommentChange = (e) => {
        setEditCommentContent(e.target.value);
    };

    const handleEditCommentClick = (commentId, commentContent) => {
        setEditCommentId(commentId);
        setEditCommentContent(commentContent);
    };

    const handleSaveCommentEdit = async (commentId) => {
        try {
            const response = await axios.put(`http://localhost:5000/comments/${commentId}`, {
                newContent: editCommentContent
            });
            setComments(comments.map(comment =>
                comment._id === commentId ? response.data : comment
            ));
            setEditCommentId(null);
            setEditCommentContent('');
        } catch (error) {
            console.error('Failed to edit comment', error);
        }
    };

    return (
        <div className="post">
            <h3>{post.author.username}</h3>
            {isEditingPost ? (
                <div>
                    <textarea
                        value={editPostContent}
                        onChange={(e) => setEditPostContent(e.target.value)}
                    />
                    <button onClick={handleSavePostEdit}>Save</button>
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
                {comments.map((comment) => (
                    <div key={comment._id}>
                        {editCommentId === comment._id ? (
                            <div>
                                <textarea
                                    value={editCommentContent}
                                    onChange={handleEditCommentChange}
                                />
                                <button onClick={() => handleSaveCommentEdit(comment._id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <p><strong>{comment.author}</strong> {comment.content}</p>
                                <button onClick={() => handleEditCommentClick(comment._id, comment.content)}>Edit</button>
                            </div>
                        )}
                    </div>
                ))}
                <textarea
                    value={newComment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment"
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            {!isEditingPost && <button onClick={handleEditPostClick}>Edit Post</button>}
        </div>
    );
};

export default PostFeed;
