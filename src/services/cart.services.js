import CartManager from "../dao/mongoManagers/cartManager.js";

const cartManager = new CartManager();

export const getCartByIdService = async (id) => {
    const cart = await cartManager.getCartById(id);
    return cart;
}

export const createCartService = async (obj) => {
    const newCart = await cartManager.createCart(obj);
    return newCart;
}

export const addProductToCartService = async (cid, pid) => {
    const cart = await cartManager.addProductToCart(cid, pid);
    return cart;
}

export const updateCartProductsByArrayService = async (cid,productsArray) => {
    const updateCartProducts = await cartManager.updateCartProductsByArray(cid, productsArray);
    return updateCartProducts;
}

export const updateQuantityByQueryService = async (cid,pid,quantity) =>{
    const updatedCartProduct = await cartManager.updateQuantityByQuery(cid, pid, quantity);
    return updatedCartProduct;
}

export const deleteProductInCartService = async (cid, pid) => {
    const cart = await cartManager.deleteProductInCart(cid, pid);
    return cart;
}

export const emptyCartService = async (cid) => {
    const cart = await cartManager.emptyCart(cid);
    return cart;
}