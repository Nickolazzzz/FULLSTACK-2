import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../data/db.js';
import ProductCard from '../components/ProductCard.jsx';
import { Search, Loader2, Leaf, Truck, Users } from 'lucide-react';


const valoresData = [
  {
    icon: <Leaf className="w-12 h-12 text-green-600" />,
    title: "Sembrado con Pasión",
    description: "Calidad y frescura desde el origen."
  },
  {
    icon: <Truck className="w-12 h-12 text-green-600" />,
    title: "Directo a tu Hogar",
    description: "Sostenibilidad en cada entrega."
  },
  {
    icon: <Users className="w-12 h-12 text-green-600" />,
    title: "Apoyo Local",
    description: "Soporte a Pymes y agricultores."
  }
];


const categories = ['Todas', 'Verduras', 'Hojas', 'Tubérculos', 'Despensa'];

const Home = () => {
  // Asegurarse de que el estado inicial es un ARRAY VACÍO
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('Todas');

  //Asegurarse de que los datos se cargan correctamente
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const data = await getProducts();


        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Error: getProducts() no devolvió un array.", data);
          setError("Los datos de productos no son válidos.");
        }
      } catch (err) {
        setError("No se pudieron cargar los productos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);


  const filteredProducts = products
    .filter(product => {
      // Filtro de Categoría
      return filterCategory === 'Todas' || product.category === filterCategory;
    })
    .filter(product => {
      // Filtro de Busqueda
      return product.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
    <main className="font-sans">

      {/* ===== SECCIÓN HERO ===== */}
      <section className="relative h-[900px] md:h-[800px] bg-green-900 flex items-center justify-center text-black overflow-hidden shadow-xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(images/familia-huerto1.png)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center p-6">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 font-display drop-shadow-lg text-white">
            ¡Descubre la frescura!
          </h1>
          <p className="text-lg md:text-2xl font-medium drop-shadow-md mb-10 text-gray-100 max-w-2xl mx-auto">
            Conéctate con la naturaleza y lleva lo mejor del campo a tu mesa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#catalogo"
              className="bg-yellow-400 text-gray-900 font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-300 transition duration-300 shadow-lg transform hover:scale-105"
            >
              Explorar Catálogo
            </a>
            <Link
              to="/contacto"
              className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-green-900 transition duration-300"
            >
              Únete Ahora
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN VALORES ===== */}
      <section id="valores" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12 font-display">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {valoresData.map((valor) => (
              <div key={valor.title} className="p-8 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-100 rounded-full">
                    {valor.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{valor.title}</h3>
                <p className="text-gray-600 leading-relaxed">{valor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SECCIÓN CATÁLOGO ===== */}
      <section id="catalogo" className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 font-display">Catálogo de Productos</h2>


          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center items-center">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <input
                type="text"
                placeholder="Buscar productos (ej. Tomates, Miel...)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-300 rounded-full focus:ring-green-500 focus:border-green-500 transition shadow-sm"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`py-2 px-4 rounded-full font-medium text-sm transition ${filterCategory === category
                    ? 'bg-green-600 text-white shadow-md'
                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>


          {loading && (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="w-12 h-12 text-green-600 animate-spin" />
              <p className="ml-4 text-xl text-gray-600">Cargando productos...</p>
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full text-center py-10 bg-red-100 text-red-700 rounded-lg">
              <p className="text-xl">{error}</p>
            </div>
          )}


          {!loading && !error && filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-xl text-gray-600">No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
