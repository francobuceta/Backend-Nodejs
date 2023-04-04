import { 
    getProductByIdService, 
    getPaginationService, 
    addProductService, 
    updateProductService, 
    deleteProductService
} from "../services/products.services.js";

export const getPaginationController = async (req, res) => {
    const { page = 1, limit = 3, category } = req.query;
    const getProducts = await getPaginationService(category, page, limit);

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

export const getProductByIdController = async (req, res) => {
    const { id } = req.params;
    const productId = await getProductByIdService(id);

    if (productId) {
        res.json({ message: "Producto encontrado", productId });
    } else {
        res.json({ message: "Producto no encontrado" });
    }
}

export const addProductController = async (req, res) => {
    const objeto = req.body;
    const addProduct = await addProductService(objeto);

    if (addProduct) {
        res.json({ message: "Producto agregado con exito" });
    } else {
        res.json({ message: "Producto no pudo ser agregado" });
    }
}

export const updateProductController = async (req, res) => {
    const { id } = req.params;
    const campo = req.body;

    const update = await updateProductService(id, campo);

    if (update) {
        res.json({ message: "Producto actualizado con exito", update });
    } else {
        res.json({ message: "Producto no pudo ser actualizado" });
    }
}

export const deleteProductController = async (req, res) => {
    const { id } = req.params;
    await deleteProductService(id);

    res.json({ message: "Producto eliminado con exito" });
}