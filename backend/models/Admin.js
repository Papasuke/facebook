const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, uq: true},
    email: {type: String, required: true, uq: true},
    password: {type: String, required: true},
    role: {type: String, default: 'admin'}
});

const Admin = model('admin', adminSchema);
module.exports = Admin;