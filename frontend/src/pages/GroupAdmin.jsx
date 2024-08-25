import React, { useState } from 'react';
import './GroupAdminPage.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome CSS

const Header = () => {
    return (
        <header className="header">
            <h1>Group Name</h1>
        </header>
    );
};

const Sidebar = ({ setActiveSection }) => {
    return (
        <nav className="sidebar">
            <ul>
                <li onClick={() => setActiveSection('members')}>
                    <i className="fas fa-users"></i> Members
                </li>
                <li onClick={() => setActiveSection('posts')}>
                    <i className="fas fa-file-alt"></i> Posts
                </li>
                <li onClick={() => setActiveSection('settings')}>
                    <i className="fas fa-cog"></i> Settings
                </li>
            </ul>
        </nav>
    );
};

const GroupMembers = ({ approveMemberRequest, removeMember }) => {
    return (
        <div className="section">
            <h2>Group Members</h2>
            <button className="btn approve" onClick={approveMemberRequest}>Approve Member Request</button>
            <button className="btn remove" onClick={removeMember}>Remove Member</button>
        </div>
    );
};

const GroupPosts = ({ removePost }) => {
    return (
        <div className="section">
            <h2>Group Posts</h2>
            <button className="btn remove" onClick={removePost}>Remove Post</button>
        </div>
    );
};

const GroupSettings = () => {
    return (
        <div className="section">
            <h2>Group Settings</h2>
        </div>
    );
};

const GroupAdminPage = () => {
    const [activeSection, setActiveSection] = useState('members');

    // Function to approve member requests
    const approveMemberRequest = () => {
        console.log('Member request approved');
    };

    // Function to remove members from the group
    const removeMember = () => {
        console.log('Member removed from group');
    };

    // Function to remove group posts and comments
    const removePost = () => {
        console.log('Post removed');
    };

    const renderSection = () => {
        switch (activeSection) {
            case 'members':
                return <GroupMembers approveMemberRequest={approveMemberRequest} removeMember={removeMember} />;
            case 'posts':
                return <GroupPosts removePost={removePost} />;
            case 'settings':
                return <GroupSettings />;
            default:
                return <GroupMembers approveMemberRequest={approveMemberRequest} removeMember={removeMember} />;
        }
    };

    return (
        <div className="container">
            <div className="group-admin-page">
                <Header />
                <div className="content">
                    <Sidebar setActiveSection={setActiveSection} />
                    <main className="main-content">
                        {renderSection()}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default GroupAdminPage;
