import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { refreshToken } from './authService';

const API_URL = process.env.REACT_APP_API_URL as string;

const apiService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiService.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

apiService.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await refreshToken();
                localStorage.setItem('token', newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return apiService(originalRequest);
            } catch (err) {
                console.error('Token refresh failed:', err);
                window.location.href = '/login';
            }
        } else if (error.response && error.response.status === 403) {
            console.error('Forbidden:', error.response.data);
            window.location.href = '/forbidden';
        }
        return Promise.reject(error);
    }
);

export const getAllUsers = async (): Promise<any> => {
    try {
        const response = await apiService.get('/api/users');
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
};

// Add this function to apiService.ts
export const getUser = async (id: string): Promise<any> => {
    try {
        const response = await apiService.get(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch user');
    }
};

export const deleteUser = async (id: string): Promise<any> => {
    try {
        const response = await apiService.delete(`/api/users/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete user');
    }
};

export const updateUser = async (id: string, data: { name: string; email: string }) => {
    try {
        const response = await apiService.put(`/api/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error('Failed to update user');
    }
};

export const getAllBusinesses = async () => {
    const response = await apiService.get('/api/businesses');
    return response.data;
};

export const getBusinessById = async (id: string) => {
    const response = await apiService.get(`/api/businesses/${id}`);
    return response.data;
};

export const createBusiness = async (business: any) => {
    const response = await apiService.post('/api/businesses', business);
    return response.data;
};

export const updateBusiness = async (id: string, business: any) => {
    const response = await apiService.put(`/api/businesses/${id}`, business);
    return response.data;
};

export const deleteBusiness = async (id: string) => {
    const response = await apiService.delete(`/api/businesses/${id}`);
    return response.data;
};
export default apiService;
