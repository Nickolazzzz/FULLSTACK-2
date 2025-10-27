import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import { CartProvider, useCart } from '../context/CartContext';

// Mock del Contexto del Carrito para las pruebas
// Ocultamos la implementación real y proveemos una versión simulada
vi.mock('../context/CartContext', () => ({
    useCart: () => ({
        totalItems: 5 // Simulamos que hay 5 ítems en el carrito
    }),
    CartProvider: ({ children }) => <div>{children}</div> // Provider simulado
}));

// Agrupamos las pruebas para el componente Header
describe('Componente Header', () => {

    // Prueba 1: Verificar que el componente se renderiza correctamente
    it('debería renderizar el logo y los links de navegación', () => {
        // Renderizamos el Header dentro de un Router (porque usa <Link>)
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // Buscamos el texto del logo/título
        expect(screen.getByText('HuertoHogar')).toBeInTheDocument();
        // Buscamos los links
        expect(screen.getByText('Inicio')).toBeInTheDocument();
        expect(screen.getByText('Contacto')).toBeInTheDocument();
        expect(screen.getByText('Administrar')).toBeInTheDocument();
    });

    // Prueba 2: Verificar que el contador del carrito muestra el número correcto
    it('debería mostrar el número correcto de ítems en el carrito (IE2.3.1)', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // Buscamos el botón del carrito y verificamos que muestre (5)
        // Usamos una expresión regular (regex) para buscar el texto "Mi Carrito (5)"
        expect(screen.getByText(/Mi Carrito \(5\)/i)).toBeInTheDocument();
    });
});
