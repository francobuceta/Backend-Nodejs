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

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await cartModel.findOne({ _id: cid });
            if (!cart) return console.log('Carrito no encontrado');

            let productIndex = cart.products.findIndex(elem => elem._id == pid);

            const deleteProduct = cart.products.splice(productIndex, 1);

            await cart.save();

            return cart;

        } catch (error) {
            console.log(error);
        }
    }

    async emptyCart(cid) {
        try {
            const cart = await cartModel.findOne({ _id: cid });
            if (!cart) return console.log('Carrito no encontrado');

            cart.products = [];
            
            await cart.save();

        } catch (error) {
            console.log(error)
        }
    }
}