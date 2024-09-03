import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import './PostFeed.css'; 

const PostFeed = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/posts');
                
                const postsWithComments = data.map(post => ({
                    ...post,
                    comments: post.comments || []  
                }));
                setPosts(postsWithComments);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);

    const handleCommentAdded = (postId, comment) => {
        setPosts(posts.map(post => {
            if (post._id === postId) {
                return {
                    ...post,
                    comments: [...post.comments, comment] 
                };
            }
            return post;
        }));
    };

    return (
        <div className="feed-container">
            {posts.map(post => (
                <div key={post._id} className="post-card">
                    <div className="post-header">
                        <strong>{post.author.username}</strong> <small>({post.author.email})</small>
                    </div>
                    <div className="post-content">
                        <p>{post.content}</p>
                    </div>
                    <CommentList postId={post._id} />
                    <CommentForm postId={post._id} userId={userId} onCommentAdded={(comment) => handleCommentAdded(post._id, comment)} />
                </div>
            ))}
        </div>
    );
};

export default PostFeed;
