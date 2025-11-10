import { useState } from 'react';
import axios from 'axios';
import type { Testimonial } from '../types/testimonial';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/testimoni`;

export const useFetchTestimonials = () => {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const getAuthHeaders = () => {
        const token = localStorage.getItem('access_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchTestimonials = async (): Promise<void> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL);
            setTestimonials(response.data.data || []);
        } catch (error: any) {
            console.error('Failed to fetch testimonials:', error);
            setError("Gagal memuat data testimoni");
            setTestimonials([]);
        } finally {
            setIsLoading(false);
        }
    };

    const createTestimonial = async (data: { nama: string; deskripsi: string; rating: number }): Promise<Testimonial | null> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/create`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const newTestimonial = response.data.data;
            setTestimonials(prev => [newTestimonial, ...prev]);
            return newTestimonial;
        } catch (error: any) {
            console.error('Failed to create testimonial:', error);
            setError(error.response?.data?.message || "Gagal membuat testimoni");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteTestimonial = async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: getAuthHeaders()
            });
            setTestimonials(prev => prev.filter(t => t.id !== id));
            return true;
        } catch (error: any) {
            console.error('Failed to delete testimonial:', error);
            setError(error.response?.data?.message || "Gagal menghapus testimoni");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        testimonials,
        isLoading,
        error,
        fetchTestimonials,
        createTestimonial,
        deleteTestimonial
    };
};