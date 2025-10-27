import React from 'react';

// Datos estáticos de las recetas (simulando una llamada a la "base de datos" - IE2.1.1)
const recetasData = [
  {
    id: 1,
    title: "Sopa Cremosa de Zanahoria",
    description: "Una sopa reconfortante y nutritiva, perfecta para días fríos. Hecha con zanahorias frescas y un toque de jengibre.",
    image: "https://placehold.co/400x300/F0F3BD/6C872E?text=Sopa+de+Zanahoria",
    ingredients: [
      "500g de zanahorias frescas",
      "1 cebolla picada",
      "1 trozo de jengibre (2 cm)",
      "1 litro de caldo de verduras",
      "Sal y pimienta al gusto",
    ],
    preparation: [
      "En una olla, saltea la cebolla y el jengibre.",
      "Añade las zanahorias picadas y el caldo. Cocina hasta que las zanahorias estén blandas.",
      "Licúa la mezcla hasta obtener una textura suave. Sirve caliente.",
    ],
  },
  {
    id: 2,
    title: "Ensalada de Espinacas y Nueces",
    description: "Una ensalada fresca y vibrante, ideal para una comida ligera. Combina espinacas, nueces, queso de cabra y una vinagreta balsámica.",
    image: "https://placehold.co/400x300/B2D0AE/6C872E?text=Ensalada+de+Espinaca",
    ingredients: [
      "200g de espinacas frescas",
      "50g de nueces picadas",
      "100g de queso de cabra desmenuzado",
      "Vinagreta balsámica al gusto",
    ],
    preparation: [
      "Lava y seca las espinacas. Colócalas en un bol grande.",
      "Añade las nueces y el queso de cabra.",
      "Aliña con la vinagreta balsámica justo antes de servir.",
    ],
  },
  {
    id: 3,
    title: "Salteado de Pimientos Tricolores",
    description: "Un plato rápido y lleno de color. Saltea pimientos rojos, amarillos y verdes para una guarnición deliciosa y llena de vitaminas.",
    image: "https://placehold.co/400x300/C5D8A5/6C872E?text=Salteado+de+Pimientos",
    ingredients: [
      "1 pimiento rojo",
      "1 pimiento amarillo",
      "1 pimiento verde",
      "1 cebolla",
      "Aceite de oliva, sal y pimienta",
    ],
    preparation: [
      "Corta los pimientos y la cebolla en tiras finas.",
      "Calienta aceite en una sartén grande. Saltea las verduras a fuego medio-alto.",
      "Cocina hasta que estén tiernas pero aún crujientes. Sazona al gusto.",
    ],
  },
];


const Recetas = () => {
  return (
    // Sección principal (reemplaza <section id="recetas" class="recetas-section">)
    <section id="recetas" className="py-12 bg-gray-50">
      <div className="container">
        {/* Título principal */}
        <h2 className="text-5xl font-extrabold text-center text-green-700 mb-10 font-['Playfair_Display']">
          Recetas de la huerta
        </h2>

        {/* Reemplaza .recetas-grid con un grid responsivo de Tailwind */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recetasData.map((receta) => (
            // Reemplaza .receta-card con una tarjeta de Tailwind
            <div key={receta.id} className="bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-500 hover:shadow-green-300/50 hover:scale-[1.02]">
              
              {/* Imagen con fallback */}
              <img 
                src={receta.image} 
                alt={receta.title} 
                className="w-full h-48 object-cover" 
                // Fallback para imágenes que no carguen
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://placehold.co/400x300/94A3B8/FFFFFF?text=Imagen+no+disponible";
                }}
              />
              
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-green-600 mb-3">{receta.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{receta.description}</p>
                
                {/* Detalles de la receta */}
                <div className="space-y-4">
                  
                  {/* Ingredientes */}
                  <div className="receta-details">
                    <h4 className="font-bold text-lg text-green-700 mb-2 border-b border-green-100 pb-1">Ingredientes:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 pl-4">
                      {receta.ingredients.map((ingrediente, index) => (
                        <li key={index}>{ingrediente}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Preparación */}
                  <div className="receta-details">
                    <h4 className="font-bold text-lg text-green-700 mb-2 border-b border-green-100 pb-1">Preparación:</h4>
                    <ol className="list-decimal list-inside space-y-1 text-sm text-gray-700 pl-4">
                      {receta.preparation.map((paso, index) => (
                        <li key={index}>{paso}</li>
                      ))}
                    </ol>
                  </div>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recetas;
