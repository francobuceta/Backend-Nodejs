import { productsModel } from "../models/products.model.js";
import CustomError from "../../errors/CustomError.js";
import { ErrorsName, ErrorsCause, ErrorsMessage } from "../../errors/errors.enum.js";

export default class ProductManager {
    async getProducts() {
        try {
            const products = await productsModel.find({}).lean();
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getPagination(category, page, limit) {
        try {
            const products = await productsModel.paginate( category , page, limit );
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            if (id.length === 24) {
                const products = await productsModel.findById(id);
                return products;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async addProduct(obj) {
        try {
            if (obj) {
                const newProduct = await productsModel.create(obj);
                return newProduct;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }

    async updateProduct(id, obj) {
        try {
            const updateProduct = await productsModel.findByIdAndUpdate(id, obj);
            return updateProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        try {
            if (id.length === 24) {
                const deletedProduct = await productsModel.findByIdAndDelete(id);
                return deletedProduct;
            } else {
                CustomError.createCustomError({
                    name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                    message: ErrorsMessage.PRODUCT_DATA_INCOMPLETE,
                    cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
                });
            }
        } catch (error) {
            throw error;
        }
    }
}