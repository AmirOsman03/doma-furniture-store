import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ cartCount }) => {
    const navigate = useNavigate();

    return (
        <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
            <div className="max-w-[1600px] mx-auto px-6 lg:px-20 py-6 flex justify-between items-center">

                {/* Лого */}
                <Link to="/" className="group">
                    <h1 className="text-3xl font-black tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors">
                        DOMA<span className="text-blue-600">.</span>MK
                    </h1>
                </Link>

                {/* Десен дел: Кошничка */}
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => navigate('/cart')}
                        className="relative p-4 bg-gray-900 text-white rounded-2xl hover:bg-black transition-all shadow-xl hover:-translate-y-1 active:scale-95 group"
                    >
                        <svg className="w-7 h-7 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>

                        {/* Бројка на производи (Badge) */}
                        {cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-[11px] font-black w-7 h-7 flex items-center justify-center rounded-full border-4 border-white shadow-lg animate-bounce">
                                {cartCount}
                            </span>
                        )}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;