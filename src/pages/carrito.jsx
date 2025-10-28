import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';

const Carrito = () => {
  // Obtenemos TODO desde el contexto
  const { 
    cart, 
    incrementQuantity, 
    decrementQuantity, 
    removeFromCart, 
    clearCart, 
    totalItems, 
    totalPrice 
  } = useCart();

  // Formateador de moneda (CLP)
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  // Si el carrito está vacío
  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
        <ShoppingBag className="w-24 h-24 text-gray-300 mb-6" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
        <p className="text-gray-600 mb-8">
          Parece que aún no has añadido productos.
        </p>
        <Link 
          to="/"
          className="bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 hover:bg-green-700 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5 inline-block mr-2" />
          Volver al Catálogo
        </Link>
      </div>
    );
  }

  // Si el carrito tiene productos
  return (
    <div className="container mx-auto px-4 py-12 min-h-[70vh]">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 font-display">Mi Carrito de Compras</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Columna de Productos (Ocupa 2/3) */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-white p-4 rounded-lg shadow-md border">
              <img 
                src={item.imageSrc} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded-md mb-4 sm:mb-0 sm:mr-6"
              />
              <div className="flex-grow text-center sm:text-left">
                <h3 className="text-xl font-semibold text-green-800">{item.name}</h3>
                <p className="text-gray-600">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center space-x-4 my-4 sm:my-0 sm:mx-6">
                <button 
                  onClick={() => decrementQuantity(item.id)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Decrementar"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="text-xl font-bold w-10 text-center">{item.quantity}</span>
                <button 
                  onClick={() => incrementQuantity(item.id)}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
                  aria-label="Incrementar"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="font-bold text-lg w-24 text-center sm:text-right">
                {formatPrice(item.price * item.quantity)}
              </div>
              <button 
                onClick={() => removeFromCart(item.id)}
                className="ml-4 text-red-500 hover:text-red-700 transition"
                aria-label="Eliminar"
              >
                <Trash2 className="w-6 h-6" />
              </button>
            </div>
          ))}
          <button 
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline mt-4"
          >
            Vaciar Carrito
          </button>
        </div>

        {/* Columna de Resumen (Ocupa 1/3) */}
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-xl border h-fit sticky top-28">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-4">Resumen del Pedido</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-lg">
              <span className="text-gray-600">Total de Productos:</span>
              <span className="font-semibold">{totalItems}</span>
            </div>
            <div className="flex justify-between text-2xl font-bold">
              <span>Total a Pagar:</span>
              <span className="text-green-600">{formatPrice(totalPrice)}</span>
            </div>
          </div>
          <p className="text-sm text-gray-500 my-4">
            El costo de envío será calculado al momento de pagar.
          </p>
          <Link
            to="/pago-exitoso" // (Ruta para el Flujo de Pago - IE2.2.1)
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 hover:bg-green-700 shadow-lg text-center block text-lg"
          >
            Ir a Pagar
          </Link>
          <Link 
            to="/"
            className="w-full text-green-600 font-semibold py-3 px-6 rounded-full transition duration-300 hover:bg-green-50 text-center block text-md mt-3"
          >
            Seguir Comprando
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
