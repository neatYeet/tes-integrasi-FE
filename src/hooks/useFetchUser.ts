import { useState } from 'react';
import axios from 'axios';
import type { User } from '../types/user';

const API_URL = 'https://jsonplaceholder.typicode.com/users/1';

export const useFetchUser = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const fetchUser = async (): Promise<void> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL);
            setUser({
                id: response.data.id,
                username: response.data.username,
                email: response.data.email
            });
        } catch (error: any) {
            console.warn('Failed to fetch from API, using dummy data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        error,
        fetchUser
    };
};