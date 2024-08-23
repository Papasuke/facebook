const mongoose = require('mongoose');

const GroupSchema = new Schema({
    groupName: {type: String, required: true, uq: true},
    admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    memberList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Array for group members
});