const express = require('express');
const { registerUser, loginUser, suspendUser, resumeUser, getUsers } = require('../controllers/authController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.patch('/suspend/:id', suspendUser);
router.patch('/resume/:id', resumeUser);
router.get('/users', getUsers);  // This line is crucial

module.exports = router;
