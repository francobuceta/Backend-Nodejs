import express from 'express';
import ProductManager from './index.js';

//Servidor
const app = express(); 
app.use(express.json());
app.use(express.urlencoded({ extended:true }));

//Instancia
const product = new ProductManager();

//Rutas
app.get("/", (req, res) => {
    res.send("Ruta raiz")
});

app.get("/products", async (req, res) => {
    const { limit } = req.query;
    const getProducts = await product.getProducts();

    if (limit) {
        const productsLimit = getProducts.slice(0, limit);
        res.json({message:"Productos enviados", productsLimit});
    } else {
        res.json({message:"Productos enviados", getProducts});
    }
});

app.get("/products/:id", async (req, res) => {
    const {id} = req.params;
    const productId = await product.getProductById(parseInt(id));

    if (productId) {
        res.json({message:"Producto encontrado", productId});
    } else {
        res.json({message:"Producto no encontrado"});
    }
});

app.listen(8080, () => {
    console.log("Escuchando puerto");
});


