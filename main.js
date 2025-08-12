let carrito = [];
let botonCarrito = document.getElementById("cart-btn");
let botonCerrar = document.getElementById("close-cart");
let panelCarrito = document.getElementById("cart");
let listaCarrito = document.getElementById("cart-items");
let textoVacio = document.getElementById("empty-cart");
let totalCarrito = document.getElementById("cart-total");
let botonesAgregar = document.querySelectorAll(".add-to-cart");

document.addEventListener("DOMContentLoaded", function () {
    let guardado = localStorage.getItem("carrito");
    if (guardado) {
        carrito = JSON.parse(guardado);
        mostrarCarrito();
    }
});

botonCarrito.addEventListener("click", function () {
    panelCarrito.classList.add("open");
});

botonCerrar.addEventListener("click", function () {
    panelCarrito.classList.remove("open");
});

botonesAgregar.forEach(function (boton) {
    boton.addEventListener("click", function () {
        let nombre = boton.getAttribute("data-nombre");
        let precio = parseInt(boton.getAttribute("data-precio"));
        let producto = { nombre: nombre, precio: precio };

        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        mostrarCarrito();
    });
});

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        textoVacio.style.display = "block";
        totalCarrito.textContent = "";
    } else {
        textoVacio.style.display = "none";

        let total = 0;

        for (let i = 0; i < carrito.length; i++) {
            let li = document.createElement("li");
            li.textContent = carrito[i].nombre + " - $" + carrito[i].precio.toLocaleString("es-AR");
            listaCarrito.appendChild(li);
            total += carrito[i].precio;
        }

        totalCarrito.textContent = "Total a pagar: $" + total.toLocaleString("es-AR");
    }
}