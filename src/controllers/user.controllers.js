import { createUserService, loginUserService } from "../services/user.services.js";
import { Router } from "express";
import cookieParser from 'cookie-parser';
import { generateToken } from "../utils.js";
import config from "../config/config.js";

const router = Router();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

export const createUserController = async (req, res) => {
    const newUser = await createUserService(req.body);

    if (newUser) {
        res.redirect("/views/login");
    } else {
        res.redirect("/views/errorRegister");
    }
}

export const loginUserController = async (req, res) => {
    const newUser = await loginUserService(req.body);

    if (newUser) {
        const token = generateToken(newUser);
        return res.cookie("token", token, { httpOnly: true }).redirect("/views/products");
    } else {
        res.redirect("/views/errorLogin");
    }
}