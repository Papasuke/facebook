import Comment, { find } from '../models/Comment.js';
import Post from '../models/Post';

export async function addComment(req, res) {
    const { content, postId } = req.body;

    if (!content || !postId) {
        return res.status(400).json({ error: 'Content and postId are required.' });
    }

    try {
        const comment = new Comment({
            content,
            author: req.user.id,
            post: postId
        });
        await comment.save();

        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } });

        res.status(201).json(comment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
}




export async function getComments(req, res) {
    const { postId } = req.params;

    try {
        const comments = await find({ post: postId })
            .populate('author', 'username email');
        res.status(200).json(comments);
    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

