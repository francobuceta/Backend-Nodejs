import ProductManager from "../dao/mongoManagers/productManager.js";
import CustomError from "../errors/CustomError.js";
import { ErrorsName, ErrorsCause, ErrorsMessage } from "../errors/errors.enum.js";

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
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                message: error.message,
                cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
            });
        }
    }

    addProduct = async (obj) => {
        const newProduct = await this.dao.addProduct(obj);
        return newProduct;
    }

    updateProduct = async (id, obj) => {
        const updateProduct = await this.dao.updateProduct(id, obj);
        return updateProduct;
    }

    deleteProduct = async (id) => {
        const deletedProduct = await this.dao.deleteProduct(id);
        return deletedProduct;
    }
}

export default new ProductService(productManager);