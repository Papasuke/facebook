import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const ManageAccount = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data } = await axios.get('http://localhost:5000/users'); // This will now only return users with role 'user'
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
                toast.error('Failed to fetch users.');
            }
        };
        fetchUsers();
    }, []);

    const suspendUser = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/suspend/${id}`);
            setUsers(users.map(user => user._id === id ? { ...user, isSuspended: true } : user));
            toast.success('User suspended successfully');
        } catch (error) {
            console.error('Error suspending user:', error);
            toast.error('Failed to suspend user.');
        }
    };

    const resumeUser = async (id) => {
        try {
            await axios.patch(`http://localhost:5000/resume/${id}`);
            setUsers(users.map(user => user._id === id ? { ...user, isSuspended: false } : user));
            toast.success('User resumed successfully');
        } catch (error) {
            console.error('Error resuming user:', error);
            toast.error('Failed to resume user.');
        }
    };

    return (
        <div>
            <h1>Manage User Accounts</h1>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        {user.username} ({user.email}) - {user.isSuspended ? 'Suspended' : 'Active'}
                        <button onClick={() => suspendUser(user._id)} disabled={user.isSuspended}>Suspend</button>
                        <button onClick={() => resumeUser(user._id)} disabled={!user.isSuspended}>Resume</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManageAccount;
