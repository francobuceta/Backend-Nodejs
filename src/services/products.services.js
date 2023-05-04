import ProductManager from "../dao/mongoManagers/productManager.js";

const productManager = new ProductManager();

class ProductService {
    constructor(dao) {
        this.dao = dao;
    }

    getPagination = async (category, page, limit) => {
        const options = {}

        if (category) {
            options.category = category
        }

        try {
            const products = await this.dao.getPagination(options, { page, limit });
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.dao.getProductById(id);
            return products;
        } catch (error) {
            throw error;
        }
    }

    addProduct = async (obj) => {
        try {
            const newProduct = await this.dao.addProduct(obj);
            return newProduct;
        } catch (error) {
            throw error;
        }
    }

    updateProduct = async (id, obj) => {
        try {
            const updateProduct = await this.dao.updateProduct(id, obj);
            return updateProduct;
        } catch (error) {
            throw error;
        }
    }

    deleteProduct = async (id) => {
        try {
            const deletedProduct = await this.dao.deleteProduct(id);
            return deletedProduct;
        } catch (error) {
            throw error;
        }
    }
}

export default new ProductService(productManager);