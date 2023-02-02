import { Router } from "express";
import CartManager from "../src/cartManager.js"

const router = Router();

//Instancia
const cart = new CartManager();

//Rutas
//Consultar carrito por ID
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    const findCart = await cart.getCartById(parseInt(cid));

    if (findCart) {
        res.json({message:"Carrito encontrado", cart:findCart});
    } else {
        res.json({message:"No se encontro el carrito"});
    }
});

//Crear carrito
router.post("/", async (req, res) => {
    await cart.createCart();
    res.json({message:"Carrito creado con éxito"});
});

//Agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    console.log(typeof cid);

    await cart.addProductToCart(parseInt(cid), parseInt(pid));

    res.json({message:"Producto agregado con éxito"});
})


export default router;