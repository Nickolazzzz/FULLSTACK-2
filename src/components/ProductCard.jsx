import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos el Hook

const ProductCard = ({ product }) => {
    const { addToCart } = useCart(); // Obtenemos la función del contexto

    return (
        <article className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 border border-gray-100 flex flex-col">
            <img 
                src={product.imageSrc} 
                alt={product.name} 
                className="w-full h-32 object-cover rounded-lg mb-4"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/150x150/AAAAAA/FFFFFF?text=Sin+Imagen" }}
            />
            <div className="flex-grow">
                <h3 className="text-xl font-semibold text-green-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
                <p className="text-2xl font-bold text-green-600 mb-3">${product.price.toLocaleString('es-CL')} <span className="text-sm font-normal text-gray-500">CLP/Kg</span></p>
                <p className="text-xs text-gray-700 mb-4">Stock: {product.stock} Kg</p>
            </div>
            <button 
                type="button"
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                onClick={() => addToCart(product)}
                disabled={product.stock <= 0}
            >
                {product.stock > 0 ? "Añadir al Carrito" : "Agotado"}
            </button>
        </article>
    );
};

export default ProductCard;
