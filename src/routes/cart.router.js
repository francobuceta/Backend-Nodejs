import { Router } from "express";
import passport from "passport";
import cookieParser from 'cookie-parser';
import config from "../config/config.js";
import { isUser, discountStock, sendEmail } from "../dao/middlewares/middlewares.js";
import ticketController from "../controllers/ticket.controller.js";
import cartController from "../controllers/cart.controllers.js";

//Cookie
const cookieKey = config.COOKIE_KEY;

class CartRouter {
    constructor() {
        this.router = Router();
        this.router.use(cookieParser(cookieKey));
        this.router.get("/:cid", cartController.getCartById);
        this.router.get("/show/userCart", cartController.showCart);
        this.router.post("/", cartController.createCart);
        this.router.post("/:cid/product/:pid", passport.authenticate("jwt", { session: false }), isUser, cartController.addProductToCart);
        this.router.put("/:cid", cartController.updateCartProductsByArray);
        this.router.put("/:cid/product/:pid", cartController.updateQuantityByQuery);
        this.router.delete("/:cid/product/:pid", cartController.deleteProductInCart);
        this.router.delete("/:cid", cartController.emptyCart);
        this.router.get("/:cid/purchase", passport.authenticate("jwt", { session: false }), discountStock, sendEmail, ticketController.createTicket);
    }

    getRouter() {
        return this.router;
    }
}

export default new CartRouter();