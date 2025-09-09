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

    // ================= CARRITO: logica con localStorage =================

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
                const productId = productItem.dataset.category + '-' + productName.split(' ')[0];
                
                // Extraer el precio numérico
                const price = parseInt(priceText.replace('Precio: $', '').replace(/ CLP\/Kg| CLP por bolsa de 500g| CLP\/Frasco \(500g\)|,/g, ''));

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

});
