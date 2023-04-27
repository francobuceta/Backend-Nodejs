import { Router } from "express";
import { isAdmin } from "../dao/middlewares/middlewares.js";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import productController from "../controllers/products.controllers.js";

const router = Router();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

//Consultar por paginacion
router.get("/", productController.getPagination);

//Consultar producto por ID
router.get("/:id", productController.getProductById);

//Agregar un producto
router.post("/", passport.authenticate("jwt", {session: false}), isAdmin, productController.addProduct);

//Actualizar un producto
router.put("/:id", passport.authenticate("jwt", {session: false}), isAdmin, productController.updateProduct);

//Eliminar un producto
router.delete("/:id", passport.authenticate("jwt", {session: false}), isAdmin, productController.deleteProduct);


export default router;