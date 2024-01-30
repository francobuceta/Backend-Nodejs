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

            let cuerpoCorreo = `<!DOCTYPE html>
                <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <title>Cyber Cube</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                text-align: center;
                            }
                            .container {
                                max-width: 600px;
                                margin: 50px auto;
                                padding: 20px;
                            }
                            .logo {
                                text-align: center;
                                margin-bottom: 20px;
                            }
                            .title {
                                font-size: 24px;
                                margin-bottom: 20px;
                                font-weight: bold;
                            }
                            .text {
                                font-size: 18px;
                                margin-bottom: 20px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="logo">
                                <img src="https://res.cloudinary.com/dzm5lgpyv/image/upload/v1704984217/cyber%20cube%20backend%20ecommerce/cybercube_logo_ivjjnt.png" 
                                    alt="Logo de la empresa" width="150" height="auto"
                                >
                            </div>
            
                            <div class="title">
                                ¡Hola ${newUser.firstName}!
                            </div>
            
                            <div class="text">
                                Muchas gracias por registrarte en Cyber Cube.
                            </div>
                            <div class="text">
                                Te damos la bienvenida y esperamos poder ayudarte en lo que andas buscando.
                            </div>
                            <div style="text-align:center">
                                <a href="https://ecommerce-next-js-ebon.vercel.app/" target="_blank">
                                    <button style="border: none;width: 100%;max-width: 260px;height: 40px;background-color: #BAFF29;border-radius: 18px;font-size: 16px;font-weight: 700;cursor: pointer;">
                                        IR AL SITIO
                                    </button>
                                <a>
                            </div>
                        </div>
                    </body>
                </html>
            `;

            if (newUser) {
                await transporter.sendMail({  //Envio de email al usuario si pudo registrarse correctamente
                    from: '"Cyber Cube" <cybercube_soporte@gmail.com>',
                    to: newUser.email,
                    subject: "Cuenta creada con éxito",
                    html: cuerpoCorreo
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
                return res.cookie("token", token, {httpOnly:false}).json({ message:"Ingreso exitoso", token });
            } else {
                res.json({ message:"Ingreso fallido" });
            }
        } catch (error) {
            next(error);
        }
    }

    logoutUser = async (req, res) => {
        try {
            res.clearCookie("token").json({ message: "Logout exitoso" });
        } catch (error) {
            res.json({ message: "Logout fallido" });
        }
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
                    window.opener.postMessage(${tokenString}, 'https://ecommerce-next-js-ebon.vercel.app')
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
                    window.opener.postMessage(${tokenString}, 'https://ecommerce-next-js-ebon.vercel.app')
                </script>
            </html>`
        );
    }
}

export default new UserController();
