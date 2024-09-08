// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-hot-toast';
// import { useLocation, useNavigate } from 'react-router-dom'; 

// const CreatePost = () => {
//     const [content, setContent] = useState('');
//     const location = useLocation();
//     const { userId } = location.state; // Assuming userId is passed via state
//     const navigate = useNavigate(); 

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const { data } = await axios.post('http://localhost:5000/posts', {
//                 content,
//                 author: userId
//             });

//             if (data.error) {
//                 toast.error(data.error);
//             } else {
//                 toast.success('Post created successfully!');
//                 setContent(''); // Clear the content field after successful post creation
//             }
//         } catch (error) {
//             console.error('Error creating post:', error);
//             toast.error('Failed to create post. Please try again.');
//         }
//     };

//     const handleViewPosts = () => {
//         navigate('/feed'); // Navigate to the post feed
//     };

//     const handleCreateGroup = () => {
//         navigate('/create-group'); // Navigate to the CreateGroup page
//     };

//     return (
//         <div>
//             <h2>Create a Post</h2>
//             <form onSubmit={handleSubmit}>
//                 <textarea 
//                     value={content} 
//                     onChange={(e) => setContent(e.target.value)} 
//                     placeholder="What's on your mind?" 
//                     required // Make sure the text area is required
//                 />
//                 <button type="submit">Post</button>
//             </form>
//             <button onClick={handleViewPosts} style={{ marginTop: '10px' }}>View Posts</button>
//             <button onClick={handleCreateGroup} style={{ marginTop: '10px' }}>Create a Group</button> {/* New button */}
//         </div>
//     );
// };

// export default CreatePost;

import React from 'react'

const CreatePost = () => {
  return (
    <div>
      
    </div>
  )
}

export default CreatePost
