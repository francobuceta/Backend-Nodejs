import express from 'express';
import ProductsRouter from "./routes/products.router.js";
import CartRouter from "./routes/cart.router.js";

//Servidor
const app = express(); 

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use("/api/products", ProductsRouter);
app.use("/api/cart", CartRouter);

//Rutas
app.get("/api", (req, res) => {
    res.send("Ruta raiz")
});


app.listen(8080, () => {
    console.log("Escuchando puerto");
});


