// Komponen UserProfile dengan authentication support

import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

function UserProfile() {
    const { isAuthenticated, logout, login, register, isLoading: authLoading, error: authError } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [loginForm, setLoginForm] = useState({ username: '', password: '' });
    const [registerForm, setRegisterForm] = useState({ username: '', password: '' });

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await login(loginForm.username, loginForm.password);
        if (result.success) {
            setLoginForm({ username: '', password: '' });
            setIsDropdownOpen(false);
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

    const handleLogout = () => {
        logout();
        setIsDropdownOpen(false);
    };

    // Tampilkan pesan loading untuk auth
    if (authLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-xs text-gray-600">Loading...</span>
                </div>
            </div>
        );
    }

    // Tampilkan button untuk login/register jika belum authenticated
    if (!isAuthenticated()) {
        return (
            <div className="relative">
                <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow"
                >
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-900">Login</span>
                    <svg
                        className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                        <div className="p-4">
                            <div className="flex space-x-2 mb-4">
                                <button
                                    onClick={() => setIsLoginMode(true)}
                                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${isLoginMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setIsLoginMode(false)}
                                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md ${!isLoginMode ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    Register
                                </button>
                            </div>

                            {isLoginMode ? (
                                <form onSubmit={handleLoginSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={loginForm.username}
                                        onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={loginForm.password}
                                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                    {authError && <div className="text-red-600 text-sm">{authError}</div>}
                                    <button
                                        type="submit"
                                        disabled={authLoading}
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {authLoading ? 'Signing in...' : 'Sign In'}
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleRegisterSubmit} className="space-y-3">
                                    <input
                                        type="text"
                                        placeholder="Username"
                                        value={registerForm.username}
                                        onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={registerForm.password}
                                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                        required
                                    />
                                    {authError && <div className="text-red-600 text-sm">{authError}</div>}
                                    <button
                                        type="submit"
                                        disabled={authLoading}
                                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {authLoading ? 'Creating...' : 'Create Account'}
                                    </button>
                                </form>
                            )}

                            <div className="mt-4 pt-4 border-t border-gray-200">
                                <Link
                                    to="/admin"
                                    onClick={() => setIsDropdownOpen(false)}
                                    className="text-indigo-600 hover:text-indigo-500 text-sm"
                                >
                                    Go to Admin Panel →
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    // Tampilkan profile untuk user yang sudah login
    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-xs">
                    U
                </div>
                <span className="text-sm font-medium text-gray-900">Profile</span>
                <svg
                    className={`w-3 h-3 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-3">
                        <div className="space-y-2">
                            <Link
                                to="/admin"
                                onClick={() => setIsDropdownOpen(false)}
                                className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Admin Panel
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;