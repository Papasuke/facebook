import express from 'express';
import { addComment, getComments } from '../controllers/commentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/add', authMiddleware, addComment);
router.get('/:postId/comments', getComments);

export default router;