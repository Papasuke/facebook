const express = require('express');
const { addComment, getComments } = require('../controllers/commentController');

const router = express.Router();

router.post('/add', addComment);
router.get('/:postId/comments', getComments);

module.exports = router;
