const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // JWT library

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

        const hashedPassword = await bcrypt.hash(password, 10); // Hash password
        const user = new User({ username, email, password: hashedPassword, role });
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

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        if (user.isSuspended) {
            return res.status(403).json({ success: false, message: 'Your account has been suspended.' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });

        // Send token and user information to frontend
        res.json({ success: true, token, userId: user._id, role: user.role });
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

        if (email) {
            user.email = email;
        }

        await user.save();
        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get friend list by email
const getFriendListByEmail = async (email) => {
    try {
        const user = await User.findOne({ email })
            .populate('friendList', 'email')
            .populate('pendingFriends', 'email'); // Populate both lists

        if (!user) {
            return { error: 'User not found' };
        }

        return { friends: user.friendList, pendingFriends: user.pendingFriends };
    } catch (error) {
        console.error('Error getting friend list by email:', error);
        return { error: 'An error occurred while fetching the friend list' };
    }
};

module.exports = {
    registerUser, // Register user
    loginUser, // Login user
    suspendUser, // Suspend user
    resumeUser, // Resume user
    getUsers, // Get users
    updateUserProfile, // Update user profile
    getFriendListByEmail // Get friend list by email
};