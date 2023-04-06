import { Router } from "express";
import { createUserController, loginUserController } from "../controllers/user.controllers.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import cookieParser from 'cookie-parser';
import passport from "passport";
import config from "../config/config.js";

const router = Router();

//Session
router.use(session(
    {
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongoUrl: config.MONGO_URL
        })
    }
));

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

router.post("/register", createUserController);

router.post("/login", loginUserController);

router.get("/login/current", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.json(req.user); 
});

router.get("/logout", (req, res) => { 
    res.clearCookie("token").redirect("/views/login");
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