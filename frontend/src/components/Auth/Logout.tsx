import * as React from 'react';
import { useDispatch } from 'react-redux';
import { clearUser } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        // Optional: Clear local storage if used for storing tokens/user info
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');

        // Dispatch the clearUser action to clear user state
        dispatch(clearUser());

        // Navigate to the login page
        navigate('/login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;