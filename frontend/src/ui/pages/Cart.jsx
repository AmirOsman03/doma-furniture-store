import React from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
    const navigate = useNavigate();

    // Пресметка на вкупна цена
    const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-10">
                <span className="text-9xl mb-8 opacity-20">🛒</span>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 uppercase tracking-tighter">Кошничката е празна</h1>
                <p className="text-xl text-gray-400 mb-10 font-medium text-center">Изгледа дека сè уште немате додадено ништо во вашата кошничка.</p>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all shadow-2xl shadow-blue-100 uppercase tracking-widest active:scale-95"
                >
                    Врати се во продавница
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full py-20 px-6 lg:px-20">
            <div className="w-full max-w-[1600px] mx-auto">
                <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-16 uppercase tracking-tighter">Кошничка</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                    {/* Листа на производи - Лева страна */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 group transition-all hover:shadow-xl">

                                {/* Слика на производ */}
                                <div className="w-32 h-32 rounded-3xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-50">
                                    <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                </div>

                                {/* Информации за производ */}
                                <div className="flex-1 text-center md:text-left">
                                    <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{item.name}</h3>
                                    <p className="text-blue-600 font-bold tracking-widest text-xs mt-1 uppercase">{item.category}</p>
                                </div>

                                {/* Контрола на количина */}
                                <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-2xl border border-gray-100">
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-gray-200 rounded-xl transition-all active:scale-90"
                                    >-</button>
                                    <span className="font-black text-xl w-8 text-center text-gray-900">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-10 h-10 flex items-center justify-center font-black text-xl hover:bg-gray-200 rounded-xl transition-all active:scale-90"
                                    >+</button>
                                </div>

                                {/* Цена и бришење */}
                                <div className="text-right flex flex-col items-center md:items-end">
                                    <p className="text-2xl font-black text-gray-900">
                                        {(item.price * item.quantity).toLocaleString()} <span className="text-sm font-normal opacity-50 uppercase">ден.</span>
                                    </p>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 text-xs font-black uppercase tracking-[0.2em] mt-3 hover:text-red-700 transition-colors flex items-center gap-1 group/btn"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Избриши
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Сума и Наплата - Десна страна */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-900 rounded-[3rem] p-10 text-white sticky top-28 shadow-2xl shadow-blue-100/20">
                            <h2 className="text-2xl font-black mb-8 uppercase tracking-widest border-b border-gray-800 pb-6 text-blue-500">
                                Пресметка
                            </h2>

                            <div className="space-y-5 mb-10">
                                <div className="flex justify-between text-gray-400 font-bold uppercase text-xs tracking-widest">
                                    <span>Тотал</span>
                                    <span className="text-white">{total.toLocaleString()} ден.</span>
                                </div>
                                <div className="flex justify-between text-gray-400 font-bold uppercase text-xs tracking-widest">
                                    <span>Достава</span>
                                    <span className="text-green-400 tracking-[0.2em] font-black underline decoration-2 underline-offset-4">БЕСПЛАТНА</span>
                                </div>
                                <div className="pt-8 border-t border-gray-800 flex justify-between items-center">
                                    <span className="text-xl font-black uppercase tracking-tighter">Вкупно</span>
                                    <div className="text-right">
                                        <span className="text-4xl font-black text-blue-500 tracking-tighter">{total.toLocaleString()}</span>
                                        <span className="text-xs ml-1 font-bold text-blue-500 uppercase">ден.</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => navigate('/checkout')}
                                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black text-xl py-6 rounded-3xl transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-[0.15em]"
                            >
                                Оди на наплата
                            </button>

                            <p className="text-[10px] text-gray-500 mt-6 text-center font-bold uppercase tracking-widest leading-relaxed">
                                Безбедно плаќање со SSL заштита
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Cart;