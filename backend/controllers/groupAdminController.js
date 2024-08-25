const Group = require('../models/Group');
const Post = require('../models/Post');
const Comment = require('../models/Comment');
const User = require('../models/User');

// Create a new group
// {
//     "name": "Group 1",
//     "visibility": "private",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.createGroup = async (req, res) => {
    const { name, visibility, userAdminId } = req.body;

    console.log('Creating group:', req.body);
    // Default group visibility is private, status is pending for the app admin to approve
    try {
        const group = new Group({ name, visibility, admin: userAdminId });
        await group.save();
        res.status(201).json({ message: 'Group created successfully' });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// POST a new member request
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userMemberId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.postMemberRequest = async (req, res) => {
    const { groupId, userMemberId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if group is active
        if (group.status !== 'approved') {
            return res.status(400).json({ error: 'Group is not active' });
        }

        // Check if user has already sent a request
        if (!group.pendingMembers.includes(userMemberId)) {
            group.pendingMembers.push(userMemberId);
            await group.save();
            return res.status(200).json({ message: 'Member request sent'});
        } else {
            return res.status(400).json({ error: 'User has already sent a request' });
        }
    } catch (error) {
        console.error('Error sending member request:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// GET pending member requests
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.getPendingMemberRequests = async (req, res) => {
    const { groupId, userAdminId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is the group admin
        if (group.admin.toString() !== userAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        const pendingMembers = await User.find({ _id: { $in: group.pendingMembers } });
        res.status(200).json(pendingMembers);
    } catch (error) {
        console.error('Error fetching pending member requests:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Approve or decline member requests
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "userMemberId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "approveMemberRequest": true // Boolean value to approve or decline member request
// }
exports.approveMemberRequest = async (req, res) => {
    const { groupId, userAdminId, userMemberId, approveMemberRequest } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is the group admin
        if (group.admin.toString() !== userAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        if (!approveMemberRequest) {
            group.pendingMembers = group.pendingMembers.filter(member => member.toString() !== userMemberId);
            await group.save();
            return res.status(200).json({ message: 'Member request declined' });
        }
        
        if (!group.memberList.includes(userMemberId)) {
            group.memberList.push(userMemberId);
            group.pendingMembers = group.pendingMembers.filter(member => member.toString() !== userMemberId);
            await group.save();
            return res.status(200).json({ message: 'Member request approved' });
        } else {
            return res.status(400).json({ error: 'User is already a member' });
        }
    } catch (error) {
        console.error('Error approving member request:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// GET list of group creation requests
// {
//     "adminId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.getGroupCreationRequests = async (req, res) => {
    const {adminId} = req.body;

    try {
        // const admin = await Admin.findById(adminId);
        // if (!admin) {
        //     return res.status(404).json({ error: 'Admin not found (unauthorize access)' });
        // }

        const groups = await Group.find({ status: 'pending' });
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching group creation requests:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Approve or decline group creation requests
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "adminId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "approveGroupCreationRequest": true // Boolean value to approve or decline group creation request
// }
exports.approveGroupCreationRequest = async (req, res) => {
    const { groupId, adminId, approveGroupCreationRequest} = req.body;
    console.log('Approving group creation request:', req.body);

    try {
        // const admin = await Admin.findById(adminId);
        // if (!admin) {
        //     return res.status(404).json({ error: 'Admin not found (unauthorize access)' });
        // }

        
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        if (!approveGroupCreationRequest) {
            group.status = 'failed';
            await group.save();
            return res.status(200).json({ message: 'Group creation request declined' });
        }

        if (group.status === 'approved') {
            return res.status(400).json({ error: 'Group is already active' });
        }
        
        group.status = 'approved';
        await group.save();
        res.status(200).json({ message: 'Group creation request approved' });
    } catch (error) {
        console.error('Error approving group creation request:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Get group members 
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userId": "60b9b3b3b3b3b3b3b3b3b3b3" // User ID of the user making the request can be admin or member
// }
exports.getGroupMembers = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if group is private and user is not a member
        if (group.visibility === 'private' && !group.memberList.includes(userId)) {
            // Check if user is the group admin
            if (group.admin.toString() !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
        }

        const members = await User.find({ _id: { $in: group.memberList } });
        res.status(200).json(members);
    } catch (error) {
        console.error('Error fetching group members:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Remove members from group
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3",
//     "userMemberId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.removeMember = async (req, res) => {
    const { groupId, userAdminId, userMemberId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is the group admin
        if (group.admin.toString() !== userAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        group.memberList = group.memberList.filter(member => member.toString() !== userMemberId);
        await group.save();
        res.status(200).json({ message: 'Member removed from group' });
    } catch (error) {
        console.error('Error removing member:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// POST a new post to a group
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAuthorId": "60b9b3b3b3b3b3b3b3b3b3", // User author can be admin or member
//     "content": "Post content"
// }
exports.postGroupPost = async (req, res) => {
    const { groupId, userAuthorId, content } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is a member or admin of the group
        if (!group.memberList.includes(userAuthorId)) {
            if (group.admin.toString() !== userAuthorId) {
                return res.status(403).json({ error: 'Not member of the group' });
            }
        }

        const post = new Post({ content, author: userAuthorId, group: groupId });
        await post.save();
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        console.error('Error posting group post:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Remove group posts
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "postId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.removeGroupPosts = async (req, res) => {
    const { groupId, userAdminId, postId} = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is the group admin
        if (group.admin.toString() !== userAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Delete the post by its ID and group ID
        const post = await Post.findOneAndDelete({ _id: postId, group: groupId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Optionally, delete comments associated with the post
        // await Comment.deleteMany({ post: postId });

        res.status(200).json({ message: 'Group post removed' });
    } catch (error) {
        console.error('Error removing group post:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// POST a new comment to a group post
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userAuthorId": "60b9b3b3b3b3b3b3b3b3b3", // User author can be admin or member
//     "postId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "content": "Comment content"
// }
exports.postGroupComment = async (req, res) => {
    const { groupId, userAuthorId, postId, content } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is a member or admin of the group
        if (!group.memberList.includes(userAuthorId)) {
            if (group.admin.toString() !== userAuthorId) {
                return res.status(403).json({ error: 'Not member of the group' });
            }
        }

        // Check if post exists and belong to the group
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }
        console.log('Post:', post);
        if (post.group.toString() !== groupId) {
            return res.status(403).json({ error: 'Post does not belong to the group' });
        }

        const comment = new Comment({ content, author: userAuthorId, post: postId, group: groupId });
        await comment.save();

        // Add the commentId to the list of comments in the post
        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({ message: 'Comment created successfully' });
    } catch (error) {
        console.error('Error posting group comment:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// Remove group comments
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "commentId": "60b9b3b3b3b3b3b3b3b3b3b3",
//     "userAdminId": "60b9b3b3b3b3b3b3b3b3b3b3"
// }
exports.removeGroupComments = async (req, res) => {
    const { groupId, commentId, userAdminId} = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if user is the group admin
        if (group.admin.toString() !== userAdminId) {
            return res.status(403).json({ error: 'Unauthorized access' });
        }

        // Delete the comment by its ID and group ID
        const comment = await Comment.findOneAndDelete({ _id: commentId, group: groupId });
        if (!comment) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        // Remove the commentId from the post's comments list
        await Post.updateOne(
            { _id: comment.post },
            { $pull: { comments: commentId } }
        );

        res.status(200).json({ message: 'Group comment removed' });
    } catch (error) {
        console.error('Error removing group comment:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// GET posts and comment from a group
// {
//     "groupId": "66c3851ba370585cd76f7277",
//     "userId": "60b9b3b3b3b3b3b3b3b3b3b3" // User ID of the user making the request can be admin or member
// }
exports.getGroupPosts = async (req, res) => {
    const { groupId, userId } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).json({ error: 'Group not found' });
        }

        // Check if group is private and user is not a member
        if (group.visibility === 'private' && !group.memberList.includes(userId)) {
            // Check if user is the group admin
            if (group.admin.toString() !== userId) {
                return res.status(403).json({ error: 'Unauthorized access' });
            }
        }

        const posts = await Post.find({ group: groupId });
        const postIds = posts.map(post => post._id);

        const comments = await Comment.find({ post: { $in: postIds } });
        res.status(200).json({ posts, comments });
    } catch (error) {
        console.error('Error fetching group posts:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

// GET list of groups
exports.getGroups = async (req, res) => {
    try {
        const groups = await Group.find();
        res.status(200).json(groups);
    } catch (error) {
        console.error('Error fetching groups:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};
