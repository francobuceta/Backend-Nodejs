import { Router} from "express";
import { generateToken } from "../utils.js";
import userManager from "../dao/mongoManagers/userManager.js";
import cookieParser from 'cookie-parser';
import passport from "passport";
import config from "../config/config.js"

const router = Router();
const userMan = new userManager();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

router.post("/login", async(req, res) => {
    const user = await userMan.loginUser(req.body);
    if(user) {
        const token = generateToken(user);
        return res.cookie("token", token, {httpOnly:true}).json({token});
    }
    res.json({message:"Usuario no existe"})
});

router.get("/login", passport.authenticate("jwt", {session: false}), (req, res) => {
    res.send("Usuario autenticado"); 
});


export default router;