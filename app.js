import express from 'express';
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";
import ViewsRouter from "./routes/views.router.js";
import { __dirname } from "./src/dirname.js";
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import "./src/dao/dbConfig.js";

//Servidor
const app = express(); 

//Configuracion inicial express
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Redireccionamiento a los archivos
app.use("/api", ViewsRouter);
app.use("/api/products", ProductsRouter);
app.use("/api/cart", CartRouter);

//Ruta absoluta
app.use(express.static(__dirname + "/public"));

//Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");



//HTTP server
const httpServer = app.listen(8080, () => {
    console.log("Escuchando puerto");
});

//Socket server
export const socketServer = new Server(httpServer);

