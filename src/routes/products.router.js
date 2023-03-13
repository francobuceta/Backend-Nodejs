import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManager.js";
import cookieParser from 'cookie-parser';

const router = Router();

//Cookie
const cookieKey = "Signed-Cookie";
router.use(cookieParser(cookieKey));

//Instancia
const product = new ProductManager();

//Cookie 
router.get("/cookie", (req, res) => {
    res.cookie("cookieFirmada", "Mi primera cookie firmada", {
        /* maxAge: 10000, */
        signed: true
    })
        .send("Cookie guardada con exito");
})

router.get("/leerCookie", (req, res) => {
    console.log(req);
    const { cookieFirmada } = req.signedCookies
    res.json({ cookie: cookieFirmada });
})

router.get("/eliminarCookie", (req, res) => {
    res.clearCookie("cookieFirmada").send("Cookie eliminada con exito");
});

//Consultar por paginacion
router.get("/", async (req, res) => {
    const { page = 1, limit = 3, category } = req.query;
    const getProducts = await product.getPagination(category, page, limit);

    const prevLink = getProducts.hasPrevPage
        ? `http://localhost:8080/api/products/pagination?page=${getProducts.prevPage}`
        : null;

    const nextLink = getProducts.hasNextPage
        ? `http://localhost:8080/api/products/pagination?page=${getProducts.nextPage}`
        : null;

    res.json({
        payload: getProducts.docs, info: {
            totalPages: getProducts.totalPages,
            prevPage: getProducts.prevPage,
            nextPage: getProducts.nextPage,
            hasPrevPage: getProducts.hasPrevPage,
            hasNextPage: getProducts.hasNextPage,
            prevLink,
            nextLink,
        }
    });
});

//Consultar producto por ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const productId = await product.getProductById(id);

    if (productId) {
        res.json({ message: "Producto encontrado", productId });
    } else {
        res.json({ message: "Producto no encontrado" });
    }
});

//Agregar un producto
router.post("/", async (req, res) => {
    const objeto = req.body;
    const addProduct = await product.addProduct(objeto);

    if (addProduct) {
        res.json({ message: "Producto agregado con exito" });
    } else {
        res.json({ message: "Producto no pudo ser agregado" });
    }
});

//Actualizar un producto
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const campo = req.body;

    const update = await product.updateProduct(id, campo);

    if (update) {
        res.json({ message: "Producto actualizado con exito", update });
    } else {
        res.json({ message: "Producto no pudo ser actualizado" });
    }
});

//Eliminar un producto
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await product.deleteProduct(id);

    res.json({ message: "Producto eliminado con exito" });
});


export default router;