import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-CL', {
            style: 'currency',
            currency: 'CLP',
        }).format(price);
    };

    return (
        <article className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-2 border border-gray-100 flex flex-col h-full group">
            <div className="relative overflow-hidden rounded-xl mb-4 aspect-square">
                <img
                    src={product.imageSrc}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x300/e2e8f0/64748b?text=Sin+Imagen" }}
                />
                {product.stock <= 0 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">Agotado</span>
                    </div>
                )}
            </div>

            <div className="flex-grow flex flex-col">
                <div className="mb-1">
                    <span className="text-xs font-semibold tracking-wider text-green-600 uppercase bg-green-50 px-2 py-1 rounded-md">
                        {product.category}
                    </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-700 transition-colors">{product.name}</h3>

                <div className="mt-auto pt-2 flex items-end justify-between">
                    <div>
                        <p className="text-2xl font-extrabold text-gray-900">{formatPrice(product.price)}</p>
                        <p className="text-xs text-gray-500">por Kg</p>
                    </div>
                    <div className="text-right">
                        <p className={`text-xs font-medium ${product.stock < 10 ? 'text-orange-500' : 'text-gray-500'}`}>
                            {product.stock} Kg disponibles
                        </p>
                    </div>
                </div>
            </div>

            <button
                type="button"
                className={`w-full mt-5 py-3 rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2
                    ${product.stock > 0
                        ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-lg hover:shadow-green-600/30 active:scale-95'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? "Añadir al Carrito" : "Sin Stock"}
            </button>
        </article>
    );
};

export default ProductCard;
