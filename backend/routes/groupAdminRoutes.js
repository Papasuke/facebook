const express = require('express');
const {
    createGroup,
    postMemberRequest,
    getPendingMemberRequests,
    approveMemberRequest,
    getGroupCreationRequests,
    approveGroupCreationRequest,
    getGroupMembers,
    removeMember,
    postGroupPost,
    removeGroupPosts,
    postGroupComment,
    removeGroupComments,
    getGroupPosts,
    getGroups
    
} = require('../controllers/groupAdminController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createGroup); //  (conflit with groupRoutes)
router.post ('/member-request', authMiddleware, postMemberRequest); // 
router.get('/pending-member-requests/:groupId', authMiddleware, getPendingMemberRequests); // 
router.post('/approve-member-request', authMiddleware, approveMemberRequest); // 
router.get('/group-creation-requests', authMiddleware, getGroupCreationRequests); // (conflict with groupRoutes)
router.post('/approve-group-creation-request', authMiddleware, approveGroupCreationRequest); //  (conflict with groupRoutes)
router.get('/members/:groupId', authMiddleware, getGroupMembers); // 
router.post('/remove-member', authMiddleware, removeMember); // 
router.post('/post', authMiddleware, postGroupPost); // (maybe conflict with postRoutes)
router.get('/posts/:groupId', authMiddleware, getGroupPosts); // (maybe conflict with postRoutes)
router.post('/remove-post', authMiddleware, removeGroupPosts); // 
router.post('/comment', authMiddleware, postGroupComment); // (maybe conflict with postRoutes)
router.post('/post-comment', authMiddleware, removeGroupComments); // 
router.get('/groups', authMiddleware, getGroups); // 
module.exports = router;