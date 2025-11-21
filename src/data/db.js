// SIMULACION DE BASE DE DATOS

let products = [
  {
    id: 'FR001',
    name: 'Manzanas Fuji',
    price: 1100,
    stock: 150,
    category: 'frutas',
    imageSrc: 'images/manzanas-fuji.jpg'
  },
  {
    id: 'VR001',
    name: 'Zanahorias Orgánicas',
    price: 900,
    stock: 100,
    category: 'tubérculos',
    imageSrc: 'images/zanahorias-organicas.jpg'
  },
  {
    id: 'VR002',
    name: 'Espinacas Frescas',
    price: 700,
    stock: 80,
    category: 'hojas',
    imageSrc: 'images/espinacas-frescas.jpg'
  },
  {
    id: 'VR003',
    name: 'Pimientos Tricolores',
    price: 1500,
    stock: 120,
    category: 'verduras',
    imageSrc: 'images/pimientos-tricolores.jpg'
  },
  {
    id: 'PO001',
    name: 'Miel Orgánica',
    price: 5000,
    stock: 50,
    category: 'despensa',
    imageSrc: 'images/miel-organica.jpg'
  },
];



// (R)EAD
export const getProducts = () => {

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...products]);
    }, 100);
  });
};

// (C)REATE 
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

// (U)PDATE 
export const updateProduct = (id, productData) => {
  return new Promise((resolve) => {
    products = products.map(p =>
      p.id === id ? { ...p, ...productData, price: Number(productData.price), stock: Number(productData.stock) } : p
    );
    resolve(products.find(p => p.id === id));
  });
};

// (D)ELETE 
export const deleteProduct = (id) => {
  return new Promise((resolve) => {
    products = products.filter(p => p.id !== id);
    resolve({ success: true, id: id });
  });
};





export const sucursalesData = [
  { id: 1, ciudad: "Santiago (Sede Central)", direccion: "Av. Las Condes 1234, Santiago", lat: -33.4378, lng: -70.6504 },
  { id: 2, ciudad: "Valparaíso", direccion: "Plaza Sotomayor 500, Valparaíso", lat: -33.0472, lng: -71.6127 },
  { id: 3, ciudad: "Concepción", direccion: "Calle Barros Arana 990, Concepción", lat: -36.8277, lng: -73.0504 },
];
