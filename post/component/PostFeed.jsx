import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CommentForm from './commentForm';
import CommentList from './CommentList';

const PostFeed = ({ userId }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/posts');
                setPosts(data);
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
        <div>
            {posts.map(post => (
                <div key={post._id} className="post">
                    <p>{post.content}</p>
                    <small>by {post.author.username} ({post.author.email})</small>
                    <CommentList postId={post._id} />
                    <CommentForm postId={post._id} userId={userId} onCommentAdded={(comment) => handleCommentAdded(post._id, comment)} />
                </div>
            ))}
        </div>
    );
};

export default PostFeed;
