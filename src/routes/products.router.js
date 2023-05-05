import { Router } from "express";
import { isAdmin } from "../dao/middlewares/middlewares.js";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import productController from "../controllers/products.controllers.js";

//Cookie
const cookieKey = config.COOKIE_KEY;

class ProductsRouter {
    constructor() {
        this.router = Router();
        this.router.use(cookieParser(cookieKey));
        this.router.get("/", productController.getPagination);
        this.router.get("/:id", productController.getProductById);
        this.router.post("/", passport.authenticate("jwt", {session: false}), isAdmin, productController.addProduct);
        this.router.put("/:id", passport.authenticate("jwt", {session: false}), isAdmin, productController.updateProduct);
        this.router.delete("/:id", passport.authenticate("jwt", {session: false}), isAdmin, productController.deleteProduct);
    }

    getRouter() {
        return this.router;
    }
}

export default new ProductsRouter();