import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getCartById(id) {
        try {
            const cart = await cartModel.findById(id);
            return cart;
        } catch (error) {
            console.log(error);
        }
    }

    async createCart(obj) {
        try {
            const newCart = await cartModel.create(obj);
            return newCart;
        } catch (error) {
            console.log(error);
        }
    }

    async addProductToCart(cid, pid) {
        try {
            let object = {product: pid, quantity: 1}
            const addProductToCart = await cartModel.findByIdAndUpdate(cid, { $push: { products: object } });
            return addProductToCart;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductById(id) {
        try {
            const deletedCart = await cartModel.findByIdAndDelete(id);
            return deletedCart;
        } catch (error) {
            console.log(error);
        }
    }
}