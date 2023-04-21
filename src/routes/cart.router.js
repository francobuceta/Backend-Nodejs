import { Router } from "express";
import passport from "passport";
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


//Rutas
//Consultar carrito por ID
router.get("/:cid", getCartByIdController);

router.get("/userCart", passport.authenticate("jwt", {session: false}), async (req, res) => {
    res.redirect("/views/cart");
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