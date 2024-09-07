const express = require('express');
const { 
    signup, 
    signin,
    suspendUser, 
    resumeUser, 
    getUsers, 
    updateUserProfile 
} = require('../controllers/authController');
const { validateFields } = require('../middleware/validationMiddleware');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Register
router.post('/sign-up', validateFields, signup);

// Login user
router.post('/sign-in', signin);

// Suspend user
router.patch('/suspend/:id', authMiddleware, adminMiddleware, suspendUser);

// Resume user
router.patch('/resume/:id', authMiddleware, adminMiddleware, resumeUser);

// Get all users with "user" role
router.get('/users', authMiddleware, adminMiddleware, getUsers);

// Update user profile
router.patch('/update-profile', authMiddleware, updateUserProfile);

module.exports = router;