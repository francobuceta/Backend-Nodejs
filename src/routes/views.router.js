import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManager.js";
import CartManager from "../dao/mongoManagers/cartManager.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import config from "../config/config.js";

const router = Router();
const product = new ProductManager();
const cart = new CartManager();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

//Rutas
//Ruta products hdb

router.get("/products", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const userData = req.user;
    const cartId = userData.cart.cartId;
    
    try {
        const products = await product.getProducts();
        res.render("products", { products, userData, cartId });
    } catch (error) {
        console.log(error);
    }
});

//Carrito
router.get("/cartUser", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const { cartId } = req.user.cart;
    let arrayProducts;

    try {
        const userCart = await cart.getCartById(cartId);
        arrayProducts = userCart[0]?.hasOwnProperty("products") ? userCart[0].products : null;
        
        res.render("cart", { arrayProducts, cartId });
    } catch (error) {
        console.log(error);
    }
});

//Login
router.get("/login", (req, res) => {
    res.render("login");
});

//Register
router.get("/register", (req, res) => {
    res.render("register");
});

//Error en registro
router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
});

//Error en login
router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});

//Perfil
router.get("/profile", passport.authenticate("jwt", {session: false}), (req, res) => {
    const userData = req.user;

    try {
        res.render("profile", {userData});
    } catch (error) {
        console.log("Error al renderizar el perfil");
    }
});

export default router;
