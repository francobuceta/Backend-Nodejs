import CartManager from "../dao/mongoManagers/cartManager.js";

const cartManager = new CartManager();

class CartService {
    constructor(dao) {
        this.dao = dao;
    }

    getCartById = async (id) => {
        const cart = await this.dao.getCartById(id);
        return cart;
    }
    
    createCart = async (obj) => {
        const newCart = await this.dao.createCart(obj);
        return newCart;
    }
    
    addProductToCart = async (cid, pid) => {
        const cart = await this.dao.addProductToCart(cid, pid);
        return cart;
    }
    
    updateCartProductsByArray = async (cid,productsArray) => {
        const updateCartProducts = await this.dao.updateCartProductsByArray(cid, productsArray);
        return updateCartProducts;
    }
    
    updateQuantityByQuery = async (cid,pid,quantity) =>{
        const updatedCartProduct = await this.dao.updateQuantityByQuery(cid, pid, quantity);
        return updatedCartProduct;
    }
    
    deleteProductInCart = async (cid, pid) => {
        const cart = await this.dao.deleteProductInCart(cid, pid);
        return cart;
    }
    
    emptyCart = async (cid) => {
        const cart = await this.dao.emptyCart(cid);
        return cart;
    }
}

export default new CartService(cartManager);