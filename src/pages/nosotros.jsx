import React from 'react';

// Fuente de datos simulada para información del equipo o hitos.
// En este caso, solo usamos los textos principales del HTML.
const aboutData = {
  title: "Nuestra Historia en HuertoHogar",
  sections: [
    {
      heading: "Conectando Familias con el Campo",
      content: "HuertoHogar nació hace 6 años con la misión de conectar a las familias chilenas con el campo. Nos dimos cuenta de que muchas personas no tenían acceso a productos frescos y de calidad, por lo que decidimos crear una plataforma que facilitara la entrega de productos de la huerta directamente a su hogar."
    },
    {
      heading: "Misión y Compromiso",
      content: "Nuestra misión es simple: proporcionar productos frescos y de calidad directamente desde el campo hasta la puerta de nuestros clientes, garantizando la frescura y el sabor en cada entrega. Nos comprometemos a fomentar una conexión más cercana entre los consumidores y los agricultores locales, apoyando prácticas agrícolas sostenibles y promoviendo una alimentación saludable en todos los hogares chilenos."
    },
    {
      heading: "Presencia Nacional",
      content: "Hoy, operamos en más de 9 puntos a lo largo del país, incluyendo ciudades clave como Santiago, Puerto Montt, Villarica, Nacimiento, Viña del Mar, Valparaíso, y Concepción. Seguimos creciendo para llevar lo mejor de la tierra a más hogares."
    }
  ]
};


const Nosotros = () => {
  return (
    // Sección principal de la página Sobre Nosotros
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* Título principal */}
        <h2 className="text-5xl font-extrabold text-center text-green-700 mb-12 font-['Playfair_Display']">
          {aboutData.title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Columna de Texto de la Historia */}
            <div className="space-y-8 lg:pr-8">
                {aboutData.sections.map((section, index) => (
                    <div key={index} className="bg-green-50 p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-green-800 mb-3">{section.heading}</h3>
                        <p className="text-gray-700 leading-relaxed">
                            {section.content}
                        </p>
                    </div>
                ))}
            </div>

            {/* Columna de Imagen/Visual (Placeholder) */}
            <div className="hidden lg:block">
                {/* Usamos un placeholder con un diseño que evoca la naturaleza y la misión */}
                <div className="w-full h-full min-h-[450px] bg-green-100 rounded-2xl shadow-xl p-10 flex flex-col justify-center items-center text-center border-4 border-green-300 border-dashed">
                    <span className="text-8xl mb-4" role="img" aria-label="Planta">🌱</span>
                    <p className="text-2xl font-bold text-green-900">
                        Compromiso con la Frescura y la Tierra
                    </p>
                    <p className="text-gray-600 mt-2">
                        HuertoHogar: Del campo a tu mesa, sin intermediarios.
                    </p>
                    {/* Placeholder de imagen para simular la vista original */}
                    <img
                        src="https://placehold.co/600x400/94A3B8/FFFFFF?text=Equipo+HuertoHogar"
                        alt="Nuestro equipo en la huerta"
                        className="mt-6 rounded-lg shadow-lg"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Nosotros;
