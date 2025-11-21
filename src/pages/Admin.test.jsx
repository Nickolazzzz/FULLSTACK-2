// src/components/Admin.test.jsx

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Admin from './Admin.jsx';

// --- 1. MOCK (Simulación) de la base de datos ---
// Le decimos a Vitest que intercepte cualquier importación de '../data/db'
// y la reemplace con esta simulación.
// Esto es crucial para cumplir la rúbrica de "pruebas unitarias".
vi.mock('../data/db', () => ({
    getProducts: vi.fn(),
    addProduct: vi.fn(),
    updateProduct: vi.fn(),
    deleteProduct: vi.fn(),
}));

// Importamos los mocks *después* de definirlos
import { getProducts, addProduct, updateProduct, deleteProduct } from '../data/db';

// --- 2. Datos de prueba ---
const MOCK_PRODUCTS = [
    { id: '1', name: 'Manzana', price: 1000, stock: 100, category: 'frutas' },
    { id: '2', name: 'Lechuga', price: 500, stock: 50, category: 'verduras' },
];

describe('Pruebas para el componente Admin', () => {

    // Configuración que se ejecuta antes de CADA prueba
    beforeEach(() => {
        // Limpiamos el historial de llamadas de todos los mocks
        vi.resetAllMocks();

        // Simulamos la confirmación del navegador (para la prueba de eliminar)
        // Por defecto, simulamos que el usuario siempre presiona "Aceptar"
        window.confirm = vi.fn(() => true);
    });

    // PRUEBA 1: Renderizado inicial y carga de datos
    it('debería mostrar "Cargando..." y luego la lista de productos', async () => {
        // Simulación: getProducts devolverá nuestros datos de prueba
        getProducts.mockResolvedValue(MOCK_PRODUCTS);
        
        // 1. Renderizamos el componente
        render(<Admin />);

        // 2. Verificamos que el usuario ve el título
        expect(screen.getByRole('heading', { name: /Panel de Administración/i })).toBeInTheDocument();

        // 3. Verificamos que el usuario ve el estado de "Cargando"
        expect(screen.getByText(/Cargando productos.../i)).toBeInTheDocument();

        // 4. Esperamos (await) a que aparezca el primer producto.
        // Usamos findBy... que espera a que el elemento aparezca.
        expect(await screen.findByText(/Manzana \(1\)/i)).toBeInTheDocument();

        // 5. Verificamos que el segundo producto también está
        expect(screen.getByText(/Lechuga \(2\)/i)).toBeInTheDocument();

        // 6. Verificamos que el mensaje "Cargando" desapareció
        expect(screen.queryByText(/Cargando productos.../i)).not.toBeInTheDocument();
    });

    // PRUEBA 2: Crear un producto nuevo
    it('debería abrir el formulario, crear un producto y recargar la lista', async () => {
        const user = userEvent.setup();
        getProducts.mockResolvedValue(MOCK_PRODUCTS);

        // 1. Renderizar y esperar a que la lista inicial cargue
        render(<Admin />);
        await screen.findByText('Manzana (1)');

        // 2. El usuario hace clic en "Añadir Nuevo Producto"
        await user.click(screen.getByRole('button', { name: /Añadir Nuevo Producto/i }));

        // 3. Verificamos que el formulario (modal) apareció
        expect(screen.getByRole('heading', { name: /Crear Nuevo Producto/i })).toBeInTheDocument();

        // 4. El usuario llena el formulario
        await user.type(screen.getByPlaceholderText('Nombre'), 'Naranja');
        await user.type(screen.getByPlaceholderText('Precio (CLP)'), '1200');
        await user.type(screen.getByPlaceholderText('Stock (Kg)'), '30');
        await user.selectOptions(screen.getByRole('combobox'), 'frutas');

        // 5. El usuario guarda
        await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }));

        // 6. Verificamos que la función 'addProduct' fue llamada con los datos correctos
        expect(addProduct).toHaveBeenCalledTimes(1);
        expect(addProduct).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Naranja',
            price: '1200',
            stock: '30',
        }));

        // 7. Verificamos que el formulario se cerró (esperando que desaparezca)
        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: /Crear Nuevo Producto/i })).not.toBeInTheDocument();
        });

        // 8. Verificamos que la lista se recargó (getProducts fue llamado 2 veces: 1ra al inicio, 2da al guardar)
        expect(getProducts).toHaveBeenCalledTimes(2);
    });

    // PRUEBA 3: Editar un producto
    it('debería abrir el formulario con datos, editar y guardar', async () => {
        const user = userEvent.setup();
        getProducts.mockResolvedValue(MOCK_PRODUCTS);

        render(<Admin />);
        await screen.findByText('Manzana (1)');

        // 1. El usuario hace clic en el botón "Editar" de Manzana
        // (Usamos el 'aria-label' que definiste, ¡muy bien hecho!)
        await user.click(screen.getByRole('button', { name: /Editar Manzana/i }));

        // 2. Verificamos que el formulario de edición apareció
        expect(screen.getByRole('heading', { name: /Editar Producto/i })).toBeInTheDocument();

        // 3. Verificamos que los campos están llenos con los datos de Manzana
        expect(screen.getByPlaceholderText('Nombre')).toHaveValue('Manzana');
        expect(screen.getByPlaceholderText('Precio (CLP)')).toHaveValue(1000);

        // 4. El usuario cambia el precio
        await user.clear(screen.getByPlaceholderText('Precio (CLP)'));
        await user.type(screen.getByPlaceholderText('Precio (CLP)'), '1500');

        // 5. El usuario guarda
        await user.click(screen.getByRole('button', { name: /Guardar Cambios/i }));

        // 6. Verificamos que 'updateProduct' fue llamado con el ID '1' y los datos nuevos
        expect(updateProduct).toHaveBeenCalledTimes(1);
        expect(updateProduct).toHaveBeenCalledWith('1', expect.objectContaining({
            name: 'Manzana',
            price: '1500', // (Los inputs de número a veces se leen como string)
        }));

        // 7. Verificamos que el formulario se cerró
        await waitFor(() => {
            expect(screen.queryByRole('heading', { name: /Editar Producto/i })).not.toBeInTheDocument();
        });

        // 8. Verificamos que la lista se recargó
        expect(getProducts).toHaveBeenCalledTimes(2);
    });

    // PRUEBA 4: Eliminar un producto
    it('debería llamar a deleteProduct y recargar la lista al confirmar', async () => {
        const user = userEvent.setup();
        getProducts.mockResolvedValue(MOCK_PRODUCTS);

        render(<Admin />);
        await screen.findByText('Manzana (1)');

        // 1. El usuario hace clic en el botón "Eliminar" de Lechuga
        await user.click(screen.getByRole('button', { name: /Eliminar Lechuga/i }));

        // 2. Verificamos que se pidió confirmación
        expect(window.confirm).toHaveBeenCalledTimes(1);
        expect(window.confirm).toHaveBeenCalledWith('¿Está seguro de que desea eliminar este producto?');

        // 3. Verificamos (esperando) que 'deleteProduct' fue llamado con el ID '2'
        // (La función es asíncrona, por eso usamos waitFor)
        await waitFor(() => {
            expect(deleteProduct).toHaveBeenCalledWith('2');
        });
        
        // 4. Verificamos que la lista se recargó
        expect(getProducts).toHaveBeenCalledTimes(2);
    });

});