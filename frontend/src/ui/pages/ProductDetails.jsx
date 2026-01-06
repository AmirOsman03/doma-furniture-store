import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import productRepository from '../../repository/productRepository';

const ProductDetails = ({ addToCart }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [added, setAdded] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                // Претпоставуваме дека твојот API враќа податоци на овој начин
                const response = await productRepository.getProductById(id);
                setProduct(response.data);
            } catch (error) {
                console.error("Грешка при вчитавање на производот:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product); // Ја повикуваме функцијата добиена преку props
            setAdded(true);
            setTimeout(() => setAdded(false), 2000);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-600 border-opacity-50"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen w-full flex flex-col items-center justify-center text-center">
                <h1 className="text-3xl font-black mb-4 uppercase">Производот не е пронајден</h1>
                <button onClick={() => navigate('/')} className="text-blue-600 font-bold hover:underline">Назад кон почеток</button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white w-full flex flex-col items-center py-10 px-0 overflow-x-hidden">
            <div className="w-full px-6 lg:px-20 max-w-[1600px]">

                {/* Копче за назад */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-black transition-all mb-10 group uppercase text-xs font-black tracking-widest"
                >
                    <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Назад кон производите
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">

                    {/* ЛЕВА СТРАНА: Слика (Full Width Aspect) */}
                    <div className="relative w-full aspect-square rounded-[3rem] overflow-hidden bg-gray-50 shadow-2xl group">
                        <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-8 left-8">
                            <span className="bg-white/90 backdrop-blur-md px-6 py-2 rounded-full text-xs font-black text-blue-600 shadow-xl uppercase tracking-widest">
                                {product.style || 'Premium Collection'}
                            </span>
                        </div>
                    </div>

                    {/* ДЕСНА СТРАНА: Информации */}
                    <div className="flex flex-col">
                        <div className="mb-10">
                            <span className="text-blue-600 font-black uppercase tracking-[0.3em] text-sm">
                                {product.category}
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mt-4 leading-[0.9] tracking-tighter">
                                {product.name}
                            </h1>
                        </div>

                        <div className="text-xl text-gray-500 mb-12 leading-relaxed max-w-xl">
                            <p>{product.description || "Овој ексклузивен модел е дизајниран да понуди совршен баланс помеѓу модерната естетика и долготрајниот комфор."}</p>
                        </div>

                        {/* Цена */}
                        <div className="mb-12">
                            <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-2">Цена за еден примерок</p>
                            <span className="text-6xl font-black text-gray-900 tracking-tighter">
                                {product.price?.toLocaleString()} <small className="text-2xl font-light text-gray-400 ml-1">ден.</small>
                            </span>
                        </div>

                        {/* Акциски копчиња */}
                        <div className="flex flex-col sm:flex-row gap-4 w-full">
                            <button
                                onClick={handleAddToCart}
                                className={`
                                    flex-[2] relative overflow-hidden py-6 rounded-3xl font-black text-xl tracking-widest transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl uppercase
                                    ${added
                                    ? 'bg-green-500 shadow-green-200 text-white scale-95'
                                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200 active:scale-95'
                                }
                                `}
                            >
                                {added ? (
                                    <>
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                        </svg>
                                        Додадено
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        Додади во кошничка
                                    </>
                                )}
                            </button>

                            <button
                                onClick={() => {
                                    if(!added) addToCart(product);
                                    navigate('/checkout');
                                }}
                                className="flex-1 py-6 rounded-3xl font-black text-xl border-4 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-all active:scale-95 uppercase tracking-widest"
                            >
                                Плати
                            </button>
                        </div>

                        {/* Дополнителни инфо ленти */}
                        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-gray-100 pt-10">
                            <div>
                                <h4 className="font-black text-gray-900 text-sm uppercase">Достава</h4>
                                <p className="text-gray-500 text-sm">Бесплатна до твојата врата</p>
                            </div>
                            <div>
                                <h4 className="font-black text-gray-900 text-sm uppercase">Гаранција</h4>
                                <p className="text-gray-500 text-sm">2 години полна гаранција</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetails;