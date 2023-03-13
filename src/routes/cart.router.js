import { Router } from "express";
import CartManager from "../dao/mongoManagers/cartManager.js";

const router = Router();

//Instancia
const cart = new CartManager();

//Rutas
//Consultar carrito por ID
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    const findCart = await cart.getCartById(cid);

    if (findCart) {
        res.json({ message: "Carrito encontrado", cart: findCart });
    } else {
        res.json({ message: "No se encontro el carrito" });
    }
});

//Crear carrito
router.post("/", async (req, res) => {
    const createCart = await cart.createCart();
    res.json({ message: "Carrito creado con éxito", createCart });
});

//Agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    const newCart = await cart.addProductToCart(cid, pid);

    res.json({ message: "Producto agregado con éxito", newCart });
});

//Eliminar producto del carrito
router.delete("/:cid/product/:pid", async (req, res) => {
    const { cid, pid } = req.params;

    const deletedProduct = await cart.deleteProductInCart(cid, pid);

    res.json({ message: "Producto eliminado con éxito", deletedProduct });
});

//Actualizar carrito con arreglo de productos
router.put("/:cid", async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const productsUpdated = await cart.updateCartProductsByArray(cid, products);
    
    if (updateCartProductsByArray) {
        res.json(productsUpdated)
    }
    else {
        res.json({ mensaje: "Carrito no encontrado para actualizar" })
    }
});

//Actualizar cantidad de producto
router.put("/:cid/product/:pid", async (req, res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const updatedProduct = await cart.updateQuantityByQuery(cid, pid, quantity);

    res.json(updatedProduct);
});

//Eliminar todos los productos del carrito
router.delete("/:cid", async (req, res) => {
    const { cid } = req.params;

    const deletedProducts = await cart.emptyCart(cid);

    res.json({ message: "Productos eliminados con éxito", deletedProducts });
});



export default router;