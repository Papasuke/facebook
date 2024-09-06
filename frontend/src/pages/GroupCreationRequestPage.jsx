import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const GroupCreationRequestPage = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const fetchPendingGroups = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const { data } = await axios.get('http://localhost:5000/groups/pending', {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setGroups(data);
            } catch (error) {
                console.error('Error fetching pending groups:', error);
                toast.error('Failed to fetch group requests.');
            }
        };

        fetchPendingGroups();
    }, []);

    const handleAccept = async (groupId) => {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.put(`http://localhost:5000/groups/${groupId}/accept`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setGroups(groups.filter(group => group._id !== groupId));
            toast.success('Group request accepted successfully!');
        } catch (error) {
            console.error('Error accepting group request:', error);
            toast.error('Failed to accept group request.');
        }
    };

    const handleDecline = async (groupId) => {
        try {
            const authToken = localStorage.getItem('authToken');
            await axios.put(`http://localhost:5000/groups/${groupId}/decline`, null, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            setGroups(groups.filter(group => group._id !== groupId));
            toast.success('Group request declined successfully!');
        } catch (error) {
            console.error('Error declining group request:', error);
            toast.error('Failed to decline group request.');
        }
    };

    return (
        <div>
            <h2>Group Creation Requests</h2>
            {groups.length > 0 ? (
                groups.map(group => (
                    <div key={group._id} className="group-request">
                        <p>Group Name: {group.groupName}</p>
                        <p>Description: {group.description}</p>
                        <button onClick={() => handleAccept(group._id)}>Accept</button>
                        <button onClick={() => handleDecline(group._id)}>Decline</button>
                    </div>
                ))
            ) : (
                <p>No pending group requests.</p>
            )}
        </div>
    );
};

export default GroupCreationRequestPage;
