import React, { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, XCircle } from 'lucide-react';

const Contacto = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    rut: '',
    address: '',
    phone: '',
    email: '',
  });

 
  const [response, setResponse] = useState(null); // null, 'success', 'error'


  const contactInfo = [
    { icon: MapPin, label: "Dirección", value: "Av. Principal 123, Santiago, Chile" },
    { icon: Phone, label: "Teléfono", value: "+56 9 1234 5678" },
    { icon: Mail, label: "Email", value: "contacto@huertohogar.cl" },
  ];

  // Datos fijos de sucursales (usados para renderizar dinámicamente)
  const sucursalesData = [
    { city: "Santiago", address: "Calle Arica 456" },
    { city: "Puerto Montt", address: "Av. Costanera Sur 101" },
    { city: "Villarica", address: "Ruta 199, Km 5" },
    { city: "Concepción", address: "Caupolicán 789" },
    { city: "Viña del Mar", address: "Libertad 200" },
  ];

  // Manejador genérico de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setResponse(null); // Borrar la respuesta al empezar a escribir
  };

  // Función de validación (simulación)
  const validateForm = () => {
    const { name, rut, email } = formData;
    if (!name.trim() || !rut.trim() || !email.trim()) {
      return "Todos los campos obligatorios deben ser completados.";
    }
    // Validación simple de formato de email
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "El correo electrónico no tiene un formato válido.";
    }
    // Validación básica de RUT (solo longitud simulada)
    if (rut.length < 8) {
      return "El RUT debe contener al menos 8 caracteres (sin incluir guion).";
    }
    return null; // Null si no hay errores
  };

  // Manejador de envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();

    if (validationError) {
      // Si hay un error de validación (IE1.2.2)
      console.error("Error de validación:", validationError);
      setResponse({ type: 'error', message: validationError });
    } else {
      // Simulación de envío exitoso
      console.log("Datos enviados:", formData);
      setResponse({ type: 'success', message: '¡Gracias por contactarnos! Hemos recibido tu mensaje.' });
      setFormData({ name: '', rut: '', address: '', phone: '', email: '' }); // Limpiar formulario
    }
  };

¿
  const ResponseMessage = ({ type, message }) => (
    <div className={`p-4 rounded-lg flex items-center mb-6 ${type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
      {type === 'success' ? <CheckCircle className="w-6 h-6 mr-3" /> : <XCircle className="w-6 h-6 mr-3" />}
      <p className="font-medium">{message}</p>
    </div>
  );

  return (
    <main>

      <section id="contact" className="py-16 md:py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <h2 className="text-5xl font-extrabold text-center text-green-700 mb-12 font-['Playfair_Display']">
            Contáctanos
          </h2>


          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
            
       
            <div className="lg:order-first">
              <h3 className="text-3xl font-bold text-green-800 mb-6">Nuestra Información</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                ¿Tienes alguna pregunta, sugerencia o simplemente quieres saludar? No dudes en contactarnos. Estamos aquí para ayudarte a conectar con lo mejor de la huerta.
              </p>
              
              <ul className="space-y-6">
                {contactInfo.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <item.icon className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                    <div className="ml-4">
                      <strong className="block text-lg text-gray-800">{item.label}:</strong>
                      <span className="text-gray-600">{item.value}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-12 p-6 bg-green-50 rounded-lg">
                <h4 className='text-xl font-bold text-green-700 mb-2'>Horario de Atención</h4>
                <p className='text-gray-600'>Lunes a Viernes: 9:00 - 18:00 hrs.</p>
                <p className='text-gray-600'>Sábados: 9:00 - 14:00 hrs.</p>
              </div>
            </div>

     
            <div className="contact-form-container bg-gray-50 p-8 rounded-xl shadow-inner">
              <h3 className="text-3xl font-bold text-green-800 mb-6">Envíanos un Mensaje</h3>
              
              {/*  mensaje respuesta */}
              {response && <ResponseMessage type={response.type} message={response.message} />}

       
              <form onSubmit={handleSubmit} className="space-y-4">
                
     
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo (*)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="Tu nombre y apellido"
                  />
                </div>

     
                <div>
                  <label htmlFor="rut" className="block text-sm font-medium text-gray-700 mb-1">RUT (*)</label>
                  <input
                    type="text"
                    id="rut"
                    name="rut"
                    value={formData.rut}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="Ej: 12.345.678-9"
                  />
                </div>

    
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="Tu dirección de residencia"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="+56 9 XXXX XXXX"
                  />
                </div>

      
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico (*)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition duration-150"
                    placeholder="contacto@ejemplo.cl"
                  />
                </div>

                <p className="text-xs text-gray-500 pt-2">(*) Campos obligatorios.</p>

                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition duration-200 shadow-lg shadow-green-500/50 mt-4"
                >
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

 
      <section id="sucursales" className="py-16 md:py-20 bg-white">
        <div className="container px-4 mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Nuestras Sucursales</h2>
          <p className="text-center text-lg text-gray-600 mb-10 max-w-3xl mx-auto">
            Encuentra tu sucursal HuertoHogar más cercana. Operamos en las principales ciudades de Chile para llevar la frescura del campo directamente a tu mesa.
          </p>
          
          {/* Sucursales */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {sucursalesData.map((sucursal, index) => (
              <div key={index} className="bg-green-50 p-4 rounded-lg text-center shadow-md hover:bg-green-100 transition duration-150">
                <strong className="block text-green-700 text-xl font-extrabold">{sucursal.city}</strong>
                <span className="text-sm text-gray-600">{sucursal.address}</span>
              </div>
            ))}
          </div>

    
          <div id="map-container" className="rounded-xl overflow-hidden shadow-xl border-4 border-green-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.170668383344!2d-70.61862528485232!3d-33.42436448078971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662c5890e1f13f1%3A0x6b5e1b0c0a9e70e!2sSantiago%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1sen!2sus!4v1625078400000!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Mapa de Santiago"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
