import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';

const PagoExitoso = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center min-h-[60vh] flex flex-col justify-center items-center">
      <CheckCircle className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
      <h1 className="text-4xl font-bold text-gray-800 mb-3">¡Pago Realizado con Éxito!</h1>
      <p className="text-gray-500 mb-8 max-w-md">
        ¡Gracias por tu compra! Hemos recibido tu pedido y lo estamos preparando. Recibirás un correo de confirmación pronto.
      </p>
      <Link 
        to="/"
        className="flex items-center justify-center bg-green-600 text-white font-bold py-3 px-6 rounded-full text-lg hover:bg-green-700 transition duration-300"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Volver al Inicio
      </Link>
    </div>
  );
};

export default PagoExitoso;
