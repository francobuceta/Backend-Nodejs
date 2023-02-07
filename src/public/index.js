const socketClient = io();

const formulario = document.getElementById("formulario");
const input = document.getElementById("input");
let container = document.getElementById("container");

formulario.onsubmit = e => {
    e.preventDefault();
    let nombreProducto = input.value;

    producto = {
        title: nombreProducto
    }

    socketClient.emit("nuevoProducto", producto);
}

socketClient.on("productos", products => {
    const productsRender = products.map(elem => {
        return `<span>Producto: <b>${elem.title}</b></span><br>`
    }).join(" ");

    container.innerHTML = productsRender;
})

