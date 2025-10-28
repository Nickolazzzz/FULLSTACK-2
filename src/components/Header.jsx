import React, { useState } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { ShoppingCart, Menu, X, Leaf, Icon } from 'lucide-react';


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
    <header className="sticky top-0 z-50 bg-white shadow-lg font-['Montserrat']">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <button onClick={() => handleNavClick('home', '')} className="flex items-center text-green-700 font-extrabold text-2xl tracking-tight transition duration-300 transform hover:scale-105">
            <Leaf className="w-8 h-8 mr-2 text-green-600" />
            HuertoHogar
          </button>
        </div>

       
        {/* navegacion de   escritorio */}
        <nav className="hidden lg:flex main-nav space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.hash)}
              className={`text-gray-700 hover:text-green-600 transition duration-150 relative pb-1
                ${currentPage === link.page && !link.hash ? 'font-semibold text-green-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600' : ''}`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        
        
        {/* area de carrito y Menu movil */}
        <div className="flex items-center space-x-4">
          
          
          <button
            onClick={() => handleNavClick('carrito', '')}
            className="flex items-center bg-green-500 text-white font-bold py-2 px-4 rounded-full transition duration-300 hover:bg-green-600 shadow-md shadow-green-500/50 relative"
            aria-label="Mi Carrito"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            <span className="hidden sm:inline">Mi Carrito</span>
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>

          
          
          {/* Botón de Hamburguesa para Móvil */}
          <button
            className="lg:hidden text-gray-700 hover:text-green-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
      </div>

      
      
      
      {/* Menú Móvil Desplegable */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gray-50 border-t border-gray-200 py-2">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.hash)}
              className="block w-full text-left px-6 py-2 text-gray-700 hover:bg-green-100 hover:text-green-700 transition duration-150"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};



export default Header;