import { Router } from "express";
import fs from "fs";
import { socketServer } from "../app.js";

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

    res.render("home", {products});
});

//Real time products
router.get("/realtimeproducts", async (req, res) => {
    let products = [];

    if (fs.existsSync(path)) {
        let productsJSON = await fs.promises.readFile(path, "utf-8");
        let productsParse = JSON.parse(productsJSON);
        products = productsParse;
    }

    socketServer.on("connection", socket => {
        console.log("Usuario Conectado");

        socket.on("nuevoProducto", producto => {
            products.push(producto);
            socketServer.emit("productos", products);
        })
    })

    res.render("realTimeProducts", {products});
})

export default router;