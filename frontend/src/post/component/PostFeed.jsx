import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PostFeed = () => {
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

    return (
        <div>
            {posts.map(post => (
                <div key={post._id} className="post">
                    <p>{post.content}</p>
                    <small>by {post.author.username} ({post.author.email})</small>
                </div>
            ))}
        </div>
    );
};

export default PostFeed;
