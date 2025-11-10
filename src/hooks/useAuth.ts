import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const showNotification = (message: string, type: 'success' | 'error') => {
        if (type === 'success') {
            setSuccessMessage(message);
            setError('');
        } else {
            setError(message);
            setSuccessMessage('');
        }
        // Clear notification after 3 seconds
        setTimeout(() => {
            setError('');
            setSuccessMessage('');
        }, 3000);
    };

    const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            });

            const { access_token } = response.data;
            if (access_token) {
                localStorage.setItem('access_token', access_token);
            }

            const message = response.data.message;
            showNotification(message, 'success');
            return { success: true, message };
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            showNotification(message, 'error');
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                username,
                password
            });

            const message = response.data.message;
            showNotification(message, 'success');
            return { success: true, message };
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            showNotification(message, 'error');
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('access_token');
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('access_token');
    };

    const getToken = () => {
        return localStorage.getItem('access_token');
    };

    return {
        isLoading,
        error,
        successMessage,
        login,
        register,
        logout,
        isAuthenticated,
        getToken
    };
};