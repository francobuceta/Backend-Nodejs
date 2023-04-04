import { Router } from "express";
import { 
    getProductByIdController, 
    getPaginationController, 
    addProductController, 
    updateProductController, 
    deleteProductController
} from "../controllers/products.controllers.js";

const router = Router();


//Consultar por paginacion
router.get("/", getPaginationController);

//Consultar producto por ID
router.get("/:id", getProductByIdController);

//Agregar un producto
router.post("/", addProductController);

//Actualizar un producto
router.put("/:id", updateProductController);

//Eliminar un producto
router.delete("/:id", deleteProductController);


export default router;