const express = require('express');
const { 
    signup, 
    signin,
    logout,
    suspendUser, 
    resumeUser, 
    getUsers, 
    updateUserProfile 
} = require('../controllers/authController');
const { validateFields } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Register
router.post('/sign-up', validateFields, signup);

// Login user
router.post('/sign-in', signin);

// Logout user
router.post('/logout', authMiddleware(), logout);

// Suspend user (requires authentication and admin role)
router.patch('/suspend/:id', authMiddleware(['admin']), suspendUser);

// Resume user (requires authentication and admin role)
router.patch('/resume/:id', authMiddleware(['admin']), resumeUser);

// Get all users (requires authentication and admin role)
router.get('/users', authMiddleware(['admin']), getUsers);

// Update user profile (requires authentication)
router.patch('/update-profile', authMiddleware(), updateUserProfile);

module.exports = router;