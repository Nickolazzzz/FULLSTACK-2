import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Leaf, Award, MapPin } from 'lucide-react';

// --- Importación de Páginas ---
import Home from './Home';
import Recetas from './recetas';
import Nosotros from './nosotros';
import Contacto from './contacto';

// ------------------------------------------
// 1. Componente Navegación/Encabezado (Header)
// ------------------------------------------

const Header = ({ onNavigate, cart, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Definición de enlaces de navegación
  const navLinks = [
    { name: 'Inicio', page: 'home', hash: '' },
    { name: 'Catálogo', page: 'home', hash: 'catalogo' }, // Navega a Home y luego al hash (desplazamiento)
    { name: 'Recetas', page: 'recetas', hash: '' },
    { name: 'Sobre Nosotros', page: 'nosotros', hash: '' },
    { name: 'Contacto', page: 'contacto', hash: '' },
  ];

  const handleNavClick = (page, hash) => {
    onNavigate(page);
    setIsMenuOpen(false);
    // Simular el desplazamiento si hay un hash (por ejemplo, al Catálogo en Home)
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 10);
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

        {/* Navegación de Escritorio */}
        <nav className="hidden lg:flex main-nav space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.page, link.hash)}
              className={`text-gray-700 hover:text-green-600 transition duration-150 relative pb-1
                ${currentPage === link.page && 'font-semibold text-green-700 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-green-600'}`}
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Botón Carrito y Menú Móvil */}
        <div className="flex items-center space-x-4">
          
          {/* Carrito */}
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


// ------------------------------------------
// 2. Componente Pie de Página (Footer)
// Se agregó la prop onNavigate para hacer que los botones sean funcionales
// ------------------------------------------
const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-gray-800 text-white mt-16 font-['Montserrat']">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8 mb-8">
          
          {/* Columna 1: Logo y Misión */}
          <div>
            <div className="flex items-center text-white font-extrabold text-xl mb-4">
              <Leaf className="w-6 h-6 mr-2 text-green-400" />
              HuertoHogar
            </div>
            <p className="text-sm text-gray-400">
              Llevando la frescura del campo a tu hogar. Comprometidos con la calidad y la sostenibilidad.
            </p>
          </div>

          {/* Columna 2: Enlaces Rápidos (CORREGIDO: Ahora usan onNavigate) */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Explorar</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-green-300 transition duration-150">Inicio</button></li>
              <li><button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-green-300 transition duration-150">Catálogo</button></li>
              <li><button onClick={() => onNavigate('recetas')} className="text-gray-400 hover:text-green-300 transition duration-150">Recetas Saludables</button></li>
            </ul>
          </div>

          {/* Columna 3: Información Legal (Mantienen el diseño, no requieren navegación compleja) */}
          <div>
            <h4 className="font-semibold text-lg mb-4 text-green-400">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><button className="text-gray-400 hover:text-green-300 transition duration-150">Términos y Condiciones</button></li>
              <li><button className="text-gray-400 hover:text-green-300 transition duration-150">Política de Privacidad</button></li>
              <li><button className="text-gray-400 hover:text-green-300 transition duration-150">Política de Devolución</button></li>
            </ul>
          </div>

          {/* Columna 4: Contacto */}
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
              {/* Iconos de Redes Sociales (simulados) */}
              <button aria-label="Facebook" className="text-gray-400 hover:text-green-400 transition duration-150"><Award className='w-6 h-6'/></button>
              <button aria-label="Instagram" className="text-gray-400 hover:text-green-400 transition duration-150"><Award className='w-6 h-6'/></button>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="text-center text-sm text-gray-500 pt-4">
          &copy; {new Date().getFullYear()} HuertoHogar. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};


// ------------------------------------------
// 3. Componente Principal App
// ------------------------------------------

const App = () => {
  // Estado para la navegación entre páginas
  const [currentPage, setCurrentPage] = useState('home'); 
  // Estado simple para simular el carrito de compras (IE2.1.1)
  const [cart, setCart] = useState([
    { id: 1, name: 'Tomates Frescos', price: 1500, quantity: 2 },
    { id: 2, name: 'Lechuga Orgánica', price: 1000, quantity: 1 },
  ]);

  // Función para agregar/actualizar productos en el carrito
  const handleAddToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        // IE2.1.1 - Lógica de actualización de cantidad
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      // IE2.1.1 - Lógica de adición de nuevo producto
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Lógica de renderizado condicional de páginas
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        // Componente Home recibirá la función para añadir al carrito
        return <Home onAddToCart={handleAddToCart} />;
      case 'recetas':
        return <Recetas />;
      case 'nosotros':
        return <Nosotros />;
      case 'contacto':
        return <Contacto />;
      case 'carrito':
        // Carrito aún no implementado, mostramos un placeholder
        return (
          <div className="container mx-auto px-4 py-12 text-center min-h-[50vh]">
            <ShoppingCart className="w-16 h-16 mx-auto text-green-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800">Mi Carrito de Compras</h1>
            <p className="text-gray-600 mt-2">Esta sección está en construcción. Tienes {cart.reduce((sum, item) => sum + item.quantity, 0)} productos en tu carrito.</p>
          </div>
        );
      default:
        return <Home onAddToCart={handleAddToCart} />;
    }
  };
  
  // Aplicar fuente Inter (para compatibilidad con Tailwind)
  useEffect(() => {
    document.body.className = "font-sans antialiased bg-gray-50";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Pasar el estado del carrito a Header para mostrar el contador */}
      <Header onNavigate={setCurrentPage} cart={cart} currentPage={currentPage} />
      
      {/* Contenido principal con renderizado de página */}
      <div className="flex-grow">
        {renderPage()}
      </div>

      {/* Pasar setCurrentPage (como onNavigate) a Footer para que los botones funcionen */}
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

// Componente Placeholder para Home (necesario para que App.jsx compile)
const Home = ({ onAddToCart }) => (
    <div className="container mx-auto px-4 py-16 text-center min-h-[50vh]">
        <h1 className="text-5xl font-['Playfair_Display'] font-extrabold text-green-700">Bienvenido a HuertoHogar</h1>
        <p className="text-xl text-gray-600 mt-4">La página de inicio será implementada en el siguiente paso. ¡Haga clic en el botón para simular una compra!</p>
        <button 
          onClick={() => onAddToCart({ id: 99, name: 'Producto Demo', price: 500, quantity: 1 })}
          className="mt-6 bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition duration-200"
        >
          Añadir Producto Demo
        </button>
    </div>
);

// Componentes Placeholder para que App.jsx compile al hacer la importación
const Recetas = () => (<div className="container mx-auto px-4 py-12 text-center min-h-[50vh]"><h1 className="text-4xl font-bold">Página de Recetas</h1><p>Contenido de Recetas.</p></div>);
const Nosotros = () => (<div className="container mx-auto px-4 py-12 text-center min-h-[50vh]"><h1 className="text-4xl font-bold">Sobre Nosotros</h1><p>Contenido de Nosotros.</p></div>);
const Contacto = () => (<div className="container mx-auto px-4 py-12 text-center min-h-[50vh]"><h1 className="text-4xl font-bold">Página de Contacto</h1><p>Contenido de Contacto.</p></div>);


export default App;
