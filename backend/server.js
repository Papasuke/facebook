const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo'); // Optional: for storing sessions in MongoDB
require('dotenv').config();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
// const groupRoutes = require('./routes/groupRoutes');
const groupAdminRoutes = require('./routes/groupAdminRoutes');

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Set secure: true if using HTTPS
    store: MongoStore.create({ mongoUrl: mongoURI }) // Optional: Store sessions in MongoDB
}));

// Middleware
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Routes
app.use('/comments', commentRoutes);
app.use('/', authRoutes);
app.use('/posts', postRoutes);
app.use('/groups', groupAdminRoutes);

// Start server
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

