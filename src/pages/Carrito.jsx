import React from 'react';
import { useCart } from '../context/CartContext'; // Hook del carrito
import { Link } from 'react-router-dom';
import { ShoppingCart, ChevronUp, ChevronDown, Trash2 } from 'lucide-react';

const Carrito = () => {
    // Obtenemos todo lo necesario del Contexto
    const { cart, updateQuantity, removeItem, totalPrice } = useCart();

    return (
        <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-700 mb-8 border-b pb-2">Mi Carrito de Compras</h2>

            {cart.length === 0 ? (
                <div className="text-center p-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-xl text-gray-600">Tu carrito está vacío.</p>
                    <Link to="/" className="mt-4 inline-block bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition">
                        Volver a la tienda
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {cart.map(item => (
                        <div key={item.id} className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white rounded-xl shadow-md border border-gray-100">
                            {/* ... (código del ítem del carrito, igual al anterior) ... */}
                            <div className="flex items-center space-x-4 mb-4 sm:mb-0 w-full sm:w-auto">
                                <img src={item.imageSrc} alt={item.name} className="w-12 h-12 object-cover rounded-lg hidden sm:block" />
                                <div>
                                    <p className="font-semibold text-gray-800">{item.name}</p>
                                    <p className="text-sm text-gray-500">${item.price.toLocaleString('es-CL')} CLP/Kg</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-4 w-full sm:w-auto justify-end">
                                <div className="flex items-center border rounded-lg">
                                    <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-l-lg" onClick={() => updateQuantity(item.id, -1)} aria-label={`Disminuir ${item.name}`}>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                    <span className="px-3 text-gray-800 font-medium">{item.quantity}</span>
                                    <button type="button" className="p-2 text-gray-600 hover:bg-gray-100 rounded-r-lg" onClick={() => updateQuantity(item.id, 1)} aria-label={`Aumentar ${item.name}`}>
                                        <ChevronUp className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="font-semibold text-lg text-green-600 w-24 text-right hidden sm:block">
                                    ${(item.price * item.quantity).toLocaleString('es-CL')}
                                </p>
                                <button type="button" className="p-2 text-red-500 hover:bg-red-50 rounded-full transition" onClick={() => removeItem(item.id)} aria-label={`Eliminar ${item.name}`}>
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="p-6 bg-green-50 rounded-xl shadow-inner border-t-4 border-green-600">
                        <div className="flex justify-between items-center text-2xl font-bold text-green-800">
                            <span>Total del Carrito:</span>
                            <span>${totalPrice.toLocaleString('es-CL')} CLP</span>
                        </div>
                        <button type="button" className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                            Finalizar Compra (Simulación)
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Carrito;
