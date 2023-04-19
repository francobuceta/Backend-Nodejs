import { cartModel } from "../models/cart.model.js";

export default class CartManager {
    async getCartById(id) {
        try {
            const cart = await cartModel.find({ _id:id }).lean();
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
            
            if (!cart) {
                return null;
            }
            else{
                if (cart.products.length !== 0) {
                    const productIndex = cart.products.findIndex((e) => e.productId == pid);

                    if (productIndex !== -1) {
                        let updateQ = await cartModel.updateOne(
                            { _id: cid, "products.productId": pid },
                            { $inc: { "products.$.quantity": 1 } }
                        );
                        return updateQ;
                    } else {
                        const pushProduct = cartModel.updateOne(
                            { _id: cid },
                            {
                                $push: {
                                    products: {
                                        productId: pid,
                                        quantity: 1,
                                    },
                                },
                            }
                        );
                        return pushProduct;
                    }
                } 
    
                else 
                {
                    {
                        const pushProduct = cartModel.updateOne(
                            { _id: cid },
                            {
                                $push: {
                                    products: {
                                        productId: pid,
                                        quantity: 1,
                                    },
                                },
                            }
                        );
                        return pushProduct;
                    }
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async updateCartProductsByArray(cid,productsArray){
        try {
            const updateCartProducts = await cartModel.findOneAndReplace({_id: cid},{products: productsArray},{new: true});
            return updateCartProducts;
        } catch (error) {
            console.log(error);
        }
    }

    async updateQuantityByQuery(cid,pid,quantity){
        try {
            const filter = {_id: cid, "products.productId": pid};
            const update = { $set: {"products.$.quantity": quantity}}
            const updatedCartProduct = await cartModel.findOneAndUpdate(filter,update,{new:true});
            
            return updatedCartProduct;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteProductInCart(cid, pid) {
        try {
            const cart = await cartModel.findOne({ _id: cid });
            if (!cart) return console.log('Carrito no encontrado');

            let productIndex = cart.products.findIndex(elem => elem._id == pid);

            cart.products.splice(productIndex, 1);

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

    async updateCart(cid, product) {
        const update = await cartModel.findOne(cid, product);
        return update;
    }
}