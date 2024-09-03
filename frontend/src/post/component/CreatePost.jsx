import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import './CreatePost.css';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const location = useLocation();
    const { userId } = location.state;
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/posts', {
                content,
                author: userId
            });

            if (data.error) {
                toast.error(data.error);
            } else {
                toast.success('Post created successfully!');
                setContent('');
            }
        } catch (error) {
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again.');
        }
    };

    const handleViewPosts = () => {
        navigate('/feed'); // Navigate to the post feed
    };

    const handleCreateGroup = () => {
        navigate('/create-group'); // Navigate to the CreateGroup page
    };

    return (
        <div className="create-post-container">
            <div className="create-post-card">
                <h2>Create a Post</h2>
                <form onSubmit={handleSubmit} className="create-post-form">
                    <textarea 
                        value={content} 
                        onChange={(e) => setContent(e.target.value)} 
                        placeholder="What's on your mind?" 
                        required
                        className="post-textarea"
                    />
                    <button type="submit" className="post-button">Post</button>
                </form>
                <div className="button-group">
                    <button onClick={handleViewPosts} className="secondary-button">View Posts</button>
                    <button onClick={handleCreateGroup} className="secondary-button">Create a Group</button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;
