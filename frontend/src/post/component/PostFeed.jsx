import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Post from './Postfb';    
import {ReactComponent as LikeIcon} from 'assets/icons/like.svg';
import {ReactComponent as LoveIcon} from 'assets/icons/love.svg';
import {ReactComponent as HahaIcon} from 'assets/icons/happy.svg';
import {ReactComponent as AngryIcon} from 'assets/icons/angry.svg';




const Post = ({post})=>{
    const [comment, setComment] = useState(post.comment || []);
    const [newComment, setNewComment] = useState('');
    const [reaction, setReaction] = useState(null);


    const handleReaction = (newReaction) => {
        setReaction(newReaction);
    }

    const handleCommentChange = (e) =>{
        setNewComment(e.target.value);
    };

    const handleAddComment = async() => {
        if(newComment.trim()){
            try{
                const response = await axios.post(`http://localhost:5000/comments/${post.id}`, {
                    comment: newComment,
                    author:'Anonymous'
            });
            setComment([...comment, response.data]);
            setNewComment('');
        } catch (error) {
            console.error('Failed to add comment', error);
        }
    }
};

    return(
        <div className='post'>
            <h3>{post.author}</h3>
            <p>{post.content}</p>
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
            <div className='comments'>
                <h4>Comments</h4>
                {comments.map((comment, index)=> (
                    <div key={index}>
                        <p><strong>{comment.author}</strong>{comment.content}</p>
                </div>
                ))}
                <textarea
                    value={newComment}
                    onChange={(e)=>setNewComment(e.target.value)}
                    placeholder="Add a comment"
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
        </div>
    )
};


function PostFeed() {
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
}

export default PostFeed;
