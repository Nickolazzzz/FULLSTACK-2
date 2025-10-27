import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../data/db'; // Importamos la función de la DB simulada

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(true);

    // Cargar productos al montar el componente
    useEffect(() => {
        setLoading(true);
        getProducts()
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error al cargar productos:", err);
                setLoading(false);
            });
    }, []); // El array vacío asegura que se ejecute solo una vez

    const filteredProducts = products.filter(p => filter === 'all' || p.category === filter);

    return (
        <>
            <section className="text-center mb-12 p-8 bg-green-50 rounded-2xl shadow-inner">
                <h2 className="text-4xl font-extrabold text-green-800 mb-4">La Frescura de HuertoHogar</h2>
                <p className="text-lg text-gray-600">Directo de la tierra a tu mesa, con la calidad y frescura que nos caracteriza.</p>
            </section>

            <section id="catalogo" className="mb-12">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
                    <h2 className="text-3xl font-bold text-green-700 mb-4 sm:mb-0">Catálogo de Productos</h2>
                    <div className="flex space-x-2">
                        {/* Botones de Filtro */}
                        {['all', 'frutas', 'verduras'].map(category => (
                            <button 
                                key={category}
                                type="button"
                                className={`px-4 py-2 rounded-full font-medium transition capitalize ${filter === category ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                onClick={() => setFilter(category)}
                            >
                                {category === 'all' ? 'Todos' : category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Grid de Productos */}
                {loading ? (
                    <p className="text-center text-gray-500">Cargando productos...</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </>
    );
};

export default Home;
