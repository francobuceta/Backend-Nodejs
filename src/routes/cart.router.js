import { Router } from "express";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
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
router.post("/:cid/product/:pid", addProductToCartController);

//Actualizar carrito con arreglo de productos
router.put("/:cid", updateCartProductsByArrayController);

//Actualizar cantidad de producto
router.put("/:cid/product/:pid", updateQuantityByQueryController);

//Eliminar producto del carrito
router.delete("/:cid/product/:pid", deleteProductInCartController);

//Eliminar todos los productos del carrito
router.delete("/:cid", emptyCartController);



export default router;