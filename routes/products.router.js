import { Router } from "express";
import ProductManager from '../src/productManager.js';
import { socketServer } from "../app.js";

const router = Router();

//Instancia
const product = new ProductManager();

//Rutas
//Consultar todos los productos
router.get("/", async (req, res) => {
    const { limit } = req.query;
    const getProducts = await product.getProducts();

    if (limit) {
        const productsLimit = getProducts.slice(0, limit);
        res.json({message:"Productos enviados", productsLimit});
    } else {
        res.json({message:"Productos enviados", getProducts});
    }
});

//Consultar producto por ID
router.get("/:id", async (req, res) => {
    const {id} = req.params;
    const productId = await product.getProductById(parseInt(id));

    if (productId) {
        res.json({message:"Producto encontrado", productId});
    } else {
        res.json({message:"Producto no encontrado"});
    }
});

//Agregar un producto
router.post("/", async (req, res) => {
    const objeto = req.body;
    const addProduct = await product.addProduct(objeto);
    
    if (addProduct) {
        res.json({message:"Producto agregado con exito"});
    } else {
        res.json({message:"Producto no pudo ser agregado"});
    }

    socketServer.emit('products', objeto);
});

//Actualizar un producto
router.put("/:id", async (req, res) => {
    const {id} = req.params;
    const campo = req.body;

    const update = await product.updateProduct(parseInt(id), campo);

    if (update) {
        res.json({message:"Producto actualizado con exito"});
    } else {
        res.json({message:"Producto no pudo ser actualizado"});
    }
});

//Eliminar un producto
router.delete("/:id", async (req, res) => {
    const {id} = req.params;
    await product.deleteProduct(parseInt(id));

    res.json({message:"Producto eliminado con exito"});
}); 


export default router;