import swaggerJSDoc from "swagger-jsdoc";
import { __dirname } from "./utils.js";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentación API E-commerce",
            description: "API para realizar acciones en Usuarios, Productos y Carrito",
            version: "1.0.0",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

export const swaggerSetup = swaggerJSDoc(options);