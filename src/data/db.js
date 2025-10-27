// --- SIMULACIÓN DE BASE DE DATOS (IE2.1.2) ---

// Estado inicial de los productos
let products = [
    { id: 'FR001', name: 'Manzanas Fuji', price: 1200, stock: 150, category: 'frutas', imageSrc: 'https://placehold.co/150x150/DC2626/FFFFFF?text=Manzana' },
    { id: 'VR001', name: 'Zanahorias Orgánicas', price: 900, stock: 100, category: 'verduras', imageSrc: 'https://placehold.co/150x150/FBBF24/000000?text=Zanahoria' },
    { id: 'FR002', name: 'Plátanos Cavendish', price: 1500, stock: 80, category: 'frutas', imageSrc: 'https://placehold.co/150x150/3B82F6/FFFFFF?text=Plátano' },
    { id: 'VR002', name: 'Lechuga Especiada', price: 850, stock: 120, category: 'verduras', imageSrc: 'https://placehold.co/150x150/10B981/FFFFFF?text=Lechuga' },
    { id: 'VR003', name: 'Tomates Chilenos', price: 1300, stock: 95, category: 'verduras', imageSrc: 'https://placehold.co/150x150/EF4444/FFFFFF?text=Tomate' },
];

// --- FUNCIONES CRUD (IE2.1.2) ---

// (R)EAD - Leer todos los productos
export const getProducts = () => {
    // Simulamos una llamada asíncrona (como fetch)
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...products]); // Devuelve una copia para evitar mutaciones
        }, 100); // 100ms de retraso
    });
};

// (C)REATE - Añadir un nuevo producto
export const addProduct = (productData) => {
    return new Promise((resolve) => {
        const newProduct = {
            ...productData,
            id: 'NEW' + Date.now(), // ID temporal
            price: Number(productData.price),
            stock: Number(productData.stock),
        };
        products = [...products, newProduct];
        resolve(newProduct);
    });
};

// (U)PDATE - Actualizar un producto existente
export const updateProduct = (id, productData) => {
    return new Promise((resolve) => {
        products = products.map(p =>
            p.id === id ? { ...p, ...productData, price: Number(productData.price), stock: Number(productData.stock) } : p
        );
        resolve(products.find(p => p.id === id));
    });
};

// (D)ELETE - Eliminar un producto
export const deleteProduct = (id) => {
    return new Promise((resolve) => {
        products = products.filter(p => p.id !== id);
        resolve({ success: true, id: id });
    });
};

// Datos de Sucursales (para página de Contacto)
export const sucursalesData = [
    { id: 1, ciudad: "Santiago (Sede Central)", direccion: "Av. Las Condes 1234, Santiago", lat: -33.4378, lng: -70.6504 },
    { id: 2, ciudad: "Valparaíso", direccion: "Plaza Sotomayor 500, Valparaíso", lat: -33.0472, lng: -71.6127 },
    { id: 3, ciudad: "Concepción", direccion: "Calle Barros Arana 990, Concepción", lat: -36.8277, lng: -73.0504 },
];
