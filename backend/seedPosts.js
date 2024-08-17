require('dotenv').config(); 

const mongoose = require('mongoose');
const Post = require('./server'); 

const posts = [
    { content: "This is the first post!", author: "John Doe" },
    { content: "Learning MongoDB is fun!", author: "Jane Doe" },
    { content: "Today is a great day!", author: "Alice" },
    { content: "Hello World!", author: "Bob" },
    { content: "React with MongoDB is awesome!", author: "Charlie" }
];

async function seedPosts() {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        await Post.insertMany(posts);
        console.log('Posts have been inserted successfully!');
        mongoose.connection.close();
    } catch (err) {
        console.error('Failed to insert posts:', err);
    }
}

seedPosts();
