import express from 'express';
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";
import ViewsRouter from "./routes/views.router.js";
import UserRouter from "./routes/user.router.js";
import { __dirname } from "./utils.js"
import handlebars from "express-handlebars";
import { Server } from 'socket.io';
import cookieParser from 'cookie-parser';
import passport from "passport";
import "./dao/dbConfig.js";
import "./passport/passportStrategies.js";
import MongoStore from "connect-mongo";
import { URL } from "../src/dao/dbConfig.js";
import session from "express-session";
import jwtRouter from "./routes/jwt.router.js"

//Servidor
const app = express(); 

//Configuracion inicial express
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Redireccionamiento a los archivos
app.use("/api/products", ProductsRouter);
app.use("/api/cart", CartRouter);
app.use("/views", ViewsRouter);
app.use("/user", UserRouter);
app.use("/jwt", jwtRouter);

//Ruta absoluta
app.use(express.static(__dirname + "/public"));

//Configurar Handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Cookies
app.use(cookieParser());

//Session
app.use(session(
    {
        secret: 'secret key',
        resave: false,
        saveUninitialized: true,
        store: new MongoStore ({
            mongoUrl: URL
        })
    }
));

//Inicializar passport
app.use(passport.initialize());
//Pasport guarda la información de session
app.use(passport.session());


//HTTP server
const httpServer = app.listen(8080, () => {
    console.log("Escuchando puerto");
});

//Socket server
export const socketServer = new Server(httpServer);

