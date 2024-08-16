const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'user' },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array to store friends ID
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }] // Array to store posts ID
});

const UserModel = mongoose.model("User", userSchema);

module.exports = User;