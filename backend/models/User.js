const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array for friends
    pendingFriends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array for pending friends
    isSuspended: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;