import productService from "../services/products.services.js";

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
    
    getProductById = async (req, res, next) => {
        const { id } = req.params;
        
        try {
            const productId = await productService.getProductById(id);
            if (productId) {
                res.json({ message: "Producto encontrado", productId });
            }
        } catch (error) {
            next(error)
        }

    }
    
    addProduct = async (req, res, next) => {
        const objeto = req.body;
        
        try {
            const addProduct = await productService.addProduct(objeto);
            if (addProduct) {
                res.json({ message: "Producto agregado con exito" });
            } else {
                res.json({ message: "Producto no pudo ser agregado" });
            }
        } catch (error) {
            next(error);
        }
        
    }
    
    updateProduct = async (req, res, next) => {
        const { id } = req.params;
        const campo = req.body;
    
        try {
            const update = await productService.updateProduct(id, campo);
            if (update) {
                res.json({ message: "Producto actualizado con exito", update });
            }
        } catch (error) {
            next(error);
        }
    }
    
    deleteProduct = async (req, res, next) => {
        const { id } = req.params;
        
        try {
            const deletedProduct = await productService.deleteProduct(id);
            if (deletedProduct) {
                res.json({ message: "Producto eliminado con exito" });
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new ProductController();