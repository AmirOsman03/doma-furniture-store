import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Функција за навигација до детали
    const handleViewDetails = () => {
        navigate(`/product/${product.id}`);
    };

    // Функција за директно купување
    const handleBuyNow = (e) => {
        e.stopPropagation(); // Спречува кликот да се пренесе на родителскиот div (деталите)
        navigate('/checkout', { state: { productId: product.id } });
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden flex flex-col group">
            {/* Image Container */}
            <div
                className="relative h-48 bg-gray-100 cursor-pointer overflow-hidden"
                onClick={handleViewDetails}
            >
                <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-blue-600 shadow-sm">
                    {product.style}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <span className="text-xs text-gray-500 uppercase mb-1 tracking-wider">
                    {product.category}
                </span>
                <h3
                    className="font-bold text-gray-800 mb-2 truncate cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleViewDetails}
                >
                    {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
                    {product.description || "Минималистички и модерен додаток за вашиот дом."}
                </p>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                    <span className="text-lg font-bold text-blue-600">
                        {product.price ? product.price.toLocaleString() : '0'} ден
                    </span>
                    <button
                        onClick={handleBuyNow}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 shadow-sm active:scale-95"
                    >
                        <span className="text-sm font-medium">Купи</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;