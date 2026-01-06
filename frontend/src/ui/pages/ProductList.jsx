import React from 'react';
import useProducts from "../../hooks/useProducts.js";
import ProductCard from "../components/ProductCard.jsx";

const ProductList = () => {
    const { products, loading } = useProducts();

    if (loading) return (
        <div className="grid place-items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="w-full px-4">
                {/*/!* Header /}*/}
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    Нашата Колекција
                </h2>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products && products.length > 0 ? (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12">
                            <div className="text-gray-400 mb-4">
                                <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5" />
                                </svg>
                            </div>
                            <p className="text-gray-500">Моментално нема достапни производи.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductList;