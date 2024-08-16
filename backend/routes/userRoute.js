const { Router } = require('express');
const router = Router();
const { validateUser, createUser, updateProfile } = require('../controllers/userController');


router.post('/register', validateUser, createUser);
router.post('/updateProfile', updateProfile);

module.exports = router;