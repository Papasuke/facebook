import mongoose from 'mongoose';
const { Schema } = mongoose;

const adminSchema = new Schema({
    name: {type: String, required: true, uq: true},
    email: {type: String, required: true, uq: true},
    password: {type: String, required: true},
    role: {type: String, default: 'admin'}
});

const Admin = mongoose.model('Admin', adminSchema);

export default Admin;