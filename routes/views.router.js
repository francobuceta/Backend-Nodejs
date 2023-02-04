import { Router } from "express";
import fs from "fs";

const router = Router();
const path = "./files/products.json";

//Rutas

//Ruta raiz
router.get("/", async (req, res) => {
    let products = [];

    if (fs.existsSync(path)) {
        let productsJSON = await fs.promises.readFile(path, "utf-8");
        let productsParse = JSON.parse(productsJSON);
        products = productsParse;
    }

    console.log(products);
    res.render("home", {products});
});


export default router;