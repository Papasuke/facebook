const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const GroupAdminSchema = new Schema({
    username: {type: String, required: true, uq: true},
    email: {type: String, required: true, uq: true},
    password: {type: String, required: true},
    role: {type: String, default: 'groupAdmin'}
});

const GroupAdmin = model('GroupAdmin', GroupAdminSchema);

module.exports = GroupAdmin;