import React from 'react';

import { Link } from 'react-router-dom';

import { Leaf, Award, MapPin } from 'lucide-react';


const Footer = () => {
  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-800 text-white mt-16 font-['Montserrat']">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          
          <div>
            <div className="flex items-center text-white font-extrabold text-xl mb-4">
              <Leaf className="w-6 h-6 mr-2 text-green-400" />
              HuertoHogar
            </div>
            <p className="text-sm text-gray-400">
              Llevando la frescura del campo a tu hogar.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-green-300 transition duration-150">
                  Inicio
                </Link>
              </li>
              <li>


                <Link to="/" onClick={scrollToTop} className="text-gray-400 hover:text-green-300 transition duration-150">
                  Catálogo
                </Link>
              </li>
              <li>
                <Link to="/recetas" onClick={scrollToTop} className="text-gray-400 hover:text-green-300 transition duration-150">
                  Recetas
                </Link>
              </li>
            </ul>
          </div>

          
          {/* Columna 3: Información Legal  ###FALTA IMPLEMENTACION###*/}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-green-300 transition duration-150">Términos y Condiciones</button></li>
              <li><button className="text-gray-400 hover:text-green-300 transition duration-150">Política de Privacidad</button></li>
            </ul>
          </div>

          

          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Contáctanos</h4>
            <div className="space-y-2 text-sm">
              <p className="flex items-center text-gray-400">
                <MapPin className="w-4 h-4 mr-2" /> Santiago, Chile
              </p>
              <p className="flex items-center text-gray-400">
                <Leaf className="w-4 h-4 mr-2" /> contacto@huertohogar.cl
              </p>
            </div>
            <div className="flex space-x-4 mt-4">
              <button aria-label="Facebook" className="text-gray-400 hover:text-green-400 transition duration-150"><Award className='w-6 h-6'/></button>
              <button aria-label="Instagram" className="text-gray-400 hover:text-green-400 transition duration-150"><Award className='w-6 h-6'/></button>
            </div>
          </div>
        </div>
        
       

        <div className="text-center text-sm text-gray-500 pt-4">
          &copy; {new Date().getFullYear()} HuertoHogar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};


export default Footer;