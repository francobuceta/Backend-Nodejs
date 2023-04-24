import { Router } from "express";
import { isAdmin } from "../dao/middlewares/middlewares.js";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import { 
    getProductByIdController, 
    getPaginationController, 
    addProductController, 
    updateProductController, 
    deleteProductController
} from "../controllers/products.controllers.js";

const router = Router();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

//Consultar por paginacion
router.get("/", getPaginationController);

//Consultar producto por ID
router.get("/:id", getProductByIdController);

//Agregar un producto
router.post("/", passport.authenticate("jwt", {session: false}), isAdmin, addProductController);

//Actualizar un producto
router.put("/:id", passport.authenticate("jwt", {session: false}), isAdmin, updateProductController);

//Eliminar un producto
router.delete("/:id", passport.authenticate("jwt", {session: false}), isAdmin, deleteProductController);


export default router;