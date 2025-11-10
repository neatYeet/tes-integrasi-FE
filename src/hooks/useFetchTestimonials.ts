import { useState } from 'react';
import axios from 'axios';
import type { Testimonial } from '../types/testimonial';

const API_URL = 'https://691155bd7686c0e9c20d13b6.mockapi.io/testimoni';

export const useFetchTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const fetchTestimonials = async (): Promise<void> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL);
            setTestimonials(response.data);
        } catch (error: any) {
            console.error('Failed to fetch testimonials:', error);
            setError("Gagal memuat data testimoni");
            setTestimonials([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        testimonials,
        isLoading,
        error,
        fetchTestimonials
    };
};