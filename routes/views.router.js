import { Router } from "express";
import fs from "fs";
import { socketServer } from "../app.js";
import { messagesModel } from "../src/dao/models/messages.model.js";
import ProductManager from "../src/dao/mongoManagers/productManager.js";
import CartManager from "../src/dao/mongoManagers/cartManager.js";

const router = Router();
const path = "./files/products.json";
const product = new ProductManager();
const cart = new CartManager();

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



//Ruta products hdb

router.get("/products", async (req, res) => {
    try {
        const products = await product.getProducts();
        res.render("products", { products });
    } catch (error) {
        console.log(error);
    }
});

//Carrito
router.get("/carts/:cid", async (req, res) => {
    const {cid} = req.params;

    try {
        const getCart = await cart.getCartById(cid);
        
        let arrayProducts = getCart[0].products;

        res.render("cart", { arrayProducts });
    } catch (error) {
        console.log(error);
    }
});


export default router;
