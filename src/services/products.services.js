import ProductManager from "../dao/mongoManagers/productManager.js";

const productManager = new ProductManager();

export const getPaginationService = async (category, page, limit) => {
    const options = {}
    
    if (category) {
        options.category = category
    }

    try {
        const products = await productManager.getPagination(options, { page, limit });
        return products;
    } catch (error) {
        console.log(error);
    }
}

export const getProductByIdService = async (id) => {
    const products = await productManager.getProductById(id);
    return products;
}

export const addProductService = async (obj) => {
    const newProduct = await productManager.addProduct(obj);
    return newProduct;
}

export const updateProductService = async (id, obj) => {
    const updateProduct = await productManager.updateProduct(id, obj);
    return updateProduct;
}

export const deleteProductService = async (id) => {
    const deletedProduct = await productManager.deleteProduct(id);
    return deletedProduct;
}