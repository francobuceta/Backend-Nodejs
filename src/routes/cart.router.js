import { Router } from "express";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import { isUser } from "../dao/middlewares/middlewares.js";
import { discountStock } from "../dao/middlewares/middlewares.js";
import { createTicketController } from "../controllers/ticket.controller.js";
import {
    getCartByIdController,
    createCartController,
    addProductToCartController,
    updateCartProductsByArrayController,
    updateQuantityByQueryController,
    deleteProductInCartController,
    emptyCartController
} from "../controllers/cart.controllers.js";


const router = Router();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

//Rutas
//Consultar carrito por ID

/* router.get("/:cid", getCartByIdController); */

router.get("/userCart", async (req, res) => {
    res.redirect("/views/cartUser");
})

//Crear carrito
router.post("/", createCartController);

//Agregar producto a carrito
router.post("/:cid/product/:pid", passport.authenticate("jwt", {session: false}), isUser, addProductToCartController);

//Actualizar carrito con arreglo de productos
router.put("/:cid", updateCartProductsByArrayController);

//Actualizar cantidad de producto
router.put("/:cid/product/:pid", updateQuantityByQueryController);

//Eliminar producto del carrito
router.delete("/:cid/product/:pid", deleteProductInCartController);

//Eliminar todos los productos del carrito
router.delete("/:cid", emptyCartController);

//Finalizar compra
router.get("/:cid/purchase", discountStock, createTicketController);



export default router;