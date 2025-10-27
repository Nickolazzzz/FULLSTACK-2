import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="text-center p-12 bg-yellow-50 rounded-xl border border-dashed border-yellow-300">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-yellow-800 mb-2">Error 404 - Página No Encontrada</h2>
        <p className="text-xl text-yellow-700 mb-6">Lo sentimos, la página que buscas no existe.</p>
        <Link to="/" className="mt-4 inline-block bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition">
            Volver al Inicio
        </Link>
    </div>
  );
};

export default NotFound;
