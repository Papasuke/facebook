import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CommentList = ({ postId }) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/comments/${postId}/comments`);
                setComments(data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId]);

    return (
        <div className="comments">
            {comments.map(comment => (
                <div key={comment._id} className="comment">
                    <p>{comment.content}</p>
                    <small>by {comment.author?.username} ({comment.author?.email})</small>
                </div>
            ))}
        </div>
    );
};

export default CommentList;
