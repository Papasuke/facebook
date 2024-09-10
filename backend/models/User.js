import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    friendList: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    pendingFriends: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'User' 
        }
    ],
    isSuspended: { 
        type: Boolean, 
        default: false 
    },
    imgUrl: { 
        type: String,
        default: null
    }
});

const User = mongoose.model('User', userSchema);

export default User;