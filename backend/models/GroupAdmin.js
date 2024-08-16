const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const groupAdminSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'groupAdmin' }
});

const GroupAdmin = model('GroupAdmin', groupAdminSchema);

module.exports = GroupAdmin;