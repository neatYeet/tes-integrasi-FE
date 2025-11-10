// Komponen UserProfile sesuai dengan Bab 1: Menghubungkan Komponen dengan Data API

import { useEffect, useState } from 'react';
import { useFetchUser } from '../hooks/useFetchUser';

function UserProfile() {
    const { user, isLoading, error, fetchUser } = useFetchUser();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // useEffect untuk fetching data saat komponen di-mount
    useEffect(() => {
        fetchUser();
    }, []);

    // Tampilkan pesan loading
    if (isLoading) {
        return (
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="text-gray-600">Memuat data pengguna...</span>
                </div>
            </div>
        );
    }

    // Tampilkan pesan error jika ada
    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800">Terjadi Kesalahan</h3>
                        <p className="mt-1 text-sm text-red-700">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Tampilkan jika data tidak ada (meskipun sudah ditangani di error handling)
    if (!user) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-800">Data Tidak Ditemukan</h3>
                        <p className="mt-1 text-sm text-yellow-700">Gagal memuat data pengguna.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Tampilkan data dinamis - compact view with dropdown
    return (
        <div className="relative">
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow"
            >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-gray-900">{user.username}</span>
                <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Profil Pengguna</h3>
                        <div className="space-y-3">
                            <div className="flex items-center">
                                <span className="w-20 text-sm font-medium text-gray-600">Username:</span>
                                <span className="text-gray-900">{user.username}</span>
                            </div>
                            <div className="flex items-center">
                                <span className="w-20 text-sm font-medium text-gray-600">Email:</span>
                                <span className="text-gray-900">{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserProfile;