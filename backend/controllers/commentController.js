const Comment = require('../models/Comment');
const Post = require('../models/Post');

exports.addComment = async (req, res) => {
    const { content, author, postId } = req.body;

    
    console.log("Received data - Content:", content, "Author:", author, "PostID:", postId);

    if (!content || !author || !postId) {
        return res.status(400).json({ error: 'Content, author, and postId are required.' });
    }

    try {
        const comment = new Comment({ content, author, post: postId });
        await comment.save();

        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};



exports.getComments = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await Comment.find({ post: postId })
            .populate('author', 'username email');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

