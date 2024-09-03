import React, { useState } from "react";
import axios from 'axios';
import './CreateGroup.css';

const CreateGroup = () => {
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('authToken');

            const response = await axios.post('/groups/create', {
                groupName,
                description: groupDescription,
            }, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });

            setMessage(response.data.message);
            setGroupName('');
            setGroupDescription('');
        } catch (error) {
            console.error('Failed to create group', error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.message || 'Error creating group, please try again');
            } else {
                setMessage('Error creating group, please try again');
            }
        }
    };

    return (
        <div className="create-group-container">
            <div className="create-group-card">
                <h2>Create a Group</h2>
                <form onSubmit={handleSubmit} className="create-group-form">
                    <div className="form-group">
                        <label htmlFor="groupName">Group Name:</label>
                        <input
                            type="text"
                            id="groupName"
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="groupDescription">Group Description:</label>
                        <textarea
                            id="groupDescription"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            required
                            className="textarea-field"
                        />
                    </div>
                    <button type="submit" className="submit-button">Request to Create Group</button>
                </form>
                {message && <p className="response-message">{message}</p>}
            </div>
        </div>
    );
};

export default CreateGroup;
