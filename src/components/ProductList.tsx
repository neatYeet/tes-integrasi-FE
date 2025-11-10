// Komponen untuk menampilkan daftar produk sesuai dengan materi pembelajaran

import { useEffect } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';

function ProductList() {
    const { products, isLoading, error, fetchProducts } = useFetchProducts();

    useEffect(() => {
        fetchProducts();
    }, []);

    // Loading state
    if (isLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
                <div className="flex items-center justify-center space-x-3">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600 text-lg">Memuat produk...</span>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-lg font-medium text-red-800">Terjadi Kesalahan</h3>
                        <p className="mt-1 text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Daftar Produk</h3>

            {products.length === 0 ? (
                <p className="text-gray-500 text-center py-8">Tidak ada produk tersedia</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                            <div className="aspect-w-16 aspect-h-9 bg-gray-100">
                                <img
                                    src={product.gambar}
                                    alt={product.name}
                                    className="w-full h-48 object-cover"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://via.placeholder.com/400x300?text=Product+Image';
                                    }}
                                />
                            </div>
                            <div className="p-4">
                                <h4 className="font-medium text-gray-900 mb-2">{product.name}</h4>
                                <p className="text-lg font-semibold text-green-600 mb-2">
                                    Rp {product.harga}
                                </p>
                                <p className="text-sm text-gray-500">
                                    Dibuat: {new Date(product.createdAt).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ProductList;