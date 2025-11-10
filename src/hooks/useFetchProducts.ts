import { useState } from 'react';
import axios from 'axios';
import type { Product } from '../types/product';
import { API_BASE_URL } from '../config/api';

const API_URL = `${API_BASE_URL}/produk`;

export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const getAuthHeaders = () => {
        const token = localStorage.getItem('access_token');
        return token ? { Authorization: `Bearer ${token}` } : {};
    };

    const fetchProducts = async (): Promise<void> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL);
            setProducts(response.data.data || []);
        } catch (error: any) {
            console.error('Failed to fetch products:', error);
            setError("Gagal memuat data produk");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    const createProduct = async (formData: FormData): Promise<Product | null> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/create`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...getAuthHeaders()
                }
            });
            const newProduct = response.data.data;
            setProducts(prev => [...prev, newProduct]);
            return newProduct;
        } catch (error: any) {
            console.error('Failed to create product:', error);
            setError(error.response?.data?.message || "Gagal membuat produk");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProduct = async (formData: FormData): Promise<Product | null> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post(`${API_URL}/update`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    ...getAuthHeaders()
                }
            });
            const updatedProduct = response.data.data;
            setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
            return updatedProduct;
        } catch (error: any) {
            console.error('Failed to update product:', error);
            setError(error.response?.data?.message || "Gagal update produk");
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    const deleteProduct = async (id: number): Promise<boolean> => {
        setIsLoading(true);
        setError('');

        try {
            await axios.delete(`${API_URL}/${id}`, {
                headers: getAuthHeaders()
            });
            setProducts(prev => prev.filter(p => p.id !== id));
            return true;
        } catch (error: any) {
            console.error('Failed to delete product:', error);
            setError(error.response?.data?.message || "Gagal menghapus produk");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        error,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    };
};