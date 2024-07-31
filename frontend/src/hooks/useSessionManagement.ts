import { useEffect } from 'react';
import { refreshToken } from '../services/authService';

const useSessionManagement = () => {
    useEffect(() => {
        const interval = setInterval(() => {
            const token = localStorage.getItem('token');
            if (token) {
                refreshToken().then(newToken => {
                    localStorage.setItem('token', newToken);
                }).catch(error => {
                    console.error('Failed to refresh token:', error);
                });
            }
        }, 15 * 60 * 1000); // Refresh token every 15 minutes

        return () => clearInterval(interval);
    }, []);
};

export default useSessionManagement;