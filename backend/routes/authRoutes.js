const express = require("express");

const cors = require('cors');
const router = express.Router();
const { test, registerUser } = require('../controllers/authController');



router.use(
    cors({
        credentials: true,
        origin:'http://localhost:5173'
    })
)
router.get('/', test)
router.post('/register', registerUser)

module.exports = router;
