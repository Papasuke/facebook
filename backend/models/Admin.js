const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'admin' }
});

const Admin = model('admin', adminSchema);
module.exports = Admin;