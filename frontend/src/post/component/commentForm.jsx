import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const CommentForm = ({ postId, onCommentAdded }) => {
    const [content, setContent] = useState('');
    
    const authToken = localStorage.getItem('authToken');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post('http://localhost:5000/comments/add', {
                content,
                postId
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success('Comment added successfully!');
                setContent('');
                onCommentAdded(data);
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            toast.error('Failed to add comment. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Add a comment..."
            />
            <button type="submit">Comment</button>
        </form>
    );
};

export default CommentForm;
