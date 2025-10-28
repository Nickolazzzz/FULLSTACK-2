import React from 'react';

import { useCart } from '../context/CartContext.jsx';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Carrito = () => {
  // Obtener del Context
  const { 
    cart, 
    incrementQuantity, 
    decrementQuantity, 
    removeFromCart, 
    clearCart,
    totalItems,
    totalPrice 
  } = useCart();

  // --- Caso 1 carritovacío ---
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Tu carrito está vacío</h1>
        <p className="text-gray-500 mb-8">Parece que aún no has añadido ningún producto.</p>
        <Link 
          to="/"
          className="flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-700 transition duration-300"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // --- Caso2 carrito productos ---
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Mi Carrito ({totalItems} {totalItems === 1 ? 'producto' : 'productos'})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/*  Lista de Productos */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md border">
              <img 
                src={item.imageSrc} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/AAAAAA/FFFFFF?text=Sin+Imagen" }}
              />
              
              <div className="flex-grow text-center sm:text-left">
                <h2 className="text-xl font-semibold text-gray-800">{item.name}</h2>
                <p className="text-lg text-green-600 font-bold">${item.price.toLocaleString('es-CL')}</p>
              </div>
              
              <div className="flex items-center space-x-3 my-4 sm:my-0 sm:mx-6">
                
                <button 
                  onClick={() => decrementQuantity(item.id)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Restar uno"
                >
                  <Minus className="w-4 h-4" />
                </button>
                
                {/* Cantidad */}
                <span className="text-lg font-bold w-10 text-center">{item.quantity}</span>
                
                
                <button 
                  onClick={() => incrementQuantity(item.id)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Sumar uno"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center">
               
                <p className="text-lg font-bold w-24 text-center sm:text-right">${(item.price * item.quantity).toLocaleString('es-CL')}</p>
                
               
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 p-2 text-red-500 hover:text-red-700 transition"
                  aria-label="Eliminar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de Compra */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg border sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-4">Resumen del Pedido</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({totalItems} productos)</span>
                <span className="font-semibold text-gray-800">${totalPrice.toLocaleString('es-CL')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Envío</span>
                <span className="font-semibold text-green-600">GRATIS</span>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-green-700">${totalPrice.toLocaleString('es-CL')}</span>
              </div>
              
              {/* Botón Simular Pago##FALTA COMPLETAR SIMULACION DE PAGO### */}
              <Link 
                to="/pago-exitoso"
                onClick={clearCart} 
                className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg text-center block hover:bg-green-700 transition duration-300"
              >
                Ir a Pagar
              </Link>

              {/*Vaciar Carro */}
              <button 
                onClick={clearCart}
                className="w-full text-red-500 hover:text-red-700 font-semibold mt-4 text-sm transition"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Carrito;

