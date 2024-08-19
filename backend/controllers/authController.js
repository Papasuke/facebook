const User = require('../models/User');
const bcrypt = require('bcrypt');

// Reusable function to check user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ email });
    } catch (error) {
        console.error('Error finding user by email:', error);
        return null;
    }
};

// Register a new user
const registerUser = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: 'Email already in use' });
        }

        const user = new User({ username, email, password, role });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await findUserByEmail(email);

        if (!user || user.password !== password) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (user.isSuspended) {
            return res.status(403).json({ success: false, message: 'Your account has been suspended.' });
        }

        res.json({ success: true, userId: user._id, role: user.role });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

// Suspend a user
const updateUserStatus = async (req, res, isSuspended) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndUpdate(id, { isSuspended }, { new: true });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({
            message: isSuspended ? 'User suspended successfully' : 'User resumed successfully',
            user
        });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Suspend a user
const suspendUser = (req, res) => updateUserStatus(req, res, true);

// Resume a user
const resumeUser = (req, res) => updateUserStatus(req, res, false);

// Get all users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' });
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (password) {
            if (password.length < 6) {
                return res.status(400).json({ error: 'Password must be at least 6 characters long' });
            }
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    registerUser, // Register user
    loginUser, // Login user
    suspendUser, // Suspend user
    resumeUser, // Resume user
    getUsers, // Get users
    updateUserProfile, // Update user profile
};