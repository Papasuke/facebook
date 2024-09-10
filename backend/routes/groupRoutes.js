import express from 'express';
import {
    createGroup,
    getPendingGroups,
    acceptGroupRequest,
    declineGroupRequest
} from '../controllers/groupController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

router.post('/create', authMiddleware, createGroup);
router.get('/pending', authMiddleware, adminMiddleware, getPendingGroups);
router.put('/:groupId/accept', authMiddleware, adminMiddleware, acceptGroupRequest);
router.put('/:groupId/decline', authMiddleware, adminMiddleware, declineGroupRequest);

export default router;
