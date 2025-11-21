import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, Leaf, Icon, User } from 'lucide-react';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  //car directamente desde el contexto
  const { cart } = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/': return 'Home';
      case '/recetas': return 'recetas';
      case '/nosotros': return 'nosotros';
      case '/contacto': return 'contacto';
      case '/carrito': return 'carrito';
      default: return 'Home';
    }
  };
  const currentPage = getCurrentPage();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const navLinks = [
    { name: 'Inicio', page: 'home', hash: '' },
    { name: 'Catálogo', page: 'home', hash: 'catalogo' },
    { name: 'Recetas', page: 'recetas', hash: '' },
    { name: 'Sobre Nosotros', page: 'nosotros', hash: '' },
    { name: 'Contacto', page: 'contacto', hash: '' },
  ];

  const handleNavClick = (page, hash) => {
    const path = page === 'home' ? '/' : `/${page}`;
    navigate(path);
    setIsMenuOpen(false);

    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  };


  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100 font-['Montserrat'] transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">

        {/* Logo */}
        <div className="flex-shrink-0">
          <button onClick={() => handleNavClick('home', '')} className="flex items-center group">
            <div className="bg-green-100 p-2 rounded-full mr-2 group-hover:bg-green-200 transition-colors duration-300">
              <Leaf className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-green-800 font-extrabold text-2xl tracking-tight group-hover:text-green-700 transition duration-300">HuertoHogar</span>
          </button>
        </div>


        {/* navegacion de   escritorio */}
        <nav className="hidden lg:flex main-nav space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.hash)}
              className={`text-sm font-medium transition duration-200 relative py-1
                ${currentPage === link.page && !link.hash
                  ? 'text-green-700 font-semibold'
                  : 'text-gray-600 hover:text-green-600'
                }`}
            >
              {link.name}
              {(currentPage === link.page && !link.hash) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 rounded-full"></span>
              )}
            </button>
          ))}
        </nav>



        {/* area de carrito y Menu movil */}
        <div className="flex items-center space-x-4">


          <button
            onClick={() => handleNavClick('carrito', '')}
            className="flex items-center bg-green-600 text-white font-bold py-2.5 px-5 rounded-full transition duration-300 hover:bg-green-700 hover:shadow-lg active:scale-95 relative group"
            aria-label="Mi Carrito"
          >
            <ShoppingCart className="w-5 h-5 mr-2 group-hover:animate-bounce-short" />
            <span className="hidden sm:inline text-sm">Mi Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
                {totalItems}
              </span>
            )}
          </button>

          <button
            onClick={() => navigate('/admin')}
            className="flex items-center bg-gray-100 text-gray-700 font-bold py-2.5 px-3 rounded-full transition duration-300 hover:bg-green-100 hover:text-green-700 active:scale-95"
            aria-label="Acceso Admin"
          >
            <User className="w-5 h-5" />
          </button>



          {/* Botón de Hamburguesa para Móvil */}
          <button
            className="lg:hidden text-gray-700 hover:text-green-600 p-2 rounded-md hover:bg-gray-100 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>




      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 py-4 shadow-xl absolute w-full left-0 top-full animate-fade-in-down">
          <div className="container mx-auto px-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.page, link.hash)}
                className="block w-full text-left px-4 py-3 rounded-lg text-gray-700 hover:bg-green-50 hover:text-green-700 transition duration-150 font-medium"
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};



export default Header;