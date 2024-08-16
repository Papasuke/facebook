import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, default: 'admin' }
});

const Admin = model('User', adminSchema);

export default Admin;