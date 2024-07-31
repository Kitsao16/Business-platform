import * as React from 'react';
import { getAllUsers, deleteUser, updateUser, deleteBusiness } from '../../services/apiService';
import { CircularProgress } from '@mui/material';
import './AdminPage.css';
import { useEffect, useState } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
}

const AdminPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [newUsername, setNewUsername] = useState<{ [key: string]: string }>({});
    const [updatingUser, setUpdatingUser] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const usersPerPage = 10;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError('');
            try {
                const fetchedUsers = await getAllUsers();
                setUsers(fetchedUsers);
            } catch (error) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers().catch(err => {
            console.error('Error fetching users:', err);
            setError('Failed to fetch users');
        });
    }, []);

    const handleDeleteUser = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this user?');
        if (!confirmDelete) return;

        setLoading(true);
        setError('');
        try {
            await deleteUser(id);
            setUsers(users.filter(user => user.id !== id));
        } catch (error) {
            setError('Failed to delete user');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBusiness = async (id: string) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this business?');
        if (!confirmDelete) return;

        setLoading(true);
        setError('');
        try {
            await deleteBusiness(id);
            // Update state or refetch businesses after deletion
        } catch (error) {
            setError('Failed to delete business');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string) => {
        if (!newUsername[id]) {
            setError('Username cannot be empty');
            return;
        }
        setUpdatingUser(id);
        setError('');
        try {
            const updatedUser = await updateUser(id, { name: newUsername[id], email: users.find(user => user.id === id)?.email || '' });
            setUsers(users.map(user => (user.id === id ? updatedUser : user)));
            setNewUsername({ ...newUsername, [id]: '' });
        } catch (error) {
            setError('Failed to update user');
        } finally {
            setUpdatingUser(null);
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

    return (
        <div className="admin-page">
            <h2>Admin Page</h2>
            {error && <p className="error-message">{error}</p>}
            <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />
            {loading ? (
                <div className="loading">
                    <CircularProgress />
                </div>
            ) : (
                <div>
                    <ul>
                        {currentUsers
                            .filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
                            .map(user => (
                                <li key={user.id}>
                                    <span>{user.name}</span>
                                    <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                    <button onClick={() => handleDeleteBusiness(user.id)}>Delete Business</button>
                                    <button onClick={() => setUpdatingUser(user.id)}>Edit</button>
                                    {updatingUser === user.id && (
                                        <div className="edit-form">
                                            <input
                                                type="text"
                                                value={newUsername[user.id] || ''}
                                                onChange={(e) => setNewUsername({ ...newUsername, [user.id]: e.target.value })}
                                            />
                                            <button onClick={() => handleUpdate(user.id)}>Save</button>
                                            <button onClick={() => setUpdatingUser(null)}>Cancel</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                    </ul>
                    <div className="pagination">
                        <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>Previous</button>
                        <span>{currentPage}</span>
                        <button onClick={() => setCurrentPage(prev => (indexOfLastUser < users.length ? prev + 1 : prev))}>Next</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPage;
