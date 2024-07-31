// frontend/src/services/authService.ts
import apiService from './apiService';
import { NavigateFunction } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;

export const login = async (email: string, password: string, navigate: NavigateFunction): Promise<any> => {
    try {
        const response = await apiService.post('/api/auth/login', { email, password });
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('refreshToken', response.data.refreshToken);
        navigate('/dashboard');
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        } else {
            console.error('Login error:', error instanceof Error ? error.message : 'An unknown error occurred');
        }
        throw new Error('Login failed. Please check your credentials.');
    }
};

export const register = async (name: string, email: string, password: string, navigate: NavigateFunction): Promise<any> => {
    try {
        const response = await apiService.post('/api/auth/register', { name, email, password });
        if (response.status === 201) {
            navigate('/login');
        }
        return response.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            console.error('Registration error:', error.response ? error.response.data : error.message);
            throw new Error(error.response?.data?.message || 'Registration failed. Please try again.');
        } else {
            console.error('Registration error:', error instanceof Error ? error.message : 'An unknown error occurred');
            throw new Error('Registration failed. Please try again.');
        }
    }
};

export const refreshToken = async (): Promise<string> => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/refresh-token`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('refreshToken')}`
            }
        });
        return response.data.token;
    } catch (error) {
        console.error('Refresh token error:', error);
        throw new Error('Unable to refresh token');
    }
};