const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    friendList: [{ type: String }],  // Array for friends
    pendingFriends: [{ type: String }], // Array for pending friends
    isSuspended: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
