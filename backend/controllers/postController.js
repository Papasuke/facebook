import cloudinaryUpload from '../lib/cloudinaryService.js';
import Post from '../models/Post.js';
import User from '../models/User.js';
import { formatPostResponse } from './formatResponse.js';

// Create post
const createPost = async (req, res) => {
  try {
    const { caption, isPrivate } = req.body;
    const author = req.session.userId;

    if (!author) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    let imgURL = null;
    if (req.file) {
      const { buffer, originalname } = req.file;
      const cloudinaryResponse = await cloudinaryUpload(buffer, originalname, 'post');

      if (cloudinaryResponse?.secure_url) {
        imgURL = cloudinaryResponse.secure_url;
      } else {
        return res.status(500).json({ message: 'Failed to upload image' });
      }
    }

    const newPost = new Post({ author, caption, isPrivate, imgURL });
    const savedPost = await newPost.save();
    const postResponse = formatPostResponse(savedPost);

    res.status(201).json({ message: 'Post created successfully', post: postResponse });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get posts by relationship and post privacy
const getPosts = async (req, res) => {
  try {
    const userId = req.session.userId;

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const user = await User.findById(userId).populate('friendList', '_id');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const friendList = user.friendList.map(friend => friend._id);

    const posts = await Post.find({
      $or: [
        { author: { $in: [...friendList, userId] } },
        { isPrivate: false }
      ]
    })
      .populate('author', 'name')
      .populate('likes', '_id') 
      .populate('hates', '_id'); 

    const postResponses = posts.map(post => formatPostResponse(post));

    res.status(200).json(postResponses);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Reaction API
const likeReaction = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { postId } = req.params; // Get postId from URL parameters

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await Post.findById(postId).populate('likes', '_id');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userHasLiked = post.likes.some(like => like._id.toString() === userId);

    if (userHasLiked) {
      post.likes = post.likes.filter(like => like._id.toString() !== userId);
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json({ 
      message: 'Post liked/unliked successfully', 
      likes: post.likes.map(like => like._id.toString())
    });
  } catch (error) {
    console.error('Error toggling like on post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const hateReaction = async (req, res) => {
  try {
    const userId = req.session.userId;
    const { postId } = req.params; // Get postId from URL parameters

    if (!userId) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const post = await Post.findById(postId).populate('hates', '_id');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userHasHated = post.hates.some(hate => hate._id.toString() === userId);

    if (userHasHated) {
      post.hates = post.hates.filter(hate => hate._id.toString() !== userId);
    } else {
      post.hates.push(userId);
    }

    await post.save();

    res.status(200).json({ 
      message: 'Post hated/neutralized successfully', 
      hates: post.hates.map(hate => hate._id.toString())
    });
  } catch (error) {
    console.error('Error toggling hate on post:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete post
const deletePost = async (req, res) => {
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

export {
  createPost,
  getPosts,
  likeReaction,
  hateReaction,
  deletePost
};