const express = require('express');
const { 
    registerUser, 
    loginUser, 
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
router.post('/register', validateFields, registerUser);

// Login user
router.post('/login', loginUser);

// Suspend user
router.patch('/suspend/:id', authMiddleware, adminMiddleware, suspendUser);

// Resume user
router.patch('/resume/:id', authMiddleware, adminMiddleware, resumeUser);

// Get all users with "user" role
router.get('/users', authMiddleware, adminMiddleware, getUsers);

// Update user profile
router.post('/update-profile', authMiddleware, updateUserProfile);

module.exports = router;
