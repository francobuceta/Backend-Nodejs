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
                res.json({ message:"Ingreso fallido" });
            }
        } catch (error) {
            next(error);
        }
    }

    logoutUser = async (req, res) => {
        res.clearCookie("token").redirect("/views/login");
    }

    loginGithub = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        const tokenString = JSON.stringify(token);

        res.status(200).send(`<!DOCTYPE html>
            <html lang="en">
                <body>
                </body>
                <script>
                    window.opener.postMessage(${tokenString}, 'http://localhost:3000')
                </script>
            </html>`
        );
    }

    loginGoogle = async (req, res) => {
        const user = req.user;
        const token = generateToken(user);
        const tokenString = JSON.stringify(token);

        res.status(200).send(`<!DOCTYPE html>
            <html lang="en">
                <body>
                </body>
                <script>
                    window.opener.postMessage(${tokenString}, 'http://localhost:3000')
                </script>
            </html>`
        );
    }
}

export default new UserController();
