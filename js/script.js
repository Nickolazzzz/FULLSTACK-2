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



  // ================= CARRITO: Añadir productos =================

  const addToCartButtons = document.querySelectorAll('.btn-add-to-cart');
  let cartItemCount = 0;

  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const productItem = event.target.closest('.product-item');
      const productName = productItem.querySelector('h3').textContent;
      cartItemCount++;
      const cartButton = document.querySelector('.cart-button .btn');
      cartButton.textContent = `Mi Carrito (${cartItemCount})`;
      alert(`"${productName}" ha sido añadido a tu carrito.`);
    });
  });



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



      // Guardar en localStorage (simulación, no seguro para producción)

      const user = { username, email, password };
      localStorage.setItem('usuario', JSON.stringify(user));

      alert(`¡Bienvenido ${username}! Te has registrado con éxito.`);
      registerForm.reset();
    });
  }
});
