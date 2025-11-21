import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Contacto from './contacto';

describe('Componente Contacto', () => {
    it('debería renderizar el formulario correctamente', () => {
        render(<Contacto />);
        expect(screen.getByLabelText(/Nombre Completo/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/RUT/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Enviar Mensaje/i })).toBeInTheDocument();
    });

    it('debería mostrar errores si se envía el formulario vacío', () => {
        render(<Contacto />);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

        fireEvent.click(submitButton);

        expect(screen.getByText(/El nombre es obligatorio/i)).toBeInTheDocument();
        expect(screen.getByText(/El RUT es obligatorio/i)).toBeInTheDocument();
        expect(screen.getByText(/El correo es obligatorio/i)).toBeInTheDocument();
    });

    it('debería mostrar error con email inválido', () => {
        render(<Contacto />);
        const emailInput = screen.getByLabelText(/Correo Electrónico/i);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

        fireEvent.change(emailInput, { target: { value: 'correo-invalido' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/Ingrese un correo electrónico válido/i)).toBeInTheDocument();
    });

    it('debería mostrar error con RUT corto', () => {
        render(<Contacto />);
        const rutInput = screen.getByLabelText(/RUT/i);
        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });

        fireEvent.change(rutInput, { target: { value: '123' } });
        fireEvent.click(submitButton);

        expect(screen.getByText(/El RUT debe tener al menos 8 caracteres/i)).toBeInTheDocument();
    });

    it('debería permitir enviar con datos válidos', () => {
        render(<Contacto />);

        fireEvent.change(screen.getByLabelText(/Nombre Completo/i), { target: { value: 'Juan Pérez' } });
        fireEvent.change(screen.getByLabelText(/RUT/i), { target: { value: '12345678-9' } });
        fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@ejemplo.com' } });

        const submitButton = screen.getByRole('button', { name: /Enviar Mensaje/i });
        fireEvent.click(submitButton);

        expect(screen.queryByText(/El nombre es obligatorio/i)).not.toBeInTheDocument();
        expect(screen.getByText(/¡Gracias por contactarnos!/i)).toBeInTheDocument();
    });
});
