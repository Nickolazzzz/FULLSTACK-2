import React, { createContext, useContext, useState, useEffect } from 'react';

// 1. Crear el Contexto
const CartContext = createContext();

// 2. Crear un Hook personalizado para consumir el contexto fácilmente
export const useCart = () => {
    return useContext(CartContext);
};

// 3. Crear el Proveedor (Provider) que manejará la lógica del estado
export const CartProvider = ({ children }) => {
    
    // Función para cargar el carrito desde localStorage al iniciar
    const loadCart = () => {
        try {
            const storedCart = localStorage.getItem('huertohogar_cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error("Error cargando el carrito:", error);
            return [];
        }
    };

    const [cart, setCart] = useState(loadCart);

    // Efecto para guardar en localStorage cada vez que el carrito cambie
    useEffect(() => {
        try {
            localStorage.setItem('huertohogar_cart', JSON.stringify(cart));
        } catch (error) {
            console.error("No se pudo guardar el carrito:", error);
        }
    }, [cart]);

    // --- Funciones de Lógica del Carrito ---

    const addToCart = (product) => {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.id === product.id);
            if (existingProduct) {
                // Si existe, aumenta la cantidad
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Si es nuevo, lo agrega
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
        alert(`"${product.name}" ha sido añadido al carrito.`);
    };

    const updateQuantity = (id, change) => {
        setCart(prevCart => {
            return prevCart
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity + change } : item
                )
                .filter(item => item.quantity > 0); // Elimina si la cantidad llega a 0
        });
    };

    const removeItem = (id) => {
        setCart(prevCart => prevCart.filter(item => item.id !== id));
    };

    // 4. Valores que se expondrán a los componentes hijos
    const value = {
        cart,
        addToCart,
        updateQuantity,
        removeItem,
        totalItems: cart.reduce((sum, product) => sum + product.quantity, 0),
        totalPrice: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
