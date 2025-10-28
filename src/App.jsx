import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Importa los componentes de layout
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Carrito from './pages/carrito.jsx';  

// Importa las páginas
import Home from './pages/Home.jsx';
import Recetas from './pages/recetas.jsx';
import Nosotros from './pages/nosotros.jsx';
import Contacto from './pages/contacto.jsx';
// (Añadiremos la página de Carrito más adelante)

function App() {
  // ¡La lógica del carrito ya NO vive aquí!
  // Se movió a CartContext.jsx

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header ya no recibe props, las tomará del contexto */}
      <Header />
      
      <main className="flex-grow">
        <Routes>
          {/* Las páginas ya no reciben 'onAddToCart', lo tomarán del contexto */}
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          {/* <Route path="/carrito" element={<Carrito />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

