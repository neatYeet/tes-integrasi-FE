import { useState } from 'react';
import axios from 'axios';
import type { Product } from '../types/product';

const API_URL = 'https://691155bd7686c0e9c20d13b6.mockapi.io/produk';

export const useFetchProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string>('');

    const fetchProducts = async (): Promise<void> => {
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.get(API_URL);
            setProducts(response.data);
        } catch (error: any) {
            console.error('Failed to fetch products:', error);
            setError("Gagal memuat data produk");
            setProducts([]);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        products,
        isLoading,
        error,
        fetchProducts
    };
};