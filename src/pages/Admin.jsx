import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../data/db';
import { Edit3, XCircle, PlusCircle } from 'lucide-react';

const Admin = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    // Cargar productos al inicio
    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
    };

    // Abrir formulario para editar
    const handleEdit = (product) => {
        setCurrentProduct(product);
        setIsEditing(true);
    };

    // Abrir formulario para crear
    const handleCreate = () => {
        setCurrentProduct({ name: '', price: 0, stock: 0, category: 'frutas', imageSrc: '', isNew: true });
        setIsEditing(true);
    };

    // Eliminar producto
    const handleDelete = async (id) => {
        if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
            await deleteProduct(id);
            await loadProducts(); // Recargar lista
            alert('Producto eliminado.');
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold text-red-600 mb-8 border-b pb-2">
                Panel de Administración (Rol: Administrador/Vendedor)
            </h2>
            
            <div className="flex justify-end mb-4">
                <button
                    type="button"
                    onClick={handleCreate}
                    className="flex items-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    Añadir Nuevo Producto
                </button>
            </div>

            {/* Modal/Formulario de Edición */}
            {isEditing && (
                <AdminForm 
                    product={currentProduct}
                    onSave={async () => {
                        await loadProducts();
                        setIsEditing(false);
                        setCurrentProduct(null);
                    }}
                    onCancel={() => {
                        setIsEditing(false);
                        setCurrentProduct(null);
                    }}
                />
            )}

            {/* Lista de Productos */}
            {loading ? (
                <p>Cargando productos...</p>
            ) : (
                <ProductList products={products} onEdit={handleEdit} onDelete={handleDelete} />
            )}
        </div>
    );
};

// Formulario de Administración (Componente interno)
const AdminForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.isNew) {
            await addProduct(formData);
            alert('Producto Añadido');
        } else {
            await updateProduct(formData.id, formData);
            alert('Producto Actualizado');
        }
        onSave();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-lg">
                <h3 className="text-xl font-semibold text-red-700 mb-4">
                    {formData.isNew ? 'Crear Nuevo Producto' : 'Editar Producto'}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Nombre" required className="w-full p-2 border rounded" />
                    <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Precio (CLP)" required className="w-full p-2 border rounded" />
                    <input type="number" name="stock" value={formData.stock} onChange={handleChange} placeholder="Stock (Kg)" required className="w-full p-2 border rounded" />
                    <select name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="frutas">Fruta</option>
                        <option value="verduras">Verdura</option>
                    </select>
                    <input type="text" name="imageSrc" value={formData.imageSrc} onChange={handleChange} placeholder="URL de Imagen" className="w-full p-2 border rounded" />
                    
                    <div className="flex space-x-2 mt-4">
                        <button type="submit" className="flex-1 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition">
                            Guardar Cambios
                        </button>
                        <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition">
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// Lista de Productos (Componente interno)
const ProductList = ({ products, onEdit, onDelete }) => (
    <div className="md:col-span-2">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Lista de Productos ({products.length})</h3>
        <div className="space-y-3">
            {products.map(product => (
                <div key={product.id} className="flex items-center justify-between p-3 bg-white border rounded-xl shadow-sm">
                    <div className="flex-1">
                        <p className="font-bold text-gray-800">{product.name} ({product.id})</p>
                        <p className="text-sm text-gray-500">${product.price.toLocaleString('es-CL')} | Stock: {product.stock} Kg</p>
                    </div>
                    <div className="space-x-2">
                        <button type="button" className="text-blue-500 hover:text-blue-700 p-2 rounded" onClick={() => onEdit(product)} aria-label={`Editar ${product.name}`}>
                            <Edit3 className="w-5 h-5" />
                        </button>
                        <button type="button" className="text-red-500 hover:text-red-700 p-2 rounded" onClick={() => onDelete(product.id)} aria-label={`Eliminar ${product.name}`}>
                            <XCircle className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default Admin;
