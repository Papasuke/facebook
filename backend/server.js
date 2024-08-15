const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB', err));

//HTTP LOG
app.use(morgan('combined'))

app.get('/homepage', (reg, res)=> res.send(`
      <h1 style ='color:red;'>Hello fb </h1>
  `))

// Run server
app.listen(PORT, () => console.log(`Server is running on port http://localhost:${PORT}/homepage`));