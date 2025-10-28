import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' 

// 1. Importa el CartProvider que creamos
import { CartProvider } from './context/CartContext.jsx' // <-- AÑADIR ESTO

import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> 
      {/* 2. Envuelve tu App con el CartProvider */}
      <CartProvider> {/* <-- AÑADIR ESTO */}
        <App />
      </CartProvider> {/* <-- AÑADIR ESTO */}
    </BrowserRouter>
  </React.StrictMode>,
)