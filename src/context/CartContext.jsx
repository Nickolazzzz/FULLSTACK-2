import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear el Hook personalizado (para consumir el contexto)
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Este error se dispara si intentamos usar el contexto fuera del Provider
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

// 3. Crear el Proveedor (Provider)
export const CartProvider = ({ children }) => {
  // Estado para guardar los items del carrito
  const [cart, setCart] = useState([]);
  
  // Estados para los totales (calculados automáticamente)
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Efecto para recalcular los totales cada vez que el 'cart' cambie
  useEffect(() => {
    const calculateTotals = () => {
      const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      const priceTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      setTotalItems(itemsCount);
      setTotalPrice(priceTotal);
    };
    calculateTotals();
  }, [cart]);

  // --- FUNCIONES DEL CARRITO ---

  // Añadir un producto
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        // Si ya existe, actualiza la cantidad
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Si es nuevo, lo añade al array
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  // Incrementar cantidad
  const incrementQuantity = (productId) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Decrementar cantidad
  const decrementQuantity = (productId) => {
    setCart(prevCart => 
      prevCart.map(item =>
        item.id === productId 
          ? { ...item, quantity: Math.max(1, item.quantity - 1) } // No permite bajar de 1
          : item
      )
    );
  };

  // Eliminar un producto
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Vaciar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // 4. Valor que proveerá el Contexto
  const value = {
    cart,
    addToCart,
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

