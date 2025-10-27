import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { sucursalesData } from '../data/db'; // Importamos sucursales

// Hook personalizado para validación de formularios (Cumple IE2.2.2)
const useFormValidation = (initialState, validate) => {
    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({}); // Para validar en onBlur

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        
        // Validación onChange si el campo ya fue "tocado"
        if (touched[name]) {
            const validationErrors = validate({ ...values, [name]: value });
            setErrors(prev => ({ ...prev, [name]: validationErrors[name] || '' }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        // Marcar campo como "tocado"
        setTouched(prev => ({ ...prev, [name]: true }));
        // Validar en onBlur
        const validationErrors = validate(values);
        setErrors(prev => ({ ...prev, [name]: validationErrors[name] || '' }));
    };

    const handleSubmit = (e, callback) => {
        e.preventDefault();
        setTouched({ nombre: true, rut: true, direccion: true, telefono: true, mail: true });
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length === 0) {
            callback(values);
        } else {
            alert('Por favor, corrige los errores en el formulario.');
        }
    };
    
    const resetForm = () => {
        setValues(initialState);
        setErrors({});
        setTouched({});
    }

    return { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm };
};

// Reglas de Validación
const validateContact = (values) => {
    let errors = {};
    if (!values.nombre.trim()) errors.nombre = 'El Nombre Completo es obligatorio.';
    if (!values.rut.trim()) errors.rut = 'El RUT es obligatorio.';
    // Validación de RUT (básica, puedes agregar una más compleja)
    else if (!/^\d{7,8}-[\dKk]$/.test(values.rut)) errors.rut = 'Formato de RUT inválido (Ej: 12345678-9).';
    if (!values.direccion.trim()) errors.direccion = 'La Dirección es obligatoria.';
    if (!values.telefono.trim()) errors.telefono = 'El Teléfono es obligatorio.';
    if (!values.mail.trim()) errors.mail = 'El Correo es obligatorio.';
    else if (!/\S+@\S+\.\S+/.test(values.mail)) errors.mail = 'El Correo Electrónico es inválido.';
    return errors;
};

// Componente de Campo de Formulario
const FormField = ({ label, name, type = 'text', ...props }) => {
    const { values, errors, touched, handleChange, handleBlur } = props;
    // El campo se marca como inválido si tiene error Y ha sido "tocado" o enviado
    const isInvalid = errors[name] && touched[name];

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-gray-700 font-medium mb-1">
                {label} <span className="text-red-500">*</span>
            </label>
            <input
                type={type}
                id={name}
                name={name}
                value={values[name]}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full p-3 border rounded-lg transition focus:ring-2 focus:ring-green-500 focus:border-green-500 
                            ${isInvalid ? 'border-red-500 ring-red-200' : 'border-gray-300'}`}
                required
            />
            {isInvalid && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
        </div>
    );
};

const Contacto = () => {
    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = useFormValidation(
        { nombre: '', rut: '', direccion: '', telefono: '', mail: '' },
        validateContact
    );
    
    const [mapCenter, setMapCenter] = useState(sucursalesData[0]);

    const handleFormSubmit = (formData) => {
        console.log('Formulario enviado:', formData);
        alert('¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.');
        resetForm(); // Limpiar formulario
    };

    return (
        <div className="grid md:grid-cols-2 gap-10">
            {/* Formulario de Contacto */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Formulario de Contacto</h3>
                <form onSubmit={(e) => handleSubmit(e, handleFormSubmit)} noValidate>
                    <FormField label="Nombre Completo" name="nombre" {...{ values, errors, touched, handleChange, handleBlur }} />
                    <FormField label="RUT (Ej: 12345678-9)" name="rut" {...{ values, errors, touched, handleChange, handleBlur }} />
                    <FormField label="Dirección" name="direccion" {...{ values, errors, touched, handleChange, handleBlur }} />
                    <FormField label="Teléfono" name="telefono" type="tel" {...{ values, errors, touched, handleChange, handleBlur }} />
                    <FormField label="Correo Electrónico" name="mail" type="email" {...{ values, errors, touched, handleChange, handleBlur }} />
                    
                    <button type="submit" className="w-full bg-green-600 text-white py-3 mt-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                        Enviar Consulta
                    </button>
                </form>
            </div>

            {/* Sucursales y Mapa */}
            <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                    <MapPin className="w-6 h-6 mr-2 text-green-600" />
                    Nuestras Sucursales
                </h3>
                {/* ... (código de sucursales y mapa, igual al anterior) ... */}
                <div className="mb-6 space-y-2">
                    {sucursalesData.map(sucursal => (
                        <div key={sucursal.id} className={`p-4 rounded-lg cursor-pointer transition border ${mapCenter.id === sucursal.id ? 'bg-green-100 border-green-500 shadow-md' : 'bg-white border-gray-200 hover:bg-gray-50'}`} onClick={() => setMapCenter(sucursal)}>
                            <p className="font-bold text-green-700">{sucursal.ciudad}</p>
                            <p className="text-sm text-gray-600">{sucursal.direccion}</p>
                        </div>
                    ))}
                </div>
                <div className="relative h-64 w-full bg-gray-200 rounded-xl overflow-hidden shadow-inner">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                        <MapPin className="w-8 h-8 text-red-500 z-10 animate-bounce" />
                        <p className="font-bold text-lg mt-1 text-gray-800">{mapCenter.ciudad}</p>
                        <p className="text-sm text-gray-600">Lat: {mapCenter.lat}, Lng: {mapCenter.lng}</p>
                        <p className="text-xs mt-2 text-gray-500">*Mapa simulado. La ubicación se centra en la sucursal seleccionada.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contacto;
