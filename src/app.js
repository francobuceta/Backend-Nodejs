import express from 'express';
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";
import ViewsRouter from "./routes/views.router.js";
import UserRouter from "./routes/user.router.js";
import MockRouter from "./routes/mocking.router.js";
import LoggerRouter from "./routes/logger.router.js";
import { errorMiddleware } from './dao/middlewares/middlewares.js';
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars";
import passport from "passport";
import "./dao/dbConfig.js";
import "./passport/passportStrategies.js";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { swaggerSetup } from './swaggerConfig.js';

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

//Servidor
const app = express();

//Configuracion inicial express
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(cors());

//Redireccionamiento a los archivos
app.use("/api/products", ProductsRouter.getRouter());
app.use("/api/cart", CartRouter.getRouter());
app.use("/views", ViewsRouter);
app.use("/user", UserRouter.getRouter());
app.use("/mockingproducts", MockRouter);
app.use("/loggerTest", LoggerRouter);
// swagger documentation endpoint
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSetup, { customCssUrl: CSS_URL }));

//Ruta absoluta
app.use(express.static(__dirname + "/public"));

//Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Inicializar passport
app.use(passport.initialize());

//Middleware de errores
app.use(errorMiddleware);

export default app;