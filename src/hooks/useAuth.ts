import { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../config/api';

export const useAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const login = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/login`, {
                username,
                password
            });

            const { access_token } = response.data;
            if (access_token) {
                localStorage.setItem('access_token', access_token);
            }

            return { success: true, message: response.data.message };
        } catch (error: any) {
            const message = error.response?.data?.message || 'Login failed';
            setError(message);
            return { success: false, message };
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (username: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_BASE_URL}/register`, {
                username,
                password
            });

            return { success: true, message: response.data.message };
        } catch (error: any) {
            const message = error.response?.data?.message || 'Registration failed';
            setError(message);
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
        login,
        register,
        logout,
        isAuthenticated,
        getToken
    };
};