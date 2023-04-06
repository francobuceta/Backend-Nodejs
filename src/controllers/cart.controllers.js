import {
    getCartByIdService,
    createCartService,
    addProductToCartService,
    updateCartProductsByArrayService,
    updateQuantityByQueryService,
    deleteProductInCartService,
    emptyCartService
} from "../services/cart.services.js";

export const getCartByIdController = async (req, res) => {
    const { cid } = req.params;

    const findCart = await getCartByIdService(cid);

    if (findCart) {
        res.json({ message: "Carrito encontrado", cart: findCart });
    } else {
        res.json({ message: "No se encontro el carrito" });
    }
}

export const createCartController = async (req, res) => {
    const createCart = await createCartService();
    res.json({ message: "Carrito creado con éxito", createCart });
}

export const addProductToCartController = async (req, res) => {
    const { cid, pid } = req.params;

    const newCart = await addProductToCartService(cid, pid);

    res.json({ message: "Producto agregado con éxito", newCart });
}

export const updateCartProductsByArrayController = async (req, res) => {
    const { cid } = req.params;
    const { products } = req.body;
    const productsUpdated = await updateCartProductsByArrayService(cid, products);
    
    if (updateCartProductsByArray) {
        res.json(productsUpdated)
    }
    else {
        res.json({ mensaje: "Carrito no encontrado para actualizar" })
    }
}

export const updateQuantityByQueryController = async (req, res) => {
    const { quantity } = req.body;
    const { cid, pid } = req.params;
    const updatedProduct = await updateQuantityByQueryService(cid, pid, quantity);

    res.json(updatedProduct);
}

export const deleteProductInCartController = async (req, res) => {
    const { cid, pid } = req.params;

    const deletedProduct = await deleteProductInCartService(cid, pid);

    res.json({ message: "Producto eliminado con éxito", deletedProduct });
}

export const emptyCartController = async (cid) => {
    const cart = await emptyCartService(cid);
    return cart;
}