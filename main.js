let bandera = true;
let total = 0;

let listaDeProductos = "Nuestro menú cafetero:\n1 - Café: 300$\n2 - Café con leche 800$\n3 - Americano 3600$\n4 - Cappuccino 3800$\n5 - Latte 4000$\n6 - Mocachino 4500$\n7 - Caramel Latte 5000$\n8 - Matcha Latte 4500$\n9 - Chocolate 3000$\n10 - Submarino 3000$";

while (bandera) {
    let opciones = Number(prompt("Bienvenido a cafeteria La Vene:\n 1 - Ver productos\n2 - Comprar\n3 - Ver total"));
    
    switch (opciones) {
        case 1:
            alert(listaDeProductos);
            break;

        case 2:
            let Menu = Number(prompt("Ingrese el número del producto que desea comprar:\n\n" + listaDeProductos));
            switch (Menu) {
                case 1:
                    total += 300;
                    alert("¡Espero disfrute su Café!");
                    break;
                case 2:
                    total += 800;
                    alert("¡Espero disfrute su Café con leche!");
                    break;
                case 3:
                    total += 3600;
                    alert("¡Espero disfrute su Americano!");
                    break;
                case 4:
                    total += 3800;
                    alert("¡Espero disfrute su Cappuccino!");
                    break;
                case 5:
                    total += 4000;
                    alert("¡Espero disfrute su Latte!");
                    break;
                case 6:
                    total += 4500;
                    alert("¡Espero disfrute su Mocachino!");
                    break;
                case 7:
                    total += 5000;
                    alert("¡Espero disfrute su Caramel Latte!");
                    break;
                case 8:
                    total += 4500;
                    alert("¡Espero disfrute su Matcha Latte!");
                    break;
                case 9:
                    total += 3000;
                    alert("¡Espero disfrute su Chocolate!");
                    break;
                case 10:
                    total += 3000;
                    alert("¡Espero disfrute su Submarino!");
                    break;
                default:
                    alert("No tenemos stock de ese producto");
            }
            break;

        case 3:
            if (total === 0) {
                alert("No tenés nada en el carrito");
            } else {
                alert("Tu total es de: $" + total);
            }
            break;

        default:
            alert("Esta no es una opción válida");
    }

    bandera = confirm("¿Querés comprar algo más?");
}