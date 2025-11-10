import React, { useEffect, useState } from 'react';
import { useFetchProducts } from '../hooks/useFetchProducts';
import { useFetchTestimonials } from '../hooks/useFetchTestimonials';
import { useAuth } from '../hooks/useAuth';
import type { Product } from '../types/product';

const Admin: React.FC = () => {
    const { isAuthenticated, logout, login, register, isLoading: authLoading, error: authError } = useAuth();
    const {
        products,
        isLoading: productsLoading,
        error: productsError,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    } = useFetchProducts();

    const {
        testimonials,
        isLoading: testimonialsLoading,
        error: testimonialsError,
        fetchTestimonials,
        createTestimonial,
        deleteTestimonial
    } = useFetchTestimonials();

    const [productForm, setProductForm] = useState({
        id: '',
        nama: '',
        deskripsi: '',
        harga: '',
        gambar: null as File | null
    });

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ username: '', password: '' });

    const [testimonialForm, setTestimonialForm] = useState({
        nama: '',
        deskripsi: '',
        rating: 5
    });

    useEffect(() => {
        if (isAuthenticated()) {
            fetchProducts();
            fetchTestimonials();
        }
    }, [isAuthenticated]);

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama', productForm.nama);
        formData.append('deskripsi', productForm.deskripsi);
        formData.append('harga', productForm.harga);
        if (productForm.gambar) {
            formData.append('gambar', productForm.gambar);
        }
        if (productForm.id) {
            formData.append('id', productForm.id);
            await updateProduct(formData);
        } else {
            await createProduct(formData);
        }
        setProductForm({ id: '', nama: '', deskripsi: '', harga: '', gambar: null });
        fetchProducts();
    };

    const handleTestimonialSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createTestimonial(testimonialForm);
        setTestimonialForm({ nama: '', deskripsi: '', rating: 5 });
        fetchTestimonials();
    };

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(loginForm.username, loginForm.password);
        if (result.success) {
            setLoginForm({ username: '', password: '' });
        }
    };

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await register(registerForm.username, registerForm.password);
        if (result.success) {
            setRegisterForm({ username: '', password: '' });
            setIsLoginMode(true);
        }
    };

    const handleEditProduct = (product: Product) => {
        setProductForm({
            id: product.id.toString(),
            nama: product.nama,
            deskripsi: product.deskripsi,
            harga: product.harga.toString(),
            gambar: null
        });
    };

    if (!isAuthenticated()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            {isLoginMode ? 'Sign in to Admin' : 'Create Admin Account'}
                        </h2>
                    </div>
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        {isLoginMode ? (
                            <form className="space-y-6" onSubmit={handleLoginSubmit}>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={loginForm.username}
                                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                    />
                                </div>
                                {authError && (
                                    <div className="text-red-600 text-sm">{authError}</div>
                                )}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={authLoading}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {authLoading ? 'Signing in...' : 'Sign in'}
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsLoginMode(false)}
                                        className="text-indigo-600 hover:text-indigo-500 text-sm"
                                    >
                                        Don't have an account? Register
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form className="space-y-6" onSubmit={handleRegisterSubmit}>
                                <div>
                                    <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700">
                                        Username
                                    </label>
                                    <input
                                        id="reg-username"
                                        name="username"
                                        type="text"
                                        required
                                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={registerForm.username}
                                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <input
                                        id="reg-password"
                                        name="password"
                                        type="password"
                                        required
                                        className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                    />
                                </div>
                                {authError && (
                                    <div className="text-red-600 text-sm">{authError}</div>
                                )}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={authLoading}
                                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                    >
                                        {authLoading ? 'Creating account...' : 'Create account'}
                                    </button>
                                </div>
                                <div className="text-center">
                                    <button
                                        type="button"
                                        onClick={() => setIsLoginMode(true)}
                                        className="text-indigo-600 hover:text-indigo-500 text-sm"
                                    >
                                        Already have an account? Sign in
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>Admin Panel</h1>
                <button onClick={logout}>Logout</button>
            </div>

            {/* Products Section */}
            <section className="admin-section">
                <h2>Products Management</h2>

                <form onSubmit={handleProductSubmit} className="admin-form">
                    <h3>{productForm.id ? 'Edit Product' : 'Add New Product'}</h3>
                    <input
                        type="hidden"
                        value={productForm.id}
                        onChange={(e) => setProductForm({ ...productForm, id: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Product Name"
                        value={productForm.nama}
                        onChange={(e) => setProductForm({ ...productForm, nama: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={productForm.deskripsi}
                        onChange={(e) => setProductForm({ ...productForm, deskripsi: e.target.value })}
                        required
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={productForm.harga}
                        onChange={(e) => setProductForm({ ...productForm, harga: e.target.value })}
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setProductForm({ ...productForm, gambar: e.target.files?.[0] || null })}
                        required={!productForm.id}
                    />
                    <button type="submit" disabled={productsLoading}>
                        {productsLoading ? 'Saving...' : (productForm.id ? 'Update Product' : 'Add Product')}
                    </button>
                </form>

                {productsError && <div className="error">{productsError}</div>}

                <div className="products-list">
                    <h3>Products List</h3>
                    {productsLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.nama}</td>
                                        <td>{product.deskripsi}</td>
                                        <td>{product.harga}</td>
                                        <td><img src={product.gambar} alt={product.nama} style={{ width: '50px' }} /></td>
                                        <td>
                                            <button onClick={() => handleEditProduct(product)}>Edit</button>
                                            <button onClick={() => deleteProduct(product.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="admin-section">
                <h2>Testimonials Management</h2>

                <form onSubmit={handleTestimonialSubmit} className="admin-form">
                    <h3>Add New Testimonial</h3>
                    <input
                        type="text"
                        placeholder="Name"
                        value={testimonialForm.nama}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, nama: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Testimonial"
                        value={testimonialForm.deskripsi}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, deskripsi: e.target.value })}
                        required
                    />
                    <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm({ ...testimonialForm, rating: parseInt(e.target.value) })}
                    >
                        <option value={1}>1 Star</option>
                        <option value={2}>2 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={5}>5 Stars</option>
                    </select>
                    <button type="submit" disabled={testimonialsLoading}>
                        {testimonialsLoading ? 'Adding...' : 'Add Testimonial'}
                    </button>
                </form>

                {testimonialsError && <div className="error">{testimonialsError}</div>}

                <div className="testimonials-list">
                    <h3>Testimonials List</h3>
                    {testimonialsLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <ul>
                            {testimonials.map(testimonial => (
                                <li key={testimonial.id}>
                                    <strong>{testimonial.nama}</strong> - {testimonial.rating} stars
                                    <p>{testimonial.deskripsi}</p>
                                    <button onClick={() => deleteTestimonial(testimonial.id)}>Delete</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Admin;