import express from 'express';
import {
  createPost,
  getPosts,
  likeReaction,
  hateReaction
} from '../controllers/postController.js';
import fileUploadMiddleware from '../middleware/fileUploadMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js'; // Import your auth middleware

const router = express.Router();

router.post('/create-post', authMiddleware(), fileUploadMiddleware, createPost);
router.get('/get-posts', authMiddleware(), getPosts);
router.post('/like/:postId', authMiddleware(), likeReaction);
router.post('/hate/:postId', authMiddleware(), hateReaction);

export default router;