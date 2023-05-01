import productService from "../services/products.services.js";
import CustomError from "../errors/CustomError.js";
import { ErrorsName, ErrorsMessage, ErrorsCause } from "../errors/errors.enum.js";

class ProductController {

    getPagination = async (req, res) => {
        const { page = 1, limit = 3, category } = req.query;
        const getProducts = await productService.getPagination(category, page, limit);
    
        const prevLink = getProducts.hasPrevPage
            ? `http://localhost:8080/api/products/pagination?page=${getProducts.prevPage}`
            : null;
    
        const nextLink = getProducts.hasNextPage
            ? `http://localhost:8080/api/products/pagination?page=${getProducts.nextPage}`
            : null;
    
        res.json({
            payload: getProducts.docs, info: {
                totalPages: getProducts.totalPages,
                prevPage: getProducts.prevPage,
                nextPage: getProducts.nextPage,
                hasPrevPage: getProducts.hasPrevPage,
                hasNextPage: getProducts.hasNextPage,
                prevLink,
                nextLink,
            }
        });
    }
    
    getProductById = async (req, res) => {
        const { id } = req.params;
        const productId = await productService.getProductById(id);
    
        if (productId) {
            res.json({ message: "Producto encontrado", productId });
        } else {
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
            });
        }
    }
    
    addProduct = async (req, res) => {
        const objeto = req.body;
        const addProduct = await productService.addProduct(objeto);
    
        if (addProduct) {
            res.json({ message: "Producto agregado con exito" });
        } else {
            res.json({ message: "Producto no pudo ser agregado" });
        }
    }
    
    updateProduct = async (req, res) => {
        const { id } = req.params;
        const campo = req.body;
    
        const update = await productService.updateProduct(id, campo);
    
        if (update) {
            res.json({ message: "Producto actualizado con exito", update });
        } else {
            res.json({ message: "Producto no pudo ser actualizado" });
        }
    }
    
    deleteProduct = async (req, res) => {
        const { id } = req.params;
        await productService.deleteProduct(id);
    
        res.json({ message: "Producto eliminado con exito" });
    }
}

export default new ProductController();