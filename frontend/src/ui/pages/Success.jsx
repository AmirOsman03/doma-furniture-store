import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; // Или твојот productRepository ако има таква функција

const Success = ({ clearCart }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [recommended, setRecommended] = useState([]);
    const [loading, setLoading] = useState(true);

    // Го земаме ID-то што го пративме од Checkout
    const boughtProductId = location.state?.productId;

    useEffect(() => {
        if (clearCart) {
            clearCart();
        }

        const fetchRecommended = async () => {
            if (!boughtProductId) {
                console.log("Нема ID, прекинувам со барање препораки.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8080/api/products/${boughtProductId}/recommendations`);
                setRecommended(response.data);
            } catch (error) {
                console.error("Грешка при API повик:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommended();
    }, [boughtProductId]);

    return (
        <div className="min-h-screen bg-white w-full flex flex-col items-center py-10 px-0 overflow-x-hidden">

            {/* ГОРЕН ДЕЛ: Потврда за успех */}
            <div className="w-full text-center relative z-10 pt-10">
                <div className="mb-8 flex justify-center w-full">
                    <div className="relative rounded-full bg-green-50 p-10 border-8 border-white shadow-2xl">
                        <svg className="w-20 h-20 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                </div>
                <h1 className="text-7xl md:text-9xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Успешно!</h1>
                <p className="text-xl text-gray-400 mb-16 uppercase tracking-[0.3em] font-bold tracking-widest">Нарачката е потврдена</p>
            </div>

            {/* СЕКЦИЈА ЗА ПРЕПОРАКИ */}
            {recommended.length > 0 && (
                <div className="w-full max-w-[1600px] mx-auto px-6 lg:px-20 mb-24">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b-4 border-gray-900 pb-6 gap-4">
                        <div>
                            <h2 className="text-4xl font-black uppercase tracking-tighter text-gray-900">Специјално за тебе</h2>
                            <p className="text-gray-500 font-bold uppercase text-sm tracking-widest mt-2">Бидејќи го купи овој производ, мислиме дека ќе ти се допадне и ова:</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {recommended.map((product) => (
                            <div
                                key={product.id}
                                onClick={() => navigate(`/product/${product.id}`)}
                                className="group cursor-pointer flex flex-col"
                            >
                                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden bg-gray-50 mb-6 relative shadow-sm group-hover:shadow-2xl transition-all duration-500">
                                    <img
                                        src={product.image_url}
                                        alt={product.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute bottom-6 left-6 right-6 translate-y-20 group-hover:translate-y-0 transition-transform duration-500">
                                        <button className="w-full bg-white text-black font-black py-4 rounded-2xl shadow-xl uppercase text-xs tracking-widest">
                                            Види производ
                                        </button>
                                    </div>
                                </div>
                                <h3 className="font-black text-gray-900 uppercase text-xl leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                                    {product.name}
                                </h3>
                                <p className="text-2xl font-black text-gray-900">
                                    {product.price?.toLocaleString()} <span className="text-sm font-normal opacity-40">ден.</span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* КОПЧИЊА ЗА АКЦИЈА */}
            <div className="w-full px-6 flex flex-col md:flex-row gap-4 justify-center mb-16">
                <button
                    onClick={() => navigate('/')}
                    className="w-full md:w-auto md:px-12 py-4 bg-blue-600 text-white font-bold text-lg rounded-2xl shadow-lg hover:bg-blue-700 active:scale-95 transition-all uppercase tracking-wider"
                >
                    Назад во продавница
                </button>
            </div>

            {/* FOOTER SUPPORT */}
            <div className="w-full py-16 bg-gray-900 text-white text-center">
                <p className="text-sm opacity-50 uppercase tracking-[0.4em] font-black">Потребна ви е помош?</p>
                <p className="text-3xl font-black mt-4 tracking-tighter">support@doma.mk</p>
            </div>
        </div>
    );
};

export default Success;