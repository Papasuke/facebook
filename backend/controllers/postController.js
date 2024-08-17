const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const { content, author } = req.body;
    if (!content || !author) {
        return res.status(400).json({ error: 'Post content and author are required.' });
    }

    try {
        const post = new Post({ content, author });
        await post.save();
        await post.populate('author', 'username email');  // Populate more fields as needed
        res.status(201).json(post);
    } catch (error) {
        console.error('Create Post Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'username email');
        res.status(200).json(posts);
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

