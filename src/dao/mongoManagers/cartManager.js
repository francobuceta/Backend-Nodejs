import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getCartById(id) {
        try {
            const cart = await cartModel.find({ _id:id });
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
            const cart = await cartModel.findById(cid);
            cart.products.push(pid);
            cart.save();
            return cart;
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