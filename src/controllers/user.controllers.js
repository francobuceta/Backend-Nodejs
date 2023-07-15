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

    createUser = async (req, res, next) => {
        try {
            const newUser = await userService.createUser(req.body);

            if (newUser) {
                await transporter.sendMail({  //Envio de email al usuario si pudo registrarse correctamente
                    from: "E-commerce",
                    to: newUser.email,
                    subject: "Usuario Nuevo",
                    text: `Gracias por registrarte en nuestro sitio ${newUser.firstName}`
                });
                res.json({ message:"Usuario creado con éxito" });
            } else {
                res.json({ message:"Error al registrar usuario" });
            }
        } catch (error) {
            next(error);
        }
    }

    loginUser = async (req, res, next) => {
        try {
            const newUser = await userService.loginUser(req.body);

            if (newUser) {
                const token = generateToken(newUser);
                return res.cookie("token", token, {httpOnly:false}).json({ messsage:"Ingreso exitoso", token });
            } else {
                res.json({ messsage:"Ingreso fallido" });
            }
        } catch (error) {
            next(error);
        }
    }

    logoutUser = async (req, res) => {
        res.clearCookie("token").redirect("/views/login");
    }

    loginGithub = async (req, res) => {
        const user = JSON.stringify(req.user);
        const token = generateToken(user);

        res.status(200).send(`<!DOCTYPE html>
            <html lang="en">
                <body>
                </body>
                <script>
                    window.opener.postMessage(${token}, 'http://localhost:3000')
                </script>
            </html>`);
    }

    loginGoogle = async (req, res) => {
        const user = req.user;

        const token = generateToken(user);
        return res.cookie("token", token, {httpOnly:false}).redirect("http://localhost:3000");
    }

    loginCurrent = async (req, res) => {
        console.log(req.cookies, req.user);
        /* if (req.headers.cookie) {
            const cookieString = req.headers.cookie;
            const token = cookieString.split("=")[1].split(";")[0];

            res.status(200).json({
                success: true,
                message: "successfull",
                user: token
            });
        } else {
            res.json({message:"no habia cookies"});
        }; */
    }
}

export default new UserController();
