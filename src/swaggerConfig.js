import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación API E-commerce",
            description:
                "API para realizar acciones en Usuarios, Productos y Carrito",
            version: "1.0.0",
        },
    },
    servers: [
        {
            url: "https://backend-nodejs-self.vercel.app",
            description: "My API Documentation",
        },
    ],
    apis: [`./docs/**/*.yaml`],
};

export const swaggerSetup = swaggerJSDoc(options);
