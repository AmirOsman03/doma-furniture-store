import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ cartItems }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Пресметка на вкупна сума од сите производи во кошничката
    const cartTotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleCheckout = (e) => {
        e.preventDefault();

        // 1. Постави го лоадинг на true за да се појави кругот што се врти
        setLoading(true);

        const firstProductId = cartItems.length > 0 ? cartItems[0].id : null;

        // 2. Симулирај чекање (процесирање)
        setTimeout(() => {
            setLoading(false); // Исклучи лоадер (опционално, бидејќи веднаш се префрла страна)

            console.log("Плаќањето е успешно, префрлам на Success...");

            // 3. САМО ТУКА треба да биде navigate, внатре во тајмерот
            navigate('/success', {
                state: { productId: firstProductId }
            });
        }, 2500); // Ќе почека точно 2.5 секунди
    };

    // Доколку кошничката е празна
    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white p-4">
                <div className="text-center">
                    <div className="text-8xl mb-6">🛒</div>
                    <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">Кошничката е празна</h2>
                    <button
                        onClick={() => navigate('/')}
                        className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-black transition-all"
                    >
                        НАЗАД КОН ПРОДАВНИЦАТА
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 w-full flex flex-col items-center py-12 px-0 overflow-x-hidden">
            <div className="w-full px-6 lg:px-20 max-w-[1600px]">

                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-12 uppercase tracking-tighter">
                    Плаќање
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                    {/* ЛЕВА СТРАНА: Податоци за достава */}
                    <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-black mb-8 text-gray-900 uppercase">Податоци за достава</h2>
                        <form onSubmit={handleCheckout} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 ml-2">Име</label>
                                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase text-gray-400 ml-2">Презиме</label>
                                    <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold outline-none transition-all" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 ml-2">Е-пошта</label>
                                <input type="email" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 ml-2">Адреса за испорака</label>
                                <input type="text" required className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-blue-500 text-gray-900 font-bold outline-none transition-all" />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-2xl py-7 rounded-[2rem] mt-10 transition-all shadow-2xl shadow-blue-100 flex justify-center items-center active:scale-[0.98]"
                            >
                                {loading ? (
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-xl">СЕ ПРОЦЕСИРА...</span>
                                    </div>
                                ) : (
                                    `ПОТВРДИ ПЛАЌАЊЕ: ${cartTotal.toLocaleString()} ДЕН.`
                                )}
                            </button>
                        </form>
                    </div>

                    {/* ДЕСНА СТРАНА: Преглед на нарачката */}
                    <div className="bg-gray-900 rounded-[3rem] p-8 md:p-12 text-white shadow-2xl lg:sticky lg:top-10">
                        <h2 className="text-2xl font-black mb-10 border-b border-gray-800 pb-6 uppercase tracking-widest">
                            Вашата кошничка ({cartItems.length})
                        </h2>

                        {/* Листа со скрол */}
                        <div className="max-h-[350px] overflow-y-auto mb-10 space-y-8 pr-4 custom-scrollbar">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex items-center gap-6 group">
                                    <div className="w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 bg-gray-800 border border-gray-700">
                                        <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-black text-xl leading-tight">{item.name}</h3>
                                        <p className="text-gray-500 text-sm mt-1 uppercase tracking-tighter">Количина: {item.quantity}</p>
                                    </div>
                                    <div className="text-right font-black text-blue-400 text-xl">
                                        {(item.price * item.quantity).toLocaleString()} <span className="text-xs">ден.</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Сумирање */}
                        <div className="space-y-4 border-t border-gray-800 pt-10">
                            <div className="flex justify-between text-gray-500 font-black uppercase text-xs tracking-[0.2em]">
                                <span>Тотал</span>
                                <span className="text-white">{cartTotal.toLocaleString()} ден.</span>
                            </div>
                            <div className="flex justify-between text-gray-500 font-black uppercase text-xs tracking-[0.2em]">
                                <span>Достава</span>
                                <span className="text-green-500">Бесплатна</span>
                            </div>
                            <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-800">
                                <span className="text-3xl font-black uppercase tracking-tighter">Вкупно</span>
                                <span className="text-5xl font-black text-blue-500 tracking-tighter">
                                    {cartTotal.toLocaleString()}
                                    <span className="text-base font-normal ml-2 opacity-50">ден.</span>
                                </span>
                            </div>
                        </div>

                        {/* Безбедносна порака */}
                        <div className="mt-12 flex items-start gap-5 p-6 bg-gray-800/30 rounded-[2rem] border border-gray-700/50">
                            <div className="bg-blue-500/20 p-3 rounded-2xl flex-shrink-0">
                                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <p className="text-xs text-gray-400 font-bold leading-relaxed uppercase tracking-wider">
                                Обезбедено со воена енкрипција. Вашите платежни картички не се зачувуваат на нашите сервери.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Checkout;