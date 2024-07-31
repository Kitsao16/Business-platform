// src/components/Auth/UserProfile.tsx
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { updateUserProfile } from '../../store/userSlice';
import { updateUser, getUser } from '../../services/apiService';
import './UserProfile.css';

const UserProfile: React.FC = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const [name, setName] = React.useState<string>(user?.name || '');
    const [email, setEmail] = React.useState<string>(user?.email || '');
    const [loading, setLoading] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>('');
    const [success, setSuccess] = React.useState<boolean>(false);

    React.useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
        } else {
            (async () => {
                try {
                    const userData = await getUser(user!.id.toString());
                    dispatch(updateUserProfile(userData));
                    setName(userData.name);
                    setEmail(userData.email);
                } catch (error) {
                    setError('Failed to fetch user data');
                }
            })();
        }
    }, [user, dispatch]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const updatedUser = await updateUser(user!.id.toString(), { name, email });
            dispatch(updateUserProfile(updatedUser));
            setSuccess(true);
        } catch (error) {
            setError('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="user-profile">
            <h2>User Profile</h2>
            {error && <p className="error-message">{error}</p>}
            {success && <p className="success-message">Profile updated successfully!</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                </button>
            </form>
        </div>
    );
};

export default UserProfile;
