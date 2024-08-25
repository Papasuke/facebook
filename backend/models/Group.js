const mongoose = require('mongoose');
const { Schema } = mongoose;

const GroupSchema = new Schema({
    name: {type: String, required: true}, // Group name 
    visibility: {type: String, enum: ['public', 'private'], default: 'private'}, // Enum for group visibility
    status: {type: String, enum: ['approved', 'failed', 'pending'], default: 'pending'}, // Enum for group status
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}, // Reference to group admin ( admin of the group, not the admin of the app)
    memberList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array for group members
    pendingMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array for pending members
});

const Group = mongoose.model('Group', GroupSchema);
module.exports = Group;