import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ProductList from './components/ProductList';
import TestimonialList from './components/TestimonialList';
import UserProfile from './components/UserProfile';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-2xl font-bold text-gray-900">Web</Link>
              </div>
              <UserProfile />
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={
            <main className="py-8">
              <div className="max-w-6xl mx-auto px-4">
                <header className="text-center mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Showcase Produk
                  </h2>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Platform demonstrasi integrasi frontend dengan backend API menggunakan React dan TypeScript
                  </p>
                </header>

                {/* Produk Section */}
                <section className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Produk Kami
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Menampilkan koleksi produk kami dengan data yang diambil dari API eksternal.
                    Menggunakan konsep fetching data asynchronous dan error handling.
                  </p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-blue-700">
                          <strong>API Endpoint:</strong> http://localhost:5000/produk
                        </p>
                      </div>
                    </div>
                  </div>
                  <ProductList />
                </section>

                {/* Testimoni Section */}
                <section className="bg-white rounded-lg shadow-md p-8">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    Testimoni Pengguna
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Kumpulan testimoni dari pengguna yang telah menggunakan produk kami.
                    Data diambil secara real-time dari API backend.
                  </p>
                  <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-6">
                    <div className="flex">
                      <div className="ml-3">
                        <p className="text-sm text-green-700">
                          <strong>API Endpoint:</strong> http://localhost:5000/testimoni
                        </p>
                      </div>
                    </div>
                  </div>
                  <TestimonialList />
                </section>

                <footer className="mt-16 text-center text-gray-500">
                  <p className="text-sm">
                    Integrasi Frontend
                  </p>
                </footer>
              </div>
            </main>
          } />
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App
