import { Router } from "express";
/* import CartManager from "../src/dao/fileManagers/cartManager.js"; */
import CartManager from "../src/dao/mongoManagers/cartManager.js";

const router = Router();

//Instancia
const cart = new CartManager();

//Rutas
//Consultar carrito por ID
router.get("/:cid", async (req, res) => {
    const { cid } = req.params;

    const findCart = await cart.getCartById(cid);

    if (findCart) {
        res.json({message:"Carrito encontrado", cart:findCart});
    } else {
        res.json({message:"No se encontro el carrito"});
    }
});

//Crear carrito
router.post("/", async (req, res) => {
    const createCart = await cart.createCart();
    res.json({message:"Carrito creado con éxito", createCart});
});

//Agregar producto a carrito
router.post("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;

    const newCart = await cart.addProductToCart(cid, pid);

    res.json({message:"Producto agregado con éxito", newCart});
});


export default router;