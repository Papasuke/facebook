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

const router = express.Router();

router.post('/create', createGroup); // check
router.post ('/member-request', postMemberRequest); // check
router.get('/pending-member-requests', getPendingMemberRequests); // check
router.post('/approve-member-request', approveMemberRequest); // check
router.get('/group-creation-requests', getGroupCreationRequests); //check
router.post('/approve-group-creation-request', approveGroupCreationRequest); // check
router.get('/members', getGroupMembers); // check
router.delete('/remove-member', removeMember); // check
router.post('/post', postGroupPost); // check
router.delete('/post', removeGroupPosts); // check
router.post('/comment', postGroupComment); // check
router.delete('/comment', removeGroupComments); // check
router.get('/posts', getGroupPosts); // check
router.get('/groups', getGroups); // check
module.exports = router;