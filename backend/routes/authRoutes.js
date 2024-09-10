import express from 'express';
import {
    signup, 
    signin,
    logout,
    suspendUser, 
    resumeUser, 
    getUsers, 
    updateUserProfile
} from '../controllers/authController.js';
import { validateFields } from '../middleware/validationMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// User routes
router.post('/sign-up', validateFields, signup);
router.post('/sign-in', signin);
router.post('/logout', authMiddleware(), logout);
router.patch('/update-profile', authMiddleware(), updateUserProfile);

// Admin routes
router.patch('/suspend/:id', authMiddleware(['admin']), suspendUser);
router.patch('/resume/:id', authMiddleware(['admin']), resumeUser);
router.get('/users', authMiddleware(['admin']), getUsers);

export default router;