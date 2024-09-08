const Post = require('../models/Post');

const Post = require('../models/Post'); // Đường dẫn tới model Post của bạn

const createPost = async (req, res) => {
    try {
        const { content, imgURL, isPublic } = req.body;
        
        // Get ID from session
        const authorId = req.session.userId;

        if (!authorId) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        // Create new post
        const newPost = new Post({
            author: authorId,
            content,
            imgURL,
            isPublic
        });

        // save post to mongodb
        await newPost.save();

        //response status
        res.status(201).json({ message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getPosts = async (req, res) => {
    try {
        const userId = req.session.userId; // Id of signed-in user from session

        // Find all post
        const posts = await Post.find().populate('author', 'friendList').exec();

        // get user friendlist to filter posts
        let friendList = [];
        if (userId) {
            const user = await User.findById(userId).select('friendList');
            if (user) {
                friendList = user.friendList;
            }
        }

        // Filter posts by privacy status
        const filteredPosts = posts.filter(post => 
            post.isPublic || (userId && post.author.friendList.includes(userId))
        );

        res.status(200).json({ posts: filteredPosts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.deletePost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete Post Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

module.exports = {
    createPost,
    getPosts,
};