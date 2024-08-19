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

const router = express.Router();

// Register
router.post('/register', validateFields, registerUser);

// Login user
router.post('/login', loginUser);

// Suspend user
router.patch('/suspend/:id', authMiddleware, suspendUser);

// Resume user
router.patch('/resume/:id', authMiddleware, resumeUser);

// get all users with "user" role
router.get('/users', authMiddleware, getUsers);

// Update user profile
router.post('/update-profile', authMiddleware, updateUserProfile);

module.exports = router;