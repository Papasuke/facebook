const User = require("../models/User");
const { hash } = require("bcrypt");
const { body, validationResult } = require('express-validator');

// Validation user input properties
const validateUser = [
  body('username').notEmpty().withMessage('Username is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Create new user
const createUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    // Hash password
    const hashedPassword = await hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role: 'user'
    });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  };
};

// Profile modifications
const updateProfile = async (req, res) => {
  const { email, password } = req.body;
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (email) {
      user.email = email;
    };

    if (password) {
      const hashedPassword = await hash(password, 10);
      user.password = hashedPassword;
    };

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully', user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  };
};

//remove user's friends by ID
const removeFriends = async (req, res) => {

};

//Modify Posts

// Export the functions
module.exports = {
  validateUser,
  createUser,
  updateProfile,
  removeFriends,
};