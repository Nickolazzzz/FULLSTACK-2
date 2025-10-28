import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Carrito from './pages/carrito.jsx';  


import Home from './pages/Home.jsx';
import Recetas from './pages/recetas.jsx';
import Nosotros from './pages/nosotros.jsx';
import Contacto from './pages/contacto.jsx';


function App() {


  return (
    <div className="min-h-screen flex flex-col">
      
      <Header />
      
      <main className="flex-grow">
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/recetas" element={<Recetas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          
          <Route path="/carrito" element={<Carrito />} />


        
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;

