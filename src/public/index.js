const socketClient = io();

/* const formulario = document.getElementById("formulario");
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
}); */


//Chat desafio opcional

const formularioChat = document.getElementById("formularioChat");
const inputChat = document.getElementById("inputChat");
const inputChat2 = document.getElementById("inputChat2");
let containerChat = document.getElementById("containerChat");

formularioChat.onsubmit = e => {
    e.preventDefault();
    let usuarioEmail = inputChat.value;
    let mensaje = inputChat2.value;

    obj = {
        user: usuarioEmail,
        message: mensaje
    }
    console.log(obj);

    socketClient.emit("nuevoChat", obj);
}

socketClient.on("productosChat", obj => {
    const chatRender = obj.map(elem => {
        return `<div>
                    <span>Usuario: <b>${elem.user}</b></span><br>
                    <span>Mensaje: <b>${elem.message}</b></span><br>
                </div>`
    }).join(" ");

    containerChat.innerHTML = chatRender;
});

