import userService from "../services/user.services.js";
import { Router } from "express";
import cookieParser from 'cookie-parser';
import { generateToken } from "../utils.js";
import config from "../config/config.js";
import { transporter } from "../utils.js";

const router = Router();

//Cookie
const cookieKey = config.COOKIE_KEY;
router.use(cookieParser(cookieKey));

class UserController {
    
    createUser = async (req, res) => {
        const newUser = await userService.createUser(req.body);
    
        if (newUser) {
            try {
                await transporter.sendMail({  //Envio de email al usuario si pudo registrarse correctamente
                    from: "E-commerce",
                    to: newUser.email,
                    subject: "Usuario Nuevo",
                    text: `Gracias por registrarte en nuestro sitio ${newUser.firstName}`
                });
                res.redirect("/views/login");
            } catch (error) {
                console.log(error);
            }
        } else {
            res.redirect("/views/errorRegister");
        } 
    } 
    
    loginUser = async (req, res) => {
        const newUser = await userService.loginUser(req.body);
    
        if (newUser) {
            const token = generateToken(newUser);
            return res.cookie("token", token, { httpOnly: true }).redirect("/views/products");
        } else {
            res.redirect("/views/errorLogin");
        }
    }
    
    logoutUser = async (req, res) => {
        res.clearCookie("token").redirect("/views/login");
    }
    
    loginGithub = async (req, res) => {
        const user = req.user;
    
        const token = generateToken(user);
        return res.cookie("token", token, { httpOnly: true }).redirect("/views/products");
    }
    
    loginCurrent = async (req, res) => {
        res.redirect("/views/profile"); 
    }
}

export default new UserController();
