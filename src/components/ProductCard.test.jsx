import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductCard from './ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx'; 

// --- 1. Simulación (Mock) del hook useCart ---
// El componente ProductCard solo necesita la función 'addToCart'
// Creamos una función "espía" (vi.fn) para poder rastrear si es llamada.
const mockAddToCart = vi.fn();

vi.mock('../context/CartContext.jsx', () => ({
    useCart: () => ({
        addToCart: mockAddToCart // El hook devolverá nuestra función espía
    })
}));

// --- 2. Datos de prueba ---
const MOCK_PRODUCT_IN_STOCK = {
    id: 'prod1',
    name: 'Palta Hass',
    price: 3000,
    stock: 5,
    category: 'verduras',
    imageSrc: 'palta.jpg'
};

const MOCK_PRODUCT_OUT_OF_STOCK = {
    id: 'prod2',
    name: 'Limón',
    price: 1500,
    stock: 0,
    category: 'frutas',
    imageSrc: 'limon.jpg'
};


describe('Componente ProductCard', () => {

    // Antes de cada prueba, limpiamos el historial de la función espía
    beforeEach(() => {
        mockAddToCart.mockClear();
    });

    // --- PRUEBA #7 ---
    it('debería renderizar la información del producto correctamente', () => {
        render(<ProductCard product={MOCK_PRODUCT_IN_STOCK} />);

        // Verificamos que los datos del producto están en pantalla
        expect(screen.getByText('Palta Hass')).toBeInTheDocument();
        expect(screen.getByText('verduras')).toBeInTheDocument();
        expect(screen.getByText('Stock: 5 Kg')).toBeInTheDocument();

        // Verificamos el precio formateado 
        // La 'es-CL' formatea 3000 como "3.000"
        expect(screen.getByText(/\$3.000/i)).toBeInTheDocument();
    });

    // --- PRUEBA #8 ---
    it('debería llamar a addToCart al hacer clic cuando hay stock', async () => {
        const user = userEvent.setup();
        render(<ProductCard product={MOCK_PRODUCT_IN_STOCK} />);

        // 1. Buscamos el botón "Añadir al Carrito"
        const button = screen.getByRole('button', { name: /Añadir al Carrito/i });
        
        // 2. Verificamos que NO esté deshabilitado
        expect(button).not.toBeDisabled();

        // 3. Simulamos el clic del usuario
        await user.click(button);

        // 4. Verificamos que el mock 'addToCart' fue llamado 1 vez
        expect(mockAddToCart).toHaveBeenCalledTimes(1);

        // 5. Verificamos que fue llamado CON el producto correcto
        expect(mockAddToCart).toHaveBeenCalledWith(MOCK_PRODUCT_IN_STOCK);
    });

    // --- PRUEBA #9 ---
    it('debería mostrar "Agotado" y estar deshabilitado si no hay stock', async () => {
        render(<ProductCard product={MOCK_PRODUCT_OUT_OF_STOCK} />);

        // 1. Buscamos el botón por su texto "Agotado"
        const button = screen.getByRole('button', { name: /Agotado/i });

        // 2. Verificamos que el texto es correcto
        expect(button).toBeInTheDocument();
        
        // 3. ¡Lo más importante! Verificamos que el botón está deshabilitado
        expect(button).toBeDisabled();

        // 4. Verificamos que si el usuario intenta hacer clic, la función NO es llamada

        expect(mockAddToCart).not.toHaveBeenCalled();
    });

});