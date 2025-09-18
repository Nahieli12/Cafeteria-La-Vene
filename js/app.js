// ==========================
// Datos de productos
// ==========================
const productos = [
  { nombre: "Pastel Red Velvet", precio: 7500, categoria: "dulces", img: "img/redvelvet-pastel.avif" },
  { nombre: "Media Luna con Jamón y Queso", precio: 3800, categoria: "salados", img: "img/medialuna.jpg" },
  { nombre: "Avocado Toast", precio: 6200, categoria: "salados", img: "img/avocadotoast.jpg" },
  { nombre: "Croissant", precio: 3700, categoria: "dulces", img: "img/croissants.jpg" },
  { nombre: "Tortitas Raspaditas", precio: 1100, categoria: "dulces", img: "img/tortitas.jfif" },
  { nombre: "Rolls de Canela", precio: 1700, categoria: "dulces", img: "img/rolls-de-canela.jpg" },
  { nombre: "Chipa", precio: 1500, categoria: "salados", img: "img/chipa.webp" },
  { nombre: "Chocotorta", precio: 8500, categoria: "dulces", img: "img/chocotorta.png" },
  { nombre: "Cheesecake", precio: 8200, categoria: "dulces", img: "img/cheesecake.jpg" },
  { nombre: "Lemon Pie", precio: 8000, categoria: "dulces", img: "img/lemonpie.webp" },
  { nombre: "Facturas", precio: 7700, categoria: "dulces", img: "img/facturas.png" },
  { nombre: "Café con Leche", precio: 1800, categoria: "bebidas", img: "img/café-latte.jfif" },
  { nombre: "Café Americano", precio: 2100, categoria: "bebidas", img: "img/café-americano.jfif" },
  { nombre: "Matcha Latte", precio: 4200, categoria: "bebidas", img: "img/matcha-latte.jfif" },
  { nombre: "Té a elección", precio: 1800, categoria: "bebidas", img: "img/Tea.jfif" }
];

// ==========================
// Variables globales
// ==========================
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const totalDisplay = document.getElementById("total");
const emptyBtn = document.getElementById("empty-btn");
const welcomeModal = document.getElementById("welcome-modal");
const closeWelcome = document.getElementById("close-welcome");

// ==========================
// Mostrar productos
// ==========================
function mostrarProductos(lista) {
  productList.innerHTML = "";
  lista.forEach(producto => {
    const card = document.createElement("section");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${producto.img}" alt="${producto.nombre}">
      <h2>${producto.nombre}</h2>
      <p>Precio: $${producto.precio.toLocaleString("es-AR")}</p>
      <button class="add-to-cart" data-nombre="${producto.nombre}">Agregar al carrito</button>
    `;
    productList.appendChild(card);
  });
  agregarEventosAgregar();
}

// ==========================
// Eventos agregar al carrito
// ==========================
function agregarEventosAgregar() {
  const botones = document.querySelectorAll(".add-to-cart");
  botones.forEach(btn => {
    btn.addEventListener("click", () => {
      const nombre = btn.dataset.nombre;
      const producto = productos.find(p => p.nombre === nombre);
      agregarAlCarrito(producto);
      animarBoton(btn);
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1200,
        background: '#6b0b1f',
        color: '#fff'
      });
    });
  });
}

// ==========================
// Agregar al carrito
// ==========================
function agregarAlCarrito(producto) {
  const item = carrito.find(p => p.nombre === producto.nombre);
  if(item) item.cantidad++;
  else carrito.push({ ...producto, cantidad: 1 });
  guardarCarrito();
  mostrarCarrito();
}

// ==========================
// Guardar carrito
// ==========================
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// ==========================
// Mostrar carrito
// ==========================
function mostrarCarrito() {
  cartItems.innerHTML = "";
  let total = 0;
  carrito.forEach(item => {
    total += item.precio * item.cantidad;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} x ${item.cantidad} - $${(item.precio * item.cantidad).toLocaleString("es-AR")}
      <button class="del-btn" data-nombre="${item.nombre}">❌</button>
    `;
    cartItems.appendChild(li);
  });
  totalDisplay.textContent = total.toLocaleString("es-AR");

  const delBtns = document.querySelectorAll(".del-btn");
  delBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      carrito = carrito.filter(p => p.nombre !== btn.dataset.nombre);
      guardarCarrito();
      mostrarCarrito();
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'info',
        title: 'Producto eliminado',
        showConfirmButton: false,
        timer: 1200,
        background: '#6b0b1f',
        color: '#fff'
      });
    });
  });
}

// ==========================
// Vaciar carrito
// ==========================
emptyBtn.addEventListener("click", () => {
  if(carrito.length === 0) return;
  Swal.fire({
    title: '¿Vaciar carrito?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar',
    background: '#6b0b1f',
    color: '#fff'
  }).then(res => {
    if(res.isConfirmed) {
      carrito = [];
      guardarCarrito();
      mostrarCarrito();
    }
  });
});

// ==========================
// Animaciones
// ==========================
function animarBoton(btn) {
  btn.classList.add("anim");
  cartBtn.classList.add("bounce");
  setTimeout(() => {
    btn.classList.remove("anim");
    cartBtn.classList.remove("bounce");
  }, 400);
}

// Header scroll
const header = document.getElementById("main-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// ==========================
// Barra de búsqueda
// ==========================
searchInput.addEventListener("input", filtrarProductos);
categoryFilter.addEventListener("change", filtrarProductos);

function filtrarProductos() {
  const term = searchInput.value.toLowerCase();
  const category = categoryFilter.value;
  const filtrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(term) &&
    (category === "all" || p.categoria === category)
  );
  mostrarProductos(filtrados);
}

// ==========================
// Carrito lateral
// ==========================
cartBtn.addEventListener("click", () => cart.classList.toggle("open"));
const closeCartBtn = document.getElementById("close-cart");
const cartPanel = document.getElementById("cart");

closeCartBtn.addEventListener("click", () => {
    cartPanel.classList.remove("open");
});

// ==========================
// Modal bienvenida
// ==========================
window.addEventListener("load", () => welcomeModal.style.display = "flex");
closeWelcome.addEventListener("click", () => welcomeModal.style.display = "none");

// ==========================
// Inicialización
// ==========================
mostrarProductos(productos);
mostrarCarrito();

// Registro de usuario
const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // evita que recargue la página
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Guardar en localStorage (simulación)
    localStorage.setItem("user", JSON.stringify({ username, password }));

    Swal.fire({
        title: '¡Registro exitoso!',
        text: `Hola ${username}, ahora recibirás novedades y promociones.`,
        icon: 'success',
        confirmButtonColor: '#4a101a',
        background: '#6b0b1f',
        color: '#fff'
    });

    // Ocultar modal
    welcomeModal.style.display = "none";
});

