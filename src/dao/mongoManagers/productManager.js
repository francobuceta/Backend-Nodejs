import { productsModel } from "../models/products.model.js";

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
            console.log(error);
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