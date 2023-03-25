import { Router } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { URL } from "../dao/dbConfig.js";
import UserManager from "../dao/mongoManagers/userManager.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import { generateToken } from "../utils.js";

const router = Router();
const user = new UserManager();

//Session
router.use(session(
    {
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: URL
        })
    }
));

//Cookie
const cookieKey = "Signed-Cookie";
router.use(cookieParser(cookieKey));

router.post("/register", async (req, res) => {
    const newUser = await user.createUser(req.body);

    if (newUser) {
        res.redirect("/views/login");
    } else {
        res.redirect("/views/errorRegister");
    }
});

router.post("/login", async (req, res) => {
    const newUser = await user.loginUser(req.body);

    if (newUser) {
        const token = generateToken(newUser);
        return res.cookie("token", token, { httpOnly: true }).redirect("/views/products");
    } else {
        res.redirect("/views/errorLogin");
    }
});

router.get("/login/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json(req.user); 
});

router.get("/logout", (req, res) => {
    req.session.destroy(error => {
        if (error) {
            console.log(error);
            res.json(error);
        } else {
            res.redirect("/views/login");
        }
    });
});

router.get("/registroGithub", passport.authenticate("github", { scope: ['user:email'] }));
router.get("/github", passport.authenticate("github"), (req, res) => {
    const { firstName } = req.user;

    req.session.firstName = firstName;

    res.cookie("userName", firstName, {
        signed: true
    });

    res.redirect("/views/products");
});

export default router;