let carrito = [];
const botonCarrito = document.getElementById("cart-btn");
const botonCerrar = document.getElementById("close-cart");
const panelCarrito = document.getElementById("cart");
const listaCarrito = document.getElementById("cart-items");
const textoVacio = document.getElementById("empty-cart");
const totalCarrito = document.getElementById("cart-total");
const emptyBtn = document.getElementById("empty-btn");

const header = document.getElementById("header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) { 
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// Ventana de bienvenida
const welcomeModal = document.getElementById("welcome-modal");
const closeWelcome = document.getElementById("close-welcome");
const registerBtn = document.getElementById("register-btn");

// Funciones del carrito

document.addEventListener("DOMContentLoaded", () => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
        carrito = JSON.parse(guardado);
        mostrarCarrito();
    }
});

botonCarrito.addEventListener("click", () => panelCarrito.classList.add("open"));
botonCerrar.addEventListener("click", () => panelCarrito.classList.remove("open"));
emptyBtn.addEventListener("click", vaciarCarrito);

const botonesAgregar = document.querySelectorAll(".add-to-cart");
botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.getAttribute("data-nombre");
        const precio = parseInt(boton.getAttribute("data-precio"));
        agregarAlCarrito(nombre, precio);
        animarAgregar(boton);
        notificacionToast(nombre);
    });
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
    const productoExistente = carrito.find(item => item.nombre === nombre);
    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para eliminar un producto
function eliminarProducto(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
}

// Vaciar carrito
function vaciarCarrito() {
    if (carrito.length === 0) return;
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Se eliminarán todos los productos del carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#4a101a',
        cancelButtonColor: '#c12d3c',
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar',
        background: '#6b0b1f',
        color: '#fff'
    }).then((result) => {
        if (result.isConfirmed) {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarCarrito();
            Swal.fire({
                title: 'Carrito vacío',
                icon: 'success',
                showConfirmButton: false,
                timer: 1200,
                background: '#6b0b1f',
                color: '#fff'
            });
        }
    });
}

// Mostrar carrito en HTML
function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        textoVacio.style.display = "block";
        totalCarrito.textContent = "";
    } else {
        textoVacio.style.display = "none";
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nombre} - $${item.precio.toLocaleString("es-AR")} x ${item.cantidad} 
                <button class="delete-btn" data-nombre="${item.nombre}">Eliminar</button>
            `;
            listaCarrito.appendChild(li);
            total += item.precio * item.cantidad;
        });

        totalCarrito.textContent = "Total a pagar: $" + total.toLocaleString("es-AR");

        // Botones eliminar
        const deleteBtns = document.querySelectorAll(".delete-btn");
        deleteBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                eliminarProducto(btn.getAttribute("data-nombre"));
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
}

// Animaciones
function animarAgregar(boton) {
    boton.classList.add("anim");
    botonCarrito.classList.add("bounce");
    setTimeout(() => {
        boton.classList.remove("anim");
        botonCarrito.classList.remove("bounce");
    }, 400);
}

// Notificación con SweetAlert al agregar producto
function notificacionToast(nombre) {
    Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: `${nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1500,
        background: '#6b0b1f',
        color: '#fff'
    });
}

// Ventana de bienvenida
window.addEventListener("load", () => {
    welcomeModal.style.display = "flex";
});

closeWelcome.addEventListener("click", () => {
    welcomeModal.style.display = "none";
});

registerBtn.addEventListener("click", () => {
    Swal.fire({
        title: '¡Registro!',
        text: 'Formulario de registro aún no implementado.',
        icon: 'info',
        confirmButtonText: 'Cerrar',
        background: '#6b0b1f',
        color: '#fff',
        confirmButtonColor: '#4a101a'
    });
    welcomeModal.style.display = "none";
});
