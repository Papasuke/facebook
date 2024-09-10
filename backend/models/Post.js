import mongoose from 'mongoose';

const { Schema } = mongoose;

const postSchema = new Schema(
    {
        author: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true 
        },

        caption: { 
            type: String,
            max: 500,
            required: true
        },

        imgURL: {
            type: String,
            default: ""
        },

        isPrivate: {
            type: Boolean,
            default: false
        },

        likes: [
            { type: Schema.Types.ObjectId, ref: 'User' }
        ],

        loves: [
            { type: Schema.Types.ObjectId, ref: 'User' }
        ],
        hates: [
            { type: Schema.Types.ObjectId, ref: 'User' }
        ],

        comment: [
            { type: Schema.Types.ObjectId, ref: 'Comment' }
        ],

        createdAt: { 
            type: Date, 
            default: Date.now 
        }
    },
);

const Post = mongoose.model("Post", postSchema);
export default Post;