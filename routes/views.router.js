import { Router } from "express";
import fs from "fs";
import { socketServer } from "../app.js";
import { messagesModel } from "../src/dao/models/messages.model.js";

const router = Router();
const path = "./files/products.json";

//Rutas

//Ruta raiz
router.get("/", async (req, res) => {
    let products = [];

    if (fs.existsSync(path)) {
        let productsJSON = await fs.promises.readFile(path, "utf-8");
        let productsParse = JSON.parse(productsJSON);
        products = productsParse;
    }

    res.render("home", { products });
});

//Real time products

/* router.get("/realtimeproducts", async (req, res) => {
    let products = [];

    if (fs.existsSync(path)) {
        let productsJSON = await fs.promises.readFile(path, "utf-8");
        let productsParse = JSON.parse(productsJSON);
        products = productsParse;
    }

    socketServer.on("connection", (socket) => {
        console.log("Usuario Conectado");

        socket.on("nuevoProducto", (producto) => {
            products.push(producto);
            socketServer.emit("productos", products);
        });
    });

    res.render("realTimeProducts", { products });
}); */

//Chat Mongo

router.get("/chatMongo", async (req, res) => {
    let chat = [];

    socketServer.on("connection", (socket) => {
        console.log("Usuario Conectado");

        socket.on("nuevoChat", async (obj) => {
            chat.push(obj);
            socketServer.emit("productosChat", chat);

            try {
                const newChat = await messagesModel.create(obj);
                console.log("Nuevo chat agregado a la base de datos:", newChat);
            } catch (error) {
                console.log("Error al agregar el chat a la base de datos:", error);
            }
        });
    });
    console.log(chat);
    res.render("chat", { chat });
});

export default router;
