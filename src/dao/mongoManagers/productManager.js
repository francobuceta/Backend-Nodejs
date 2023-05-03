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
            console.log(products);
            return products;
        } catch (error) {
            console.log(error);
        }
    }

    async getProductById(id) {
        try {
            const products = await productsModel.findById(id);
            return products;
        } catch (error) {
            //console.log("hola",error);
            CustomError.createCustomError({
                name: ErrorsName.PRODUCT_DATA_INCOMPLETE,
                message: error.message,
                cause: ErrorsCause.PRODUCT_DATA_INCOMPLETE
            });
        }
    }

    async addProduct(obj) {
        try {
            const newProduct = await productsModel.create(obj);
            return newProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async updateProduct(id, obj) {
        try {
            const updateProduct = await productsModel.findByIdAndUpdate(id, obj);
            return updateProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
            const deletedProduct = await productsModel.findByIdAndDelete(id);
            return deletedProduct;
        } catch (error) {
            console.log(error);
        }
    }
}