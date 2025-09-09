document.addEventListener('DOMContentLoaded', () => {

    // ================= CATÁLOGO: Filtrado de productos =================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const category = button.dataset.category;

            productItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // ================= CARRITO: Lógica con localStorage =================

    const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
    const cartButton = document.querySelector('.cart-button .btn');

    // Cargar el carrito desde localStorage o inicializar un array vacío
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartButtonCount();

    // Lógica para la página index.html
    if (addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productItem = event.target.closest('.product-item');
                const productName = productItem.querySelector('h3').textContent;
                const priceText = productItem.querySelector('p:first-of-type').textContent;
                const productImageSrc = productItem.querySelector('img').src;
                
                // Crea un ID único para el producto a partir de su categoría y nombre
                const productId = productItem.dataset.category + '-' + productName;

                // Extraer el precio numérico
                const price = parseInt(priceText.replace('Precio: $', '').replace(/ CLP\/Kg| CLP por bolsa de 500g| CLP por kilo| CLP\/Frasco \(500g\)| CLP la docena|,/g, ''));

                const product = {
                    id: productId,
                    name: productName,
                    price: price,
                    imageSrc: productImageSrc,
                    quantity: 1
                };

                const existingProduct = cart.find(item => item.id === product.id);
                if (existingProduct) {
                    existingProduct.quantity++;
                } else {
                    cart.push(product);
                }

                saveCart();
                updateCartButtonCount();
                alert(`"${product.name}" ha sido añadido a tu carrito.`);
            });
        });
    }

    // Función para guardar el carrito en localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Función para actualizar el contador del botón del carrito
    function updateCartButtonCount() {
        if (cartButton) {
            const totalItems = cart.reduce((sum, product) => sum + product.quantity, 0);
            cartButton.textContent = `Mi Carrito (${totalItems})`;
        }
    }

    // Lógica para la página carrito.html
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    if (cartItemsContainer) {
        renderCart();
    }

    // Función para renderizar el carrito
    function renderCart() {
        cartItemsContainer.innerHTML = ''; // Limpiar el contenedor
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart-message">Tu carrito está vacío.</p>`;
            cartTotalElement.textContent = '';
            return;
        }

        cart.forEach(product => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="${product.imageSrc}" alt="${product.name}">
                    <div class="cart-item-details">
                        <h4>${product.name}</h4>
                        <p>Precio: $${product.price.toLocaleString('es-CL')}</p>
                        <p>Cantidad: ${product.quantity}</p>
                    </div>
                </div>
                <div class="cart-item-actions">
                    <button class="remove-btn" data-id="${product.id}">Eliminar</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        updateCartTotal();
        attachRemoveListeners();
    }

    // Función para actualizar el total
    function updateCartTotal() {
        const total = cart.reduce((sum, product) => sum + (product.price * product.quantity), 0);
        cartTotalElement.innerHTML = `Total: <strong>$${total.toLocaleString('es-CL')} CLP</strong>`;
    }

    // Función para adjuntar event listeners a los botones de eliminar
    function attachRemoveListeners() {
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.dataset.id;
                
                cart = cart.filter(product => product.id !== productId);
                
                saveCart();
                renderCart();
                updateCartButtonCount();
            });
        });
    }
    
    // ================= REGISTRO DE USUARIO =================

    const registerForm = document.getElementById('register-form');

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            // Validaciones básicas
            if (username.length < 3) {
                alert("El nombre de usuario debe tener al menos 3 caracteres.");
                return;
            }
            if (!email.includes('@') || !email.includes('.')) {
                alert("Introduce un correo válido.");
                return;
            }
            if (password.length < 6) {
                alert("La contraseña debe tener al menos 6 caracteres.");
                return;
            }

            alert("Registro exitoso.");
        });
    }

   
   
   
   
   
    // ================= PÁGINA DE CONTACTO =================

    // Validación del formulario de contacto
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            let allFieldsValid = true;
            const formInputs = contactForm.querySelectorAll('input[required]');
            
            formInputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid-field');
                    allFieldsValid = false;
                } else {
                    input.classList.remove('invalid-field');
                }
            });

            if (allFieldsValid) {
                alert('Mensaje enviado. ¡Nos pondremos en contacto contigo pronto!');
                contactForm.reset();
            }
        });
    }
    
    // Renderización e interactividad de sucursales
    const sucursalesListContainer = document.getElementById('sucursales-list');
    const mapIframe = document.querySelector('#map-container iframe');
    
    // Datos de sucursales
    const sucursales = [
        { ciudad: "Santiago", direccion: "Av. Principal 123, Santiago", lat: -33.424364, lng: -70.618625 },
        { ciudad: "Viña del Mar", direccion: "Calle Valparaíso 456, Viña del Mar", lat: -33.023246, lng: -71.551982 },
        { ciudad: "Valparaíso", direccion: "Subida al Cerro Alegre 789, Valparaíso", lat: -33.045876, lng: -71.614828 },
        { ciudad: "Concepción", direccion: "O'Higgins 321, Concepción", lat: -36.827626, lng: -73.050520 },
        { ciudad: "Puerto Montt", direccion: "Ruta 5 Sur Km. 1040, Puerto Montt", lat: -41.472945, lng: -72.937901 }
    ];

    if (sucursalesListContainer) {
        sucursales.forEach(sucursal => {
            const sucursalItem = document.createElement('div');
            sucursalItem.classList.add('sucursal-item');
            sucursalItem.dataset.lat = sucursal.lat;
            sucursalItem.dataset.lng = sucursal.lng;
            sucursalItem.innerHTML = `
                <h4>${sucursal.ciudad}</h4>
                <p>${sucursal.direccion}</p>
            `;
            sucursalesListContainer.appendChild(sucursalItem);
        });

        const sucursalItems = document.querySelectorAll('.sucursal-item');
        sucursalItems.forEach(item => {
            item.addEventListener('click', () => {
                const lat = item.dataset.lat;
                const lng = item.dataset.lng;
                
                // Actualizar el mapa
                const newSrc = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.170668383344!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sHuertoHogar%20${item.querySelector('h4').textContent}!5e0!3m2!1sen!2sus!4v1625078400000!5m2!1sen!2sus`;
                mapIframe.src = newSrc;
            });
        });
    }

});
