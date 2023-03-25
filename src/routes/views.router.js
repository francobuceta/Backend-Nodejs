import { Router } from "express";
import ProductManager from "../dao/mongoManagers/productManager.js";
import CartManager from "../dao/mongoManagers/cartManager.js";
import cookieParser from 'cookie-parser';
import passport from "passport";

const router = Router();
const product = new ProductManager();
const cart = new CartManager();

//Cookie
const cookieKey = "Signed-Cookie";
router.use(cookieParser(cookieKey));

//Rutas
//Ruta products hdb

router.get("/products", passport.authenticate("jwt", {session: false}), async (req, res) => {
    const userName = req.user.firstName;
    console.log(userName);
    
    try {
        const products = await product.getProducts();
        res.render("products", { products, userName });
    } catch (error) {
        console.log(error);
    }
});

//Carrito
router.get("/carts/:cid", async (req, res) => {
    const {cid} = req.params;

    try {
        const getCart = await cart.getCartById(cid);
        
        let arrayProducts = getCart[0].products;

        res.render("cart", { arrayProducts });
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
router.get("/profile", (req, res) => {
    res.render("profile");
});

//JWT
router.get("/jwtFront", (req, res) => {
    res.render("jwt");
});

export default router;
